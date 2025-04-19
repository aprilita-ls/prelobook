
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

type SortOption = "newest" | "cheapest" | "bestSeller";
type ViewMode = "grid" | "list";

const CatalogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
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
    <div className="min-h-screen bg-prelobook-background pb-16">
      <Header title="Katalog Buku" />

      <div className="p-4">
        <SearchBar
          placeholder="Cari judul, penulis, atau penerbit..."
          onSearch={handleSearch}
          className="mb-4"
        />

        <div className="mb-4 flex overflow-x-auto py-1 gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`text-xs py-1 px-3 h-auto ${
                selectedCategory === category.id
                  ? "bg-prelobook-accent text-white hover:bg-prelobook-accent"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => handleCategorySelect(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="flex justify-between mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-gray-700"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {sortOption === "newest"
                  ? "Terbaru"
                  : sortOption === "cheapest"
                  ? "Termurah"
                  : "Terlaris"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => handleSortChange("newest")}>
                Terbaru
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("cheapest")}>
                Termurah
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("bestSeller")}>
                Terlaris
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`p-2 ${
                viewMode === "grid"
                  ? "bg-prelobook-accent text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`p-2 ${
                viewMode === "list"
                  ? "bg-prelobook-accent text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada buku yang ditemukan</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} compact />
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default CatalogPage;
