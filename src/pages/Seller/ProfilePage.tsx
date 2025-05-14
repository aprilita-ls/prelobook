
import React from "react";
import Header from "@/components/Header";
import BottomNavigationSeller from "@/components/BottomNavigationSeller";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  CreditCard, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Store,
  Camera
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { currentUser } from "@/data/mockData";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock seller data
  const sellerProfile = {
    storeName: "Buku Cerdas",
    bio: "Menjual berbagai macam buku pelajaran dan novel bekas berkualitas dengan harga terjangkau.",
    joinDate: "Mei 2024",
    phone: "081234567890",
    email: "penjual@example.com",
    address: "Jl. Merdeka No. 123, Jakarta Selatan, DKI Jakarta",
    bankAccount: {
      bank: "BCA",
      number: "1234567890",
      name: "Budi Wijaya"
    }
  };
  
  const menuItems = [
    {
      icon: User,
      label: "Data Diri",
      path: "/seller/profile/personal"
    },
    {
      icon: Store,
      label: "Informasi Toko",
      path: "/seller/profile/store"
    },
    {
      icon: MapPin,
      label: "Alamat Pengiriman",
      path: "/seller/profile/address"
    },
    {
      icon: CreditCard,
      label: "Rekening Bank",
      path: "/seller/profile/bank"
    },
    {
      icon: Settings,
      label: "Pengaturan Akun",
      path: "/seller/profile/settings"
    }
  ];
  
  const handleLogout = () => {
    toast({
      title: "Berhasil Keluar",
      description: "Anda telah keluar dari akun penjual",
    });
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Profil Penjual" showBack />
      
      <div className="p-4 space-y-4">
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-20 w-20 border-2 border-prelobook-accent">
                  <AvatarImage src={currentUser.avatar} alt={sellerProfile.storeName} />
                  <AvatarFallback>{sellerProfile.storeName.charAt(0)}</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-prelobook-accent rounded-full p-1">
                  <Camera className="h-4 w-4 text-white" />
                </button>
              </div>
              
              <div className="mt-3 text-center">
                <h2 className="text-xl font-bold text-prelobook-primary">
                  {sellerProfile.storeName}
                </h2>
                <p className="text-sm text-gray-600 mt-1 px-4">
                  {sellerProfile.bio}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Bergabung sejak {sellerProfile.joinDate}
                </p>
              </div>
              
              <Button
                variant="outline"
                className="mt-4 border-prelobook-accent text-prelobook-accent"
                onClick={() => navigate("/seller/profile/store")}
              >
                Edit Profil Toko
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="px-4 py-3">
              <h3 className="font-medium text-prelobook-primary">Informasi Kontak</h3>
            </div>
            
            <Separator />
            
            <div className="p-4 space-y-3">
              <div className="flex items-center">
                <div className="w-6 h-6 mr-3 flex-shrink-0 flex items-center justify-center">
                  <User className="h-5 w-5 text-prelobook-accent" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Nama Lengkap</p>
                  <p className="text-sm">{currentUser.name}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 mr-3 flex-shrink-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-prelobook-accent"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Nomor Telepon</p>
                  <p className="text-sm">{sellerProfile.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 mr-3 flex-shrink-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-prelobook-accent"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm">{sellerProfile.email}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="px-4 py-3">
              <h3 className="font-medium text-prelobook-primary">Menu</h3>
            </div>
            
            <Separator />
            
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
          </CardContent>
        </Card>
        
        <Button
          variant="outline"
          className="w-full border-red-500 text-red-500 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Keluar
        </Button>
      </div>
      
      <BottomNavigationSeller />
    </div>
  );
};

export default ProfilePage;
