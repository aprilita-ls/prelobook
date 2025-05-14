
import React, { useState } from "react";
import Header from "@/components/Header";
import BottomNavigationSeller from "@/components/BottomNavigationSeller";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatConversation {
  id: string;
  buyer: {
    name: string;
    avatar: string;
  };
  lastMessage: string;
  time: string;
  date: string;
  unread: number;
  regarding?: string;
}

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock chat conversations data
  const [conversations, setConversations] = useState<ChatConversation[]>([
    {
      id: "1",
      buyer: {
        name: "Ahmad Fadilah",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      },
      lastMessage: "Buku ini masih tersedia kah?",
      time: "10:33",
      date: "Hari ini",
      unread: 2,
      regarding: "Matematika Dasar SMA Kelas X",
    },
    {
      id: "2",
      buyer: {
        name: "Siti Aminah",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      },
      lastMessage: "Baik, saya akan segera bayar pesanannya",
      time: "09:20",
      date: "Hari ini",
      unread: 0,
    },
    {
      id: "3",
      buyer: {
        name: "Budi Santoso",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      },
      lastMessage: "Kapan pesanan dikirim ya?",
      time: "16:45",
      date: "Kemarin",
      unread: 1,
      regarding: "Paket Buku SMA IPA Kelas X",
    },
    {
      id: "4",
      buyer: {
        name: "Dewi Lestari",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
      },
      lastMessage: "Terima kasih, bukunya sudah sampai",
      time: "11:20",
      date: "25/04/2025",
      unread: 0,
    },
  ]);
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Chat Pembeli" showBack />
      
      <div className="px-4 py-3 sm:p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {conversations.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Belum ada percakapan</h3>
              <p className="mt-2 text-sm text-gray-500">
                Chat dengan pembeli akan muncul di sini
              </p>
            </div>
          ) : (
            conversations.map((chat, index) => (
              <React.Fragment key={chat.id}>
                <div 
                  className="flex items-center p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/seller/chat/${chat.id}`)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 mr-3 flex-shrink-0">
                      <AvatarImage src={chat.buyer.avatar} alt={chat.buyer.name} />
                      <AvatarFallback className="bg-prelobook-accent text-white">
                        {chat.buyer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {chat.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-prelobook-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-prelobook-primary truncate">{chat.buyer.name}</h3>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{chat.time}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className={`text-sm ${chat.unread > 0 ? 'font-semibold text-prelobook-primary' : 'text-gray-600'} truncate max-w-[calc(100%-40px)]`}>
                        {chat.lastMessage}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">{chat.date}</p>
                      {chat.regarding && (
                        <Badge variant="outline" className="text-xs">
                          Re: {chat.regarding}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                {index < conversations.length - 1 && <Separator />}
              </React.Fragment>
            ))
          )}
        </div>
      </div>
      
      <BottomNavigationSeller />
    </div>
  );
};

export default ChatPage;
