import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../../../utils/client';
import { GET_ARTICLES_BY_CATEGORY } from '../../../../api/queries/article';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category') || 'all';

  try {
    const articles = await client.fetch(GET_ARTICLES_BY_CATEGORY, { category });
    return NextResponse.json(articles || []);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json([], { status: 500 });
  }
}

