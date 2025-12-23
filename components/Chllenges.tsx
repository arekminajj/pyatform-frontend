import { Challenge } from "@/types/Challange";
import Link from "next/link";

interface Props {
  challenges: Challenge[] | null;
}

export default function Challenges({ challenges }: Props) {
  if (!challenges || challenges.length === 0) {
    return (
      <div className="text-gray-400 text-sm">
        This user has no completed challenges.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {challenges.map((c) => (
        <Link
          key={c.id}
          href={`/challenge/${c.id}`}
          className="
            block rounded-lg p-4
            bg-gray-100 dark:bg-gray-700
            border border-gray-200 dark:border-gray-600
            hover:border-indigo-500 hover:shadow-md
            transition
          "
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {c.title ?? "Untitled challenge"}
            </h3>
          </div>

          <p className="mt-1 text-sm text-indigo-600 dark:text-indigo-400">
            View details →
          </p>
        </Link>
      ))}
    </div>
  );
}
