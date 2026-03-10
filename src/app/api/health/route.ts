import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    schema: process.env.DATABASE_SCHEMA,
  });
}
