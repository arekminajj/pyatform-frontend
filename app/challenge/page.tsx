import { Challenge } from "@/types/Challange";
import { getAllChallenges } from "@/lib/Challenge";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function ChallengePage({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/api/auth/signin");
  }

  const challenges: Challenge[] = await getAllChallenges(session.accessToken);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Challenges
        </h1>

        <div className="space-y-4">
          {challenges.map((c) => (
            <a
              key={c.id}
              href={`/challenge/${c.id}`}
              className="relative block p-5 rounded-xl shadow-sm border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:shadow-md transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {c.title ?? "Untitled challenge"}
              </h2>

              {c.isCompletedByUser && (
                <span className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 dark:bg-green-700 dark:text-green-100 rounded-full">
                  Completed
                </span>
              )}

              <div className="mt-3 text-sm text-indigo-600 dark:text-indigo-400">
                View details
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
