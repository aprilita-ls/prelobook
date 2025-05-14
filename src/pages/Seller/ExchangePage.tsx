
import React, { useState } from "react";
import Header from "@/components/Header";
import BottomNavigationSeller from "@/components/BottomNavigationSeller";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Repeat, MessageSquare, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface ExchangeRequest {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  bookOffered: {
    title: string;
    cover: string;
    condition: string;
  };
  bookRequested: {
    title: string;
    cover: string;
  };
  status: "pending" | "accepted" | "rejected" | "completed";
  date: string;
}

const ExchangePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock exchange requests data
  const [exchangeRequests, setExchangeRequests] = useState<ExchangeRequest[]>([
    {
      id: "1",
      user: {
        name: "Ahmad Fadilah",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      },
      bookOffered: {
        title: "Laskar Pelangi",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&auto=format",
        condition: "Bekas seperti baru",
      },
      bookRequested: {
        title: "Bumi Manusia",
        cover: "https://images.unsplash.com/photo-1576504473326-1841fb7cb0b0?w=200&auto=format",
      },
      status: "pending",
      date: "12 Mei 2025",
    },
    {
      id: "2",
      user: {
        name: "Siti Aminah",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      },
      bookOffered: {
        title: "Filosofi Teras",
        cover: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=200&auto=format",
        condition: "Bekas, sedikit coretan",
      },
      bookRequested: {
        title: "Atomic Habits",
        cover: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=200&auto=format",
      },
      status: "accepted",
      date: "10 Mei 2025",
    },
    {
      id: "3",
      user: {
        name: "Budi Santoso",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      },
      bookOffered: {
        title: "Sejarah Indonesia Modern",
        cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&auto=format",
        condition: "Bekas, halaman lengkap",
      },
      bookRequested: {
        title: "Biografi Soekarno",
        cover: "https://images.unsplash.com/photo-1509266272358-7701da638078?w=200&auto=format",
      },
      status: "completed",
      date: "5 Mei 2025",
    },
  ]);
  
  const handleAcceptExchange = (id: string) => {
    setExchangeRequests(
      exchangeRequests.map(req => 
        req.id === id ? { ...req, status: "accepted" as const } : req
      )
    );
    toast({
      title: "Penukaran Diterima",
      description: "Anda telah menerima permintaan penukaran buku",
    });
  };
  
  const handleRejectExchange = (id: string) => {
    setExchangeRequests(
      exchangeRequests.map(req => 
        req.id === id ? { ...req, status: "rejected" as const } : req
      )
    );
    toast({
      title: "Penukaran Ditolak",
      description: "Anda telah menolak permintaan penukaran buku",
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Menunggu</Badge>;
      case "accepted":
        return <Badge className="bg-green-500">Diterima</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Ditolak</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Selesai</Badge>;
      default:
        return <Badge className="bg-gray-500">Tidak Diketahui</Badge>;
    }
  };
  
  // Filter requests by status
  const pendingRequests = exchangeRequests.filter(req => req.status === "pending");
  const historyRequests = exchangeRequests.filter(req => req.status !== "pending");
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Tukar Tambah" showBack />
      
      <div className="p-4">
        <Tabs defaultValue="incoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="incoming">Permintaan Masuk</TabsTrigger>
            <TabsTrigger value="history">Riwayat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="incoming" className="space-y-4">
            {pendingRequests.length === 0 ? (
              <div className="text-center py-12">
                <Repeat className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Belum ada permintaan</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Permintaan tukar tambah akan muncul di sini
                </p>
              </div>
            ) : (
              pendingRequests.map((request) => (
                <Card key={request.id} className="border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={request.user.avatar} alt={request.user.name} />
                          <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="font-medium text-prelobook-primary">{request.user.name}</p>
                          <p className="text-xs text-gray-500">{request.date}</p>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-center space-y-1">
                        <img 
                          src={request.bookOffered.cover} 
                          alt={request.bookOffered.title} 
                          className="w-24 h-32 object-cover mx-auto rounded-md border"
                        />
                        <p className="text-sm font-medium line-clamp-1">{request.bookOffered.title}</p>
                        <p className="text-xs text-gray-500">{request.bookOffered.condition}</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <Repeat className="h-6 w-6 text-prelobook-accent" />
                        <span className="text-xs mt-1">Tukar dengan</span>
                      </div>
                      
                      <div className="text-center space-y-1">
                        <img 
                          src={request.bookRequested.cover} 
                          alt={request.bookRequested.title} 
                          className="w-24 h-32 object-cover mx-auto rounded-md border"
                        />
                        <p className="text-sm font-medium line-clamp-1">{request.bookRequested.title}</p>
                        <p className="text-xs text-gray-500">Milik Anda</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline" 
                        className="border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleRejectExchange(request.id)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Tolak
                      </Button>
                      
                      <Button 
                        className="bg-prelobook-accent hover:bg-prelobook-accent/90"
                        onClick={() => handleAcceptExchange(request.id)}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Terima
                      </Button>
                    </div>
                    
                    <div className="mt-3 text-center">
                      <Button
                        variant="ghost" 
                        className="text-prelobook-primary text-sm"
                        onClick={() => navigate(`/seller/chat/${request.user.name.toLowerCase().replace(' ', '-')}`)}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat dengan Pembeli
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            {historyRequests.length === 0 ? (
              <div className="text-center py-12">
                <Repeat className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Belum ada riwayat</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Riwayat tukar tambah akan muncul di sini
                </p>
              </div>
            ) : (
              historyRequests.map((request) => (
                <Card key={request.id} className="border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={request.user.avatar} alt={request.user.name} />
                          <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="font-medium text-prelobook-primary">{request.user.name}</p>
                          <p className="text-xs text-gray-500">{request.date}</p>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-center space-y-1">
                        <img 
                          src={request.bookOffered.cover} 
                          alt={request.bookOffered.title} 
                          className="w-20 h-28 object-cover mx-auto rounded-md border opacity-80"
                        />
                        <p className="text-sm font-medium line-clamp-1">{request.bookOffered.title}</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <Repeat className="h-5 w-5 text-gray-400" />
                      </div>
                      
                      <div className="text-center space-y-1">
                        <img 
                          src={request.bookRequested.cover} 
                          alt={request.bookRequested.title} 
                          className="w-20 h-28 object-cover mx-auto rounded-md border opacity-80"
                        />
                        <p className="text-sm font-medium line-clamp-1">{request.bookRequested.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigationSeller />
    </div>
  );
};

export default ExchangePage;
