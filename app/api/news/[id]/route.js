import { NextResponse } from "next/server";
import { getPublicNewsById } from "@/lib/newsServer";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const item = await getPublicNewsById(id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: "News item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (err) {
    console.error("GET /api/news/[id] error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Failed to load news item",
      },
      { status: 500 }
    );
  }
}

