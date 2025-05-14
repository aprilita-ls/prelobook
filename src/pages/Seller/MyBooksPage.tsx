
import React, { useState } from "react";
import Header from "@/components/Header";
import BottomNavigationSeller from "@/components/BottomNavigationSeller";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash, CheckCircle, BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  price: number;
  status: "available" | "sold" | "pending" | "blocked" | "deleted";
}

const MyBooksPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock books data
  const [books, setBooks] = useState<Book[]>([
    {
      id: "1",
      title: "Matematika Dasar SMA Kelas X",
      author: "Prof. Dr. Budiman",
      cover: "https://images.unsplash.com/photo-1576504473326-1841fb7cb0b0?w=500&auto=format",
      price: 75000,
      status: "available"
    },
    {
      id: "2",
      title: "Bumi Manusia",
      author: "Pramoedya Ananta Toer",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format",
      price: 85000,
      status: "pending"
    },
    {
      id: "3",
      title: "Fisika Dasar Universitas",
      author: "Dr. Andi Wijaya",
      cover: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=500&auto=format",
      price: 120000,
      status: "sold"
    },
    {
      id: "4",
      title: "Kimia Kelas X",
      author: "Drs. Surya Bintang",
      cover: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format",
      price: 65000,
      status: "available"
    },
  ]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Tersedia</Badge>;
      case "sold":
        return <Badge className="bg-blue-500">Terjual</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Menunggu Konfirmasi</Badge>;
      case "blocked":
        return <Badge className="bg-red-500">Diblokir</Badge>;
      case "deleted":
        return <Badge variant="outline" className="text-gray-500">Dihapus</Badge>;
      default:
        return <Badge className="bg-gray-500">Tidak Diketahui</Badge>;
    }
  };
  
  const handleMarkAsSold = (id: string) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, status: "sold" as const } : book
    ));
    toast({
      title: "Status Diperbarui",
      description: "Buku telah ditandai sebagai terjual",
    });
  };
  
  const handleDeleteBook = (id: string) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, status: "deleted" as const } : book
    ));
    toast({
      title: "Buku Dihapus",
      description: "Buku telah dihapus dari daftar Anda",
    });
  };
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Daftar Buku Saya" showBack />
      
      <div className="p-4 space-y-4">
        <Button 
          onClick={() => navigate("/seller/add-book")}
          className="w-full bg-prelobook-accent hover:bg-prelobook-accent/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Buku Baru
        </Button>
        
        {books.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Belum ada buku</h3>
            <p className="mt-2 text-sm text-gray-500">
              Mulai tambahkan buku Anda untuk dijual
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {books.map((book) => (
              <Card key={book.id} className="overflow-hidden border-none shadow-sm">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-24 h-32 flex-shrink-0">
                      <img 
                        src={book.cover} 
                        alt={book.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 p-3">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-prelobook-primary line-clamp-2">{book.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                      <p className="text-prelobook-accent font-semibold mt-1">
                        Rp {book.price.toLocaleString("id-ID")}
                      </p>
                      <div className="mt-2">
                        {getStatusBadge(book.status)}
                      </div>
                      
                      {/* Action buttons */}
                      {book.status !== "deleted" && book.status !== "sold" && (
                        <div className="flex gap-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 h-8"
                            onClick={() => navigate(`/seller/edit-book/${book.id}`)}
                          >
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </Button>
                          
                          {book.status === "available" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 h-8 border-blue-500 text-blue-500 hover:bg-blue-50"
                              onClick={() => handleMarkAsSold(book.id)}
                            >
                              <CheckCircle className="h-3.5 w-3.5 mr-1" />
                              Terjual
                            </Button>
                          )}
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 border-red-500 text-red-500 hover:bg-red-50"
                            onClick={() => handleDeleteBook(book.id)}
                          >
                            <Trash className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <BottomNavigationSeller />
    </div>
  );
};

export default MyBooksPage;
