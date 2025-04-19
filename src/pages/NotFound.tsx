
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-prelobook-background p-4 text-center">
      <img 
        src="/placeholder.svg" 
        alt="Page not found" 
        className="w-32 h-32 mb-6 opacity-50"
      />
      <h1 className="text-3xl font-bold text-prelobook-primary mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-6">Halaman tidak ditemukan</p>
      <p className="text-gray-500 mb-8">
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Button 
        className="bg-prelobook-accent hover:bg-prelobook-accent/90"
        onClick={() => navigate("/")}
      >
        Kembali ke Beranda
      </Button>
    </div>
  );
};

export default NotFound;
