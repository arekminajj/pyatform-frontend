import SolutionTestLogs from "@/components/SolutionTestLogs";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Solution } from "@/types/Solution";
import { getSolutionById } from "@/lib/Solution";
import { User } from "@/types/User";
import { getUserProfile } from "@/lib/User";
import { dateToString } from "@/utils/dateParser";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Challenge } from "@/types/Challange";
import { getChallenge } from "@/lib/Challenge";

interface Props {
  params: { id: string };
}

export default async function SolutionPage({ params }: Props) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/api/auth/signin");
  }

  const solution: Solution = await getSolutionById(
    Number(id),
    session.accessToken
  );

  const solutionAuthor: User = await getUserProfile(
    session.accessToken,
    solution.userId!
  );

  const challenge: Challenge = await getChallenge(
    solution.challengeId!,
    session.accessToken!
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <img
            src={solutionAuthor.profilePictureUrl ?? "/Default_pfp.jpg"}
            alt={"Profile Picture"}
            className="w-12 h-12 rounded-full border-2 border-gray-700"
          />
          <div>
            <h1 className="text-xl font-semibold">
              Submited by: {solutionAuthor.email ?? "Unknown Author"}
            </h1>
            <p className="text-gray-400 text-sm">
              Submitted:{" "}
              {solution.submissionTime
                ? dateToString(solution.submissionTime)
                : ""}
            </p>
            <p className="text-gray-400 text-sm">
              {solution.testResult!.executionTimeMs ? "Execution Time: " + solution.testResult!.executionTimeMs + " ms" : ""}
            </p>
            {solution.hasPassedTests ? (
              <p className="text-green-400 text-sm">Tests passsed!</p>
            ) : (
              <p className="text-red-400 text-sm">Tests failed!</p>
            )}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 overflow-auto">
          <h2 className="text-lg font-semibold mb-2">Solution Code</h2>
          <Prism language="python" style={oneDark} className="rounded-lg">
            {solution.content || ""}
          </Prism>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Problem</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {challenge.content}
          </ReactMarkdown>
        </div>

        {solution.testResult && (
          <div className="bg-gray-800 rounded-lg p-6">
            <SolutionTestLogs
              logs={solution.testResult.output}
              success={solution.hasPassedTests}
            />
          </div>
        )}
      </div>
    </div>
  );
}
