'use client';

import { useState } from 'react';
import { Search, Film, Star, Calendar, Clock, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import MoviePoster from '@/components/movie/MoviePoster';
import Link from 'next/link';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface SearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMovies = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/movies?q=${encodeURIComponent(query)}`);
      const data: SearchResponse = await response.json();

      if (data.Response === 'True' && data.Search) {
        // Remove duplicates based on imdbID and create unique keys
        const uniqueMovies = data.Search.filter((movie, index, self) => 
          index === self.findIndex(m => m.imdbID === movie.imdbID)
        );
        setMovies(uniqueMovies);
      } else {
        setError(data.Error || 'No movies found');
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to search movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchMovies();
    }
  };

  const popularSearches = ['Avengers', 'Batman', 'Inception', 'Titanic', 'Star Wars'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <Film className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                MovieMate
              </h1>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Find your next favorite movie with our comprehensive search
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search for movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-12 pr-4 py-3 text-base border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Button 
                  onClick={searchMovies} 
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Searching</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      <span>Search</span>
                    </div>
                  )}
                </Button>
              </div>
              
              {/* Quick Search Suggestions */}
              {!query && (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {popularSearches.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuery(suggestion)}
                      className="text-sm border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <TrendingUp className="h-5 w-5" />
                <span>Searching for movies...</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <Card key={`skeleton-${i}`} className="h-full flex flex-col overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <CardHeader className="p-4 flex-1 flex flex-col justify-between">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="p-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-6">
                <Film className="h-12 w-12 mx-auto text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                  Search Error
                </h3>
                <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
              </div>
              <Button 
                onClick={() => setError(null)} 
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && movies.length === 0 && query && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="p-6 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-6">
                <Film className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  No Results Found
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Try different keywords or check your spelling
                </p>
              </div>
              <Button 
                onClick={() => setQuery('')} 
                variant="outline"
              >
                Clear Search
              </Button>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!loading && !error && movies.length === 0 && !query && (
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto">
              <div className="p-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-8">
                <Film className="h-16 w-16 mx-auto text-slate-400 mb-6" />
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                  Welcome to MovieMate
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Search for movies by title, actor, director, or genre. Get detailed information 
                  including ratings, plot summaries, and more.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>IMDb Ratings</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span>Release Years</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span>Runtime Info</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Movie Results */}
        {movies.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Search Results
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Found {movies.length} movie{movies.length !== 1 ? 's' : ''} for "{query}"
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie, index) => (
                <Link key={`${movie.imdbID}-${index}`} href={`/movie/${movie.imdbID}`}>
                  <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                    <div className="relative h-64 w-full overflow-hidden">
                      <MoviePoster
                        src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.svg'}
                        alt={movie.Title}
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      />
                    </div>
                    <CardHeader className="p-4 flex-1 flex flex-col justify-between">
                      <CardTitle className="text-base line-clamp-2 leading-tight text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors min-h-[2.5rem]">
                        {movie.Title}
                      </CardTitle>
                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mt-2">
                        <span>{movie.Year}</span>
                        <Badge variant="secondary" className="text-xs">
                          {movie.Type}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
