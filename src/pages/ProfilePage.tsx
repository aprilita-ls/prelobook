
import React from "react";
import { currentUser } from "@/data/mockData";
import Header from "@/components/Header";
import {
  User,
  MapPin,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    {
      icon: User,
      label: "Data Diri",
      path: "/profile/data",
    },
    {
      icon: MapPin,
      label: "Alamat",
      path: "/profile/address",
    },
    {
      icon: ShoppingBag,
      label: "Riwayat Pembelian",
      path: "/profile/orders",
    },
    {
      icon: Heart,
      label: "Favorit",
      path: "/profile/favorites",
    },
    {
      icon: Settings,
      label: "Pengaturan Akun",
      path: "/profile/settings",
    },
  ];
  
  const handleLogout = () => {
    // In a real app, this would handle the logout logic
    // For this demo, we'll just redirect to home
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Profil" />
      
      <div className="p-3 sm:p-4 space-y-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <Avatar className="h-16 w-16 border-2 border-prelobook-accent">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-prelobook-primary">
                {currentUser.name}
              </h2>
              <p className="text-sm text-gray-500">Pembeli</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button
              variant="outline"
              className="border-prelobook-accent text-prelobook-accent"
            >
              Edit Profil
            </Button>
            <Button className="bg-prelobook-accent hover:bg-prelobook-accent/90">
              Lihat Status Pesanan
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <React.Fragment key={item.path}>
              <div
                className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-center">
                  <item.icon className="h-5 w-5 mr-3 text-prelobook-accent" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              {index < menuItems.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
        
        <Button
          variant="outline"
          className="w-full border-red-500 text-red-500 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Keluar
        </Button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;
