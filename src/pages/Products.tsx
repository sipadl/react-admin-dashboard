import React from "react";
import { DataTable } from "@/components/ui/DataTable";
import { productColumns } from "@/components/tables/productColumns";
import { useProducts } from "@/hooks/useData";

export default function Products() {
  const [search, setSearch] = React.useState("");
  const { data, isLoading } = useProducts({ search: search || undefined, pageSize: 50 });

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Products</h1>
      <DataTable
        columns={productColumns}
        data={data?.data ?? []}
        isLoading={isLoading}
        searchPlaceholder="Search products by name or SKU…"
      />
    </div>
  );
}
