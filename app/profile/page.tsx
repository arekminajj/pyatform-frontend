import { User } from "@/types/User";
import { getCurrentUserProfile } from "@/lib/User";
import { auth } from "@/auth";

import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.accessToken) {
    redirect("/api/auth/signin");
  }

  const user: User = await getCurrentUserProfile(session.accessToken);

  redirect(`/profile/${user.id}`);
}
