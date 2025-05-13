
import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Store, CheckCircle2 } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { currentUser } from "@/data/mockData";

const StartSellingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartSelling = () => {
    if (!currentUser.loggedIn) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu untuk mulai berjualan",
      });
      navigate("/login");
      return;
    }
    
    toast({
      title: "Permintaan Diterima",
      description: "Akun penjual Anda sedang dalam proses pembuatan",
    });
    
    // In a real app, you would send a request to the backend to register the user as a seller
    setTimeout(() => {
      navigate("/add-book");
    }, 1500);
  };

  const benefits = [
    "Jangkau lebih banyak pembeli di seluruh Indonesia",
    "Kelola inventaris buku dengan mudah",
    "Dapatkan insight penjualan dan analitik",
    "Proses pengiriman yang terintegrasi",
    "Pembayaran aman dan terjamin",
  ];

  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Mulai Jual" showBack />
      
      <div className="p-4 space-y-6">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="bg-prelobook-accent/10 p-4 rounded-full mb-4">
            <Store className="h-12 w-12 text-prelobook-accent" />
          </div>
          <h1 className="text-2xl font-bold text-prelobook-primary">Jadi Penjual di PreloBook</h1>
          <p className="text-gray-600 mt-2 max-w-md">
            Jual buku bekas atau baru Anda dan dapatkan penghasilan tambahan dengan mudah
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Keuntungan Menjadi Penjual</CardTitle>
            <CardDescription>
              Dapatkan manfaat berikut saat bergabung sebagai penjual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleStartSelling} 
              className="w-full bg-prelobook-accent hover:bg-prelobook-accent/90"
            >
              Mulai Jual Sekarang
            </Button>
          </CardFooter>
        </Card>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-2">Cara Kerjanya</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Daftar sebagai penjual (gratis)</li>
            <li>Tambahkan buku yang ingin dijual</li>
            <li>Tentukan harga dan detail pengiriman</li>
            <li>Terima pesanan dan kirim buku</li>
            <li>Terima pembayaran ke rekening Anda</li>
          </ol>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default StartSellingPage;
