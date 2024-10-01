import { InvoiceStatusAllType } from "@/app/lib/definitions";
import Link from "next/link";

const tabs = [
  {
    name: "All",
    status: "all"
  },
  {
    name: "Pending",
    status: "pending"
  },
  {
    name: "Paid",
    status: "paid"
  },
  {
    name: "Overdue",
    status: "overdue"
  },
  {
    name: "Canceled",
    status: "canceled"
  }
];

export default function Tabs({ status }: { status: InvoiceStatusAllType }) {
  return (
    <nav className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {tabs.map(tab => (
          <li
            key={tab.name}
            className="me-2">
            <Link
              href={`?status=${tab.status}`}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                tab.status === status
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}>
              {tab.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
