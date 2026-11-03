
const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });

export const sendEnquiryEmail = async (enquiry) => {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.EMAIL_USER;

  if (!apiKey || !senderEmail) {
    throw new Error("Brevo email configuration is missing.");
  }

  const {
    fullName,
    companyName,
    email,
    phone,
    city,
    serviceRequired,
    message,
  } = enquiry;

  const safe = {
    fullName: escapeHtml(fullName),
    companyName: escapeHtml(companyName || "Not provided"),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    city: escapeHtml(city || "Not provided"),
    serviceRequired: escapeHtml(serviceRequired),
    message: escapeHtml(message).replace(/\r?\n/g, "<br>"),
  };

  const htmlContent = `
    <div style="margin:0;padding:30px 12px;background:#f4f5f1;font-family:Arial,sans-serif;">
      <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;">

        <div style="background:#003D35;padding:25px 20px;text-align:center;">
          <img
            src="https://rambai.vercel.app/images/rambai-logo.png"
            alt="RAMBAI HR & Compliance Solutions"
            width="250"
            style="display:block;width:250px;max-width:100%;height:auto;margin:0 auto;border:0;"
          />
        </div>

        <div style="padding:28px 30px;">
          <h2 style="margin:0 0 8px;color:#003D35;font-size:21px;">
            New Customer Enquiry
          </h2>

          <p style="margin:0;color:#666;font-size:14px;line-height:1.6;">
            A visitor has submitted a new enquiry through the RAMBAI website.
            Please review the customer details below.
          </p>

          <div style="margin-top:25px;padding:18px;background:#f8f6f0;border-left:4px solid #D4AF37;border-radius:4px;">
            <p style="margin:0 0 5px;color:#777;font-size:11px;text-transform:uppercase;letter-spacing:1px;">
              Service Requested
            </p>
            <strong style="color:#003D35;font-size:17px;">
              ${safe.serviceRequired}
            </strong>
          </div>

          <h3 style="margin:27px 0 14px;color:#003D35;font-size:15px;">
            Customer Contact Information
          </h3>

          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:11px 8px;border-bottom:1px solid #eeeeee;color:#777;width:35%;">Full Name</td>
              <td style="padding:11px 8px;border-bottom:1px solid #eeeeee;color:#222;font-weight:bold;">${safe.fullName}</td>
            </tr>
            <tr>
              <td style="padding:11px 8px;border-bottom:1px solid #eeeeee;color:#777;">Company</td>
              <td style="padding:11px 8px;border-bottom:1px solid #eeeeee;color:#222;">${safe.companyName}</td>
            </tr>
            <tr>
              <td style="padding:11px 8px;border-bottom:1px solid #eeeeee;color:#777;">Email</td>
              <td style="padding:11px 8px;border-bottom:1px solid #eeeeee;">
                <a href="mailto:${safe.email}" style="color:#006b5c;text-decoration:none;">${safe.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:11px 8px;border-bottom:1px solid #eeeeee;color:#777;">Phone</td>
              <td style="padding:11px 8px;border-bottom:1px solid #eeeeee;color:#222;">${safe.phone}</td>
            </tr>
            <tr>
              <td style="padding:11px 8px;border-bottom:1px solid #eeeeee;color:#777;">City</td>
              <td style="padding:11px 8px;border-bottom:1px solid #eeeeee;color:#222;">${safe.city}</td>
            </tr>
          </table>

          <h3 style="margin:27px 0 12px;color:#003D35;font-size:15px;">
            Customer Message
          </h3>

          <div style="padding:18px;background:#f8f6f0;border-left:4px solid #D4AF37;border-radius:5px;color:#333;font-size:14px;line-height:1.7;">
            ${safe.message}
          </div>

          <p style="margin:25px 0 0;color:#777;font-size:12px;line-height:1.6;">
            You can reply directly to this email to respond to the customer.
          </p>
        </div>

        <div style="background:#002C26;padding:20px;text-align:center;">
          <p style="margin:0;color:#D4AF37;font-size:13px;font-weight:bold;">
            RAMBAI HR &amp; COMPLIANCE SOLUTIONS
          </p>
          <p style="margin:8px 0 0;color:#ffffff;font-size:12px;">
            People • Compliance • Progress
          </p>
          <p style="margin:8px 0 0;color:#cccccc;font-size:11px;">
            Ahmedabad, Gujarat, India
          </p>
          <p style="margin:12px 0 0;color:#aaaaaa;font-size:10px;">
            Automated notification from the RAMBAI website.
          </p>
        </div>

      </div>
    </div>
  `;

  const textContent = `
RAMBAI HR & COMPLIANCE SOLUTIONS
New Website Enquiry

Name: ${fullName}
Company: ${companyName || "Not provided"}
Email: ${email}
Phone: ${phone}
City: ${city || "Not provided"}
Service: ${serviceRequired}

Message:
${message}
  `;

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "RAMBAI Website",
        email: senderEmail,
      },
      to: [
        {
          email: "info.rambai@gmail.com",
          name: "RAMBAI",
        },
      ],
      replyTo: {
        email,
        name: fullName,
      },
      subject: `New Website Enquiry - ${fullName}`,
      htmlContent,
      textContent,
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Brevo API error:", response.status, errorDetails);
    throw new Error("Unable to send enquiry email.");
  }

  const result = await response.json();
  console.log("Enquiry email accepted by Brevo:", result.messageId);

  return result;
};
