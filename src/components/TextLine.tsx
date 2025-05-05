
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Check, X } from "lucide-react";

interface TextLineProps {
  lineNumber: number;
  content: string;
  onEdit: (lineNumber: number, content: string) => void;
  onDelete: (lineNumber: number) => void;
  highlight?: boolean;
  highlightTerm?: string;
}

const TextLine: React.FC<TextLineProps> = ({
  lineNumber,
  content,
  onEdit,
  onDelete,
  highlight = false,
  highlightTerm = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onEdit(lineNumber, editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const renderHighlightedContent = () => {
    if (!highlightTerm || highlightTerm.trim() === "") return content;

    const parts = content.split(new RegExp(`(${highlightTerm})`, "gi"));
    return parts.map((part, i) => 
      part.toLowerCase() === highlightTerm.toLowerCase() 
        ? <span key={i} className="bg-[hsl(var(--editor-highlight))] text-[hsl(var(--editor-text))]">{part}</span>
        : part
    );
  };

  return (
    <div className={`text-editor-line ${highlight ? "bg-[hsl(var(--editor-highlight))]" : ""}`}>
      <div className="line-number">{lineNumber + 1}</div>
      <div className="line-content">
        {isEditing ? (
          <div className="flex items-center space-x-2 w-full">
            <Input
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="flex-1 bg-[hsl(var(--editor-bg))] text-[hsl(var(--editor-text))] border-[hsl(var(--editor-border))]"
              autoFocus
            />
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-green-400 hover:text-green-500 hover:bg-[hsl(var(--editor-highlight))]"
              onClick={handleSave}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-red-400 hover:text-red-500 hover:bg-[hsl(var(--editor-highlight))]"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2 w-full">
            <div className="flex-1 whitespace-pre-wrap">
              {highlightTerm ? renderHighlightedContent() : content}
            </div>
            <div className="flex opacity-0 group-hover:opacity-100">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-[hsl(var(--editor-line-number))] hover:text-[hsl(var(--editor-text))] hover:bg-[hsl(var(--editor-highlight))]"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-[hsl(var(--editor-line-number))] hover:text-[hsl(var(--editor-text))] hover:bg-[hsl(var(--editor-highlight))]"
                onClick={() => onDelete(lineNumber)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextLine;
