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
    } = req.body;

    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !serviceRequired?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (
      fullName.length > 100 ||
      email.length > 254 ||
      phone.length > 20 ||
      (companyName?.length || 0) > 150 ||
      (city?.length || 0) > 100 ||
      serviceRequired.length > 150 ||
      message.length > 3000
    ) {
      return res.status(400).json({
        success: false,
        message: "One or more fields exceed the allowed length.",
      });
    }

    await sendEnquiryEmail({
      fullName: fullName.trim(),
      companyName: companyName?.trim() || "",
      email: email.trim(),
      phone: phone.trim(),
      city: city?.trim() || "",
      serviceRequired: serviceRequired.trim(),
      message: message.trim(),
    });

    return res.status(200).json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
    });
  } catch (error) {
    console.error("Email delivery failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to submit your enquiry right now. Please try again later.",
    });
  }
};