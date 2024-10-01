import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const result = await db.sql`UPDATE invoices 
    SET STATUS = 'overdue'
    WHERE status = 'pending' 
    AND CURRENT_DATE > (date + INTERVAL '14 days')`;

    return NextResponse.json({ message: `${result.rowCount} invoices updated to 'overdue'` });
  } catch (error) {
    return NextResponse.json({ message: "Database Error: Failed to Update Invoice Status." });
  }
}
