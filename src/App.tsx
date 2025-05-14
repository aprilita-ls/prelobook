
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import BookDetailPage from "./pages/BookDetailPage";
import PackagesPage from "./pages/PackagesPage";
import PackageDetailPage from "./pages/PackageDetailPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ExchangePage from "./pages/ExchangePage";
import TukarPage from "./pages/TukarPage";
import ChatHistoryPage from "./pages/ChatHistoryPage";
import ChatDetailPage from "./pages/ChatDetailPage";
import MyBooksPage from "./pages/MyBooksPage";
import AddBookPage from "./pages/AddBookPage";
import ExchangeHistoryPage from "./pages/ExchangeHistoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StartSellingPage from "./pages/StartSellingPage";
import NotFound from "./pages/NotFound";
import PersonalDataPage from "./pages/ProfilePages/PersonalDataPage";
import AddressPage from "./pages/ProfilePages/AddressPage";
import PurchaseHistoryPage from "./pages/ProfilePages/PurchaseHistoryPage";
import FavoritesPage from "./pages/ProfilePages/FavoritesPage";
import AccountSettingsPage from "./pages/ProfilePages/AccountSettingsPage";

// Seller Pages
import SellerDashboardPage from "./pages/Seller/DashboardPage";
import SellerMyBooksPage from "./pages/Seller/MyBooksPage";
import SellerAddBookPage from "./pages/Seller/AddBookPage";
import SellerPackagesPage from "./pages/Seller/PackagesPage";
import SellerExchangePage from "./pages/Seller/ExchangePage";
import SellerTransactionsPage from "./pages/Seller/TransactionsPage";
import SellerChatPage from "./pages/Seller/ChatPage";
import SellerProfilePage from "./pages/Seller/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/katalog" element={<CatalogPage />} />
          <Route path="/buku/:id" element={<BookDetailPage />} />
          <Route path="/paket" element={<PackagesPage />} />
          <Route path="/paket/:id" element={<PackageDetailPage />} />
          <Route path="/keranjang" element={<CartPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/tukar" element={<TukarPage />} />
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/my-books" element={<MyBooksPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/exchange-history" element={<ExchangeHistoryPage />} />
          <Route path="/chat" element={<ChatHistoryPage />} />
          <Route path="/chat/:id" element={<ChatDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/start-selling" element={<StartSellingPage />} />
          
          {/* Profile Sub-Pages */}
          <Route path="/profile/data" element={<PersonalDataPage />} />
          <Route path="/profile/address" element={<AddressPage />} />
          <Route path="/profile/orders" element={<PurchaseHistoryPage />} />
          <Route path="/profile/favorites" element={<FavoritesPage />} />
          <Route path="/profile/settings" element={<AccountSettingsPage />} />
          
          {/* Seller Pages */}
          <Route path="/seller/dashboard" element={<SellerDashboardPage />} />
          <Route path="/seller/my-books" element={<SellerMyBooksPage />} />
          <Route path="/seller/add-book" element={<SellerAddBookPage />} />
          <Route path="/seller/packages" element={<SellerPackagesPage />} />
          <Route path="/seller/exchange" element={<SellerExchangePage />} />
          <Route path="/seller/transactions" element={<SellerTransactionsPage />} />
          <Route path="/seller/chat" element={<SellerChatPage />} />
          <Route path="/seller/chat/:id" element={<ChatDetailPage />} />
          <Route path="/seller/profile" element={<SellerProfilePage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
