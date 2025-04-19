
import React from "react";
import { academicPackages } from "@/data/mockData";
import Header from "@/components/Header";
import AcademicPackageCard from "@/components/AcademicPackageCard";
import BottomNavigation from "@/components/BottomNavigation";

const PackagesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-prelobook-background pb-16">
      <Header title="Paket Akademik" />
      
      <div className="p-4">
        <h2 className="text-lg font-semibold text-prelobook-primary mb-4">
          Paket Buku Akademik
        </h2>
        
        <p className="text-sm text-gray-600 mb-6">
          Dapatkan penawaran spesial dengan membeli buku secara paket. Lebih hemat hingga 30%!
        </p>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {academicPackages.map((pkg) => (
            <AcademicPackageCard key={pkg.id} package={pkg} />
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default PackagesPage;
