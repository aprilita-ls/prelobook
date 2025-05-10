
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { academicPackages, books, sellers } from "@/data/mockData";
import Header from "@/components/Header";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MessageCircle, ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const PackageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isMobile = useIsMobile();
  const [hasRated, setHasRated] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  
  const academicPackage = academicPackages.find((p) => p.id === id);
  
  if (!academicPackage) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Paket tidak ditemukan</p>
      </div>
    );
  }
  
  const packageBooks = academicPackage.books
    .map((bookId) => books.find((book) => book.id === bookId))
    .filter(Boolean);
  
  // For the package page, we'll use the first book's seller as the package seller
  const firstBook = packageBooks[0];
  const seller = firstBook ? sellers.find(s => s.id === firstBook.sellerId) : null;
  
  const discountedPrice = 
    academicPackage.price - (academicPackage.price * academicPackage.discount) / 100;
  
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
      description: `${academicPackage.name} telah ditambahkan ke keranjang.`,
    });
  };
  
  const handleChatSeller = () => {
    // If we have a seller, use that seller ID, otherwise use generic package ID
    if (seller) {
      window.location.href = `/chat/seller-${seller.id}`;
    } else {
      window.location.href = `/chat/package-${academicPackage.id}`;
    }
  };
  
  const handleRateSeller = (isPositive: boolean) => {
    if (!hasRated && seller) {
      setHasRated(true);
      setRatingSubmitted(true);
      
      toast({
        title: "Rating Berhasil",
        description: `Terima kasih telah memberikan rating ${isPositive ? "positif" : "negatif"} untuk ${seller.name}.`,
      });
      
      // In a real app, we would send this rating to the backend
      console.log(`User rated seller ${seller.id} with a ${isPositive ? "positive" : "negative"} rating`);
      
      // Reset rating submitted status after 2 seconds
      setTimeout(() => {
        setRatingSubmitted(false);
      }, 2000);
    }
  };
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header showBack />
      
      <div className="relative h-48 sm:h-64">
        <img
          src={academicPackage.coverImage}
          alt={academicPackage.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-prelobook-accent text-white text-xs px-2 py-1 rounded-full">
          -{academicPackage.discount}%
        </div>
      </div>
      
      <div className="bg-white p-4 sm:p-6 rounded-t-3xl -mt-6 relative z-10 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-prelobook-primary">
          {academicPackage.name}
        </h1>
        
        <div className="flex items-center mt-1 text-sm text-gray-600">
          <span>{academicPackage.bookCount} buku</span>
          <span className="mx-2">•</span>
          <span>{academicPackage.category}</span>
        </div>
        
        <div className="mt-4 flex items-baseline flex-wrap">
          <span className="text-sm text-gray-500 line-through mr-2">
            {formatPrice(academicPackage.price)}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-prelobook-accent">
            {formatPrice(discountedPrice)}
          </span>
          <span className="ml-2 text-sm text-green-600">
            Hemat {formatPrice(academicPackage.price - discountedPrice)}
          </span>
        </div>
        
        {/* Seller Rating Section - Only show if we have a seller */}
        {seller && (
          <div className="border-t border-gray-200 mt-4 pt-4">
            <h2 className="text-base font-semibold text-prelobook-primary mb-3">Penjual</h2>
            <div className="bg-prelobook-background/30 p-3 rounded-lg">
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
                  <MessageCircle className="h-4 w-4 mr-1.5" />
                  Chat
                </Button>
              </div>
              
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
        
        <div className="border-t border-gray-200 mt-4 pt-4">
          <h2 className="text-lg font-semibold text-prelobook-primary">
            Isi Paket ({packageBooks.length} buku)
          </h2>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {packageBooks.map((book) => (
              book && <BookCard key={book.id} book={book} compact />
            ))}
          </div>
        </div>
        
        <div className={`flex gap-3 mt-6 ${isMobile ? "flex-col" : ""}`}>
          <Button
            className="flex-grow bg-prelobook-accent hover:bg-prelobook-accent/90 text-sm sm:text-base rounded-full shadow-sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Tambahkan ke Keranjang
          </Button>
          
          <Button
            variant="outline"
            className="border-prelobook-accent text-prelobook-accent hover:bg-prelobook-accent hover:text-white rounded-full shadow-sm"
            onClick={handleChatSeller}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="ml-2">Chat Penjual</span>
          </Button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default PackageDetailPage;
