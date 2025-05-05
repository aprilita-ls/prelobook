
export type BookCondition = 'Baru' | 'Sangat Baik' | 'Baik' | 'Cukup Baik';

export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  price: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  coverImage: string;
  category: string;
  condition: BookCondition;
  description: string;
  sellerId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Seller {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  avatar: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export const currentUser: User = {
  id: 'user1',
  name: 'Ahmad Fauzi',
  avatar: '/placeholder.svg',
};

export const sellers: Seller[] = [
  {
    id: 'seller1',
    name: 'Toko Buku Cahaya',
    rating: 4.8,
    reviewCount: 245,
    avatar: '/placeholder.svg',
  },
  {
    id: 'seller2',
    name: 'Book Haven',
    rating: 4.7,
    reviewCount: 189,
    avatar: '/placeholder.svg',
  },
  {
    id: 'seller3',
    name: 'Pustaka Ilmu',
    rating: 4.9,
    reviewCount: 320,
    avatar: '/placeholder.svg',
  },
];

export const categories: Category[] = [
  { id: 'cat1', name: 'Akademik', icon: 'graduation-cap' },
  { id: 'cat2', name: 'Novel', icon: 'book' },
  { id: 'cat3', name: 'Referensi', icon: 'bookmark' },
  { id: 'cat4', name: 'Anak', icon: 'baby' },
  { id: 'cat5', name: 'Biografi', icon: 'user' },
  { id: 'cat6', name: 'Bisnis', icon: 'briefcase' },
  { id: 'cat7', name: 'Agama', icon: 'book-open' },
  { id: 'cat8', name: 'Komputer', icon: 'laptop' },
];

export const books: Book[] = [
  {
    id: 'book1',
    title: 'Filsafat Ilmu',
    author: 'Prof. Dr. Ahmad Tafsir',
    publisher: 'Penerbit Rosda',
    year: 2020,
    price: 64000,
    discount: 15,
    rating: 4.7,
    reviewCount: 42,
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop',
    category: 'cat1', // Akademik
    condition: 'Sangat Baik',
    description: 'Buku ini memberikan pengantar komprehensif tentang filsafat ilmu yang sangat berguna untuk mahasiswa filsafat dan umum.',
    sellerId: 'seller1',
  },
  {
    id: 'book2',
    title: 'Pulang',
    author: 'Tere Liye',
    publisher: 'Republika',
    year: 2018,
    price: 55000,
    rating: 4.9,
    reviewCount: 124,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    category: 'cat2', // Novel
    condition: 'Baik',
    description: 'Novel terbaru dari Tere Liye yang mengisahkan perjalanan pulang seorang anak yang telah lama meninggalkan kampung halamannya.',
    sellerId: 'seller2',
  },
  {
    id: 'book3',
    title: 'Kamus Besar Bahasa Indonesia',
    author: 'Badan Pengembangan Bahasa',
    publisher: 'Balai Pustaka',
    year: 2022,
    price: 64500,
    discount: 10,
    rating: 4.5,
    reviewCount: 37,
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
    category: 'cat3', // Referensi
    condition: 'Baru',
    description: 'Edisi terbaru dari Kamus Besar Bahasa Indonesia yang lengkap dengan semua kata bahasa Indonesia yang dibakukan.',
    sellerId: 'seller3',
  },
  {
    id: 'book4',
    title: 'Pengantar Ekonomi Makro',
    author: 'Dr. Boediono',
    publisher: 'BPFE',
    year: 2019,
    price: 58000,
    rating: 4.6,
    reviewCount: 58,
    coverImage: 'https://images.unsplash.com/photo-1554494574-013f11b5a2d7?w=400&h=600&fit=crop',
    category: 'cat1', // Akademik
    condition: 'Sangat Baik',
    description: 'Buku pegangan utama mahasiswa ekonomi yang menjelaskan konsep-konsep dasar ekonomi makro.',
    sellerId: 'seller1',
  },
  {
    id: 'book5',
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    publisher: 'Bentang Pustaka',
    year: 2008,
    price: 45000,
    discount: 20,
    rating: 4.9,
    reviewCount: 215,
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop',
    category: 'cat2', // Novel
    condition: 'Baik',
    description: 'Novel inspiratif tentang perjuangan anak-anak Belitong untuk mendapatkan pendidikan yang layak.',
    sellerId: 'seller2',
  },
  {
    id: 'book6',
    title: 'Atlas Dunia',
    author: 'National Geographic',
    publisher: 'Gramedia',
    year: 2021,
    price: 64000,
    rating: 4.8,
    reviewCount: 29,
    coverImage: 'https://images.unsplash.com/photo-1569498908465-8d581aaf21e9?w=400&h=600&fit=crop',
    category: 'cat3', // Referensi
    condition: 'Baru',
    description: 'Atlas dunia lengkap dengan peta-peta terbaru dari seluruh negara di dunia.',
    sellerId: 'seller3',
  },
  {
    id: 'book7',
    title: 'Fisika Dasar',
    author: 'Dr. Ir. Sutrisno',
    publisher: 'Erlangga',
    year: 2017,
    price: 57000,
    rating: 4.4,
    reviewCount: 45,
    coverImage: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop',
    category: 'cat1', // Akademik
    condition: 'Baik',
    description: 'Buku teks fisika dasar untuk mahasiswa tahun pertama jurusan sains dan teknik.',
    sellerId: 'seller1',
  },
  {
    id: 'book8',
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    publisher: 'Lentera Dipantara',
    year: 2005,
    price: 52000,
    discount: 5,
    rating: 4.9,
    reviewCount: 182,
    coverImage: 'https://images.unsplash.com/photo-1603284569248-821525309698?w=400&h=600&fit=crop',
    category: 'cat2', // Novel
    condition: 'Cukup Baik',
    description: 'Novel sejarah Indonesia pada masa kolonial yang menceritakan kisah Minke dan Annelies.',
    sellerId: 'seller2',
  },
];

export interface AcademicPackage {
  id: string;
  name: string;
  price: number;
  discount: number;
  bookCount: number;
  category: string;
  coverImage: string;
  books: string[]; // Book IDs
}

export const academicPackages: AcademicPackage[] = [
  {
    id: 'package1',
    name: 'Paket SMA IPA Kelas 12',
    price: 64500,
    discount: 20,
    bookCount: 5,
    category: 'SMA',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
    books: ['book1', 'book4', 'book7'],
  },
  {
    id: 'package2',
    name: 'Paket Mahasiswa Ekonomi',
    price: 64000,
    discount: 15,
    bookCount: 4,
    category: 'Universitas',
    coverImage: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=400&h=300&fit=crop',
    books: ['book4', 'book1'],
  },
  {
    id: 'package3',
    name: 'Paket Referensi Bahasa',
    price: 63000,
    discount: 10,
    bookCount: 3,
    category: 'Referensi',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop',
    books: ['book3', 'book6'],
  },
];

export interface CartItem {
  bookId: string;
  quantity: number;
}

export const initialCartItems: CartItem[] = [];

export interface Promo {
  id: string;
  title: string;
  image: string;
  discount: number;
}

export const promos: Promo[] = [
  {
    id: 'promo1',
    title: 'Diskon 25% untuk Buku Akademik',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=400&fit=crop',
    discount: 25,
  },
  {
    id: 'promo2',
    title: 'Flash Sale Novel Bestseller',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=400&fit=crop',
    discount: 30,
  },
  {
    id: 'promo3',
    title: 'Beli 2 Gratis 1 untuk Buku Anak',
    image: 'https://images.unsplash.com/photo-1512903989752-467e6a5ae114?w=800&h=400&fit=crop',
    discount: 33,
  },
];
