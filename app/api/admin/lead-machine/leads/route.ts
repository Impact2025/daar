import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { mapLead } from '@/lib/lead-machine/pipeline';
import { ProspectStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

// GET — fetch saved prospects
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: Record<string, unknown> = {};
    if (status && status !== 'all') where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [rows, total] = await Promise.all([
      prisma.prospectLead.findMany({
        where,
        orderBy: [
          { starred: 'desc' },
          { aiScore: 'desc' },
          { createdAt: 'desc' },
        ],
        take: limit,
        skip: offset,
      }),
      prisma.prospectLead.count({ where }),
    ]);

    return NextResponse.json({
      leads: rows.map(mapLead),
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Prospect leads GET error:', error);
    return NextResponse.json({ error: 'Ophalen mislukt', leads: [] }, { status: 500 });
  }
}

// POST — save a new prospect
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      name, tradeName, kvkNumber, website, email, phone, contactPerson,
      aiScore, aiRationale, sbiDescription, city,
    } = body;

    if (!name) {
      return NextResponse.json({ error: 'Naam is verplicht' }, { status: 400 });
    }

    const created = await prisma.prospectLead.create({
      data: {
        name,
        tradeName: tradeName ?? null,
        kvkNumber: kvkNumber ?? null,
        website: website ?? null,
        email: email ?? null,
        phone: phone ?? null,
        contactPerson: contactPerson ?? null,
        aiScore: aiScore ?? null,
        aiRationale: aiRationale ?? null,
        sbiDescription: sbiDescription ?? null,
        city: city ?? null,
        scrapedAt: email || phone ? new Date() : null,
        scoredAt: aiScore != null ? new Date() : null,
      },
    });

    return NextResponse.json({ lead: mapLead(created) }, { status: 201 });
  } catch (error) {
    console.error('Prospect leads POST error:', error);
    return NextResponse.json({ error: 'Opslaan mislukt' }, { status: 500 });
  }
}

// PUT — update status / starred / notes
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status, starred, notes } = await request.json();
    if (!id) return NextResponse.json({ error: 'ID ontbreekt' }, { status: 400 });

    const updated = await prisma.prospectLead.update({
      where: { id },
      data: {
        status: status as ProspectStatus ?? undefined,
        starred: starred ?? undefined,
        notes: notes ?? undefined,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ lead: mapLead(updated) });
  } catch (error) {
    console.error('Prospect leads PUT error:', error);
    return NextResponse.json({ error: 'Bijwerken mislukt' }, { status: 500 });
  }
}

// DELETE — remove a prospect
export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID ontbreekt' }, { status: 400 });

    await prisma.prospectLead.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Prospect leads DELETE error:', error);
    return NextResponse.json({ error: 'Verwijderen mislukt' }, { status: 500 });
  }
}
