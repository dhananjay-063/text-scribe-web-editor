
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import FileUpload from "./FileUpload";
import TextLine from "./TextLine";
import EditorHeader from "./EditorHeader";
import EditorActions from "./EditorActions";
import SearchReplace from "./SearchReplace";
import { toast } from "sonner";

const TextEditor: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);

  const handleFileUpload = (text: string, name: string) => {
    const fileLines = text.split("\n");
    setLines(fileLines);
    setFileName(name);
    setIsFileUploaded(true);
    setSearchTerm("");
  };

  const handleLineEdit = (lineNumber: number, newContent: string) => {
    const updatedLines = [...lines];
    updatedLines[lineNumber] = newContent;
    setLines(updatedLines);
    toast.success(`Line ${lineNumber + 1} edited`);
  };

  const handleLineDelete = (lineNumber: number) => {
    const updatedLines = [...lines];
    updatedLines.splice(lineNumber, 1);
    setLines(updatedLines);
    toast.success(`Line ${lineNumber + 1} deleted`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      toast.info("Search term cleared");
      return;
    }

    const matchCount = lines.filter(line => 
      line.toLowerCase().includes(term.toLowerCase())
    ).length;
    
    if (matchCount > 0) {
      toast.success(`Found ${matchCount} match${matchCount === 1 ? '' : 'es'}`);
    } else {
      toast.error("No matches found");
    }
  };

  const handleReplace = (search: string, replace: string) => {
    if (!search.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    
    let replacedCount = 0;
    const updatedLines = lines.map(line => {
      if (line.toLowerCase().includes(search.toLowerCase())) {
        replacedCount += 1;
        return line.replace(new RegExp(search, 'gi'), replace);
      }
      return line;
    });
    
    setLines(updatedLines);
    
    if (replacedCount > 0) {
      toast.success(`Replaced ${replacedCount} occurrence${replacedCount === 1 ? '' : 's'}`);
    } else {
      toast.error("No matches found to replace");
    }
  };

  return (
    <div className="text-editor h-[calc(100vh-2rem)] flex flex-col rounded-lg overflow-hidden shadow-xl border border-[hsl(var(--editor-border))]">
      {isFileUploaded ? (
        <>
          <EditorHeader fileName={fileName} lineCount={lines.length} />
          
          <SearchReplace 
            onSearch={handleSearch} 
            onReplace={handleReplace} 
          />
          
          <ScrollArea className="flex-1">
            <div className="group">
              {lines.map((line, index) => (
                <TextLine
                  key={index}
                  lineNumber={index}
                  content={line}
                  onEdit={handleLineEdit}
                  onDelete={handleLineDelete}
                  highlight={searchTerm ? line.toLowerCase().includes(searchTerm.toLowerCase()) : false}
                  highlightTerm={searchTerm}
                />
              ))}
            </div>
          </ScrollArea>
          
          <EditorActions 
            fileName={fileName} 
            content={lines.join("\n")} 
            disabled={lines.length === 0} 
          />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-2/3 mx-auto">
            <FileUpload onFileUploaded={handleFileUpload} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
