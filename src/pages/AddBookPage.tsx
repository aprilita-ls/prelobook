
import React, { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddBookPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Buku berhasil ditambahkan",
        description: "Buku Anda telah ditambahkan ke koleksi yang dapat ditukar",
      });
      navigate("/my-books");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-16">
      <Header title="Tambah Buku" showBack={true} onBackClick={() => navigate("/tukar")} />
      
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-4">
              <Label htmlFor="cover" className="block mb-2">Foto Sampul</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Unggah foto sampul buku</p>
                <Input 
                  id="cover" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById("cover")?.click()}
                >
                  Pilih Foto
                </Button>
              </div>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="title" className="block mb-2">Judul Buku</Label>
              <Input 
                id="title" 
                placeholder="Masukkan judul buku" 
                required 
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="author" className="block mb-2">Penulis</Label>
              <Input 
                id="author" 
                placeholder="Masukkan nama penulis" 
                required 
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="condition" className="block mb-2">Kondisi</Label>
              <Select required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih kondisi buku" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baru">Baru</SelectItem>
                  <SelectItem value="Sangat Baik">Sangat Baik</SelectItem>
                  <SelectItem value="Baik">Baik</SelectItem>
                  <SelectItem value="Cukup Baik">Cukup Baik</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="description" className="block mb-2">Deskripsi</Label>
              <Textarea 
                id="description" 
                placeholder="Tambahkan deskripsi buku" 
                rows={4} 
                required 
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="price" className="block mb-2">Nilai Buku (Rp)</Label>
              <Input 
                id="price" 
                placeholder="Masukkan nilai estimasi buku" 
                type="number" 
                required 
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-prelobook-accent hover:bg-prelobook-accent/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Buku"}
          </Button>
        </form>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default AddBookPage;
