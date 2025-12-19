"use client";

import { useState, useRef } from "react";
import Editor, { Monaco, OnMount } from "@monaco-editor/react";

interface Props {
  code: string | null;
  onChange: (value: string) => void;
}

export default function PyatformEditor({ code, onChange }: Props) {
  const [editorValue, setEditorValue] = useState<string>(code ?? "");

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
            value={editorValue}
            theme="vs-dark"
            onMount={handleEditorMount}
            onChange={(value) => onChange(value ?? "")}
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
