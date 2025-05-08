
import React, { useState } from "react";
import { books, categories } from "@/data/mockData";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import BookCard from "@/components/BookCard";
import { Filter, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BottomNavigation from "@/components/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

type SortOption = "newest" | "cheapest" | "bestSeller";
type ViewMode = "grid" | "list";

const CatalogPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>(isMobile ? "list" : "grid");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  const filteredBooks = books
    .filter((book) => 
      (selectedCategory ? book.category === selectedCategory : true) &&
      (searchTerm
        ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        : true)
    )
    .sort((a, b) => {
      if (sortOption === "cheapest") {
        const aPriceAfterDiscount = a.discount
          ? a.price - (a.price * a.discount) / 100
          : a.price;
        const bPriceAfterDiscount = b.discount
          ? b.price - (b.price * b.discount) / 100
          : b.price;
        return aPriceAfterDiscount - bPriceAfterDiscount;
      }
      if (sortOption === "bestSeller") {
        return b.reviewCount - a.reviewCount;
      }
      // newest by default
      return b.year - a.year;
    });

  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Katalog Buku" />

      <div className="px-3 sm:px-4 pt-2 pb-20">
        <SearchBar
          placeholder="Cari judul, penulis, atau penerbit..."
          onSearch={handleSearch}
          className="mb-3"
        />

        <div className="mb-3 flex overflow-x-auto py-2 gap-2 no-scrollbar -mx-1 px-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`text-xs py-1 px-3 h-8 whitespace-nowrap flex-shrink-0 rounded-full transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-prelobook-accent text-white hover:bg-prelobook-accent/90 shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleCategorySelect(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-3 sticky top-0 z-10 bg-prelobook-background py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-gray-700 h-8 px-3 hover:bg-gray-100 rounded-full shadow-sm"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">
                  {sortOption === "newest"
                    ? "Terbaru"
                    : sortOption === "cheapest"
                    ? "Termurah"
                    : "Terlaris"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40 z-50">
              <DropdownMenuItem onClick={() => handleSortChange("newest")} className="text-sm">
                Terbaru
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("cheapest")} className="text-sm">
                Termurah
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("bestSeller")} className="text-sm">
                Terlaris
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className={`p-1.5 h-8 w-8 rounded-full ${
                viewMode === "grid"
                  ? "bg-prelobook-accent text-white hover:bg-prelobook-accent/90 shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`p-1.5 h-8 w-8 rounded-full ${
                viewMode === "list"
                  ? "bg-prelobook-accent text-white hover:bg-prelobook-accent/90 shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">Tidak ada buku yang ditemukan</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} showChatButton={true} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} compact showChatButton={true} />
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default CatalogPage;
