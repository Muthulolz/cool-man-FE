import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Truck, CheckCircle2, MapPin, Clock, Box } from "lucide-react";

type OrderStatus = "placed" | "confirmed" | "shipped" | "out_for_delivery" | "delivered";

interface OrderInfo {
  id: string;
  product: string;
  status: OrderStatus;
  date: string;
  estimatedDelivery: string;
  updates: { status: string; date: string; description: string }[];
}

const mockOrders: Record<string, OrderInfo> = {
  "CM-2026-7891": {
    id: "CM-2026-7891",
    product: "Essential Black Tee × 2, Cloud White Hoodie",
    status: "shipped",
    date: "Feb 18, 2026",
    estimatedDelivery: "Feb 25, 2026",
    updates: [
      { status: "Order Placed", date: "Feb 18, 10:30 AM", description: "Your order has been placed successfully." },
      { status: "Confirmed", date: "Feb 18, 11:00 AM", description: "Payment confirmed. Preparing your order." },
      { status: "Shipped", date: "Feb 19, 4:15 PM", description: "Package picked up by courier. Tracking: DTDC-98765" },
    ],
  },
  "CM-2026-4520": {
    id: "CM-2026-4520",
    product: "Olive Jogger Pants",
    status: "delivered",
    date: "Feb 10, 2026",
    estimatedDelivery: "Feb 16, 2026",
    updates: [
      { status: "Order Placed", date: "Feb 10, 2:00 PM", description: "Your order has been placed." },
      { status: "Confirmed", date: "Feb 10, 2:30 PM", description: "Payment confirmed." },
      { status: "Shipped", date: "Feb 11, 10:00 AM", description: "Shipped via BlueDart." },
      { status: "Out for Delivery", date: "Feb 15, 8:00 AM", description: "Out for delivery today." },
      { status: "Delivered", date: "Feb 15, 1:30 PM", description: "Delivered to your address." },
    ],
  },
};

const steps: { key: OrderStatus; label: string; icon: React.ElementType }[] = [
  { key: "placed", label: "Placed", icon: Box },
  { key: "confirmed", label: "Confirmed", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "out_for_delivery", label: "Out for Delivery", icon: MapPin },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

const statusIndex: Record<OrderStatus, number> = {
  placed: 0,
  confirmed: 1,
  shipped: 2,
  out_for_delivery: 3,
  delivered: 4,
};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [error, setError] = useState("");

  const handleTrack = () => {
    const trimmed = orderId.trim().toUpperCase();
    if (mockOrders[trimmed]) {
      setOrder(mockOrders[trimmed]);
      setError("");
    } else {
      setOrder(null);
      setError("Order not found. Try CM-2026-7891 or CM-2026-4520");
    }
  };

  const activeStep = order ? statusIndex[order.status] : -1;

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          📦 Track Your Order
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enter your order ID to see real-time status updates.
        </p>

        {/* Search */}
        <div className="mt-8 flex gap-2">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="e.g. CM-2026-7891"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              className="w-full rounded-xl border border-border bg-card py-3.5 pl-11 pr-4 text-sm font-medium text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleTrack}
            className="rounded-xl bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-glow"
          >
            Track
          </motion.button>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm text-destructive"
          >
            {error}
          </motion.p>
        )}
      </motion.div>

      {/* Order Result */}
      <AnimatePresence>
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-auto mt-10 max-w-2xl"
          >
            {/* Order Info Card */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Order ID</p>
                  <p className="font-display text-lg font-bold">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Estimated Delivery</p>
                  <p className="font-display text-lg font-bold text-primary">{order.estimatedDelivery}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={14} />
                Ordered on {order.date}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{order.product}</p>
            </div>

            {/* Progress Steps */}
            <div className="mt-8 flex items-center justify-between px-2">
              {steps.map((step, i) => {
                const isActive = i <= activeStep;
                const Icon = step.icon;
                return (
                  <div key={step.key} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: isActive ? 1 : 0.8 }}
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        <Icon size={18} />
                      </motion.div>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`mx-1 h-0.5 flex-1 rounded-full transition-colors ${
                        i < activeStep ? "bg-primary" : "bg-border"
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Timeline */}
            <div className="mt-10">
              <h3 className="mb-4 font-display text-lg font-bold">Activity Log</h3>
              <div className="space-y-0">
                {order.updates.map((update, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`h-3 w-3 rounded-full ${
                        i === order.updates.length - 1 ? "bg-primary shadow-glow" : "bg-border"
                      }`} />
                      {i < order.updates.length - 1 && <div className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="pb-6">
                      <p className="text-sm font-bold">{update.status}</p>
                      <p className="text-xs text-muted-foreground">{update.date}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{update.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
