import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import fs from 'fs/promises';
import path from 'path';

interface ParsedCategory {
  name: string;
  slug: string;
  insights: string[];
  orderIndex: number;
}

// Parse markdown file
function parseTrainingManual(markdownContent: string): ParsedCategory[] {
  const categories: ParsedCategory[] = [];

  // Split by category headers (## CATEGORY NAME)
  const sections = markdownContent.split(/^## /m).filter(Boolean);

  sections.forEach((section, index) => {
    const lines = section.trim().split('\n');
    const nameMatch = lines[0].match(/^(.+?)(\s*\*\*Total Insights:\*\*)?/);

    if (!nameMatch) return;

    const name = nameMatch[1].trim();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Extract insights (### NUMBER. Content)
    const insights: string[] = [];
    const insightMatches = section.matchAll(/^### (\d+)\.\s*(.+?)(?=^###|\n*$)/gms);

    for (const match of insightMatches) {
      const content = match[2].trim();
      if (content) {
        insights.push(content);
      }
    }

    if (insights.length > 0) {
      categories.push({
        name,
        slug,
        insights,
        orderIndex: index + 1,
      });
    }
  });

  return categories;
}

// POST - Upload and parse training manual
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileContent, fileName } = body;

    if (!fileContent) {
      return NextResponse.json(
        { error: 'File content is required' },
        { status: 400 }
      );
    }

    // Parse the markdown
    const categories = parseTrainingManual(fileContent);

    if (categories.length === 0) {
      return NextResponse.json(
        { error: 'No categories found in file' },
        { status: 400 }
      );
    }

    // Clear existing data
    await supabaseAdmin.from('training_insights').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseAdmin.from('training_categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    let totalInsights = 0;
    let currentInsightNumber = 1;

    // Insert categories and insights
    for (const category of categories) {
      // Insert category
      const { data: categoryData, error: categoryError } = await supabaseAdmin
        .from('training_categories')
        .insert({
          name: category.name,
          slug: category.slug,
          insight_count: category.insights.length,
          order_index: category.orderIndex,
        })
        .select()
        .single();

      if (categoryError) {
        console.error('Error inserting category:', categoryError);
        continue;
      }

      // Insert insights for this category
      const insightsToInsert = category.insights.map((content) => ({
        category_id: categoryData.id,
        insight_number: currentInsightNumber++,
        content,
        category_name: category.name,
      }));

      const { error: insightsError } = await supabaseAdmin
        .from('training_insights')
        .insert(insightsToInsert);

      if (insightsError) {
        console.error('Error inserting insights:', insightsError);
      } else {
        totalInsights += insightsToInsert.length;
      }
    }

    return NextResponse.json({
      success: true,
      categoriesImported: categories.length,
      insightsImported: totalInsights,
      fileName: fileName || 'training-manual.md',
    });
  } catch (error: any) {
    console.error('Error importing training manual:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to import training manual' },
      { status: 500 }
    );
  }
}

// GET - Check import status
export async function GET() {
  try {
    const { count: categoryCount } = await supabaseAdmin
      .from('training_categories')
      .select('*', { count: 'exact', head: true });

    const { count: insightCount } = await supabaseAdmin
      .from('training_insights')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      success: true,
      imported: (categoryCount || 0) > 0,
      categoryCount: categoryCount || 0,
      insightCount: insightCount || 0,
    });
  } catch (error) {
    console.error('Error checking import status:', error);
    return NextResponse.json(
      { error: 'Failed to check import status' },
      { status: 500 }
    );
  }
}
