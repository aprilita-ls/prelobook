
import React from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/data/mockData";
import { LayoutDashboard, Book, ShoppingBag, MessageSquare, Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const DashboardPage: React.FC = () => {
  // Mock seller data
  const sellerData = {
    rating: 4.8,
    booksActive: 32,
    booksSold: 156,
    activeTransactions: 5,
    notifications: [
      {
        id: 1,
        message: "Pesanan baru untuk 'Matematika Dasar SMA'",
        time: "10 menit yang lalu",
        type: "order"
      },
      {
        id: 2,
        message: "Pembeli mengirim pesan tentang 'Novel Bumi Manusia'",
        time: "30 menit yang lalu",
        type: "chat"
      },
      {
        id: 3,
        message: "Pembayaran untuk 'Kimia Kelas X' sudah diterima",
        time: "2 jam yang lalu",
        type: "payment"
      }
    ]
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-5 w-5 text-green-500" />;
      case "chat":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "payment":
        return <ShoppingBag className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Dashboard Penjual" />
      
      <div className="p-4 space-y-4">
        {/* Profile Summary Card */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Avatar className="h-16 w-16 border-2 border-prelobook-accent">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-prelobook-primary">{currentUser.name}</h2>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm ml-1">{sellerData.rating} (156 ulasan)</span>
                </div>
                <span className="text-sm text-green-600 font-medium">Penjual Aktif</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-none shadow-sm">
            <CardContent className="p-3 flex flex-col items-center">
              <p className="text-2xl font-bold text-prelobook-accent">{sellerData.booksActive}</p>
              <p className="text-xs text-center text-prelobook-primary">Buku Aktif</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardContent className="p-3 flex flex-col items-center">
              <p className="text-2xl font-bold text-prelobook-accent">{sellerData.booksSold}</p>
              <p className="text-xs text-center text-prelobook-primary">Buku Terjual</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardContent className="p-3 flex flex-col items-center">
              <p className="text-2xl font-bold text-prelobook-accent">{sellerData.activeTransactions}</p>
              <p className="text-xs text-center text-prelobook-primary">Transaksi Aktif</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-prelobook-primary mb-3">Aktivitas Terbaru</h3>
            
            <div className="space-y-2">
              {sellerData.notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <div className="flex items-start py-1">
                    <div className="mt-0.5 mr-3">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                  {index < sellerData.notifications.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
            
            <div className="mt-3 text-center">
              <a href="#" className="text-sm text-prelobook-accent hover:underline">
                Lihat semua notifikasi
              </a>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-prelobook-primary mb-3">Tindakan Cepat</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <a href="/seller/add-book" className="p-3 bg-white border rounded-md text-center hover:bg-gray-50">
                <Book className="h-6 w-6 mx-auto text-prelobook-accent" />
                <p className="text-xs mt-1">Tambah Buku</p>
              </a>
              
              <a href="/seller/transactions" className="p-3 bg-white border rounded-md text-center hover:bg-gray-50">
                <ShoppingBag className="h-6 w-6 mx-auto text-prelobook-accent" />
                <p className="text-xs mt-1">Lihat Pesanan</p>
              </a>
              
              <a href="/seller/my-books" className="p-3 bg-white border rounded-md text-center hover:bg-gray-50">
                <LayoutDashboard className="h-6 w-6 mx-auto text-prelobook-accent" />
                <p className="text-xs mt-1">Kelola Buku</p>
              </a>
              
              <a href="/seller/chat" className="p-3 bg-white border rounded-md text-center hover:bg-gray-50">
                <MessageSquare className="h-6 w-6 mx-auto text-prelobook-accent" />
                <p className="text-xs mt-1">Pesan Pembeli</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <BottomNavigationSeller />
    </div>
  );
};

export default DashboardPage;
