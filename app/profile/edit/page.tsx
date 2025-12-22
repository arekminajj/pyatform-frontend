import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/types/User";
import { getCurrentUserProfile } from "@/services/User";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/api/auth/signin");
  }

  const user: User = await getCurrentUserProfile(session.accessToken);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl max-w-2xl w-full p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Edit Profile
        </h1>

        <form
          action="/api/user/update"
          method="POST"
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-center">
            <img
              src={user.profilePictureUrl ?? "/Default_pfp.jpg"}
              alt="Profile Picture"
              className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 mb-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user.email!}
              disabled
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              defaultValue={user.bio ?? ""}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Tell something about yourself..."
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <a
              href="/profile"
              className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
            >
              Cancel
            </a>

            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
