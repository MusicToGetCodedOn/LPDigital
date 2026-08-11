const { Resend } = require('resend');

const sendContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Bitte alle Pflichtfelder ausfüllen.' });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error('FEHLER: RESEND_API_KEY fehlt in der .env Datei!');
      return res.status(500).json({ error: 'Serverkonfiguration fehlerhaft.' });
    }

    const resend = new Resend(apiKey);

    // E-Mail über Resend versenden
    const response = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Standard-Sender für Gratis-Accounts
      to: ['loris.perez@proton.me'], // Deine Ziel-E-Mail-Adresse
      replyTo: email, // Damit du direkt auf die Absender-E-Mail antworten kannst
      subject: subject ? `Portfolio: ${subject}` : `Neue Kontaktanfrage von ${name}`,
      html: `
        <div style="font-family: Poppins, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #a855f7;">Neue Kontaktanfrage über dein Portfolio</h2>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Betreff:</strong> ${subject || 'Kein Betreff'}</p>
          <h3 style="margin-top: 20px;">Nachricht:</h3>
          <p style="background: #f4f4f5; padding: 15px; border-radius: 8px; whitespace: pre-line;">${message}</p>
        </div>
      `,
    });

    if (response.error) {
      console.error('Resend API Fehler:', response.error);
      return res.status(500).json({ error: 'Fehler beim Versenden der E-Mail.' });
    }

    console.log('E-Mail erfolgreich versendet:', response.data);
    return res.status(200).json({ success: true, message: 'Nachricht erfolgreich gesendet!' });

  } catch (error) {
    console.error('Kontakt-Controller Fehler:', error.message);
    return res.status(500).json({ error: 'Serverfehler beim Verarbeiten der Nachricht.' });
  }
};

module.exports = {
  sendContactMessage
};