
import React from "react";
import { Book } from "lucide-react";
import { AcademicPackage } from "@/data/mockData";
import { Link } from "react-router-dom";

interface AcademicPackageCardProps {
  package: AcademicPackage;
}

const AcademicPackageCard: React.FC<AcademicPackageCardProps> = ({ package: academicPackage }) => {
  const discountedPrice = 
    academicPackage.price - (academicPackage.price * academicPackage.discount) / 100;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/paket/${academicPackage.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={academicPackage.coverImage}
            alt={academicPackage.name}
            className="w-full h-36 object-cover"
          />
          <div className="absolute top-2 right-2 bg-prelobook-accent text-white text-xs px-2 py-1 rounded-full">
            -{academicPackage.discount}%
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 h-10">{academicPackage.name}</h3>
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
            <Book className="h-4 w-4" />
            <span>{academicPackage.bookCount} buku</span>
            <span className="mx-1">•</span>
            <span>{academicPackage.category}</span>
          </div>

          <div className="mt-2">
            <span className="text-xs text-gray-500 line-through mr-2">
              {formatPrice(academicPackage.price)}
            </span>
            <span className="font-semibold text-prelobook-accent">
              {formatPrice(discountedPrice)}
            </span>
          </div>

          <div className="mt-3 text-center py-2 bg-prelobook-accent bg-opacity-10 rounded text-prelobook-accent text-sm font-medium">
            Lihat Isi Paket
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AcademicPackageCard;
