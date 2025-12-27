import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { uploadProfilePicture } from "@/lib/User";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return new Response("No file uploaded", { status: 400 });
  }

  try {
    await uploadProfilePicture(session.accessToken, file);

    return Response.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/profile/edit`,
      303
    );
  } catch (err: any) {
    return new Response(err.message, { status: 500 });
  }
}
