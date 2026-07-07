import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ProspectStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

function escape(val: unknown): string {
  if (val == null) return '';
  let s = String(val);
  // Formule-injectie-guard: namen komen van gescrapete webpagina's;
  // een cel die met = + - @ begint zou in Excel als formule uitgevoerd worden.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where = status && status !== 'all' ? { status: status as ProspectStatus } : {};
    const rows = await prisma.prospectLead.findMany({
      where,
      orderBy: [{ aiScore: 'desc' }, { createdAt: 'desc' }],
    });

    const headers = [
      'Naam', 'Stad', 'SBI-code', 'SBI-omschrijving', 'E-mail', 'Telefoon',
      'Website', 'AI-score', 'AI-toelichting', 'Status', 'KVK-nummer', 'Aangemaakt',
    ];
    const lines = [
      headers.join(','),
      ...rows.map((r) =>
        [
          r.name, r.city, r.sbiCode, r.sbiDescription, r.email, r.phone,
          r.website, r.aiScore, r.aiRationale, r.status, r.kvkNumber, r.createdAt,
        ]
          .map(escape)
          .join(','),
      ),
    ];

    const csv = lines.join('\r\n');
    const filename = `lead-machine-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Lead Machine export error:', error);
    return NextResponse.json({ error: 'Export mislukt' }, { status: 500 });
  }
}
