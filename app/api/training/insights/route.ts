import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - Search and filter insights
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const categoryIds = searchParams.get('categories')?.split(',').filter(Boolean);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('training_insights')
      .select('*', { count: 'exact' });

    // Apply category filter
    if (categoryIds && categoryIds.length > 0) {
      query = query.in('category_id', categoryIds);
    }

    // Apply search filter
    if (search && search.trim()) {
      // Use full-text search
      query = query.textSearch('content', search.trim(), {
        type: 'websearch',
        config: 'english',
      });
    }

    // Pagination
    query = query
      .range(offset, offset + limit - 1)
      .order('insight_number', { ascending: true });

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching insights:', error);
      return NextResponse.json(
        { error: 'Failed to fetch insights' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      insights: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error('Error in GET /api/training/insights:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
