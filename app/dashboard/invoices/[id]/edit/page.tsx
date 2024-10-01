import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers, fetchAuditLogs } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import AuditLogs from "@/app/ui/invoices/auditLogs";

export const metadata: Metadata = {
  title: "Edit Invoice"
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers, auditLogs] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
    fetchAuditLogs(id)
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true
          }
        ]}
      />
      <Form
        invoice={invoice}
        customers={customers}
      />
      <AuditLogs
        logs={auditLogs}
        invoiceId={id}
      />
    </main>
  );
}
