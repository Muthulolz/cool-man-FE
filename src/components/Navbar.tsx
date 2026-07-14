import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User, Moon, Sun, Menu, X, Heart } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Shop", path: "/shop" },
  { label: "Customize", path: "/customize" },
  { label: "Offers", path: "/offers" },
  { label: "Track Order", path: "/track" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 glass-surface">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          COOL<span className="text-primary">MAN</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium uppercase tracking-widest transition-colors hover:text-primary ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 transition-colors hover:bg-secondary"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="rounded-full p-2 transition-colors hover:bg-secondary" aria-label="Search">
            <Search size={18} />
          </button>
          <Link to="/wishlist" className="rounded-full p-2 transition-colors hover:bg-secondary" aria-label="Wishlist">
            <Heart size={18} />
          </Link>
          <Link to="/cart" className="relative rounded-full p-2 transition-colors hover:bg-secondary" aria-label="Cart">
            <ShoppingBag size={18} />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {totalItems}
            </span>
          </Link>
          <Link to="/profile" className="hidden rounded-full p-2 transition-colors hover:bg-secondary sm:block" aria-label="Profile">
            <User size={18} />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full p-2 transition-colors hover:bg-secondary md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-widest transition-colors hover:bg-secondary ${
                    location.pathname === link.path
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
