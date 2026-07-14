import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import ShopPage from "./pages/ShopPage";
import CustomizePage from "./pages/CustomizePage";
import OffersPage from "./pages/OffersPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";

// Admin
import AdminLayout from "./admin/AdminLayout";
import DashboardPage from "./admin/pages/DashboardPage";
import AdminProductsPage from "./admin/pages/AdminProductsPage";
import AdminOrdersPage from "./admin/pages/AdminOrdersPage";
import AdminCustomersPage from "./admin/pages/AdminCustomersPage";
import AdminCouponsPage from "./admin/pages/AdminCouponsPage";
import AdminPaymentsPage from "./admin/pages/AdminPaymentsPage";
import AdminAnalyticsPage from "./admin/pages/AdminAnalyticsPage";
import AdminSettingsPage from "./admin/pages/AdminSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Admin routes — separate layout, no Navbar/Footer */}
            <Route path="/admin-dashboard" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="coupons" element={<AdminCouponsPage />} />
              <Route path="payments" element={<AdminPaymentsPage />} />
              <Route path="analytics" element={<AdminAnalyticsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Store routes */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <main className="min-h-screen">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/shop" element={<ShopPage />} />
                      <Route path="/customize" element={<CustomizePage />} />
                      <Route path="/offers" element={<OffersPage />} />
                      <Route path="/track" element={<TrackOrderPage />} />
                      <Route path="/product/:id" element={<ProductDetailPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
