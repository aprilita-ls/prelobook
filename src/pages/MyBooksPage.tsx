
import React, { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/BookCard";
import { books } from "@/data/mockData";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MyBooksPage: React.FC = () => {
  const navigate = useNavigate();
  
  // For demo purposes, showing a subset of books as "my books"
  const myBooks = books.slice(0, 4);
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-16">
      <Header title="Buku Saya" showBack={true} onBackClick={() => navigate("/tukar")} />
      
      <div className="p-4">
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available">Tersedia Untuk Ditukar</TabsTrigger>
            <TabsTrigger value="exchanged">Sudah Ditukar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available" className="mt-4">
            {myBooks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Belum ada buku yang tersedia untuk ditukar</p>
                <Button 
                  onClick={() => navigate("/add-book")} 
                  className="bg-prelobook-accent hover:bg-prelobook-accent/90"
                >
                  Tambah Buku
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {myBooks.map((book) => (
                  <BookCard key={book.id} book={book}>
                    <Button
                      className="w-full mt-3 bg-prelobook-accent hover:bg-prelobook-accent/90"
                      size="sm"
                      onClick={() => navigate(`/chat/1`)}
                    >
                      Chat Peminat
                    </Button>
                  </BookCard>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="exchanged" className="mt-4">
            <div className="text-center py-12">
              <p className="text-gray-500">Belum ada buku yang sudah ditukar</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default MyBooksPage;
