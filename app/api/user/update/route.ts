import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { updateUserProfile } from "@/services/User";

import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { updateUserProfileDto } from "@/types/dto/updateUserProfileDto";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await req.formData();

  const dto: updateUserProfileDto = {
    bio: formData.get("bio")?.toString() || undefined,
  };

  const user = await updateUserProfile(session.accessToken, dto);

  return Response.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
    303
  );
}
