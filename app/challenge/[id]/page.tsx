import ChallengeWorkspace from "@/components/ChallengeWorkspace";
import ChallengeSolutions from "@/components/ChallengeSolutions";
import { Challenge } from "@/types/Challange";
import { getChallenge } from "@/services/Challenge";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Solution } from "@/types/Solution";
import { getSolutions } from "@/services/Solution";

interface Props {
  params: { id: string };
}

export default async function ChallengePage({ params }: Props) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/api/auth/signin");
  }

  const challenge: Challenge = await getChallenge(
    Number(id),
    session.accessToken
  );

  const solutions: Solution[] = await getSolutions(
    session.accessToken,
    challenge.id,
    session.user.id
  );

  const { title, content, templateCode, timeLimitMs, memoryLimitKb } =
    challenge;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-700">
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 px-6 py-5">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-700 bg-gray-850 flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              Problem Description
            </h3>

            <div className="prose prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>

            <h4 className="text-lg font-semibold text-gray-100 mt-6 mb-3">
              Constraints
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center p-2 rounded-md bg-gray-700 text-gray-100">
                <span className="font-medium">Time Limit:</span>
                <span className="ml-2">
                  {timeLimitMs ? `${timeLimitMs} ms` : "N/A"}
                </span>
              </div>

              <div className="flex items-center p-2 rounded-md bg-gray-700 text-gray-100">
                <span className="font-medium">Memory Limit:</span>
                <span className="ml-2">
                  {memoryLimitKb ? `${memoryLimitKb} KB` : "N/A"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <ChallengeSolutions solutions={solutions} />
            </div>
          </div>

          <ChallengeWorkspace
            defaultCode={templateCode}
            logs={"Here logs are going to appear"}
            challengeId={Number(id)}
          />
        </div>
      </div>
    </div>
  );
}
