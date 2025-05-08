
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Book, Package, RefreshCw, User, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  {
    icon: Home,
    label: "Beranda",
    path: "/",
  },
  {
    icon: Book,
    label: "Katalog",
    path: "/katalog",
  },
  {
    icon: Package,
    label: "Paket",
    path: "/paket",
  },
  {
    icon: RefreshCw,
    label: "Tukar",
    path: "/tukar",
  },
  {
    icon: MessageCircle,
    label: "Chat",
    path: "/chat",
  },
  {
    icon: User,
    label: "Profil",
    path: "/profil",
  },
];

interface BottomNavigationProps {
  className?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ className }) => {
  const location = useLocation();
  const [activePath, setActivePath] = React.useState(location.pathname);

  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      {navItems.map((item) => {
        // Consider paths that start with the nav item path as active
        // For example, /chat/123 would make the Chat nav item active
        const isActive = activePath === item.path || activePath.startsWith(`${item.path}/`);
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center pt-1 pb-0.5 w-full"
          >
            <item.icon
              className={cn(
                "w-5 h-5 mb-1",
                isActive
                  ? "text-prelobook-accent"
                  : "text-gray-500"
              )}
            />
            <span
              className={cn(
                "text-[0.65rem] sm:text-xs",
                isActive
                  ? "text-prelobook-accent font-medium"
                  : "text-gray-500"
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
