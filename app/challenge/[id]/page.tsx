import PyatformEditor from "@/components/PyatformEditor";
import { Challenge } from "@/app/types/Challange";
import { getChallenge } from "@/services/Challenge";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

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

  const { title, content, templateCode, timeLimitMs, memoryLimitKb } =
    challenge;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Problem Description</h3>
            <div className="prose prose-sm sm:prose lg:prose-lg mx-auto text-gray-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
            <h4 className="text-md font-semibold text-gray-800 mt-6 mb-2">Constraints</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="text-gray-700 font-medium">Time Limit:</span>
                <span className="ml-2 text-gray-600">{timeLimitMs ? `${timeLimitMs} ms` : 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 font-medium">Memory Limit:</span>
                <span className="ml-2 text-gray-600">{memoryLimitKb ? `${memoryLimitKb} KB` : 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-gray-50 flex-1 min-h-[300px]">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Code Editor</h3>
              <div className="border border-gray-300 rounded-md overflow-hidden h-full">
                <PyatformEditor defaultCode={templateCode} />
              </div>
            </div>

            <div className="p-6 flex-1 min-h-[200px]">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Execution Logs</h3>
              <div className="bg-gray-900 text-white p-4 rounded-md font-mono text-sm h-full overflow-y-auto">
                <p>No logs available yet. Submit your code to see results.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex justify-end space-x-4">
          <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition">
            Reset
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
