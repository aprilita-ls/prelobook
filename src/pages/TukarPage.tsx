
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/BookCard";
import { books } from "@/data/mockData";
import BottomNavigation from "@/components/BottomNavigation";
import { BookOpen, Plus, BookOpenCheck, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-prelobook-background pb-16">
      <div className="bg-prelobook-accent text-white p-4">
        <h1 className="text-xl font-bold">Tukar Buku</h1>
        <p className="text-sm opacity-90">Tukarkan buku lama Anda dengan buku baru</p>
      </div>
      
      <div className="p-4">
        <div className="flex flex-col gap-3 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3">
            <div className="bg-prelobook-accent/10 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-prelobook-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-prelobook-primary">Buku Saya</h3>
              <p className="text-xs text-gray-500">Lihat koleksi buku yang dapat ditukar</p>
            </div>
            <Button size="sm" variant="outline" className="shrink-0">
              Lihat
            </Button>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3">
            <div className="bg-prelobook-accent/10 p-3 rounded-full">
              <Plus className="h-6 w-6 text-prelobook-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-prelobook-primary">Tambah Buku</h3>
              <p className="text-xs text-gray-500">Tambahkan buku ke koleksi tukar Anda</p>
            </div>
            <Button size="sm" variant="outline" className="shrink-0">
              Tambah
            </Button>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3">
            <div className="bg-prelobook-accent/10 p-3 rounded-full">
              <BookOpenCheck className="h-6 w-6 text-prelobook-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-prelobook-primary">Riwayat Tukar</h3>
              <p className="text-xs text-gray-500">Lihat riwayat penukaran buku Anda</p>
            </div>
            <Button size="sm" variant="outline" className="shrink-0">
              Lihat
            </Button>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3">
            <div className="bg-prelobook-accent/10 p-3 rounded-full">
              <RefreshCw className="h-6 w-6 text-prelobook-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-prelobook-primary">Tukar Tambah</h3>
              <p className="text-xs text-gray-500">Ajukan tukar tambah dengan buku baru</p>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="shrink-0"
              onClick={() => navigate("/exchange")}
            >
              Lihat
            </Button>
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
        
        <div className="grid grid-cols-2 gap-3">
          {filteredBooks.slice(0, 6).map((book) => (
            <BookCard key={book.id} book={book}>
              <Button
                className="w-full mt-3 bg-prelobook-accent hover:bg-prelobook-accent/90"
                size="sm"
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
