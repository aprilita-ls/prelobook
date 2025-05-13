
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { books, currentUser } from "@/data/mockData";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

interface CartItem {
  bookId: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    if (!currentUser.loggedIn) {
      toast({
        title: "Login Required",
        description: "Please login or create an account to view your cart",
        variant: "destructive",
      });
      // Would navigate to a login page in a real app
      navigate("/");
    }
  }, [navigate]);
  
  // This would normally be managed by a global state manager like Redux or Context
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { bookId: "book1", quantity: 1 },
    { bookId: "book5", quantity: 2 },
  ]);
  
  const cartBooks = cartItems.map((item) => {
    const book = books.find((b) => b.id === item.bookId);
    return {
      ...item,
      book,
    };
  }).filter((item) => item.book);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const handleIncreaseQuantity = (bookId: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.bookId === bookId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  const handleDecreaseQuantity = (bookId: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.bookId === bookId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  
  const handleRemoveItem = (bookId: string) => {
    setCartItems(cartItems.filter((item) => item.bookId !== bookId));
    toast({
      title: "Item dihapus",
      description: "Buku telah dihapus dari keranjang.",
    });
  };
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = cartBooks.reduce((sum, item) => {
    if (!item.book) return sum;
    
    const price = item.book.discount
      ? item.book.price - (item.book.price * item.book.discount) / 100
      : item.book.price;
      
    return sum + price * item.quantity;
  }, 0);
  
  const shipping = 15000;
  const total = subtotal + shipping;
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Keranjang kosong",
        description: "Tambahkan buku ke keranjang terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }
    
    // Additional check for login status
    if (!currentUser.loggedIn) {
      toast({
        title: "Login Required",
        description: "Please login or create an account to checkout",
        variant: "destructive",
      });
      // Would navigate to login page in a real app
      navigate("/");
      return;
    }
    
    navigate("/checkout");
  };
  
  // If not logged in, don't render the cart content
  if (!currentUser.loggedIn) {
    return (
      <div className="min-h-screen bg-prelobook-background pb-24">
        <Header title="Keranjang" showCart={false} />
        <div className="p-4">
          <div className="text-center py-10">
            <h2 className="text-lg font-semibold text-prelobook-primary mb-2">
              Login Required
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Please login or create an account to view your cart
            </p>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-32">
      <Header title="Keranjang" showCart={false} />
      
      <div className="p-4">
        {cartBooks.length === 0 ? (
          <div className="text-center py-10">
            <img 
              src="/placeholder.svg" 
              alt="Empty cart" 
              className="w-24 h-24 mx-auto mb-4 opacity-50"
            />
            <h2 className="text-lg font-semibold text-prelobook-primary mb-2">
              Keranjang Kosong
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Belum ada buku yang ditambahkan ke keranjang
            </p>
            <Button 
              className="bg-prelobook-accent hover:bg-prelobook-accent/90"
              onClick={() => navigate("/katalog")}
            >
              Cari Buku
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-prelobook-primary">
                Keranjang ({totalItems} item)
              </h2>
            </div>
            
            <div className="space-y-4 mb-6">
              {cartBooks.map(({ book, quantity }) => 
                book && (
                  <div
                    key={book.id}
                    className="bg-white rounded-lg p-3 shadow-sm flex"
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                    
                    <div className="ml-3 flex-1">
                      <div>
                        <h3 className="font-medium text-sm">{book.title}</h3>
                        <p className="text-xs text-gray-500">{book.author}</p>
                        
                        <div className="mt-1">
                          {book.discount && (
                            <span className="text-xs text-gray-500 line-through mr-1">
                              {formatPrice(book.price)}
                            </span>
                          )}
                          <span className="font-semibold text-prelobook-accent">
                            {formatPrice(
                              book.discount
                                ? book.price - (book.price * book.discount) / 100
                                : book.price
                            )}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border rounded-md overflow-hidden">
                          <button
                            className="p-1 bg-gray-100"
                            onClick={() => handleDecreaseQuantity(book.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1">{quantity}</span>
                          <button
                            className="p-1 bg-gray-100"
                            onClick={() => handleIncreaseQuantity(book.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button
                          className="text-red-500"
                          onClick={() => handleRemoveItem(book.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
              <h3 className="font-semibold text-prelobook-primary mb-3">
                Ringkasan Belanja
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} item)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ongkos Kirim</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-prelobook-accent">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-lg font-bold text-prelobook-accent">
              {formatPrice(total)}
            </p>
          </div>
          <Button
            className="bg-prelobook-accent hover:bg-prelobook-accent/90"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Lanjut ke Pembayaran
          </Button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default CartPage;
