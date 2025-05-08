
import React, { useState } from "react";
import { books } from "@/data/mockData";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import BookCard from "@/components/BookCard";
import { FilterX, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";

type Condition = 'Baru' | 'Sangat Baik' | 'Baik' | 'Cukup Baik';

const ExchangePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConditions, setSelectedConditions] = useState<Condition[]>([]);
  const navigate = useNavigate();
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  const toggleCondition = (condition: Condition) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };
  
  const clearFilters = () => {
    setSelectedConditions([]);
  };
  
  const filteredBooks = books
    .filter((book) => 
      (searchTerm
        ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        : true) &&
      (selectedConditions.length > 0
        ? selectedConditions.includes(book.condition)
        : true)
    );
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-16">
      <Header title="Tukar Tambah" />
      
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-prelobook-primary">
            Tukar Tambah Buku
          </h2>
          <p className="text-sm text-gray-500">
            Temukan buku untuk ditukarkan dengan koleksi Anda
          </p>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <SearchBar
            placeholder="Cari buku untuk ditukar..."
            onSearch={handleSearch}
            className="flex-1"
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="p-2 bg-white">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter Kondisi Buku</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedConditions.includes('Baru')}
                onCheckedChange={() => toggleCondition('Baru')}
              >
                Baru
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedConditions.includes('Sangat Baik')}
                onCheckedChange={() => toggleCondition('Sangat Baik')}
              >
                Sangat Baik
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedConditions.includes('Baik')}
                onCheckedChange={() => toggleCondition('Baik')}
              >
                Baik
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedConditions.includes('Cukup Baik')}
                onCheckedChange={() => toggleCondition('Cukup Baik')}
              >
                Cukup Baik
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {selectedConditions.length > 0 && (
          <div className="flex items-center mb-4">
            <div className="text-sm text-gray-600">
              Filter: {selectedConditions.join(", ")}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-7 p-0"
              onClick={clearFilters}
            >
              <FilterX className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
        )}
        
        {filteredBooks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Tidak ada buku yang ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredBooks.map((book) => (
              <div key={book.id} className="relative">
                <BookCard book={book} />
                <Button
                  className="absolute bottom-3 left-3 right-3 bg-prelobook-accent hover:bg-prelobook-accent/90"
                  size="sm"
                  onClick={() => navigate(`/chat/seller-${book.id}`)}
                >
                  Ajukan Tukar
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ExchangePage;
