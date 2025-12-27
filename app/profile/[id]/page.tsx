import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Challenge } from "@/types/Challange";
import { getAllChallenges } from "@/lib/Challenge";
import { getUserProfile } from "@/lib/User";
import Challenges from "@/components/Chllenges";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { User } from "@/types/User";

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
  const userChallenges: Challenge[] = await (await getAllChallenges(session.accessToken, user.id))
  .filter(c => c.isCompletedByUser === true)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
          <div className="flex flex-col items-center text-center">
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

            {session.user.email === user.email && (
              <a
                href="/profile/edit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Edit Profile
              </a>
            )}
          </div>

          <div className="mt-10 text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Completed challenges
            </h2>

            <Challenges challenges={userChallenges} />
          </div>
        </div>
      </div>
    </div>
  );
}
