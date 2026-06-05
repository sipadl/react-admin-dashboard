import { createColumnHelper } from "@tanstack/react-table";
import type { Order } from "@/types";
import { Badge } from "@/components/ui/Badge";

const col = createColumnHelper<Order>();

const statusVariant: Record<string, "success" | "warning" | "secondary" | "destructive"> = {
  delivered: "success",
  shipped: "success",
  processing: "warning",
  pending: "secondary",
  cancelled: "destructive",
};

export const orderColumns = [
  col.accessor("id", { header: "Order ID" }),
  col.accessor("customerName", { header: "Customer" }),
  col.accessor("total", {
    header: "Total",
    cell: (info) => `$${Number(info.getValue()).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
  }),
  col.accessor("items", {
    header: "Items",
    cell: (info) => info.getValue().length,
  }),
  col.accessor("paymentMethod", { header: "Payment" }),
  col.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      return <Badge variant={statusVariant[status] ?? "secondary"}>{status}</Badge>;
    },
  }),
  col.accessor("createdAt", { header: "Date" }),
];
