
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { books, sellers } from "@/data/mockData";
import Header from "@/components/Header";
import { Star, MessageSquare, ShoppingCart, Heart, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import { cn } from "@/lib/utils";

// Define the categories array that was missing
const categories = [
  { id: "academics", name: "Akademik" },
  { id: "novel", name: "Novel" },
  { id: "biography", name: "Biografi" },
  { id: "children", name: "Anak-anak" },
  { id: "business", name: "Bisnis" },
  { id: "religion", name: "Agama" },
  { id: "reference", name: "Referensi" },
  { id: "selfHelp", name: "Pengembangan Diri" },
];

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  
  const book = books.find((b) => b.id === id);
  
  if (!book) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-prelobook-background">
        <p className="text-center p-4 bg-white rounded-lg shadow">Buku tidak ditemukan</p>
      </div>
    );
  }
  
  const seller = sellers.find((s) => s.id === book.sellerId);
  
  const discountedPrice = book.discount
    ? book.price - (book.price * book.discount) / 100
    : book.price;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const handleAddToCart = () => {
    toast({
      title: "Berhasil ditambahkan ke keranjang",
      description: `${book.title} telah ditambahkan ke keranjang.`,
    });
  };
  
  const handleBuyNow = () => {
    toast({
      title: "Berhasil ditambahkan",
      description: "Mengarahkan ke halaman pembayaran...",
    });
    setTimeout(() => navigate("/keranjang"), 1000);
  };
  
  const handleChatSeller = () => {
    navigate(`/chat/seller-${book.sellerId}`);
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    toast({
      title: isWishlist ? "Dihapus dari wishlist" : "Ditambahkan ke wishlist",
      description: isWishlist 
        ? `${book.title} telah dihapus dari wishlist` 
        : `${book.title} telah ditambahkan ke wishlist`,
    });
  };

  const handleRateSeller = (isPositive: boolean) => {
    if (!hasRated) {
      setHasRated(true);
      setRatingSubmitted(true);
      
      toast({
        title: "Rating Berhasil",
        description: `Terima kasih telah memberikan rating ${isPositive ? "positif" : "negatif"} untuk ${seller?.name}.`,
      });
      
      // In a real app, we would send this rating to the backend
      console.log(`User rated seller ${seller?.id} with a ${isPositive ? "positive" : "negative"} rating`);
      
      // Reset rating submitted status after 2 seconds
      setTimeout(() => {
        setRatingSubmitted(false);
      }, 2000);
    }
  };

  // In a real app, each book would have multiple images
  // For demo purposes, we'll just use the same image multiple times
  const bookImages = [book.coverImage, book.coverImage.replace('w=400', 'w=401')];
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header showBack />
      
      <div className="relative h-64 sm:h-80 bg-white shadow-sm">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div
            className="flex transition-transform duration-300 h-full"
            style={{ transform: `translateX(-${activeImage * 100}%)` }}
          >
            {bookImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${book.title} view ${index + 1}`}
                className="min-w-full h-full object-contain bg-white"
              />
            ))}
          </div>
          
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {book.discount > 0 && (
              <Badge className="bg-prelobook-accent text-white font-medium px-2.5 py-1 text-xs shadow-sm">
                -{book.discount}% OFF
              </Badge>
            )}
            
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "h-9 w-9 rounded-full bg-white border-white shadow-sm transition-colors",
                isWishlist ? "text-red-500" : "text-gray-400"
              )}
              onClick={toggleWishlist}
            >
              <Heart className={cn("h-5 w-5", isWishlist && "fill-current")} />
            </Button>
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {bookImages.map((_, index) => (
              <button
                key={index}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  index === activeImage ? "bg-prelobook-accent" : "bg-white/60"
                }`}
                onClick={() => setActiveImage(index)}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 sm:p-6 pt-5 rounded-t-3xl -mt-6 relative z-10 shadow-sm">
        <h1 className="text-xl font-bold text-prelobook-primary">{book.title}</h1>
        <p className="text-gray-600 mt-1 text-sm">{book.author}</p>
        
        <div className="flex items-center mt-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{book.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-sm text-gray-600">{book.reviewCount} ulasan</span>
          <Badge className="ml-2.5 bg-prelobook-background text-prelobook-primary text-xs">
            {book.condition}
          </Badge>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center">
            {book.discount > 0 && (
              <span className="text-sm text-gray-500 line-through mr-2">
                {formatPrice(book.price)}
              </span>
            )}
            <span className="text-xl font-bold text-prelobook-accent">
              {formatPrice(discountedPrice)}
            </span>
          </div>
          {book.discount > 0 && (
            <p className="text-xs text-green-600 mt-1">
              Hemat {formatPrice(book.price - discountedPrice)}
            </p>
          )}
        </div>
        
        <div className="border-t border-gray-200 mt-5 pt-4">
          <h2 className="text-base font-semibold text-prelobook-primary mb-3">Informasi Buku</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="bg-prelobook-background/50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Penerbit</p>
              <p className="text-sm font-medium">{book.publisher}</p>
            </div>
            <div className="bg-prelobook-background/50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Tahun Terbit</p>
              <p className="text-sm font-medium">{book.year}</p>
            </div>
            <div className="bg-prelobook-background/50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Kategori</p>
              <p className="text-sm font-medium">
                {categories.find(c => c.id === book.category)?.name || "Umum"}
              </p>
            </div>
            <div className="bg-prelobook-background/50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Kondisi</p>
              <p className="text-sm font-medium">{book.condition}</p>
            </div>
          </div>
        </div>
        
        {seller && (
          <div className="border-t border-gray-200 mt-5 pt-4">
            <h2 className="text-base font-semibold text-prelobook-primary mb-3">Penjual</h2>
            <div className="flex flex-col bg-prelobook-background/30 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <p className="font-medium text-sm">{seller.name}</p>
                    <div className="flex items-center mt-0.5">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs ml-1 text-gray-600">
                        {seller.rating} <span className="text-gray-400">• Online</span>
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-prelobook-accent text-prelobook-accent h-9 rounded-full hover:bg-prelobook-accent/10 shadow-sm"
                  onClick={handleChatSeller}
                >
                  <MessageSquare className="h-4 w-4 mr-1.5" />
                  Chat
                </Button>
              </div>
              
              {/* Seller Rating Section */}
              <div className="mt-3 border-t border-gray-200 pt-3">
                <p className="text-xs text-gray-600 mb-2">
                  {hasRated 
                    ? "Terima kasih telah memberikan rating" 
                    : "Bagaimana pengalaman Anda dengan penjual ini?"}
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className={cn(
                      "rounded-full border-gray-200 transition-all",
                      hasRated && "opacity-50 cursor-not-allowed",
                      ratingSubmitted && "border-green-500"
                    )}
                    onClick={() => handleRateSeller(true)}
                    disabled={hasRated}
                  >
                    <ThumbsUp className={cn(
                      "h-4 w-4 mr-1.5", 
                      ratingSubmitted && "text-green-500 fill-green-500"
                    )} />
                    Puas
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className={cn(
                      "rounded-full border-gray-200 transition-all",
                      hasRated && "opacity-50 cursor-not-allowed",
                      ratingSubmitted && "border-red-500"
                    )}
                    onClick={() => handleRateSeller(false)}
                    disabled={hasRated}
                  >
                    <ThumbsDown className={cn(
                      "h-4 w-4 mr-1.5",
                      ratingSubmitted && "text-red-500"
                    )} />
                    Tidak Puas
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="border-t border-gray-200 mt-5 pt-4">
          <h2 className="text-base font-semibold text-prelobook-primary mb-3">Deskripsi</h2>
          <div className="bg-prelobook-background/30 p-4 rounded-lg">
            <p className="text-sm text-gray-600 leading-relaxed">{book.description}</p>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex items-center gap-3 z-50 shadow-md">
        <Button
          variant="outline"
          className="flex-1 border-prelobook-accent text-prelobook-accent rounded-full hover:bg-prelobook-accent/10 h-11 shadow-sm"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Keranjang
        </Button>
        <Button
          className="flex-1 bg-prelobook-accent hover:bg-prelobook-accent/90 rounded-full h-11 font-medium shadow-sm"
          onClick={handleBuyNow}
        >
          Beli Sekarang
        </Button>
      </div>
    </div>
  );
};

export default BookDetailPage;
