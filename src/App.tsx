
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
import NotFound from "./pages/NotFound";

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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
