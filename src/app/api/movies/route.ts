import { request } from 'http';
import { NextRequest, NextResponse } from 'next/server';

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_BASE_URL = 'http://www.omdbapi.com/';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const id = searchParams.get('id');

  if (!OMDB_API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    let url: string;

    if (id) {
      // Get movie details by ID
      url = `${OMDB_BASE_URL}?i=${id}&apikey=${OMDB_API_KEY}`;
    } else if (query) {
      // Search movies by title
      url = `${OMDB_BASE_URL}?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`;
    } else {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'False') {
      return NextResponse.json(
        { error: data.Error || 'Movie not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('OMDb API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie data' },
      { status: 500 }
    );
  }
}
