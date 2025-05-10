
import React from "react";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Book } from "@/data/mockData";
import { useIsMobile } from "@/hooks/use-mobile";

interface BookCardProps {
  book: Book;
  compact?: boolean;
  children?: React.ReactNode;
  showChatButton?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, compact = false, children, showChatButton = false }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
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
  
  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/chat/seller-${book.id}`);
  };

  // Mobile-friendly compact design
  if (compact) {
    return (
      <Link to={`/buku/${book.id}`} className="block">
        <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-16 h-20 object-cover rounded shadow-sm"
          />
          <div className="flex-1 min-w-0"> {/* Added min-width to prevent overflow */}
            <h3 className="text-sm font-medium line-clamp-1">{book.title}</h3>
            <p className="text-xs text-gray-500 line-clamp-1">{book.author}</p>
            <div className="flex items-center mt-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs ml-1">{book.rating}</span>
            </div>
            <p className="font-semibold text-prelobook-accent mt-1">
              {formatPrice(discountedPrice)}
            </p>
            
            {/* Compact action buttons for mobile view */}
            {!children && (
              <div className="flex gap-1.5 mt-1">
                <Button
                  variant="default"
                  size="sm"
                  className="h-7 px-2 text-xs bg-prelobook-accent hover:bg-prelobook-accent/90 text-white rounded-full shadow-sm"
                >
                  <ShoppingCart className="mr-1 h-3 w-3" />
                  Keranjang
                </Button>
                
                {showChatButton && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 w-7 p-0 rounded-full border-prelobook-accent text-prelobook-accent hover:bg-prelobook-accent/10 flex items-center justify-center shadow-sm"
                    onClick={handleChatClick}
                  >
                    <MessageCircle className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
            {children && <div className="mt-1">{children}</div>}
          </div>
        </div>
      </Link>
    );
  }

  // Standard card layout with responsive buttons
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col">
      <Link to={`/buku/${book.id}`} className="block flex-1">
        <div className="relative">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-48 object-cover"
          />
          {book.discount && (
            <div className="absolute top-2 right-2 bg-prelobook-accent text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
              -{book.discount}%
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs font-medium shadow-sm">
            {book.condition}
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">{book.title}</h3>
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
        </div>
      </Link>

      <div className="px-3 pb-3 mt-auto">
        {children}

        {!children && (
          <div className="flex gap-2">
            <Button
              variant="default"
              size={isMobile ? "sm" : "default"}
              className={`flex-1 bg-prelobook-accent hover:bg-prelobook-accent/90 text-white transition-colors duration-200 font-medium ${isMobile ? 'text-xs py-1.5' : ''} rounded-full shadow-sm`}
            >
              <ShoppingCart className={`${isMobile ? 'mr-1 h-3.5 w-3.5' : 'mr-1.5 h-4 w-4'}`} />
              Keranjang
            </Button>
            
            {showChatButton && (
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className={`border-prelobook-accent text-prelobook-accent hover:bg-prelobook-accent/10 transition-colors duration-200 ${isMobile ? 'w-8 h-8 p-0' : 'w-10 h-10 p-0'} rounded-full flex items-center justify-center shadow-sm`}
                onClick={handleChatClick}
              >
                <MessageCircle className={isMobile ? "h-3.5 w-3.5" : "h-4 w-4"} />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;

import { Star } from "lucide-react";
