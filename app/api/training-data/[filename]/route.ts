import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// GET - Read a training data file
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    // Validate filename to prevent directory traversal
    if (!filename || filename.includes('..') || filename.includes('/')) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      );
    }

    // Ensure filename ends with .md
    const sanitizedFilename = filename.endsWith('.md') ? filename : `${filename}.md`;

    // Read file from training-data folder
    const filePath = join(process.cwd(), 'training-data', sanitizedFilename);

    try {
      const content = readFileSync(filePath, 'utf-8');

      return NextResponse.json({
        success: true,
        filename: sanitizedFilename,
        content,
      });
    } catch (fileError: any) {
      if (fileError.code === 'ENOENT') {
        return NextResponse.json(
          { error: 'File not found' },
          { status: 404 }
        );
      }
      throw fileError;
    }
  } catch (error) {
    console.error('Error reading training data file:', error);
    return NextResponse.json(
      { error: 'Failed to read file' },
      { status: 500 }
    );
  }
}

// PUT - Write to a training data file
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const { content } = await req.json();

    // Validate filename to prevent directory traversal
    if (!filename || filename.includes('..') || filename.includes('/')) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      );
    }

    // Validate content
    if (typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content must be a string' },
        { status: 400 }
      );
    }

    // Ensure filename ends with .md
    const sanitizedFilename = filename.endsWith('.md') ? filename : `${filename}.md`;

    // Write file to training-data folder
    const filePath = join(process.cwd(), 'training-data', sanitizedFilename);

    writeFileSync(filePath, content, 'utf-8');

    return NextResponse.json({
      success: true,
      filename: sanitizedFilename,
      message: 'File updated successfully',
    });
  } catch (error) {
    console.error('Error writing training data file:', error);
    return NextResponse.json(
      { error: 'Failed to write file' },
      { status: 500 }
    );
  }
}
