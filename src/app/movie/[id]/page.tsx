import { notFound } from 'next/navigation';
import MoviePoster from '@/components/movie/MoviePoster';
import Link from 'next/link';
import { ArrowLeft, Calendar, Film, Star, Clock, Globe, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

async function getMovieDetails(id: string): Promise<MovieDetails | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/movies?id=${id}`, {
      cache: 'no-store', // Ensure fresh data
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.Response === 'True' ? data : null;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const movie = await getMovieDetails(params.id);
  
  if (!movie) {
    return {
      title: 'Movie Not Found',
    };
  }

  return {
    title: `${movie.Title} (${movie.Year}) - MovieMate`,
    description: movie.Plot,
    openGraph: {
      title: `${movie.Title} (${movie.Year})`,
      description: movie.Plot,
      images: movie.Poster !== 'N/A' ? [movie.Poster] : [],
    },
  };
}

export default async function MovieDetailsPage({ params }: PageProps) {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    notFound();
  }

  const genres = movie.Genre?.split(', ') || [];
  const ratings = movie.Ratings || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header with Back Button */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700">
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden shadow-lg">
              <div className="relative w-full" style={{ aspectRatio: '2/3' }}>
                <MoviePoster
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.svg'}
                  alt={movie.Title}
                  className="object-contain w-full h-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </Card>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Basic Info */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{movie.Title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-300 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">{movie.Year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{movie.Runtime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="font-medium">{movie.Country}</span>
                </div>
                {movie.Rated !== 'N/A' && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {movie.Rated}
                    </Badge>
                  </div>
                )}
              </div>
              
              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {genres.map((genre, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-6">
                {movie.imdbRating !== 'N/A' && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <div>
                      <span className="text-xl font-bold text-yellow-700 dark:text-yellow-300">{movie.imdbRating}</span>
                      <span className="text-sm text-yellow-600 dark:text-yellow-400 ml-1">/10</span>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400">IMDb</p>
                    </div>
                  </div>
                )}
                {movie.Metascore !== 'N/A' && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <Film className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="text-xl font-bold text-green-700 dark:text-green-300">{movie.Metascore}</span>
                      <span className="text-sm text-green-600 dark:text-green-400 ml-1">/100</span>
                      <p className="text-xs text-green-600 dark:text-green-400">Metascore</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Plot */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  Plot Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{movie.Plot}</p>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Cast & Crew
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">Director:</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">{movie.Director}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">Writer:</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">{movie.Writer}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">Actors:</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">{movie.Actors}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Production Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">Language:</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">{movie.Language}</p>
                  </div>
                  {movie.BoxOffice !== 'N/A' && (
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">Box Office:</span>
                      <p className="text-slate-600 dark:text-slate-300 mt-1">{movie.BoxOffice}</p>
                    </div>
                  )}
                  {movie.Production !== 'N/A' && (
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">Production:</span>
                      <p className="text-slate-600 dark:text-slate-300 mt-1">{movie.Production}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Awards */}
            {movie.Awards !== 'N/A' && (
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Awards & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{movie.Awards}</p>
                </CardContent>
              </Card>
            )}

            {/* External Ratings */}
            {ratings.length > 0 && (
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    External Ratings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {ratings.map((rating, index) => (
                      <div key={index} className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <p className="font-semibold text-slate-900 dark:text-white mb-1">{rating.Source}</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{rating.Value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}