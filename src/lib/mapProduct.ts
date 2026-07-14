import type { Product } from "@/data/products";
import type { ApiProduct } from "@/lib/api";
import plainTshirtBlack from "@/assets/products/plain-tshirt-black.jpg";
import hoodieWhite from "@/assets/products/hoodie-white.jpg";
import trackPantsOlive from "@/assets/products/track-pants-olive.jpg";
import fullsleeveNavy from "@/assets/products/fullsleeve-navy.jpg";
import shortsGrey from "@/assets/products/shorts-grey.jpg";
import jerseyRed from "@/assets/products/jersey-red.jpg";
import customTshirt from "@/assets/products/custom-tshirt.jpg";

// The backend never returns product images in list responses (no get-by-id
// endpoint exists either), so real products are shown with a placeholder
// picked deterministically per product id.
const PLACEHOLDER_IMAGES = [
  plainTshirtBlack,
  hoodieWhite,
  trackPantsOlive,
  fullsleeveNavy,
  shortsGrey,
  jerseyRed,
  customTshirt,
];

export function placeholderFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return PLACEHOLDER_IMAGES[hash % PLACEHOLDER_IMAGES.length];
}

const NEW_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;

export function mapApiProduct(p: ApiProduct): Product {
  const hasDiscount = p.discountPrice != null && p.discountPrice < p.price;
  const isNew = Date.now() - new Date(p.createdAt).getTime() < NEW_WINDOW_MS;

  let badge: Product["badge"];
  if (hasDiscount) badge = "sale";
  else if (isNew) badge = "new";
  else if (p.rating >= 4.5) badge = "trending";

  return {
    id: p._id,
    name: p.name,
    price: hasDiscount ? p.discountPrice! : p.price,
    originalPrice: hasDiscount ? p.price : undefined,
    image: placeholderFor(p._id),
    rating: p.rating ?? 0,
    reviews: p.numReviews ?? 0,
    sizes: p.sizes ?? [],
    fabric: p.fabric || "—",
    category: p.category,
    badge,
    inStock: p.isActive && p.stock > 0,
  };
}
