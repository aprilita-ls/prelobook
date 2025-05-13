
import React, { useState } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { currentUser } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, Camera } from "lucide-react";

const PersonalDataPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email || "user@example.com",
    phone: currentUser.phone || "08123456789",
    birthDate: currentUser.birthDate || "1990-01-01"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, update user data in the backend
    toast({
      title: "Profil Diperbarui",
      description: "Data diri Anda telah berhasil diperbarui."
    });
  };

  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Data Diri" showBack />
      
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-prelobook-accent">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-prelobook-accent rounded-full p-1 cursor-pointer">
                  <Camera className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            <CardTitle>Edit Profil</CardTitle>
            <CardDescription>Perbarui informasi data diri Anda</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthDate">Tanggal Lahir</Label>
                <div className="relative">
                  <Input 
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                  <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-prelobook-accent hover:bg-prelobook-accent/90"
              >
                Simpan Perubahan
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default PersonalDataPage;
