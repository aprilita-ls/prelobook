
import React from "react";
import { Bell, ShoppingCart, ChevronLeft, LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { currentUser } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface HeaderProps {
  title?: string;
  showNotification?: boolean;
  showCart?: boolean;
  showBack?: boolean;
  onBackClick?: () => void;
  leftComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showNotification = true,
  showCart = true,
  showBack = false,
  onBackClick,
  leftComponent,
}) => {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    // For now, we'll just show a toast indicating login functionality
    // This would be replaced with actual authentication once integrated with a backend
    toast({
      title: "Login Required",
      description: "Please login or create an account to continue",
    });
    navigate("/login"); // This would navigate to a login page in a real app
  };
  
  return (
    <header className="bg-white sticky top-0 z-40 px-4 py-3.5 flex items-center justify-between border-b border-gray-100 shadow-sm">
      <div className="flex items-center gap-3">
        {leftComponent ? (
          leftComponent
        ) : showBack ? (
          <button
            onClick={onBackClick || (() => navigate(-1))}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Kembali"
          >
            <ChevronLeft className="h-5 w-5 text-prelobook-primary" />
          </button>
        ) : null}
        {title ? (
          <h1 className="text-lg font-bold text-prelobook-primary">{title}</h1>
        ) : (
          <div className="flex items-center">
            <img 
              src="/placeholder.svg" 
              alt="Logo" 
              className="h-8 w-8"
            />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {showNotification && (
          <button 
            className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Notifikasi"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-prelobook-accent">
              3
            </Badge>
          </button>
        )}
        
        <button 
          className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          onClick={handleLoginClick}
          aria-label="Login"
        >
          <LogIn className="h-5 w-5 text-gray-600" />
        </button>
        
        {showCart && (
          <button 
            className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => {
              // Check if user is logged in before navigating to cart
              if (currentUser.loggedIn) {
                navigate("/keranjang");
              } else {
                toast({
                  title: "Login Required",
                  description: "Please login or create an account to view your cart",
                });
                // Would navigate to login page in a real app
                navigate("/login");
              }
            }}
            aria-label="Keranjang"
          >
            <ShoppingCart className="h-5 w-5 text-gray-600" />
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
