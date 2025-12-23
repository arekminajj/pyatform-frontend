
import { Solution } from "@/types/Solution";
import { dateToString } from "@/ common/dateParser";

import { Prism } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  solutions: Solution[] | null;
}

export default function ChallengeSolutions({ solutions }: Props) {

  if (!solutions || solutions.length === 0) {
    return (
      <div className="p-4 text-gray-400 text-center">
        You have not submited any solutions to this challange yet.
      </div>
    );
  }

  solutions.sort(
    (a, b) =>
      new Date(b.submissionTime!).getTime() -
      new Date(a.submissionTime!).getTime()
  );

  return (
    <div className="p-4 space-y-4">
      {solutions.map((s, index) => (
        <div
          key={s.id}
          className="bg-gray-800 rounded-lg p-3 border border-gray-700 shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-200">
              Solution #{solutions.length - index} by <a href="/profile">You</a>{" "}
              submitted at:&nbsp;
              {s.submissionTime ? dateToString(s.submissionTime) : ""}
            </span>
            <span
              className={`text-sm ${
                s.hasPassedTests ? "text-green-400" : "text-red-400"
              }`}
            >
              {s.hasPassedTests ? "Passed" : "Failed"}
            </span>
          </div>
          <Prism language="python" style={oneDark} className="rounded-lg">
            {s.content || ""}
          </Prism>
        </div>
      ))}
    </div>
  );
}
