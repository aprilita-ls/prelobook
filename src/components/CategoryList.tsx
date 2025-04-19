
import React from "react";
import { categories } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { 
  Book, 
  GraduationCap, 
  Bookmark, 
  Baby, 
  User, 
  Briefcase, 
  BookOpen, 
  Laptop 
} from "lucide-react";

interface CategoryListProps {
  onSelectCategory?: (categoryId: string) => void;
  className?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory, className }) => {
  // Map category icons to Lucide components
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "graduation-cap":
        return <GraduationCap className="h-5 w-5" />;
      case "book":
        return <Book className="h-5 w-5" />;
      case "bookmark":
        return <Bookmark className="h-5 w-5" />;
      case "baby":
        return <Baby className="h-5 w-5" />;
      case "user":
        return <User className="h-5 w-5" />;
      case "briefcase":
        return <Briefcase className="h-5 w-5" />;
      case "book-open":
        return <BookOpen className="h-5 w-5" />;
      case "laptop":
        return <Laptop className="h-5 w-5" />;
      default:
        return <Book className="h-5 w-5" />;
    }
  };

  return (
    <div className={cn("overflow-x-auto py-2", className)}>
      <div className="flex space-x-4 min-w-max px-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center"
            onClick={() => onSelectCategory && onSelectCategory(category.id)}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-prelobook-accent text-prelobook-accent mb-1">
              {getCategoryIcon(category.icon)}
            </div>
            <span className="text-xs text-prelobook-primary">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
