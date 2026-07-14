import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Coolman streetwear"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="container relative mx-auto flex min-h-[85vh] items-center px-4">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            New Collection 2026
          </motion.span>

          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-background sm:text-6xl lg:text-7xl">
            Define Your
            <br />
            <span className="text-gradient">Street Style</span>
          </h1>

          <p className="mt-4 max-w-md text-base leading-relaxed text-background/70 sm:text-lg">
            Premium streetwear crafted for confidence and comfort. Explore our latest
            collection of hoodies, tees, and track pants.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-glow"
            >
              Shop Now
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/customize"
              className="rounded-xl border border-background/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-background transition-colors hover:bg-background/10"
            >
              Customize
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
