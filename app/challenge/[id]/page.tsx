import PyatformEditor from "@/components/PyatformEditor";
import { Challenge } from "@/types/Challange";
import { getChallenge } from "@/services/Challenge";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-700">
        
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 px-6 py-5">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-700 bg-gray-850">
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
                <span className="ml-2">{timeLimitMs ? `${timeLimitMs} ms` : "N/A"}</span>
              </div>

              <div className="flex items-center p-2 rounded-md bg-gray-700 text-gray-100">
                <span className="font-medium">Memory Limit:</span>
                <span className="ml-2">{memoryLimitKb ? `${memoryLimitKb} KB` : "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            
            <div className="p-6 border-b border-gray-700 bg-gray-850 flex-1 min-h-[300px]">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                Code Editor
              </h3>

              <div className="border border-gray-700 rounded-xl overflow-hidden h-full bg-gray-900 shadow-inner">
                <PyatformEditor defaultCode={templateCode} />
              </div>
            </div>

            <div className="p-6 flex-1 min-h-[200px] bg-gray-850">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                Execution Logs
              </h3>

              <div className="bg-black text-green-400 p-4 rounded-xl font-mono text-sm h-full overflow-y-auto shadow-inner">
                <p>No logs available yet. Submit your code to see results.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-850 flex justify-end space-x-4 border-t border-gray-700">
          <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition shadow-sm">
            Reset
          </button>

          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm">
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}
