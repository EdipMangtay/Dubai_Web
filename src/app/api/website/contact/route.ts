import { NextRequest, NextResponse } from 'next/server';

const TRAVIA_TENANT_ID = 'a0000000-0000-0000-0000-000000000001';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, date, serviceType, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'İsim ve telefon zorunludur' },
        { status: 400 }
      );
    }

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || 'Misafir';
    const lastName = nameParts.slice(1).join(' ') || '';

    const crmBase = (process.env.CRM_INTERNAL_URL || 'http://localhost:3001').replace(
      /\/$/,
      ''
    );

    let crmResponse: Response;
    try {
      crmResponse = await fetch(`${crmBase}/api/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': TRAVIA_TENANT_ID,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: `${firstName.toLowerCase().replace(/[^a-z0-9]/g, '')}@website.lead`,
          phone,
          source: 'Website Contact Form',
          notes: `Hizmet: ${serviceType || 'vip-tour'} | Tarih: ${date || '-'} | Mesaj: ${message || '-'}`,
        }),
      });
    } catch (networkError) {
      console.error('CRM lead ingestion unreachable:', networkError);
      return NextResponse.json(
        { error: 'İşlem sırasında bir hata oluştu' },
        { status: 500 }
      );
    }

    if (!crmResponse.ok) {
      const crmErrorBody = await crmResponse.text();
      console.error('CRM lead ingestion failed:', crmResponse.status, crmErrorBody);
      return NextResponse.json(
        { error: 'İşlem sırasında bir hata oluştu' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        'VIP Rezervasyon talebiniz alındı. Concierge ekibimiz kısa süre içinde sizinle iletişime geçecektir.',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'İşlem sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}
