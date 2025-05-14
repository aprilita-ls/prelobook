
import React from "react";
import Header from "@/components/Header";
import BottomNavigationSeller from "@/components/BottomNavigationSeller";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash, Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface AcademicPackage {
  id: string;
  name: string;
  level: string;
  description: string;
  price: number;
  bookCount: number;
  image: string;
}

const PackagesPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock packages data
  const packages: AcademicPackage[] = [
    {
      id: "1",
      name: "Paket Buku SMA IPA Kelas X",
      level: "SMA / IPA",
      description: "Paket lengkap buku pelajaran IPA untuk SMA kelas X semester 1 & 2",
      price: 450000,
      bookCount: 6,
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format"
    },
    {
      id: "2",
      name: "Paket Novel Sastra Indonesia",
      level: "Umum",
      description: "Kumpulan novel karya sastrawan Indonesia terkemuka",
      price: 350000,
      bookCount: 4,
      image: "https://images.unsplash.com/photo-1509266272358-7701da638078?w=500&auto=format"
    },
    {
      id: "3",
      name: "Paket Kuliah Teknik Informatika Semester 1",
      level: "Universitas / Teknik Informatika",
      description: "Paket buku referensi untuk mahasiswa Teknik Informatika semester 1",
      price: 680000,
      bookCount: 5,
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&auto=format"
    }
  ];
  
  const handleDeletePackage = (id: string) => {
    toast({
      title: "Paket Dihapus",
      description: "Paket akademik berhasil dihapus",
    });
  };
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Paket Akademik" showBack />
      
      <div className="p-4 space-y-4">
        <Button 
          onClick={() => navigate("/seller/add-package")}
          className="w-full bg-prelobook-accent hover:bg-prelobook-accent/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Buat Paket Baru
        </Button>
        
        {packages.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Belum ada paket</h3>
            <p className="mt-2 text-sm text-gray-500">
              Buat paket akademik untuk meningkatkan penjualan
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden border-none shadow-sm">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-24 h-32 flex-shrink-0">
                      <img 
                        src={pkg.image} 
                        alt={pkg.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 p-3">
                      <div className="flex flex-col">
                        <h3 className="font-medium text-prelobook-primary line-clamp-2">{pkg.name}</h3>
                        <Badge className="self-start mt-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
                          {pkg.level}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{pkg.description}</p>
                        <p className="text-prelobook-accent font-semibold mt-1">
                          Rp {pkg.price.toLocaleString("id-ID")}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {pkg.bookCount} buku dalam paket
                        </p>
                        
                        {/* Action buttons */}
                        <div className="flex gap-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 h-8"
                            onClick={() => navigate(`/seller/edit-package/${pkg.id}`)}
                          >
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 border-red-500 text-red-500 hover:bg-red-50"
                            onClick={() => handleDeletePackage(pkg.id)}
                          >
                            <Trash className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
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

export default PackagesPage;
