import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="bg-foreground py-16 sm:py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-background sm:text-4xl">
            Join the <span className="text-gradient">Coolman</span> Club
          </h2>
          <p className="mx-auto mt-3 max-w-md text-background/60">
            Get early access to drops, exclusive offers, and 10% off your first order.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-8 flex max-w-md gap-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-background/20 bg-background/10 px-5 py-3 text-sm text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:shadow-glow"
            >
              <Send size={16} />
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
