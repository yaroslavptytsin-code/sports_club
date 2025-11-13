import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all languages
export async function GET() {
  try {
    const languages = await prisma.language.findMany({
      include: {
        shortTexts: true,
        longTexts: true,
      },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json(languages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch languages' },
      { status: 500 }
    );
  }
}

// POST create new language
export async function POST(request: NextRequest) {
  try {
    const { code, name } = await request.json();

    if (!code || !name) {
      return NextResponse.json(
        { error: 'Language code and name are required' },
        { status: 400 }
      );
    }

    // Create new language and auto-populate with default English texts
    const language = await prisma.language.create({
      data: {
        code,
        name,
        shortTexts: {
          create: Object.entries(DEFAULT_TRANSLATIONS).map(([key, value]) => ({
            key,
            value: key === 'en' ? value : '' // Empty for new languages
          }))
        }
      },
      include: {
        shortTexts: true,
        longTexts: true,
      }
    });

    return NextResponse.json(language);
  } catch (error) {
    console.error('Error creating language:', error);
    return NextResponse.json(
      { error: 'Failed to create language' },
      { status: 500 }
    );
  }
}

const DEFAULT_TRANSLATIONS = {
  'add_workout': 'Add Workout',
  'edit_moveframe': 'Edit Moveframe',
  'delete_microlap': 'Delete Microlap',
  'save_changes': 'Save Changes',
  'cancel': 'Cancel',
  // ... more default translations
};