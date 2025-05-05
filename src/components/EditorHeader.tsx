
import React from "react";

interface EditorHeaderProps {
  fileName: string;
  lineCount: number;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ fileName, lineCount }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--editor-border))]">
      <div>
        <h2 className="text-xl font-semibold text-[hsl(var(--editor-text))]">
          {fileName || "Untitled"}
        </h2>
        <p className="text-sm text-[hsl(var(--editor-line-number))]">
          {lineCount} {lineCount === 1 ? "line" : "lines"}
        </p>
      </div>
    </div>
  );
};

export default EditorHeader;
