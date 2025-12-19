"use client";

import { Solution } from "@/types/Solution";
import PyatformEditor from "./PyatformEditor";
import SolutionTestLogs from "./SolutionTestLogs";

import { useState, useRef } from "react";

interface Props {
  defaultCode: string | null;
  logs: string | null;
  challengeId: number | null;
}

export default function ChallengeWorkspace({ defaultCode, logs, challengeId }: Props) {
  const [code, setCode] = useState(defaultCode ?? "");
  const [loading, setLoading] = useState(false);
  const [responseLogs, setResponseLogs] = useState<string | null>(logs);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setResponseLogs(null);

    try {
      const res = await fetch("/api/solution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "challengeId": challengeId,
          "content": code,
        }),
      });

      if (!res.ok) {
        throw new Error(`error: ${res.status}`);
      }

      const data: Solution = await res.json();
      setResponseLogs(data.output);
      if (!data.hasPassedTests) data.hasPassedTests = false
      setIsSuccess(data.hasPassedTests)
    } catch (err) {
      setResponseLogs("ERROR: Failed to submit solution");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col">
        <div className="p-6 border-b border-gray-700 bg-gray-850 flex-1 min-h-[300px]">
          <h3 className="text-xl font-semibold text-gray-100 mb-4">
            Code Editor
          </h3>

          <div className="border border-gray-700 rounded-xl overflow-hidden h-full bg-gray-900 shadow-inner">
            <div>
              <PyatformEditor code={code} onChange={setCode}/>
            </div>
          </div>
        </div>

        <SolutionTestLogs logs={responseLogs} success={isSuccess}/>
      </div>

      <div className="p-6 bg-gray-850 flex justify-end space-x-4 border-t border-gray-700">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
