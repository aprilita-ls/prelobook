
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { academicPackages, books } from "@/data/mockData";

interface Message {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: string;
}

interface ChatData {
  [key: string]: {
    id: string;
    name: string;
    avatar: string;
    messages: Message[];
  };
}

// Mock data for this specific conversation about stock/condition
const chatData: ChatData = {
  "1": {
    id: "1",
    name: "Customer Service",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    messages: [
      {
        id: "m1",
        text: "Halo, ada yang bisa kami bantu?",
        sender: "admin",
        timestamp: "10:30"
      },
      {
        id: "m2",
        text: "Saya ingin menanyakan stok buku Harry Potter and the Philosopher's Stone",
        sender: "user",
        timestamp: "10:31"
      },
      {
        id: "m3",
        text: "Apakah saat ini tersedia? Dan bagaimana kondisi bukunya?",
        sender: "user",
        timestamp: "10:31"
      },
      {
        id: "m4",
        text: "Saat ini buku tersebut masih tersedia 5 eksemplar. Kondisinya 90% seperti baru, hanya ada sedikit tanda pemakaian pada sudut cover.",
        sender: "admin",
        timestamp: "10:33"
      },
      {
        id: "m5",
        text: "Apakah Anda berminat untuk membelinya?",
        sender: "admin",
        timestamp: "10:33"
      },
      {
        id: "m6",
        text: "Ya, saya tertarik. Apakah bisa dikirim hari ini?",
        sender: "user",
        timestamp: "10:34"
      },
      {
        id: "m7",
        text: "Tentu, kami dapat memproses pesanan Anda hari ini dan mengirimkannya segera. Estimasi tiba 2-3 hari kerja tergantung lokasi Anda.",
        sender: "admin",
        timestamp: "10:36"
      }
    ]
  },
  "2": {
    id: "2",
    name: "Admin Prelobook",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    messages: [
      {
        id: "m1",
        text: "Selamat datang di Prelobook. Ada yang bisa kami bantu?",
        sender: "admin",
        timestamp: "09:15"
      },
      {
        id: "m2",
        text: "Saya mau tanya kondisi buku Laskar Pelangi yang preloved",
        sender: "user",
        timestamp: "09:16"
      },
      {
        id: "m3",
        text: "Untuk buku Laskar Pelangi preloved, kondisinya 85% baik. Terdapat beberapa halaman yang sudah sedikit menguning dan ada sedikit lipatan di cover belakang. Namun secara keseluruhan masih sangat layak baca.",
        sender: "admin",
        timestamp: "09:18"
      },
      {
        id: "m4",
        text: "Berapa harganya?",
        sender: "user",
        timestamp: "09:19"
      },
      {
        id: "m5",
        text: "Harganya Rp 45.000 sudah termasuk ongkos kirim untuk wilayah Jawa.",
        sender: "admin",
        timestamp: "09:20"
      }
    ]
  }
};

const ChatDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");
  const [chat, setChat] = useState<any>(null);
  
  useEffect(() => {
    if (!id) return;
    
    // Check if it's a predefined chat
    if (chatData[id]) {
      setChat(chatData[id]);
      return;
    }
    
    // Handle seller-book chats
    if (id.startsWith("seller-")) {
      const bookId = id.replace("seller-", "");
      const book = books.find(b => b.id === bookId);
      
      if (book) {
        // Create a new chat for this seller
        setChat({
          id: id,
          name: `Penjual ${book.title}`,
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
          messages: [
            {
              id: "m1",
              text: `Halo, saya tertarik dengan buku ${book.title}`,
              sender: "user",
              timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            },
            {
              id: "m2",
              text: `Terima kasih atas ketertarikan Anda pada buku ${book.title}. Ada yang ingin ditanyakan tentang buku ini?`,
              sender: "admin",
              timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            }
          ]
        });
        return;
      }
    }
    
    // Handle package chats
    if (id.startsWith("package-")) {
      const packageId = id.replace("package-", "");
      const academicPackage = academicPackages.find(p => p.id === packageId);
      
      if (academicPackage) {
        // Create a new chat for this package
        setChat({
          id: id,
          name: `Penjual Paket ${academicPackage.name}`,
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
          messages: [
            {
              id: "m1",
              text: `Halo, saya tertarik dengan paket ${academicPackage.name}`,
              sender: "user",
              timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            },
            {
              id: "m2",
              text: `Terima kasih atas ketertarikan Anda pada paket ${academicPackage.name}. Paket ini berisi ${academicPackage.bookCount} buku. Ada yang ingin ditanyakan?`,
              sender: "admin",
              timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            }
          ]
        });
        return;
      }
    }
    
    // If no match found, create a generic new chat
    setChat({
      id: id,
      name: "Penjual",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
      messages: [
        {
          id: "m1",
          text: "Halo, ada yang bisa saya bantu?",
          sender: "admin",
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
      ]
    });
  }, [id]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chat) return;
    
    // Add the user's message
    const userMessage = {
      id: `m${chat.messages.length + 1}`,
      text: newMessage,
      sender: "user" as const,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    // Add a response from the admin
    const adminMessage = {
      id: `m${chat.messages.length + 2}`,
      text: "Terima kasih atas pertanyaannya. Saya akan segera membantu Anda.",
      sender: "admin" as const,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setChat({
      ...chat,
      messages: [...chat.messages, userMessage, adminMessage]
    });
    
    setNewMessage("");
  };
  
  if (!chat) {
    return (
      <div className="min-h-screen bg-prelobook-background pb-16 flex items-center justify-center">
        <p>Chat tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-prelobook-background pb-16 flex flex-col">
      <Header 
        title={chat.name}
        showBack={true}
        onBackClick={() => navigate('/chat')}
        showNotification={false}
      />
      
      <ScrollArea className="flex-grow px-4 py-4">
        <div className="space-y-4">
          {chat.messages.map((message: Message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "admin" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback className="bg-prelobook-accent text-white">
                    {chat.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className="max-w-[70%]">
                <Card
                  className={`px-3 py-2 ${
                    message.sender === "user"
                      ? "bg-prelobook-accent text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </Card>
                <p className="text-xs text-gray-500 mt-1 px-1">
                  {message.timestamp}
                </p>
              </div>
              
              {message.sender === "user" && (
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarFallback className="bg-green-500 text-white">
                    Anda
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <form 
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-200 bg-white flex gap-2"
      >
        <Input
          type="text"
          placeholder="Ketik pesan..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">
          <Send className="h-5 w-5" />
          <span className="sr-only">Kirim</span>
        </Button>
      </form>
      
      <BottomNavigation />
    </div>
  );
};

export default ChatDetailPage;
