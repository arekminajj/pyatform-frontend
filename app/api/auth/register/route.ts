import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(process.env.BACKEND_BASE_URL + "/register", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    method: "POST",
  });

  if (res.status >= 200 && res.status <= 300) {
    return Response.json({
      status: res.status,
      message: "Account created successfully",
    });
  }

  const data = await res.json();
  return Response.json({ data }, { status: 400 });
}
