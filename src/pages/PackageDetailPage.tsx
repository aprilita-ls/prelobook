
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
      <div className="min-h-screen flex justify-center items-center bg-prelobook-background">
        <p className="p-4 bg-white rounded-xl shadow-md text-prelobook-primary">Paket tidak ditemukan</p>
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
      
      <div className="relative h-52 sm:h-64 bg-white">
        <img
          src={academicPackage.coverImage}
          alt={academicPackage.name}
          className="w-full h-full object-contain"
        />
        <div className="absolute top-3 right-3 bg-prelobook-accent text-white text-xs px-3 py-1 rounded-full shadow-sm">
          -{academicPackage.discount}%
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-t-3xl -mt-6 relative z-10 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-prelobook-primary">
          {academicPackage.name}
        </h1>
        
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4H18C20.2091 4 22 5.79086 22 8V16C22 18.2091 20.2091 20 18 20H6C3.79086 20 2 18.2091 2 16V8C2 5.79086 3.79086 4 6 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 12H17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 12H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {academicPackage.bookCount} buku
          </span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.5 14.25V11.25C19.5 9.76472 18.4353 8.5 17 8.5H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.9 7.55L10 4.5L7.1 7.55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.5 14.25V16.5C4.5 18.1569 5.84315 19.5 7.5 19.5H16.5C18.1569 19.5 19.5 18.1569 19.5 16.5V14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {academicPackage.category}
          </span>
        </div>
        
        <div className="mt-4 bg-prelobook-background/50 p-4 rounded-xl">
          <div className="flex items-baseline flex-wrap">
            <span className="text-sm text-gray-500 line-through mr-2">
              {formatPrice(academicPackage.price)}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-prelobook-accent">
              {formatPrice(discountedPrice)}
            </span>
            <span className="ml-2 text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              Hemat {formatPrice(academicPackage.price - discountedPrice)}
            </span>
          </div>
        </div>
        
        {/* Seller Rating Section - Only show if we have a seller */}
        {seller && (
          <div className="border-t border-gray-200 mt-5 pt-4">
            <h2 className="text-base font-semibold text-prelobook-primary mb-3">Penjual</h2>
            <div className="bg-prelobook-background/30 p-4 rounded-xl">
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
        
        <div className="border-t border-gray-200 mt-5 pt-4">
          <h2 className="text-lg font-semibold text-prelobook-primary mb-3">
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
            className="border-prelobook-accent text-prelobook-accent hover:bg-prelobook-accent/10 rounded-full shadow-sm"
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
