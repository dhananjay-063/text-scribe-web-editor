
import TextEditor from "@/components/TextEditor";

const Index = () => {
  return (
    <div className="min-h-screen p-4 bg-[hsl(var(--editor-bg))] flex flex-col">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2 text-[hsl(var(--editor-primary))]">Web Text Editor</h1>
        <p className="text-[hsl(var(--editor-line-number))]">
          Upload, edit, and save text files right in your browser
        </p>
      </header>
      
      <div className="flex-1">
        <TextEditor />
      </div>
      
      <footer className="mt-6 text-center text-sm text-[hsl(var(--editor-line-number))]">
        <p>Web Text Editor &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
