import { UserRanking } from "@/types/UserRanking";
import { getUserRanking } from "@/lib/User";
import { auth } from "@/auth";

import { redirect } from "next/navigation";

export default async function RankingPage() {
  const session = await auth();

  if (!session?.accessToken) {
    redirect("/api/auth/signin");
  }

  const ranking: UserRanking[] = await getUserRanking(session.accessToken);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">Ranking</h1>

        <div className="space-y-4">
          {ranking.map((user, index) => (
              <a href={"/profile/" + user.userId} key={user.userId} className="flex items-center justify-between bg-gray-800 rounded-xl p-4 shadow-md hover:bg-gray-750 transition">
                <div className="flex items-center gap-4">
                  <span className="w-8 text-center text-xl font-bold text-yellow-400">
                    #{index + 1}
                  </span>

                  <img
                    src={user.profilePictureUrl ?? "/Default_pfp.jpg"}
                    alt="Profile picture"
                    className="w-12 h-12 rounded-full object-cover border border-gray-700"
                  />

                  <span className="font-medium truncate max-w-[160px]">
                    {user.userName}
                  </span>
                </div>

                <span className="text-sm text-gray-400">
                  {user.challengesCount} solved
                </span>
              </a>
          ))}
        </div>
      </div>
    </div>
  );
}
