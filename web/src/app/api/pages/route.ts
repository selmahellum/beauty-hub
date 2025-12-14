import { NextResponse } from 'next/server';
import { client } from '../../../../utils/client';
import { GET_ALL_PAGES } from '../../../../api/queries/page';

export async function GET() {
  try {
    const pages = await client.fetch(GET_ALL_PAGES);
    return NextResponse.json(pages || []);
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json([], { status: 500 });
  }
}

