
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileUploaded: (text: string, fileName: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onFileUploaded(text, file.name);
      toast.success(`File "${file.name}" uploaded successfully!`);
    };
    reader.onerror = () => {
      toast.error("Error reading file!");
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onFileUploaded(text, file.name);
      toast.success(`File "${file.name}" uploaded successfully!`);
    };
    reader.onerror = () => {
      toast.error("Error reading file!");
    };
    reader.readAsText(file);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border-2 border-dashed border-[hsl(var(--editor-border))] rounded-lg p-8 text-center cursor-pointer hover:bg-[hsl(var(--editor-highlight))] transition-colors"
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".txt,.md,.js,.ts,.html,.css,.json"
      />
      <Upload className="mx-auto h-12 w-12 text-[hsl(var(--editor-primary))]" />
      <h3 className="mt-4 text-lg font-medium">Upload your text file</h3>
      <p className="mt-2 text-sm text-[hsl(var(--editor-line-number))]">
        Drag and drop a file here, or click to select a file
      </p>
      <p className="mt-1 text-xs text-[hsl(var(--editor-line-number))]">
        Supported formats: .txt, .md, .js, .ts, .html, .css, .json
      </p>
    </div>
  );
};

export default FileUpload;
