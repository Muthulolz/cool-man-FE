import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";

interface Props {
  title: string;
  subtitle?: string;
  products: Product[];
}

export default function ProductGrid({ title, subtitle, products }: Props) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
