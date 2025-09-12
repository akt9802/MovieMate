export interface Movie {
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

export async function searchMovies(query: string): Promise<{
  movies: Movie[];
  error: string | null;
}> {
  const OMDB_API_KEY = process.env.OMDB_API_KEY;
  const OMDB_BASE_URL = 'http://www.omdbapi.com/';

  if (!OMDB_API_KEY) {
    return {
      movies: [],
      error: 'API key not configured'
    };
  }

  try {
    const url = `${OMDB_BASE_URL}?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`;
    const response = await fetch(url, {
      cache: 'no-store', // Don't cache search results
    });

    if (!response.ok) {
      return {
        movies: [],
        error: 'Failed to fetch movies'
      };
    }

    const data: SearchResponse = await response.json();

    if (data.Response === 'False') {
      return {
        movies: [],
        error: data.Error || 'No movies found'
      };
    }

    if (data.Search) {
      // Remove duplicates based on imdbID
      const uniqueMovies = data.Search.filter((movie, index, self) => 
        index === self.findIndex(m => m.imdbID === movie.imdbID)
      );
      return {
        movies: uniqueMovies,
        error: null
      };
    }

    return {
      movies: [],
      error: 'No movies found'
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    return {
      movies: [],
      error: 'Failed to search movies'
    };
  }
}
