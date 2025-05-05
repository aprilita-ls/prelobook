
import React from "react";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MessageCircle } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

// Mock chat history data
const chatHistory = [
  {
    id: "1",
    name: "Customer Service",
    lastMessage: "Pesanan Anda sedang dalam proses pengiriman",
    time: "10:30",
    date: "Hari ini",
    unread: 2,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    id: "2",
    name: "Admin Prelobook",
    lastMessage: "Terima kasih telah berbelanja di Prelobook",
    time: "09:15",
    date: "Hari ini",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  {
    id: "3",
    name: "Layanan Pengiriman",
    lastMessage: "Paket Anda telah sampai di gudang kami",
    time: "16:45",
    date: "Kemarin",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: "4",
    name: "Penukaran Buku",
    lastMessage: "Permintaan penukaran buku Anda telah disetujui",
    time: "11:20",
    date: "25/04/2025",
    unread: 1,
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
  },
  {
    id: "5",
    name: "Promo Spesial",
    lastMessage: "Dapatkan diskon 15% untuk pembelian paket buku",
    time: "08:30",
    date: "23/04/2025",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1577202214328-c04b77cefb5d?w=400&h=400&fit=crop",
  },
];

const ChatHistoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-prelobook-background pb-16">
      <Header title="Riwayat Chat" />
      
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm">
          {chatHistory.map((chat, index) => (
            <React.Fragment key={chat.id}>
              <div className="flex items-center p-4">
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback className="bg-prelobook-accent text-white">
                    {chat.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-prelobook-primary">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-600 truncate max-w-[200px]">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-prelobook-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{chat.date}</p>
                </div>
              </div>
              {index < chatHistory.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
        
        {chatHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageCircle className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">Belum ada riwayat chat</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-2">
              Chat dengan layanan pelanggan kami untuk mendapatkan bantuan
            </p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ChatHistoryPage;
