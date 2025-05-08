
import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { MessageCircle, BookOpenCheck } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Mock exchange history data
const exchangeHistory = [
  {
    id: "1",
    date: "12 Mei 2025",
    bookTitle: "Harry Potter and the Philosopher's Stone",
    bookImage: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=400&h=600&fit=crop",
    partnerName: "Andi Wijaya",
    partnerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    status: "completed",
    chatId: "1"
  },
  {
    id: "2",
    date: "5 Mei 2025",
    bookTitle: "The Alchemist",
    bookImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    partnerName: "Budi Santoso",
    partnerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    status: "cancelled",
    chatId: "2"
  }
];

const ExchangeHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Selesai</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Menunggu</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Dibatalkan</Badge>;
      default:
        return <Badge>Tidak diketahui</Badge>;
    }
  };
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-16">
      <Header title="Riwayat Tukar" showBack={true} onBackClick={() => navigate("/tukar")} />
      
      <div className="p-4">
        {exchangeHistory.length > 0 ? (
          <div className="space-y-4">
            {exchangeHistory.map((exchange) => (
              <Card key={exchange.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <p className="text-sm text-gray-500">{exchange.date}</p>
                    {getStatusBadge(exchange.status)}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex gap-3 mb-3">
                      <img 
                        src={exchange.bookImage} 
                        alt={exchange.bookTitle} 
                        className="w-16 h-20 object-cover rounded-md" 
                      />
                      <div>
                        <h3 className="font-medium text-prelobook-primary">{exchange.bookTitle}</h3>
                        <div className="flex items-center gap-1 mt-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={exchange.partnerAvatar} />
                            <AvatarFallback>{exchange.partnerName[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-500">{exchange.partnerName}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center mt-3">
                      {exchange.status === "completed" && (
                        <div className="flex items-center text-green-600 text-sm">
                          <BookOpenCheck className="h-4 w-4 mr-1" />
                          <span>Penukaran Berhasil</span>
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-auto"
                        onClick={() => navigate(`/chat/${exchange.chatId}`)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <BookOpenCheck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700">Belum ada riwayat penukaran</h3>
            <p className="text-sm text-gray-500 mt-2 mb-6">
              Tukarkan buku Anda untuk melihat riwayat
            </p>
            <Button 
              onClick={() => navigate("/tukar")} 
              className="bg-prelobook-accent hover:bg-prelobook-accent/90"
            >
              Mulai Tukar Buku
            </Button>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ExchangeHistoryPage;
