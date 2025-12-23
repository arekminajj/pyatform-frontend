import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/types/User";
import { getCurrentUserProfile } from "@/services/User";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/api/auth/signin");
  }

  const user: User = await getCurrentUserProfile(session.accessToken);

  redirect(`/profile/${user.id}`);
}
