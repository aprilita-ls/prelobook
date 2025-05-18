
import React from "react";
import { Bell, ShoppingCart, ChevronLeft, LogIn, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { currentUser } from "@/data/mockData";
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
    navigate("/login");
  };
  
  const handleLogoutClick = () => {
    // Mock logout functionality
    currentUser.loggedIn = false;
    
    toast({
      title: "Logout berhasil",
      description: "Anda telah berhasil keluar dari akun",
    });
    
    // Navigate to homepage after logout
    navigate("/");
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
          <h1 className="text-lg font-bold text-prelobook-primary">PRELOBOOK</h1>
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
        
        {currentUser.loggedIn ? (
          <button 
            className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            onClick={handleLogoutClick}
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5 text-gray-600" />
          </button>
        ) : (
          <button 
            className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            onClick={handleLoginClick}
            aria-label="Login"
          >
            <LogIn className="h-5 w-5 text-gray-600" />
          </button>
        )}
        
        {showCart && (
          <button 
            className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => {
              // Check if user is logged in before navigating to cart
              if (currentUser.loggedIn) {
                navigate("/keranjang");
              } else {
                toast({
                  title: "Login Diperlukan",
                  description: "Silakan login atau daftar untuk melihat keranjang Anda",
                });
                // Navigate to login page
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
