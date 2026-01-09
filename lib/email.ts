import { Resend } from 'resend'

// Initialize Resend - will gracefully handle missing API key
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@daar.nl'
const FROM_NAME = 'DAAR'

interface BookingEmailData {
  name: string
  email: string
  organization?: string
  bookingType: string
  duration: number
  date: string
  time: string
  meetingLink?: string
  notes?: string
}

// Email template for booking confirmation to the customer
function getBookingConfirmationTemplate(data: BookingEmailData): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Afspraak bevestiging</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F9FAFB;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <img src="https://daar.nl/image_c30806.png" alt="DAAR" style="width: 60px; height: 60px; margin-bottom: 16px;">
      <h1 style="color: #1A2332; font-size: 24px; font-weight: bold; margin: 0;">
        Je afspraak is bevestigd!
      </h1>
    </div>

    <!-- Main Card -->
    <div style="background-color: white; border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        Beste ${data.name},
      </p>

      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        Bedankt voor het plannen van een afspraak met Team DAAR! Wij kijken ernaar uit om je te spreken.
      </p>

      <!-- Booking Details -->
      <div style="background-color: #EBF7F2; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h2 style="color: #1A2332; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
          ${data.bookingType}
        </h2>

        <div style="color: #374151; font-size: 14px;">
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="margin-right: 8px;">📅</span>
            <span><strong>Datum:</strong> ${data.date}</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="margin-right: 8px;">⏰</span>
            <span><strong>Tijd:</strong> ${data.time}</span>
          </div>
          <div style="display: flex; align-items: center;">
            <span style="margin-right: 8px;">⏱️</span>
            <span><strong>Duur:</strong> ${data.duration} minuten</span>
          </div>
        </div>

        ${data.meetingLink ? `
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(59, 162, 115, 0.2);">
          <a href="${data.meetingLink}" style="display: inline-block; background-color: #3BA273; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500; font-size: 14px;">
            Deelnemen aan videogesprek
          </a>
        </div>
        ` : ''}
      </div>

      ${data.notes ? `
      <div style="background-color: #F3F4F6; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
        <p style="color: #6B7280; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">Je opmerkingen:</p>
        <p style="color: #374151; font-size: 14px; margin: 0; font-style: italic;">"${data.notes}"</p>
      </div>
      ` : ''}

      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        Heb je vragen of moet je de afspraak wijzigen? Neem gerust contact met ons op via
        <a href="mailto:hallo@daar.nl" style="color: #3BA273; text-decoration: none;">hallo@daar.nl</a>.
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
        DAAR - Het Sociale Hart
      </p>
      <p style="margin: 0;">
        Vrijwilligersbeheer met impact
      </p>
    </div>
  </div>
</body>
</html>
`
}

// Email template for admin notification
function getAdminNotificationTemplate(data: BookingEmailData): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nieuwe afspraak</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F9FAFB;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="color: #1A2332; font-size: 24px; font-weight: bold; margin: 0;">
        🗓️ Nieuwe afspraak gepland
      </h1>
    </div>

    <!-- Main Card -->
    <div style="background-color: white; border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <div style="background-color: #EBF7F2; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h2 style="color: #1A2332; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
          ${data.bookingType}
        </h2>

        <table style="width: 100%; color: #374151; font-size: 14px;">
          <tr>
            <td style="padding: 4px 0; width: 100px;"><strong>Datum:</strong></td>
            <td style="padding: 4px 0;">${data.date}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;"><strong>Tijd:</strong></td>
            <td style="padding: 4px 0;">${data.time}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;"><strong>Duur:</strong></td>
            <td style="padding: 4px 0;">${data.duration} minuten</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="color: #1A2332; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">
          Contactgegevens
        </h3>

        <table style="width: 100%; color: #374151; font-size: 14px;">
          <tr>
            <td style="padding: 4px 0; width: 100px;"><strong>Naam:</strong></td>
            <td style="padding: 4px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;"><strong>Email:</strong></td>
            <td style="padding: 4px 0;"><a href="mailto:${data.email}" style="color: #3BA273;">${data.email}</a></td>
          </tr>
          ${data.organization ? `
          <tr>
            <td style="padding: 4px 0;"><strong>Organisatie:</strong></td>
            <td style="padding: 4px 0;">${data.organization}</td>
          </tr>
          ` : ''}
        </table>
      </div>

      ${data.notes ? `
      <div style="background-color: #F3F4F6; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
        <p style="color: #6B7280; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">Opmerkingen:</p>
        <p style="color: #374151; font-size: 14px; margin: 0;">"${data.notes}"</p>
      </div>
      ` : ''}

      <div style="text-align: center;">
        <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/afspraken" style="display: inline-block; background-color: #1A2332; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500; font-size: 14px;">
          Bekijk in admin panel
        </a>
      </div>
    </div>
  </div>
</body>
</html>
`
}

