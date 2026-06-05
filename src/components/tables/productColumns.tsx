import { createColumnHelper } from "@tanstack/react-table";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";

const col = createColumnHelper<Product>();

export const productColumns = [
  col.accessor("id", { header: "ID" }),
  col.accessor("name", { header: "Name" }),
  col.accessor("category", { header: "Category" }),
  col.accessor("sku", { header: "SKU" }),
  col.accessor("price", {
    header: "Price",
    cell: (info) => `$${Number(info.getValue()).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
  }),
  col.accessor("stock", {
    header: "Stock",
    cell: (info) => {
      const stock = info.getValue();
      return (
        <Badge variant={stock === 0 ? "destructive" : stock < 20 ? "warning" : "success"}>
          {stock}
        </Badge>
      );
    },
  }),
  col.accessor("status", {
    header: "Status",
    cell: (info) => (
      <Badge variant={info.getValue() === "active" ? "success" : "secondary"}>
        {info.getValue()}
      </Badge>
    ),
  }),
];
