import { Truck, RotateCcw, Shield, Headphones } from "lucide-react";

const features = [
  { icon: Truck, label: "Free Shipping", desc: "On orders above ₹999" },
  { icon: RotateCcw, label: "Easy Returns", desc: "7-day return policy" },
  { icon: Shield, label: "Secure Payment", desc: "100% secure checkout" },
  { icon: Headphones, label: "24/7 Support", desc: "We're here to help" },
];

export default function FeaturesStrip() {
  return (
    <section className="border-y border-border bg-card py-8">
      <div className="container mx-auto grid grid-cols-2 gap-6 px-4 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.label} className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3">
              <f.icon size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-card-foreground">{f.label}</p>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
