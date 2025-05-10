
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/BookCard";
import { books } from "@/data/mockData";
import BottomNavigation from "@/components/BottomNavigation";
import { BookOpen, Plus, BookOpenCheck, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const TukarPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  const filteredBooks = books.filter((book) =>
    searchTerm
      ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Tukar Buku" />
      
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-prelobook-primary mb-2">
            Tukar Buku
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Tukarkan buku lama Anda dengan buku baru atau dapatkan kredit untuk pembelian berikutnya
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3 transition-all hover:shadow-md">
              <div className="bg-prelobook-accent/10 p-3 rounded-full flex-shrink-0">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-prelobook-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-prelobook-primary truncate">Buku Saya</h3>
                <p className="text-xs text-gray-500 truncate">Lihat koleksi buku yang dapat ditukar</p>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="shrink-0 rounded-full"
                onClick={() => navigate("/my-books")}
              >
                Lihat
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3 transition-all hover:shadow-md">
              <div className="bg-prelobook-accent/10 p-3 rounded-full flex-shrink-0">
                <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-prelobook-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-prelobook-primary truncate">Tambah Buku</h3>
                <p className="text-xs text-gray-500 truncate">Tambahkan buku ke koleksi tukar Anda</p>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="shrink-0 rounded-full"
                onClick={() => navigate("/add-book")}
              >
                Tambah
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3 transition-all hover:shadow-md">
              <div className="bg-prelobook-accent/10 p-3 rounded-full flex-shrink-0">
                <BookOpenCheck className="h-5 w-5 sm:h-6 sm:w-6 text-prelobook-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-prelobook-primary truncate">Riwayat Tukar</h3>
                <p className="text-xs text-gray-500 truncate">Lihat riwayat penukaran buku Anda</p>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="shrink-0 rounded-full"
                onClick={() => navigate("/exchange-history")}
              >
                Lihat
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3 transition-all hover:shadow-md">
              <div className="bg-prelobook-accent/10 p-3 rounded-full flex-shrink-0">
                <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6 text-prelobook-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-prelobook-primary truncate">Tukar Tambah</h3>
                <p className="text-xs text-gray-500 truncate">Ajukan tukar tambah dengan buku baru</p>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="shrink-0 rounded-full"
                onClick={() => navigate("/exchange")}
              >
                Lihat
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-prelobook-primary mb-2">
            Buku yang Dapat Ditukarkan
          </h3>
          <SearchBar
            placeholder="Cari buku untuk ditukar..."
            onSearch={handleSearch}
            className="mb-3"
          />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredBooks.slice(0, 6).map((book) => (
            <BookCard key={book.id} book={book}>
              <Button
                className="w-full mt-2 bg-prelobook-accent hover:bg-prelobook-accent/90 rounded-full shadow-sm"
                size="sm"
                onClick={() => navigate(`/chat/seller-${book.id}`)}
              >
                Tukar
              </Button>
            </BookCard>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default TukarPage;
