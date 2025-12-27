import { Solution } from "@/types/Solution";
import { getSolutions } from "@/lib/Solution";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dateToString } from "@/utils/dateParser";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Props {
  params: { challengeId: number | null; userId: string | null };
}

export default async function SolutionPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/api/auth/signin");
  }

  const solutions: Solution[] = await getSolutions(
    session.accessToken,
    params.challengeId,
    params.userId
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Solutions
        </h1>

        <div className="space-y-4">
          {solutions.map((s) => (
            <a
              key={s.id}
              href={`/solution/${s.id}`}
              className="
                block p-5 rounded-xl shadow-sm border
                bg-white dark:bg-gray-800
                border-gray-200 dark:border-gray-700
                hover:border-indigo-500 hover:shadow-md
                transition-all
              "
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {s.submissionTime
                  ? dateToString(s.submissionTime)
                  : "Unknown solution"}
              </h2>

              {s.hasPassedTests ? (
                <div className="mt-3 text-sm text-green-600 dark:text-green-400">
                  Tests passed!
                </div>
              ) : (
                <div className="mt-3 text-sm text-red-600 dark:text-red-400">
                  Tests failed
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
