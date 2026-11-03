
import { sendEnquiryEmail } from "../services/emailService.js";

export const submitContactForm = async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      email,
      phone,
      city,
      serviceRequired,
      message,
    } = req.body || {};

    // Ensure required fields are strings.
    const requiredFields = {
      fullName,
      email,
      phone,
      serviceRequired,
      message,
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (typeof value !== "string" || !value.trim()) {
        return res.status(400).json({
          success: false,
          message: "Please fill in all required fields.",
        });
      }
    }

    // Normalize input values.
    const cleanFullName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanCompanyName =
      typeof companyName === "string" ? companyName.trim() : "";
    const cleanCity =
      typeof city === "string" ? city.trim() : "";
    const cleanServiceRequired = serviceRequired.trim();
    const cleanMessage = message.trim();

    // Validate email format.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Validate field lengths.
    if (
      cleanFullName.length > 100 ||
      cleanEmail.length > 254 ||
      cleanPhone.length > 20 ||
      cleanCompanyName.length > 150 ||
      cleanCity.length > 100 ||
      cleanServiceRequired.length > 150 ||
      cleanMessage.length > 3000
    ) {
      return res.status(400).json({
        success: false,
        message: "One or more fields exceed the allowed length.",
      });
    }

    // Send enquiry email through Brevo.
    await sendEnquiryEmail({
      fullName: cleanFullName,
      companyName: cleanCompanyName,
      email: cleanEmail,
      phone: cleanPhone,
      city: cleanCity,
      serviceRequired: cleanServiceRequired,
      message: cleanMessage,
    });

    return res.status(200).json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
    });

  } catch (error) {
    console.error(
      "Email delivery failed:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to submit your enquiry right now. Please try again later.",
    });
  }
};
