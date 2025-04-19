
import React from "react";
import { useParams } from "react-router-dom";
import { academicPackages, books } from "@/data/mockData";
import Header from "@/components/Header";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

const PackageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
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
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-16">
      <Header showBack />
      
      <div className="relative h-48">
        <img
          src={academicPackage.coverImage}
          alt={academicPackage.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-prelobook-accent text-white text-xs px-2 py-1 rounded-full">
          -{academicPackage.discount}%
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-t-3xl -mt-6 relative z-10">
        <h1 className="text-xl font-bold text-prelobook-primary">
          {academicPackage.name}
        </h1>
        
        <div className="flex items-center mt-1 text-sm text-gray-600">
          <span>{academicPackage.bookCount} buku</span>
          <span className="mx-2">•</span>
          <span>{academicPackage.category}</span>
        </div>
        
        <div className="mt-4">
          <span className="text-sm text-gray-500 line-through mr-2">
            {formatPrice(academicPackage.price)}
          </span>
          <span className="text-xl font-bold text-prelobook-accent">
            {formatPrice(discountedPrice)}
          </span>
          <span className="ml-2 text-sm text-green-600">
            Hemat {formatPrice(academicPackage.price - discountedPrice)}
          </span>
        </div>
        
        <div className="border-t border-gray-200 mt-4 pt-4">
          <h2 className="text-lg font-semibold text-prelobook-primary">
            Isi Paket ({packageBooks.length} buku)
          </h2>
          
          <div className="mt-4 space-y-3">
            {packageBooks.map((book) => (
              book && <BookCard key={book.id} book={book} compact />
            ))}
          </div>
        </div>
        
        <Button
          className="w-full mt-6 bg-prelobook-accent hover:bg-prelobook-accent/90"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Tambahkan ke Keranjang
        </Button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default PackageDetailPage;
