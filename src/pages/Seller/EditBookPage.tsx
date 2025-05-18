
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import BottomNavigationSeller from "@/components/BottomNavigationSeller";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Camera } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

interface BookFormValues {
  title: string;
  author: string;
  publisher: string;
  publishYear: string;
  description: string;
  price: string;
  category: string;
  tags: string;
  quantity: string;
  isExchangeable: boolean;
}

const BookCategories = [
  { value: "academic", label: "Akademik" },
  { value: "novel", label: "Novel" },
  { value: "reference", label: "Referensi" },
  { value: "children", label: "Buku Anak" },
  { value: "religious", label: "Keagamaan" },
  { value: "selfhelp", label: "Pengembangan Diri" },
];

// Mock data for demo purposes
const mockBooks = [
  {
    id: "1",
    title: "Matematika Dasar SMA Kelas X",
    author: "Prof. Dr. Budiman",
    publisher: "Erlangga",
    publishYear: "2020",
    description: "Buku dalam kondisi sangat baik, seperti baru. Tidak ada coretan atau lipatan.",
    price: "75000",
    category: "academic",
    tags: "Matematika, SMA, Kelas X",
    quantity: "1",
    isExchangeable: true,
    images: ["https://images.unsplash.com/photo-1576504473326-1841fb7cb0b0?w=500&auto=format"],
  },
  {
    id: "2",
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    publisher: "Hasta Mitra",
    publishYear: "2005",
    description: "Kondisi baik, ada sedikit lipatan di ujung beberapa halaman",
    price: "85000",
    category: "novel",
    tags: "Novel, Sejarah, Indonesia",
    quantity: "1",
    isExchangeable: false,
    images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format"],
  }
];

const EditBookPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Find the book data from the mock data based on the ID
  const bookData = mockBooks.find(book => book.id === id);
  
  // Redirect to My Books if book not found
  if (!bookData) {
    React.useEffect(() => {
      toast({
        title: "Buku Tidak Ditemukan",
        description: "Buku yang anda cari tidak ditemukan",
        variant: "destructive",
      });
      navigate("/seller/my-books");
    }, [navigate]);
    return null;
  }
  
  const [images, setImages] = useState<string[]>(bookData.images || []);
  
  const form = useForm<BookFormValues>({
    defaultValues: {
      title: bookData.title || "",
      author: bookData.author || "",
      publisher: bookData.publisher || "",
      publishYear: bookData.publishYear || "",
      description: bookData.description || "",
      price: bookData.price || "",
      category: bookData.category || "",
      tags: bookData.tags || "",
      quantity: bookData.quantity || "1",
      isExchangeable: bookData.isExchangeable || false,
    },
  });
  
  const addImage = () => {
    // In a real app, this would open a file picker
    // For this demo, we'll just add a random placeholder image
    const placeholders = [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&auto=format",
      "https://images.unsplash.com/photo-1576504473326-1841fb7cb0b0?w=200&auto=format",
      "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=200&auto=format",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=200&auto=format",
    ];
    
    if (images.length < 5) {
      const newImage = placeholders[Math.floor(Math.random() * placeholders.length)];
      setImages([...images, newImage]);
    } else {
      toast({
        title: "Batas Maksimum",
        description: "Maksimal 5 gambar yang dapat diunggah",
        variant: "destructive",
      });
    }
  };
  
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  
  const onSubmit = (data: BookFormValues) => {
    if (images.length === 0) {
      toast({
        title: "Foto Diperlukan",
        description: "Harap unggah minimal 1 foto buku",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would normally send the data to an API
    console.log({ ...data, images, id });
    
    toast({
      title: "Buku Berhasil Diperbarui",
      description: `"${data.title}" telah berhasil diperbarui.`,
    });
    
    // Redirect to my books page after successful submission
    setTimeout(() => {
      navigate("/seller/my-books");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Edit Buku" showBack />
      
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Book Images */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-prelobook-primary mb-3">Foto Buku</h3>
              
              <div className="flex flex-wrap gap-2">
                {images.map((img, index) => (
                  <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden">
                    <img src={img} alt={`Book ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      onClick={() => removeImage(index)}
                    >
                      <Trash className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                
                {images.length < 5 && (
                  <button
                    type="button"
                    onClick={addImage}
                    className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center"
                  >
                    <div className="flex flex-col items-center">
                      <Camera className="h-6 w-6 text-gray-400" />
                      <span className="text-xs text-gray-500 mt-1">Tambah</span>
                    </div>
                  </button>
                )}
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Unggah hingga 5 foto. Foto pertama akan dijadikan sampul.
              </p>
            </div>
            
            {/* Basic Book Info */}
            <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
              <h3 className="font-medium text-prelobook-primary mb-3">Informasi Buku</h3>
              
              <FormField
                control={form.control}
                name="title"
                rules={{ required: "Judul buku wajib diisi" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Buku</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan judul buku" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="author"
                rules={{ required: "Nama penulis wajib diisi" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penulis</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama penulis" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="publisher"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Penerbit</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama penerbit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="publishYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tahun Terbit</FormLabel>
                      <FormControl>
                        <Input placeholder="2023" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                rules={{ required: "Deskripsi kondisi buku wajib diisi" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Kondisi</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Deskripsi singkat kondisi buku (mis. baru, bekas seperti baru, dll)" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Category and Price */}
            <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
              <h3 className="font-medium text-prelobook-primary mb-3">Kategori & Harga</h3>
              
              <FormField
                control={form.control}
                name="category"
                rules={{ required: "Kategori wajib dipilih" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BookCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Contoh: Matematika SMA, Fisika, Novel Sejarah" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Pisahkan dengan koma
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  rules={{ 
                    required: "Harga wajib diisi",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Hanya angka yang dibolehkan"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga (Rp)</FormLabel>
                      <FormControl>
                        <Input placeholder="50000" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="quantity"
                  rules={{ 
                    required: "Stok wajib diisi",
                    min: {
                      value: 1,
                      message: "Stok minimal 1"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stok</FormLabel>
                      <FormControl>
                        <Input placeholder="1" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="isExchangeable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Bersedia Untuk Barter</FormLabel>
                      <FormDescription>
                        Buku ini dapat ditukar dengan buku lain
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-prelobook-accent hover:bg-prelobook-accent/90 mt-6"
            >
              Simpan Perubahan
            </Button>
          </form>
        </Form>
      </div>
      
      <BottomNavigationSeller />
    </div>
  );
};

export default EditBookPage;
