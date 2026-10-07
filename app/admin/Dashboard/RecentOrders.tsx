import { IOrder } from "@/@core/types/table.type";
import DynamicTable from "@/app/components/table/DynamicTable";

export default function RecentOrders() {
  const data: IOrder[] = [
    { _id: "1", id: "#001", user: "John", amount: "$120", status: "Paid" },
    { _id: "2", id: "#002", user: "Anuj", amount: "$250", status: "Pending" },
    { _id: "3", id: "#003", user: "Ravi", amount: "$80", status: "Paid" },
    { _id: "4", id: "#002", user: "Anuj", amount: "$250", status: "Pending" },
    { _id: "5", id: "#003", user: "Ravi", amount: "$80", status: "Paid" },
  ];

  const columns = [
    {
      key: "id",
      label: "Order ID",
    },
    {
      key: "user",
      label: "User",
    },
    {
      key: "amount",
      label: "Amount",
    },
    {
      key: "status",
      label: "Status",
      render: (row: IOrder) => (
        <span
          className={`text-sm font-medium ${row.status === "Paid" ? "text-green-600" : "text-yellow-600"
            }`}
        >
          {row.status}
        </span>
      ),
    },
  ];
  return (
    <DynamicTable
      columns={columns}
      data={data}
      loading={false}
      emptyMessage="No orders found."
      pagination
      itemsPerPage={5}
      headingText="Recent Orders"
      searchPlaceholder="Search orders..."
      isAction
      isEdit
      isDelete
      onEdit={(row:any) => console.log("Edit", row)}
      onDelete={(row:any) => console.log("Delete", row)}
    />
  );
}