
import React from "react";
import { Bell, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { currentUser } from "@/data/mockData";

interface HeaderProps {
  title?: string;
  showNotification?: boolean;
  showCart?: boolean;
  showBack?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showNotification = true,
  showCart = true,
  showBack = false,
  onBackClick,
}) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white sticky top-0 z-40 px-4 py-3 flex items-center justify-between border-b border-gray-100">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBackClick || (() => navigate(-1))}
            className="p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}
        {title ? (
          <h1 className="text-lg font-bold text-prelobook-primary">{title}</h1>
        ) : (
          <div className="flex items-center">
            <img 
              src="/placeholder.svg" 
              alt="Logo" 
              className="h-8 w-8 mr-2"
            />
            <h1 className="text-lg font-bold text-prelobook-primary">PRELOBOOK</h1>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {showNotification && (
          <button className="relative">
            <Bell className="h-6 w-6 text-gray-600" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-prelobook-accent">
              3
            </Badge>
          </button>
        )}
        {showCart && (
          <button 
            className="relative"
            onClick={() => navigate("/keranjang")}
          >
            <ShoppingCart className="h-6 w-6 text-gray-600" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-prelobook-accent">
              2
            </Badge>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
