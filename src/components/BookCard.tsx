
import React from "react";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book } from "@/data/mockData";

interface BookCardProps {
  book: Book;
  compact?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, compact = false }) => {
  const discountedPrice = book.discount
    ? book.price - (book.price * book.discount) / 100
    : book.price;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (compact) {
    return (
      <Link to={`/buku/${book.id}`} className="block">
        <div className="flex items-center space-x-3 p-2 bg-white rounded-lg">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-16 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="text-sm font-medium line-clamp-1">{book.title}</h3>
            <p className="text-xs text-gray-500 line-clamp-1">{book.author}</p>
            <div className="flex items-center mt-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs ml-1">{book.rating}</span>
            </div>
            <p className="font-semibold text-prelobook-accent mt-1">
              {formatPrice(discountedPrice)}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/buku/${book.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-48 object-cover"
          />
          {book.discount && (
            <div className="absolute top-2 right-2 bg-prelobook-accent text-white text-xs px-2 py-1 rounded-full">
              -{book.discount}%
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs font-medium">
            {book.condition}
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 h-10">{book.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{book.author}</p>

          <div className="flex items-center mt-2">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs ml-1">{book.rating}</span>
            <span className="text-xs text-gray-500 ml-1">
              ({book.reviewCount})
            </span>
          </div>

          <div className="mt-2">
            {book.discount && (
              <span className="text-xs text-gray-500 line-through mr-2">
                {formatPrice(book.price)}
              </span>
            )}
            <span className="font-semibold text-prelobook-accent">
              {formatPrice(discountedPrice)}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3 border-prelobook-accent text-prelobook-accent hover:bg-prelobook-accent hover:text-white"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Keranjang
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
