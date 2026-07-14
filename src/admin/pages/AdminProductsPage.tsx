import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdminProducts } from "../hooks/useAdminProducts";
import { useToast } from "@/hooks/use-toast";

const emptyForm = {
  name: "",
  type: "",
  category: "",
  description: "",
  price: "",
  discountPrice: "",
  stock: "",
  fabric: "",
  sizes: "",
  colors: "",
  isActive: true,
  image: null as File | null,
};

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const { toast } = useToast();
  const { products, isLoading, isError, createProduct, isCreating, toggleStatus, deleteProduct } =
    useAdminProducts();

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    if (!form.name || !form.type || !form.price || !form.stock) {
      toast({ title: "Missing fields", description: "Name, type, price and stock are required.", variant: "destructive" });
      return;
    }
    try {
      await createProduct({
        name: form.name,
        type: form.type,
        category: form.category,
        description: form.description || undefined,
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
        stock: Number(form.stock),
        fabric: form.fabric || undefined,
        sizes: form.sizes || undefined,
        colors: form.colors || undefined,
        isActive: form.isActive,
        image: form.image,
      });
      toast({ title: "Product saved", description: "Product has been created successfully." });
      setForm(emptyForm);
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: "Failed to save product",
        description: error instanceof Error ? error.message : "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (id: string, name: string) => {
    deleteProduct(id);
    toast({ title: "Product deleted", description: `${name} has been removed.`, variant: "destructive" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground text-sm">{products.length} products</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setForm(emptyForm); }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display">Add Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div><Label>Product Name</Label><Input placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Type</Label><Input placeholder="e.g. T-Shirt" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} /></div>
                <div><Label>Category</Label><Input placeholder="e.g. T-Shirts" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
              </div>
              <div><Label>Description</Label><Textarea placeholder="Product description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Price (₹)</Label><Input type="number" placeholder="999" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
                <div><Label>Discount Price (₹)</Label><Input type="number" placeholder="799" value={form.discountPrice} onChange={(e) => setForm({ ...form, discountPrice: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Stock Quantity</Label><Input type="number" placeholder="50" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></div>
                <div><Label>Fabric Type</Label><Input placeholder="100% Cotton" value={form.fabric} onChange={(e) => setForm({ ...form, fabric: e.target.value })} /></div>
              </div>
              <div><Label>Sizes (comma separated)</Label><Input placeholder="S, M, L, XL" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} /></div>
              <div><Label>Colors (comma separated)</Label><Input placeholder="Black, White, Navy" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} /></div>
              <div><Label>Product Image</Label><Input type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files?.[0] ?? null })} /></div>
              <div className="flex items-center gap-2">
                <Switch checked={form.isActive} onCheckedChange={(checked) => setForm({ ...form, isActive: checked })} />
                <Label>Active</Label>
              </div>
              <Button onClick={handleSave} disabled={isCreating} className="w-full">
                {isCreating ? "Saving…" : "Save Product"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="py-10 text-center text-sm text-muted-foreground">Loading products…</p>
          ) : isError ? (
            <p className="py-10 text-center text-sm text-muted-foreground">Couldn't load products.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="h-10 w-10 rounded-md object-cover" />
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{p.category}</TableCell>
                    <TableCell>₹{p.discountPrice ?? p.price}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={p.stock < 15 ? "border-destructive/30 text-destructive" : "border-badge-new/30 text-badge-new"}>
                        {p.stock}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Switch checked={p.active} onCheckedChange={(checked) => toggleStatus({ id: p.id, isActive: checked })} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Editing not yet supported"><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(p.id, p.name)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
