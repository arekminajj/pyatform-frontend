"use client";

import { useState, useRef } from "react";
import Editor, { Monaco, OnMount } from "@monaco-editor/react";

interface Props {
  defaultCode: string | null;
}

export default function PyatformEditor({ defaultCode }: Props) {
  const [code, setCode] = useState<string>(defaultCode ?? "");

  const editorRef = useRef<any>(null);

  const handleEditorMount: OnMount = (editor: any, _monaco: Monaco) => {
    editorRef.current = editor;
  };

  return (
    <div>
      <div>
        <div>
          <Editor
            height="50vh"
            defaultLanguage="python"
            value={code}
            theme="vs-dark"
            onMount={handleEditorMount}
            onChange={(value) => setCode(value ?? "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              tabSize: 2,
              formatOnType: true,
              formatOnPaste: true,
              automaticLayout: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
