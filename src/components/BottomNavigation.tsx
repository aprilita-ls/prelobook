
import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, Package, RefreshCw, User, MessageCircle } from "lucide-react";
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
    icon: Search,
    label: "Katalog",
    path: "/katalog",
  },
  {
    icon: Package,
    label: "Paket",
    path: "/paket",
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
  const [activePath, setActivePath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handleRouteChange = () => {
      setActivePath(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50",
        className
      )}
    >
      {navItems.map((item) => {
        const isActive = activePath === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center"
            onClick={() => setActivePath(item.path)}
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
                "text-xs",
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
