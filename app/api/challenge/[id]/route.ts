import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { access } from "fs";

interface Params {
  id: string;
}

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { id } = await params;
  const token = session.accessToken;

  const res = await fetch(`${process.env.BACKEND_BASE_URL}/api/challenge/${id}` , {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })

  if (res.status == 404) {
      return Response.json({status: res.status,
      message: "Challenge not found"})
  }

  const data = await res.json()

  return Response.json(data, { status: res.status });
}
