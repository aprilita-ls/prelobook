
import React, { useState } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bell, 
  Lock, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Mail,
  MessageSquare,
  ShoppingBag
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const AccountSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    orderUpdates: true,
    promotions: true,
    newsletter: false
  });
  
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogout = () => {
    // In a real app, implement logout logic
    toast({
      title: "Berhasil Keluar",
      description: "Anda telah keluar dari akun Anda."
    });
    navigate("/");
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Konfirmasi Password Salah",
        description: "Password baru dan konfirmasi password tidak sama.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, implement password change logic
    toast({
      title: "Password Diperbarui",
      description: "Password Anda telah berhasil diperbarui."
    });
    
    setIsPasswordDialogOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-prelobook-background pb-24">
      <Header title="Pengaturan Akun" showBack />
      
      <div className="p-4 space-y-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Bell className="h-5 w-5 mr-2 text-prelobook-accent" />
              Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Notifikasi Email</Label>
              <Switch 
                id="email-notifications" 
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Notifikasi Push</Label>
              <Switch 
                id="push-notifications" 
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <Label htmlFor="order-notifications">
                <div className="flex items-center">
                  <ShoppingBag className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Pembaruan Pesanan</span>
                </div>
              </Label>
              <Switch 
                id="order-notifications" 
                checked={notifications.orderUpdates}
                onCheckedChange={(checked) => setNotifications({...notifications, orderUpdates: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="promo-notifications">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Promosi dan Diskon</span>
                </div>
              </Label>
              <Switch 
                id="promo-notifications" 
                checked={notifications.promotions}
                onCheckedChange={(checked) => setNotifications({...notifications, promotions: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="newsletter-notifications">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Newsletter Bulanan</span>
                </div>
              </Label>
              <Switch 
                id="newsletter-notifications" 
                checked={notifications.newsletter}
                onCheckedChange={(checked) => setNotifications({...notifications, newsletter: checked})}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Lock className="h-5 w-5 mr-2 text-prelobook-accent" />
              Keamanan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsPasswordDialogOpen(true)}
            >
              <div className="flex items-center">
                <div className="mr-3 h-9 w-9 rounded-full bg-prelobook-accent/10 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-prelobook-accent" />
                </div>
                <div>
                  <p className="font-medium">Ubah Password</p>
                  <p className="text-sm text-gray-500">Perbarui password akun Anda</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        {/* Help & Support */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-prelobook-accent" />
              Bantuan & Dukungan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Collapsible className="w-full">
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
                <div className="flex items-center">
                  <div className="mr-3 h-9 w-9 rounded-full bg-prelobook-accent/10 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-prelobook-accent" />
                  </div>
                  <p className="font-medium">FAQ</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-12 pr-4 pb-4 pt-2 space-y-3">
                <div className="border-b pb-3">
                  <h4 className="font-medium">Bagaimana cara melakukan pembelian?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Pilih buku yang ingin dibeli, tambahkan ke keranjang, lalu selesaikan proses checkout dengan memilih metode pembayaran.
                  </p>
                </div>
                <div className="border-b pb-3">
                  <h4 className="font-medium">Berapa lama pengiriman buku?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Umumnya 2-5 hari kerja, tergantung lokasi pengiriman Anda.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Bagaimana jika buku yang saya terima rusak?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Hubungi customer service kami dalam 24 jam setelah penerimaan untuk proses pengembalian atau penggantian.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="mr-3 h-9 w-9 rounded-full bg-prelobook-accent/10 flex items-center justify-center">
                  <HelpCircle className="h-5 w-5 text-prelobook-accent" />
                </div>
                <p className="font-medium">Hubungi Kami</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full border-red-500 text-red-500 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Keluar
        </Button>
      </div>
      
      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Password</DialogTitle>
            <DialogDescription>
              Masukkan password saat ini dan password baru Anda.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Password Saat Ini</Label>
              <Input 
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">Password Baru</Label>
              <Input 
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
              <Input 
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="bg-prelobook-accent hover:bg-prelobook-accent/90">
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <BottomNavigation />
    </div>
  );
};

export default AccountSettingsPage;
