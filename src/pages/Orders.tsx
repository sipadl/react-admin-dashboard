import React from "react";
import { DataTable } from "@/components/ui/DataTable";
import { orderColumns } from "@/components/tables/orderColumns";
import { useOrders } from "@/hooks/useData";

export default function Orders() {
  const [search, setSearch] = React.useState("");
  const { data, isLoading } = useOrders({ search: search || undefined, pageSize: 50 });

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Orders</h1>
      <DataTable
        columns={orderColumns}
        data={data?.data ?? []}
        isLoading={isLoading}
        searchPlaceholder="Search orders by customer or ID…"
      />
    </div>
  );
}
