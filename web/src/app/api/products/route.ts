import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../../../utils/client';
import { GET_PRODUCTS_BY_CATEGORY } from '../../../../api/queries/product';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category') || 'all';

  try {
    const products = await client.fetch(GET_PRODUCTS_BY_CATEGORY, { category });
    return NextResponse.json(products || []);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json([], { status: 500 });
  }
}
