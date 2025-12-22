import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-full max-w-3xl h-full p-8 flex flex-col justify-center text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
          Pyatform
        </h1>
        <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-6">
          Train your Python coding skills with fun algorithmic challenges!
        </p>

        <p className="text-gray-700 dark:text-gray-200 mb-8">
          Pyatform helps you practice algorithms, just pick a challenge you like
          and test your solutions live!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-auto">
          {session ? (
            <>
              <a href={"/challenge"}>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Challenges
                </button>
              </a>
              <a href="/profile">
                <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                  My profile
                </button>
              </a>
            </>
          ) : (
            <a href="/auth/register">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Sign up!
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
