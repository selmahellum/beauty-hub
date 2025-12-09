import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../../../utils/client';
import { GET_TUTORIALS_BY_CATEGORY } from '../../../../api/queries/tutorial';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category') || 'all';

  try {
    const tutorials = await client.fetch(GET_TUTORIALS_BY_CATEGORY, { category });
    return NextResponse.json(tutorials || []);
  } catch (error) {
    console.error('Error fetching tutorials:', error);
    return NextResponse.json([], { status: 500 });
  }
}

