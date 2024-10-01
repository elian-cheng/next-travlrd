"use client";

import { updateInvoiceStatus } from "@/app/lib/actions";
import { AuditLogsType } from "@/app/lib/definitions";
import { useSession } from "next-auth/react";

export default function AuditLogs({
  logs,
  invoiceId
}: {
  logs: AuditLogsType[];
  invoiceId: string;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleRestore = async (log: AuditLogsType) => {
    if (!userId) {
      console.log(`User ID not found.`);
      return;
    }
    await updateInvoiceStatus(invoiceId, log.old_status, userId);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Audit Logs</h2>
      <ul className="mt-4 space-y-6">
        {logs.map(log => (
          <li key={log.id}>
            <div>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">{log.old_status}</span> →{" "}
                <span className="font-semibold">{log.new_status}</span>
              </p>
              <p className="text-xs text-gray-500">User ID: {log.user_id}</p>
              <p className="text-xs text-gray-400">{log.timestamp.toString()}</p>
            </div>
            <button
              className="text-blue-600 hover:underline"
              onClick={() => handleRestore(log)}>
              Restore
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
