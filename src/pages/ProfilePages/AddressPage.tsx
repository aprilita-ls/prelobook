
import React, { useState } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Plus, Home, MapPin, Edit, Trash2 } from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Address {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

const AddressPage: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      label: "Rumah",
      recipient: "John Doe",
      phone: "08123456789",
      address: "Jl. Sudirman No. 123",
      city: "Jakarta",
      province: "DKI Jakarta",
      postalCode: "12345",
      isDefault: true,
    },
    {
      id: "2",
      label: "Kantor",
      recipient: "John Doe",
      phone: "087654321",
      address: "Jl. Gatot Subroto No. 456",
      city: "Jakarta",
      province: "DKI Jakarta",
      postalCode: "54321",
      isDefault: false,
    }
  ]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  
  const handleAddAddress = () => {
    setCurrentAddress(null);
    setIsOpen(true);
  };
  
  const handleEditAddress = (address: Address) => {
    setCurrentAddress(address);
    setIsOpen(true);
  };
  
  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(address => address.id !== id));
    toast({
      title: "Alamat Dihapus",
      description: "Alamat berhasil dihapus dari daftar Anda."
    });
  };
  
  const handleSaveAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const newAddress: Partial<Address> = {
      label: formData.get("label") as string,
      recipient: formData.get("recipient") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      province: formData.get("province") as string,
      postalCode: formData.get("postalCode") as string,
      isDefault: formData.get("isDefault") === "on"
    };
    
    if (currentAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => {
        if (addr.id === currentAddress.id) {
          return { ...addr, ...newAddress };
        }
        // If this is set as default, remove default from other addresses
        if (newAddress.isDefault && addr.id !== currentAddress.id) {
          return { ...addr, isDefault: false };
        }
        return addr;
      }));
      toast({
        title: "Alamat Diperbarui",
        description: "Alamat berhasil diperbarui."
      });
    } else {
      // Add new address
      const id = Date.now().toString();
      const newAddrWithId = { 
        ...newAddress, 
        id 
      } as Address;
      
      setAddresses(prev => {
        // If this is set as default, remove default from other addresses
        if (newAddress.isDefault) {
          return [...prev.map(a => ({ ...a, isDefault: false })), newAddrWithId];
        }
        return [...prev, newAddrWithId];
      });
      
      toast({
        title: "Alamat Ditambahkan",
        description: "Alamat baru berhasil ditambahkan."
      });
    }
    
    setIsOpen(false);
  };
  
  const setAsDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    
    toast({
      title: "Alamat Utama",
      description: "Alamat berhasil dijadikan alamat utama."
    });
  };

  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Alamat" showBack />
      
      <div className="p-4">
        <Button 
          onClick={handleAddAddress}
          className="w-full flex items-center justify-center mb-4 bg-prelobook-accent hover:bg-prelobook-accent/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Alamat Baru
        </Button>
        
        <div className="space-y-4">
          {addresses.map(address => (
            <Card key={address.id} className={address.isDefault ? "border-prelobook-accent" : ""}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {address.label === "Rumah" ? (
                      <Home className="h-4 w-4 mr-2 text-prelobook-accent" />
                    ) : (
                      <MapPin className="h-4 w-4 mr-2 text-prelobook-accent" />
                    )}
                    <span className="font-medium">{address.label}</span>
                  </div>
                  {address.isDefault && (
                    <span className="text-xs bg-prelobook-accent/10 text-prelobook-accent px-2 py-1 rounded-full">
                      Utama
                    </span>
                  )}
                </div>
                
                <div className="text-sm">
                  <p className="font-medium">{address.recipient}</p>
                  <p className="text-gray-600">{address.phone}</p>
                  <p className="text-gray-600">{address.address}</p>
                  <p className="text-gray-600">{address.city}, {address.province}, {address.postalCode}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditAddress(address)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-500 border-red-500"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Hapus
                    </Button>
                  </div>
                  
                  {!address.isDefault && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-prelobook-accent"
                      onClick={() => setAsDefault(address.id)}
                    >
                      Jadikan Alamat Utama
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentAddress ? "Edit Alamat" : "Tambah Alamat Baru"}</DialogTitle>
            <DialogDescription>
              {currentAddress ? "Edit detail alamat Anda di bawah ini." : "Tambahkan alamat baru untuk pengiriman."}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveAddress} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label">Label Alamat</Label>
              <Input 
                id="label"
                name="label"
                placeholder="Rumah, Kantor, dll."
                defaultValue={currentAddress?.label || ""}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipient">Nama Penerima</Label>
              <Input 
                id="recipient"
                name="recipient"
                defaultValue={currentAddress?.recipient || ""}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input 
                id="phone"
                name="phone"
                defaultValue={currentAddress?.phone || ""}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Alamat Lengkap</Label>
              <Textarea 
                id="address"
                name="address"
                defaultValue={currentAddress?.address || ""}
                rows={3}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Kota</Label>
                <Input 
                  id="city"
                  name="city"
                  defaultValue={currentAddress?.city || ""}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="province">Provinsi</Label>
                <Input 
                  id="province"
                  name="province"
                  defaultValue={currentAddress?.province || ""}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="postalCode">Kode Pos</Label>
              <Input 
                id="postalCode"
                name="postalCode"
                defaultValue={currentAddress?.postalCode || ""}
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                defaultChecked={currentAddress?.isDefault}
                className="rounded text-prelobook-accent focus:ring-prelobook-accent"
              />
              <Label htmlFor="isDefault">Jadikan sebagai alamat utama</Label>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="bg-prelobook-accent hover:bg-prelobook-accent/90">
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <BottomNavigation />
    </div>
  );
};

export default AddressPage;
