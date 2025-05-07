
import React from "react";
import { currentUser, books } from "@/data/mockData";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import PromoSlider from "@/components/PromoSlider";
import CategoryList from "@/components/CategoryList";
import BookCard from "@/components/BookCard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-prelobook-background pb-16">
      <Header />
      
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-prelobook-primary">
            Halo, {currentUser.name}
          </h2>
          <p className="text-sm text-gray-500">Temukan buku favorit Anda di sini</p>
        </div>
        
        <SearchBar className="mb-4" />
        
        <PromoSlider />
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-prelobook-primary mb-3">Kategori</h3>
          <CategoryList />
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-prelobook-primary">Rekomendasi Buku</h3>
            <Link to="/katalog" className="flex items-center text-prelobook-accent text-sm">
              Lihat Semua <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {books.slice(0, 4).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-prelobook-primary">Buku Diskon</h3>
            <Link to="/katalog" className="flex items-center text-prelobook-accent text-sm">
              Lihat Semua <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {books
              .filter((book) => book.discount)
              .slice(0, 4)
              .map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default HomePage;