// Email template for cancellation
function getCancellationTemplate(data: BookingEmailData): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Afspraak geannuleerd</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F9FAFB;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="color: #1A2332; font-size: 24px; font-weight: bold; margin: 0;">
        Afspraak geannuleerd
      </h1>
    </div>

    <div style="background-color: white; border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        Beste ${data.name},
      </p>

      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        Je afspraak voor <strong>${data.bookingType}</strong> op <strong>${data.date}</strong> om <strong>${data.time}</strong> is geannuleerd.
      </p>

      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        Wil je een nieuwe afspraak plannen? Dat kan via onze website of neem contact met ons op.
      </p>

      <div style="text-align: center; margin-bottom: 24px;">
        <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/afspraak" style="display: inline-block; background-color: #3BA273; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500; font-size: 14px;">
          Nieuwe afspraak plannen
        </a>
      </div>

      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0;">
        Hartelijke groet,<br>
        <strong>Team DAAR</strong>
      </p>
    </div>
  </div>
</body>
</html>
`
}

export async function sendBookingConfirmation(data: BookingEmailData): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.log('[Email] Resend not configured - skipping booking confirmation email')
    return { success: true }
  }

  try {
    await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: data.email,
      subject: `Bevestiging: ${data.bookingType} op ${data.date}`,
      html: getBookingConfirmationTemplate(data),
    })

    console.log(`[Email] Booking confirmation sent to ${data.email}`)
    return { success: true }
  } catch (error) {
    console.error('[Email] Failed to send booking confirmation:', error)
    return { success: false, error: 'Failed to send confirmation email' }
  }
}

export async function sendAdminNotification(data: BookingEmailData): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.log('[Email] Resend not configured - skipping admin notification email')
    return { success: true }
  }

  const adminEmails = process.env.ADMIN_NOTIFICATION_EMAILS?.split(',') || ['hallo@daar.nl']

  try {
    await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: adminEmails,
      subject: `Nieuwe afspraak: ${data.bookingType} met ${data.name}`,
      html: getAdminNotificationTemplate(data),
    })

    console.log(`[Email] Admin notification sent to ${adminEmails.join(', ')}`)
    return { success: true }
  } catch (error) {
    console.error('[Email] Failed to send admin notification:', error)
    return { success: false, error: 'Failed to send admin notification' }
  }
}

export async function sendCancellationEmail(data: BookingEmailData): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.log('[Email] Resend not configured - skipping cancellation email')
    return { success: true }
  }

  try {
    await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: data.email,
      subject: `Afspraak geannuleerd: ${data.bookingType} op ${data.date}`,
      html: getCancellationTemplate(data),
    })

    console.log(`[Email] Cancellation email sent to ${data.email}`)
    return { success: true }
  } catch (error) {
    console.error('[Email] Failed to send cancellation email:', error)
    return { success: false, error: 'Failed to send cancellation email' }
  }
}

// Helper to format date/time for emails
export function formatBookingDateTime(startTime: Date): { date: string; time: string } {
  return {
    date: startTime.toLocaleDateString('nl-NL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    time: startTime.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }
}
