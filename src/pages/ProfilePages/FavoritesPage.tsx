
import React, { useState } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// Mock data for favorites
const mockFavoriteBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 75000,
    rating: 4.5,
    image: "https://source.unsplash.com/random/100x150?book"
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 95000,
    rating: 4.8,
    image: "https://source.unsplash.com/random/100x150?novel"
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    price: 85000,
    rating: 4.6,
    image: "https://source.unsplash.com/random/100x150?fiction"
  }
];

const mockFavoritePackages = [
  {
    id: 101,
    title: "Paket Novel Klasik",
    items: ["The Great Gatsby", "To Kill a Mockingbird", "1984"],
    price: 225000,
    rating: 4.7,
    discount: 20,
    image: "https://source.unsplash.com/random/100x150?books"
  },
  {
    id: 102,
    title: "Paket Buku Anak",
    items: ["The Little Prince", "Charlie and the Chocolate Factory", "Matilda"],
    price: 180000,
    rating: 4.9,
    discount: 15,
    image: "https://source.unsplash.com/random/100x150?children"
  }
];

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const [favoriteBooks, setFavoriteBooks] = useState(mockFavoriteBooks);
  const [favoritePackages, setFavoritePackages] = useState(mockFavoritePackages);

  const handleRemoveBook = (id: number) => {
    setFavoriteBooks(favoriteBooks.filter(book => book.id !== id));
    toast({
      title: "Dihapus dari favorit",
      description: "Buku telah dihapus dari daftar favorit Anda."
    });
  };

  const handleRemovePackage = (id: number) => {
    setFavoritePackages(favoritePackages.filter(pkg => pkg.id !== id));
    toast({
      title: "Dihapus dari favorit",
      description: "Paket telah dihapus dari daftar favorit Anda."
    });
  };

  const handleViewBook = (id: number) => {
    navigate(`/buku/${id}`);
  };

  const handleViewPackage = (id: number) => {
    navigate(`/paket/${id}`);
  };

  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Favorit" showBack />
      
      <div className="p-4">
        <Tabs defaultValue="books" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="books">Buku</TabsTrigger>
            <TabsTrigger value="packages">Paket</TabsTrigger>
          </TabsList>
          
          <TabsContent value="books" className="space-y-4">
            {favoriteBooks.length > 0 ? (
              favoriteBooks.map(book => (
                <Card key={book.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex p-4">
                      <div className="w-20 h-28 overflow-hidden rounded mr-3">
                        <img 
                          src={book.image} 
                          alt={book.title} 
                          className="w-full h-full object-cover"
                          onClick={() => handleViewBook(book.id)}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 
                          className="font-medium mb-1 cursor-pointer hover:text-prelobook-accent"
                          onClick={() => handleViewBook(book.id)}
                        >
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm ml-1">{book.rating}</span>
                        </div>
                        <p className="font-semibold text-prelobook-accent">
                          Rp {book.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 border-t">
                      <Button 
                        variant="ghost" 
                        className="py-2 text-red-500 hover:text-red-700 rounded-none"
                        onClick={() => handleRemoveBook(book.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Hapus
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        className="py-2 text-prelobook-accent hover:text-prelobook-accent/80 border-l rounded-none"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" /> Tambah ke Keranjang
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <Heart className="mx-auto h-16 w-16 text-gray-300" />
                <p className="mt-4 text-gray-500">Belum ada buku favorit</p>
                <Button 
                  className="mt-4 bg-prelobook-accent hover:bg-prelobook-accent/90"
                  onClick={() => navigate('/katalog')}
                >
                  Jelajahi Katalog
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="packages" className="space-y-4">
            {favoritePackages.length > 0 ? (
              favoritePackages.map(pkg => (
                <Card key={pkg.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex p-4">
                      <div className="w-20 h-28 overflow-hidden rounded mr-3">
                        <img 
                          src={pkg.image} 
                          alt={pkg.title} 
                          className="w-full h-full object-cover"
                          onClick={() => handleViewPackage(pkg.id)}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 
                            className="font-medium mb-1 cursor-pointer hover:text-prelobook-accent"
                            onClick={() => handleViewPackage(pkg.id)}
                          >
                            {pkg.title}
                          </h3>
                          <Badge className="bg-red-500">-{pkg.discount}%</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          {pkg.items.length} buku
                        </p>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm ml-1">{pkg.rating}</span>
                        </div>
                        <p className="font-semibold text-prelobook-accent">
                          Rp {pkg.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 border-t">
                      <Button 
                        variant="ghost" 
                        className="py-2 text-red-500 hover:text-red-700 rounded-none"
                        onClick={() => handleRemovePackage(pkg.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Hapus
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        className="py-2 text-prelobook-accent hover:text-prelobook-accent/80 border-l rounded-none"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" /> Tambah ke Keranjang
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <Heart className="mx-auto h-16 w-16 text-gray-300" />
                <p className="mt-4 text-gray-500">Belum ada paket favorit</p>
                <Button 
                  className="mt-4 bg-prelobook-accent hover:bg-prelobook-accent/90"
                  onClick={() => navigate('/paket')}
                >
                  Jelajahi Paket
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

// Import Badge for use in the component
import { Badge } from "@/components/ui/badge";

export default FavoritesPage;
