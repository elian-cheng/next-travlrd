"use client";

import { updateInvoiceStatus } from "@/app/lib/actions";
import { InvoiceStatusType } from "@/app/lib/definitions";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function InvoiceStatus({ status, id }: { status: InvoiceStatusType; id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusChange = async (status: InvoiceStatusType) => {
    if (!userId) return;
    await updateInvoiceStatus(id, status, userId);
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block text-left"
      ref={dropdownRef}>
      <span
        className={clsx("inline-flex cursor-pointer items-center rounded-full px-2 py-1 text-xs", {
          "bg-gray-100 text-gray-500": status === "pending",
          "bg-green-500 text-white": status === "paid",
          "bg-red-500 text-white": status === "canceled",
          "bg-yellow-500 text-white": status === "overdue"
        })}
        onClick={() => setIsOpen(!isOpen)}>
        {status === "pending" && (
          <>
            Pending
            <ClockIcon className="ml-1 w-4 text-gray-500" />
          </>
        )}
        {status === "paid" && (
          <>
            Paid
            <CheckIcon className="ml-1 w-4 text-white" />
          </>
        )}
        {status === "overdue" && (
          <>
            Overdue
            <ClockIcon className="ml-1 w-4 text-white" />
          </>
        )}
        {status === "canceled" && (
          <>
            Canceled
            <XMarkIcon className="ml-1 w-4 text-white" />
          </>
        )}
      </span>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {["pending", "paid", "overdue", "canceled"].map(
              stat =>
                stat !== status && (
                  <button
                    key={stat}
                    onClick={() => handleStatusChange(stat as InvoiceStatusType)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {stat.charAt(0).toUpperCase() + stat.slice(1)}
                  </button>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
