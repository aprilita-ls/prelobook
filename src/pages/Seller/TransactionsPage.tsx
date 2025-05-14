
import React, { useState } from "react";
import Header from "@/components/Header";
import BottomNavigationSeller from "@/components/BottomNavigationSeller";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Package, Truck, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface Transaction {
  id: string;
  buyer: {
    name: string;
    address: string;
  };
  items: {
    title: string;
    cover: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: "unpaid" | "paid" | "packed" | "shipped" | "completed" | "cancelled";
  date: string;
}

const TransactionsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock transactions data
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TRX-001",
      buyer: {
        name: "Ahmad Fadilah",
        address: "Jl. Merdeka No. 123, Jakarta Selatan, DKI Jakarta, 12345",
      },
      items: [
        {
          title: "Matematika Dasar SMA Kelas X",
          cover: "https://images.unsplash.com/photo-1576504473326-1841fb7cb0b0?w=200&auto=format",
          quantity: 1,
          price: 75000,
        }
      ],
      totalPrice: 75000,
      status: "paid",
      date: "12 Mei 2025",
    },
    {
      id: "TRX-002",
      buyer: {
        name: "Siti Aminah",
        address: "Jl. Pahlawan No. 45, Bandung, Jawa Barat, 40123",
      },
      items: [
        {
          title: "Bumi Manusia",
          cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&auto=format",
          quantity: 1,
          price: 85000,
        },
        {
          title: "Filosofi Teras",
          cover: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=200&auto=format",
          quantity: 1,
          price: 65000,
        }
      ],
      totalPrice: 150000,
      status: "shipped",
      date: "10 Mei 2025",
    },
    {
      id: "TRX-003",
      buyer: {
        name: "Budi Santoso",
        address: "Jl. Diponegoro No. 78, Surabaya, Jawa Timur, 60115",
      },
      items: [
        {
          title: "Paket Buku SMA IPA Kelas X",
          cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&auto=format",
          quantity: 1,
          price: 450000,
        }
      ],
      totalPrice: 450000,
      status: "completed",
      date: "5 Mei 2025",
    },
    {
      id: "TRX-004",
      buyer: {
        name: "Dewi Lestari",
        address: "Jl. Sudirman No. 56, Yogyakarta, DI Yogyakarta, 55123",
      },
      items: [
        {
          title: "Kimia Kelas X",
          cover: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=200&auto=format",
          quantity: 1,
          price: 65000,
        }
      ],
      totalPrice: 65000,
      status: "unpaid",
      date: "13 Mei 2025",
    }
  ]);
  
  const handleUpdateStatus = (id: string, newStatus: Transaction["status"]) => {
    setTransactions(
      transactions.map(tx => 
        tx.id === id ? { ...tx, status: newStatus } : tx
      )
    );
    
    const statusMessages = {
      packed: "Pesanan telah dikemas dan siap dikirim",
      shipped: "Pesanan telah dikirim",
      completed: "Pesanan telah selesai",
      cancelled: "Pesanan telah dibatalkan",
    };
    
    toast({
      title: "Status Diperbarui",
      description: statusMessages[newStatus as keyof typeof statusMessages] || "Status pesanan diperbarui",
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unpaid":
        return <Badge className="bg-yellow-500">Menunggu Pembayaran</Badge>;
      case "paid":
        return <Badge className="bg-blue-500">Dibayar</Badge>;
      case "packed":
        return <Badge className="bg-indigo-500">Dikemas</Badge>;
      case "shipped":
        return <Badge className="bg-purple-500">Dikirim</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Selesai</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Dibatalkan</Badge>;
      default:
        return <Badge className="bg-gray-500">Tidak Diketahui</Badge>;
    }
  };
  
  const getActionButtons = (transaction: Transaction) => {
    switch (transaction.status) {
      case "paid":
        return (
          <Button
            className="bg-prelobook-accent hover:bg-prelobook-accent/90 w-full"
            onClick={() => handleUpdateStatus(transaction.id, "packed")}
          >
            <Package className="mr-2 h-4 w-4" />
            Konfirmasi Pengepakan
          </Button>
        );
      case "packed":
        return (
          <Button
            className="bg-prelobook-accent hover:bg-prelobook-accent/90 w-full"
            onClick={() => handleUpdateStatus(transaction.id, "shipped")}
          >
            <Truck className="mr-2 h-4 w-4" />
            Konfirmasi Pengiriman
          </Button>
        );
      case "unpaid":
        return (
          <Button
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50 w-full"
            onClick={() => handleUpdateStatus(transaction.id, "cancelled")}
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            Batalkan Pesanan
          </Button>
        );
      default:
        return null;
    }
  };
  
  // Filter transactions by status for the tabs
  const allTransactions = transactions;
  const activeTransactions = transactions.filter(tx => 
    ["unpaid", "paid", "packed", "shipped"].includes(tx.status)
  );
  const completedTransactions = transactions.filter(tx => 
    ["completed", "cancelled"].includes(tx.status)
  );
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Transaksi" showBack />
      
      <div className="p-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="completed">Selesai</TabsTrigger>
          </TabsList>
          
          {[
            { value: "active", data: activeTransactions },
            { value: "all", data: allTransactions },
            { value: "completed", data: completedTransactions },
          ].map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="space-y-4">
              {tab.data.length === 0 ? (
                <div className="text-center py-12">
                  <Truck className="mx-auto h-12 w-12 text-gray-300" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Belum ada transaksi</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Transaksi akan muncul di sini saat ada pembelian
                  </p>
                </div>
              ) : (
                tab.data.map((transaction) => (
                  <Card key={transaction.id} className="border-none shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-prelobook-primary">{transaction.id}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                        {getStatusBadge(transaction.status)}
                      </div>
                      
                      <Separator className="my-3" />
                      
                      <div className="space-y-3">
                        {transaction.items.map((item, index) => (
                          <div key={index} className="flex space-x-3">
                            <img 
                              src={item.cover} 
                              alt={item.title} 
                              className="w-16 h-20 object-cover rounded-md border"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-prelobook-primary line-clamp-2">{item.title}</p>
                              <div className="flex justify-between mt-1">
                                <p className="text-sm text-gray-600">{item.quantity} x</p>
                                <p className="text-prelobook-accent font-medium">Rp {item.price.toLocaleString("id-ID")}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-3 border-t pt-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Total Harga:</p>
                          <p className="text-lg font-semibold text-prelobook-primary">Rp {transaction.totalPrice.toLocaleString("id-ID")}</p>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/seller/transaction/${transaction.id}`)}
                        >
                          Detail
                        </Button>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div>
                          <p className="text-sm font-medium">Pembeli:</p>
                          <p className="text-sm">{transaction.buyer.name}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Alamat:</p>
                          <p className="text-sm line-clamp-2">{transaction.buyer.address}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {getActionButtons(transaction)}
                          
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => navigate(`/seller/chat/${transaction.buyer.name.toLowerCase().replace(' ', '-')}`)}
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Hubungi Pembeli
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <BottomNavigationSeller />
    </div>
  );
};

export default TransactionsPage;
