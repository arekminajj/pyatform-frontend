import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { User } from "@/types/User";
import { getUserProfile } from "@/services/User";

interface Props {
  params: { id: string };
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/api/auth/signin");
  }

  const user: User = await getUserProfile(session.accessToken, id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl max-w-2xl w-full p-8 flex flex-col items-center text-center">
        <div className="relative w-40 h-40 mb-6">
          <img
            src={user.profilePictureUrl ?? "/Default_pfp.jpg"}
            alt="Profile Picture"
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {user.email}
        </h1>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          {user.bio || "This user has no bio yet..."}
        </p>

        {session.user.email == user.email ? (
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              <a href="/profile/edit">Edit Profile</a>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
