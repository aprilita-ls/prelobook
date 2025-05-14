
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Book, 
  Package, 
  Repeat, 
  Truck, 
  MessageSquare, 
  User 
} from "lucide-react";

const BottomNavigationSeller: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath.startsWith(path);
  };

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/seller/dashboard",
    },
    {
      icon: Book,
      label: "Buku Saya",
      path: "/seller/my-books",
    },
    {
      icon: Repeat,
      label: "Tukar",
      path: "/seller/exchange",
    },
    {
      icon: Truck,
      label: "Transaksi",
      path: "/seller/transactions",
    },
    {
      icon: User,
      label: "Profil",
      path: "/seller/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center px-2 z-10">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full px-1",
            "transition-colors duration-200"
          )}
        >
          <item.icon
            className={cn(
              "h-5 w-5 mb-1",
              isActive(item.path) ? "text-prelobook-accent" : "text-gray-500"
            )}
          />
          <span
            className={cn(
              "text-[10px]",
              isActive(item.path)
                ? "font-medium text-prelobook-accent"
                : "text-gray-500"
            )}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigationSeller;
