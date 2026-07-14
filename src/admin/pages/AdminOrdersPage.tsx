import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { mockOrders, type Order } from "../data/mockData";
import { useToast } from "@/hooks/use-toast";

const statusColor: Record<string, string> = {
  delivered: "bg-badge-new/10 text-badge-new border-badge-new/20",
  shipped: "bg-primary/10 text-primary border-primary/20",
  confirmed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const paymentColor: Record<string, string> = {
  paid: "bg-badge-new/10 text-badge-new border-badge-new/20",
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  refunded: "bg-muted text-muted-foreground",
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Order | null>(null);
  const { toast } = useToast();

  const filtered = mockOrders.filter((o) =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusUpdate = (status: string) => {
    toast({ title: "Order updated", description: `Status changed to ${status}` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground text-sm">{mockOrders.length} total orders</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by order ID or customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.id}</TableCell>
                  <TableCell>{o.customer}</TableCell>
                  <TableCell className="max-w-[150px] truncate text-muted-foreground">{o.products.join(", ")}</TableCell>
                  <TableCell>₹{o.amount.toLocaleString()}</TableCell>
                  <TableCell><Badge variant="outline" className={paymentColor[o.paymentStatus]}>{o.paymentStatus}</Badge></TableCell>
                  <TableCell><Badge variant="outline" className={statusColor[o.orderStatus]}>{o.orderStatus}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{o.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelected(o)}>
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="font-display">Order {selected?.id}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Customer:</span><p className="font-medium">{selected.customer}</p></div>
                <div><span className="text-muted-foreground">Email:</span><p className="font-medium">{selected.email}</p></div>
                <div><span className="text-muted-foreground">Amount:</span><p className="font-medium">₹{selected.amount.toLocaleString()}</p></div>
                <div><span className="text-muted-foreground">Date:</span><p className="font-medium">{selected.date}</p></div>
              </div>
              <div><span className="text-sm text-muted-foreground">Products:</span><p className="text-sm font-medium">{selected.products.join(", ")}</p></div>
              <div><Label>Update Status</Label>
                <Select defaultValue={selected.orderStatus} onValueChange={handleStatusUpdate}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["pending", "confirmed", "shipped", "delivered", "cancelled"].map(s => (
                      <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Tracking ID</Label><Input defaultValue={selected.trackingId || ""} placeholder="Enter tracking ID" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-sm text-muted-foreground">Payment:</span>
                  <Badge variant="outline" className={paymentColor[selected.paymentStatus]}>{selected.paymentStatus}</Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
