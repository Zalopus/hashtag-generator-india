import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase } from '@/scripts/seedData';

export async function POST(request: NextRequest) {
  try {
    // Only allow seeding in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Seeding is not allowed in production' },
        { status: 403 }
      );
    }

    await seedDatabase();

    return NextResponse.json({
      message: 'Database seeded successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error.message },
      { status: 500 }
    );
  }
}
