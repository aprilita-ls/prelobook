
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

interface Message {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: string;
}

// Mock data for this specific conversation about stock/condition
const chatData = {
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
  
  // Default to the first chat if no ID is provided
  const chatId = id || "1";
  const chat = chatData[chatId as keyof typeof chatData];
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // In a real app, this would send the message to the server
    // For now, we'll just clear the input
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
        leftComponent={
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/chat')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        }
      />
      
      <ScrollArea className="flex-grow px-4 py-4">
        <div className="space-y-4">
          {chat.messages.map((message) => (
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
