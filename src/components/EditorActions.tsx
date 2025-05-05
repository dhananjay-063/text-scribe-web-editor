
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface EditorActionsProps {
  fileName: string;
  content: string;
  disabled: boolean;
}

const EditorActions: React.FC<EditorActionsProps> = ({ 
  fileName, 
  content,
  disabled
}) => {
  const handleSave = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "untitled.txt";
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-3 border-t border-[hsl(var(--editor-border))]">
      <Button
        onClick={handleSave}
        disabled={disabled}
        className="bg-[hsl(var(--editor-primary))] hover:bg-[hsl(var(--editor-secondary))] text-[hsl(var(--editor-text))] flex items-center space-x-2"
      >
        <Save className="h-4 w-4" />
        <span>Save File</span>
      </Button>
    </div>
  );
};

export default EditorActions;
