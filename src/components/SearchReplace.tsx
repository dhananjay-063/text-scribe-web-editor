
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Replace } from "lucide-react";

interface SearchReplaceProps {
  onSearch: (term: string) => void;
  onReplace: (searchTerm: string, replaceTerm: string) => void;
}

const SearchReplace: React.FC<SearchReplaceProps> = ({ onSearch, onReplace }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [replaceTerm, setReplaceTerm] = useState("");
  const [isReplaceVisible, setIsReplaceVisible] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleReplace = (e: React.FormEvent) => {
    e.preventDefault();
    onReplace(searchTerm, replaceTerm);
  };

  return (
    <div className="p-3 border-b border-[hsl(var(--editor-border))]">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(var(--editor-line-number))]" />
          <Input
            placeholder="Search text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-[hsl(var(--editor-bg))] border-[hsl(var(--editor-border))] text-[hsl(var(--editor-text))]"
          />
        </div>
        <Button 
          type="submit" 
          variant="secondary"
          className="bg-[hsl(var(--editor-primary))] text-[hsl(var(--editor-text))] hover:bg-[hsl(var(--editor-secondary))]"
        >
          Search
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsReplaceVisible(!isReplaceVisible)}
          className="border-[hsl(var(--editor-border))] text-[hsl(var(--editor-text))]"
        >
          {isReplaceVisible ? "Hide Replace" : "Show Replace"}
        </Button>
      </form>

      {isReplaceVisible && (
        <form onSubmit={handleReplace} className="flex items-center space-x-2 mt-2">
          <div className="flex-1 relative">
            <Replace className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(var(--editor-line-number))]" />
            <Input
              placeholder="Replace with..."
              value={replaceTerm}
              onChange={(e) => setReplaceTerm(e.target.value)}
              className="pl-9 bg-[hsl(var(--editor-bg))] border-[hsl(var(--editor-border))] text-[hsl(var(--editor-text))]"
            />
          </div>
          <Button 
            type="submit" 
            variant="secondary"
            disabled={!searchTerm}
            className="bg-[hsl(var(--editor-primary))] text-[hsl(var(--editor-text))] hover:bg-[hsl(var(--editor-secondary))]"
          >
            Replace All
          </Button>
        </form>
      )}
    </div>
  );
};

export default SearchReplace;
