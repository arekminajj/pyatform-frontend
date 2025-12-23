import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const res = await fetch(process.env.BACKEND_BASE_URL + "/api/solution", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.accessToken,
    },
    body: JSON.stringify(body),
    method: "POST",
  });

  const data = await res.json()
  if (res.status >= 200 && res.status <= 300) {
    return Response.json(data);
  }

  const otherRes = await res.json();
  return Response.json({ otherRes }, { status: 400 });
}
