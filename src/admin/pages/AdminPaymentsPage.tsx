import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockTransactions } from "../data/mockData";

const statusColor: Record<string, string> = {
  completed: "bg-badge-new/10 text-badge-new border-badge-new/20",
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  refunded: "bg-muted text-muted-foreground",
};

export default function AdminPaymentsPage() {
  const completed = mockTransactions.filter(t => t.status === "completed");
  const failed = mockTransactions.filter(t => t.status === "failed");
  const refunded = mockTransactions.filter(t => t.status === "refunded");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Payments</h1>
        <p className="text-muted-foreground text-sm">{mockTransactions.length} transactions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Completed</p><p className="text-2xl font-bold text-badge-new">{completed.length}</p><p className="text-xs text-muted-foreground">₹{completed.reduce((s,t) => s + t.amount, 0).toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Failed</p><p className="text-2xl font-bold text-destructive">{failed.length}</p><p className="text-xs text-muted-foreground">₹{failed.reduce((s,t) => s + t.amount, 0).toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Refunded</p><p className="text-2xl font-bold text-muted-foreground">{refunded.length}</p><p className="text-xs text-muted-foreground">₹{refunded.reduce((s,t) => s + t.amount, 0).toLocaleString()}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-display">All Transactions</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.id}</TableCell>
                  <TableCell className="text-muted-foreground">{t.orderId}</TableCell>
                  <TableCell>{t.customer}</TableCell>
                  <TableCell>₹{t.amount.toLocaleString()}</TableCell>
                  <TableCell>{t.method}</TableCell>
                  <TableCell><Badge variant="outline" className={statusColor[t.status]}>{t.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{t.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
