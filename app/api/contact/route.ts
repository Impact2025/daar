import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@daar.nl'
const FROM_NAME = 'DAAR'

interface ContactFormData {
  name: string
  email: string
  organization?: string
  phone?: string
  subject: string
  message: string
}

function getContactConfirmationTemplate(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bedankt voor je bericht</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F9FAFB;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <img src="https://daar.nl/image_c30806.png" alt="DAAR" style="width: 60px; height: 60px; margin-bottom: 16px;">
      <h1 style="color: #1A2332; font-size: 24px; font-weight: bold; margin: 0;">
        Bedankt voor je bericht!
      </h1>
    </div>

    <!-- Main Card -->
    <div style="background-color: white; border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        Beste ${data.name},
      </p>

      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        Bedankt voor je bericht! We hebben je vraag goed ontvangen en nemen zo snel mogelijk contact met je op, meestal binnen 24 uur op werkdagen.
      </p>

      <!-- Message Summary -->
      <div style="background-color: #EBF7F2; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h2 style="color: #1A2332; font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">
          Jouw bericht
        </h2>
        <div style="color: #374151; font-size: 14px;">
          <p style="margin: 0 0 8px 0;"><strong>Onderwerp:</strong> ${data.subject}</p>
          <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>

      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        In de tussentijd kun je alvast kijken in onze <a href="${process.env.NEXTAUTH_URL || 'https://daar.nl'}/kennisbank" style="color: #3BA273; text-decoration: none;">kennisbank</a> of direct de <a href="${process.env.NEXTAUTH_URL || 'https://daar.nl'}/quiz" style="color: #3BA273; text-decoration: none;">VrijwilligersCheck</a> doen.
      </p>

      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0;">
        Hartelijke groet,<br>
        <strong>Team DAAR</strong><br>
        <span style="color: #6B7280; font-size: 14px;">Vincent, Saviem & Thijs</span>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; color: #9CA3AF; font-size: 12px;">
      <p style="margin: 0 0 8px 0;">
        DAAR - Vrijwilligerswerk slimmer, leuker en duurzamer
      </p>
      <p style="margin: 0;">
        <a href="${process.env.NEXTAUTH_URL || 'https://daar.nl'}" style="color: #9CA3AF;">daar.nl</a>
      </p>
    </div>
  </div>
</body>
</html>
`
}

function getAdminContactNotificationTemplate(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nieuw contactformulier</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F9FAFB;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="color: #1A2332; font-size: 24px; font-weight: bold; margin: 0;">
        📬 Nieuw bericht via contactformulier
      </h1>
    </div>

    <!-- Main Card -->
    <div style="background-color: white; border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <!-- Contact Details -->
      <div style="margin-bottom: 24px;">
        <h2 style="color: #1A2332; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
          Contactgegevens
        </h2>

        <table style="width: 100%; color: #374151; font-size: 14px;">
          <tr>
            <td style="padding: 4px 0; width: 120px;"><strong>Naam:</strong></td>
            <td style="padding: 4px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;"><strong>E-mail:</strong></td>
            <td style="padding: 4px 0;"><a href="mailto:${data.email}" style="color: #3BA273;">${data.email}</a></td>
          </tr>
          ${data.organization ? `
          <tr>
            <td style="padding: 4px 0;"><strong>Organisatie:</strong></td>
            <td style="padding: 4px 0;">${data.organization}</td>
          </tr>
          ` : ''}
          ${data.phone ? `
          <tr>
            <td style="padding: 4px 0;"><strong>Telefoon:</strong></td>
            <td style="padding: 4px 0;"><a href="tel:${data.phone}" style="color: #3BA273;">${data.phone}</a></td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 4px 0;"><strong>Onderwerp:</strong></td>
            <td style="padding: 4px 0;">${data.subject}</td>
          </tr>
        </table>
      </div>

      <!-- Message -->
      <div style="background-color: #F3F4F6; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <h3 style="color: #1A2332; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">
          Bericht:
        </h3>
        <p style="color: #374151; font-size: 14px; margin: 0; white-space: pre-wrap; line-height: 1.6;">
${data.message}
        </p>
      </div>

      <!-- Quick Actions -->
      <div style="text-align: center;">
        <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" style="display: inline-block; background-color: #3BA273; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500; font-size: 14px; margin-right: 8px;">
          Beantwoorden
        </a>
        ${data.phone ? `
        <a href="tel:${data.phone}" style="display: inline-block; background-color: #1A2332; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500; font-size: 14px;">
          Bellen
        </a>
        ` : ''}
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; color: #9CA3AF; font-size: 12px;">
      <p style="margin: 0;">
        Dit bericht is verzonden via het contactformulier op daar.nl
      </p>
    </div>
  </div>
</body>
</html>
`
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Alle verplichte velden moeten ingevuld zijn' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Ongeldig e-mailadres' },
        { status: 400 }
      )
    }

    // Create or find lead in database
    let lead = await prisma.lead.findUnique({
      where: { email: body.email },
    })

    if (!lead) {
      lead = await prisma.lead.create({
        data: {
          email: body.email,
          name: body.name,
          phone: body.phone || null,
          organization: body.organization || null,
          source: 'CONTACT_FORM',
          notes: `Onderwerp: ${body.subject}\n\nBericht:\n${body.message}`,
        },
      })
    } else {
      // Update existing lead with new contact
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          name: body.name,
          phone: body.phone || lead.phone,
          organization: body.organization || lead.organization,
          notes: lead.notes
            ? `${lead.notes}\n\n---\n\nNieuw bericht (${new Date().toLocaleDateString('nl-NL')}):\nOnderwerp: ${body.subject}\n${body.message}`
            : `Onderwerp: ${body.subject}\n\nBericht:\n${body.message}`,
        },
      })
    }

    // Send emails
    if (resend) {
      const adminEmails = process.env.ADMIN_NOTIFICATION_EMAILS?.split(',') || ['info@daar.nl']

      // Send confirmation to user
      await resend.emails.send({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: body.email,
        subject: `Bedankt voor je bericht - ${body.subject}`,
        html: getContactConfirmationTemplate(body),
      })

      // Send notification to admin
      await resend.emails.send({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: adminEmails,
        subject: `Nieuw contactformulier: ${body.subject} - ${body.name}`,
        html: getAdminContactNotificationTemplate(body),
        replyTo: body.email,
      })

      console.log(`[Contact] Emails sent for ${body.email}`)
    } else {
      console.log('[Contact] Resend not configured - skipping emails')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Contact] Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Er is iets misgegaan bij het verwerken van je bericht' },
      { status: 500 }
    )
  }
}
