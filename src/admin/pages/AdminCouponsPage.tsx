import { useState } from "react";
import { Plus, Percent, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCoupons } from "../data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function AdminCouponsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Coupons</h1>
          <p className="text-muted-foreground text-sm">{mockCoupons.length} coupons</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Create Coupon</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Create Coupon</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div><Label>Coupon Code</Label><Input placeholder="SUMMER25" /></div>
              <div><Label>Discount Type</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Discount Value</Label><Input type="number" placeholder="20" /></div>
              <div><Label>Expiry Date</Label><Input type="date" /></div>
              <div><Label>Usage Limit</Label><Input type="number" placeholder="100" /></div>
              <div className="flex items-center gap-2"><Switch defaultChecked /><Label>Active</Label></div>
              <Button onClick={() => { setDialogOpen(false); toast({ title: "Coupon created" }); }} className="w-full">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCoupons.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono font-bold">{c.code}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1">
                      {c.discountType === "percentage" ? <Percent className="h-3 w-3" /> : <DollarSign className="h-3 w-3" />}
                      {c.discountType}
                    </Badge>
                  </TableCell>
                  <TableCell>{c.discountType === "percentage" ? `${c.discountValue}%` : `₹${c.discountValue}`}</TableCell>
                  <TableCell className="text-muted-foreground">{c.expiryDate}</TableCell>
                  <TableCell>{c.usedCount}/{c.usageLimit}</TableCell>
                  <TableCell><Switch defaultChecked={c.active} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
