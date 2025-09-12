import { Search, Calendar, Film, Star, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MoviePoster from '@/components/movie/MoviePoster';
import SearchForm from '@/components/SearchForm';
import Link from 'next/link';
import { searchMovies, Movie } from '@/lib/movies'; // Import Movie type

interface PageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q || '';
  
  let movies: Movie[] = [];
  let error: string | null = null;

  if (query) {
    const result = await searchMovies(query);
    movies = result.movies;
    error = result.error;
  }

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
            
            {/* Search Form */}
            <SearchForm initialQuery={query} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
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
              <Link href="/">
                <button className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md">
                  Try Again
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!error && movies.length === 0 && query && (
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
              <Link href="/">
                <button className="px-4 py-2 border border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 rounded-md">
                  Clear Search
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!error && movies.length === 0 && !query && (
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
                Found {movies.length} movie{movies.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
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