
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";
import Header from "@/components/Header";
import { currentUser } from "@/data/mockData";

// Define schema for login form
const formSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
  rememberMe: z.boolean().default(false),
});

const LoginPage = () => {
  const navigate = useNavigate();
  
  // Initialize form with validation schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // This is just a mock implementation. In a real app, you'd use Supabase or another auth provider.
    console.log("Login attempted with:", values);
    
    // Mock successful login
    // Update the currentUser object to reflect logged-in state
    currentUser.loggedIn = true;
    
    toast.success("Login berhasil", {
      description: `Selamat datang kembali, ${currentUser.name}!`,
    });
    
    // Redirect to homepage after successful login
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-prelobook-background">
      <Header title="Login" showBack showNotification={false} showCart={false} />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <LogIn className="mx-auto h-12 w-12 text-prelobook-accent mb-4" />
            <h1 className="text-2xl font-bold text-prelobook-primary mb-1">Login ke Prelobook</h1>
            <p className="text-gray-600">Masukkan data untuk melanjutkan</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="nama@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Masukkan password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        Ingat saya
                      </FormLabel>
                    </FormItem>
                  )}
                />
                
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-prelobook-accent"
                  type="button"
                >
                  Lupa Password?
                </Button>
              </div>
              
              <Button type="submit" className="w-full bg-prelobook-primary hover:bg-prelobook-primary/90">
                Masuk
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Belum punya akun?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-prelobook-accent"
                    type="button"
                    onClick={() => navigate("/register")}
                  >
                    Daftar
                  </Button>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
