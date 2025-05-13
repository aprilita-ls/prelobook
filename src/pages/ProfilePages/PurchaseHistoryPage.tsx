
import React, { useState } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, PackageIcon, TruckIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for purchase history
const mockOrders = [
  {
    id: "ORD-1001",
    date: "15 Mei 2023",
    items: [
      { id: 1, title: "The Great Gatsby", price: 75000, image: "https://source.unsplash.com/random/100x150?book" }
    ],
    total: 85000,
    status: "completed",
    trackingNumber: "JNE-12345678"
  },
  {
    id: "ORD-1002",
    date: "20 Mei 2023",
    items: [
      { id: 2, title: "To Kill a Mockingbird", price: 95000, image: "https://source.unsplash.com/random/100x150?novel" },
      { id: 3, title: "1984", price: 85000, image: "https://source.unsplash.com/random/100x150?fiction" }
    ],
    total: 190000,
    status: "shipped",
    trackingNumber: "JNE-87654321"
  },
  {
    id: "ORD-1003",
    date: "25 Mei 2023",
    items: [
      { id: 4, title: "Harry Potter Series", price: 450000, image: "https://source.unsplash.com/random/100x150?fantasy" }
    ],
    total: 460000,
    status: "processing",
    trackingNumber: null
  },
  {
    id: "ORD-1004",
    date: "28 Mei 2023",
    items: [
      { id: 5, title: "Lord of the Rings", price: 350000, image: "https://source.unsplash.com/random/100x150?adventure" }
    ],
    total: 360000,
    status: "cancelled",
    trackingNumber: null
  }
];

const PurchaseHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredOrders = activeTab === "all" 
    ? mockOrders 
    : mockOrders.filter(order => order.status === activeTab);

  const getStatusDetails = (status: string) => {
    switch (status) {
      case "processing":
        return {
          label: "Diproses",
          color: "bg-blue-100 text-blue-800",
          icon: <PackageIcon className="h-4 w-4" />
        };
      case "shipped":
        return {
          label: "Dikirim",
          color: "bg-amber-100 text-amber-800",
          icon: <TruckIcon className="h-4 w-4" />
        };
      case "completed":
        return {
          label: "Selesai",
          color: "bg-green-100 text-green-800",
          icon: <CheckCircleIcon className="h-4 w-4" />
        };
      case "cancelled":
        return {
          label: "Dibatalkan",
          color: "bg-red-100 text-red-800",
          icon: <XCircleIcon className="h-4 w-4" />
        };
      default:
        return {
          label: "Unknown",
          color: "bg-gray-100 text-gray-800",
          icon: null
        };
    }
  };

  const handleViewDetails = (orderId: string) => {
    // In a real app, navigate to order details page
    console.log(`Viewing details for order ${orderId}`);
  };

  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Riwayat Pembelian" showBack />
      
      <div className="p-4">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="processing">Diproses</TabsTrigger>
            <TabsTrigger value="shipped">Dikirim</TabsTrigger>
            <TabsTrigger value="completed">Selesai</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => {
                const statusDetails = getStatusDetails(order.status);
                
                return (
                  <Card key={order.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 border-b flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{order.id}</span>
                            <span className="text-gray-500 text-xs">{order.date}</span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`mt-1 ${statusDetails.color} border-0`}
                          >
                            <span className="flex items-center gap-1">
                              {statusDetails.icon}
                              {statusDetails.label}
                            </span>
                          </Badge>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(order.id)}
                        >
                          Detail <ArrowRightIcon className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                      
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center p-4 border-b">
                          <div className="w-16 h-20 overflow-hidden rounded mr-3">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-prelobook-accent font-medium">
                              Rp {item.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Total Pesanan</p>
                          <p className="font-semibold">
                            Rp {order.total.toLocaleString('id-ID')}
                          </p>
                        </div>
                        
                        {(order.status === "completed" || order.status === "shipped") && (
                          <Button size="sm" className="bg-prelobook-accent hover:bg-prelobook-accent/90">
                            Beli Lagi
                          </Button>
                        )}
                      </div>
                      
                      {order.trackingNumber && (
                        <div className="px-4 pb-4">
                          <p className="text-sm">
                            <span className="text-gray-500">No. Resi:</span> {order.trackingNumber}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-8">
                <PackageIcon className="mx-auto h-16 w-16 text-gray-300" />
                <p className="mt-4 text-gray-500">Tidak ada pesanan</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default PurchaseHistoryPage;
