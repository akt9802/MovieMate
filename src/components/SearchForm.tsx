'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchFormProps {
  initialQuery?: string;
}

export default function SearchForm({ initialQuery = '' }: SearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    router.push(`/?q=${encodeURIComponent(suggestion)}`);
  };

  const popularSearches = ['Avengers', 'Batman', 'Inception', 'Titanic', 'Star Wars'];

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-4 py-3 text-base border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <Button 
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </div>
        </Button>
      </form>
      
      {/* Quick Search Suggestions */}
      {!query && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {popularSearches.map((suggestion) => (
            <Button
              key={suggestion}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-sm border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
