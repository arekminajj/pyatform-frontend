"use client";

import { useState, useRef } from "react";

interface Props {
  logs: string | null;
  success: boolean | null;
}

export default function SolutionTestLogs({ logs, success }: Props) {
  return (
    <div className="p-6 flex-1 min-h-[200px] bg-gray-850">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">
        Execution Logs
      </h3>
      { success ?
      <div className="bg-black text-green-400 p-4 rounded-xl font-mono text-sm h-full overflow-y-auto shadow-inner">
        <p>{logs}</p>
      </div>
      :
      <div className="bg-black text-red-400 p-4 rounded-xl font-mono text-sm h-full overflow-y-auto shadow-inner">
        <p>{logs}</p>
      </div> }
    </div>
  );
}
