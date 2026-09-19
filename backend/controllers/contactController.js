
// Sends the contact/appointment request via the Resend API (https://resend.com)
// over plain HTTPS. We switched away from Nodemailer + Gmail SMTP because
// many hosts (including Render's free tier) block outbound SMTP connections
// entirely — HTTPS is never blocked, so this is the reliable option.

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(fields) {
  const rows = fields
    .filter((f) => f.value)
    .map(
      (f) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;color:#0B0F0D;border-bottom:1px solid #E4E9E4;white-space:nowrap;vertical-align:top;">${escapeHtml(
          f.label
        )}</td>
        <td style="padding:8px 12px;color:#1c211d;border-bottom:1px solid #E4E9E4;">${escapeHtml(
          f.value
        )}</td>
      </tr>`
    )
    .join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
    <div style="background:#0B0F0D;padding:20px 24px;">
      <span style="color:#8CC63F;font-size:20px;font-weight:bold;">Colorado Tech Rescue</span>
      <div style="color:#c9d3c9;font-size:13px;margin-top:4px;">New website contact / service request</div>
    </div>
    <table style="width:100%;border-collapse:collapse;background:#ffffff;">
      ${rows}
    </table>
    <div style="padding:14px 12px;color:#6b756e;font-size:12px;">
      Sent automatically from the coloradotechrescue.com contact form.
    </div>
  </div>`;
}

async function submitContactRequest(req, res) {
  try {
    const {
      name,
      phone,
      email,
      serviceType,
      deviceType,
      manufacturerModel,
      problemDescription,
      serviceLocation,
      preferredDate,
      preferredTime,
      message,
      photoBase64,
      photoFileName,
      // Honeypot field: real users never fill this in. Bots often do.
      website,
    } = req.body;

    if (website) {
      return res.status(200).json({ success: true });
    }

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Please fill in your name, phone number, and email so we can reach you.",
      });
    }

    const businessEmail = process.env.BUSINESS_EMAIL || "Coloradotechrescue@gmail.com";

    const fields = [
      { label: "Name", value: name },
      { label: "Phone", value: phone },
      { label: "Email", value: email },
      { label: "Service Needed", value: serviceType },
      { label: "Device Type", value: deviceType },
      { label: "Manufacturer / Model", value: manufacturerModel },
      { label: "Preferred Location", value: serviceLocation },
      { label: "Preferred Date", value: preferredDate },
      { label: "Preferred Time", value: preferredTime },
      { label: "Problem Description", value: problemDescription },
      { label: "Additional Message", value: message },
    ];

    const emailPayload = {
      from: process.env.RESEND_FROM || "Colorado Tech Rescue <onboarding@resend.dev>",
      to: [businessEmail],
      reply_to: email,
      subject: `New Service Request from ${name}${serviceType ? " — " + serviceType : ""}`,
      html: buildEmailHtml(fields),
    };

    // Optional photo, sent from the browser as a base64 data URL
    if (photoBase64 && typeof photoBase64 === "string" && photoBase64.startsWith("data:")) {
      const matches = photoBase64.match(/^data:(.+);base64,(.*)$/);
      if (matches) {
        emailPayload.attachments = [
          {
            filename: photoFileName || "photo.jpg",
            content: matches[2],
          },
        ];
      }
    }

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!resendRes.ok) {
      const errorBody = await resendRes.text();
      throw new Error(`Resend API error (${resendRes.status}): ${errorBody}`);
    }

    return res.status(200).json({
      success: true,
      message: "Thanks! Your request has been sent. We'll reach out shortly to confirm.",
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return res.status(500).json({
      success: false,
      message: "We couldn't send your request. Please call or text us at (719) 357-5532 instead.",
    });
  }
}

module.exports = { submitContactRequest };