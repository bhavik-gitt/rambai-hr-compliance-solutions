import { EnquiryDraft, EnquiryFieldErrors } from "../types/enquiry"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidIndianMobile(phone: string) {
  const digits = phone.replace(/\D/g, "")
  const localNumber =
    digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits
  return /^[6-9]\d{9}$/.test(localNumber)
}

export function validateEnquiry(
  enquiry: EnquiryDraft,
  allowedServices?: readonly string[],
): EnquiryFieldErrors {
  const errors: EnquiryFieldErrors = {}

  if (!enquiry.fullName.trim()) errors.fullName = "Please enter your full name."
  if (!emailPattern.test(enquiry.email.trim()))
    errors.email = "Please enter a valid business email."
  if (!isValidIndianMobile(enquiry.phone.trim())) {
    errors.phone = "Please enter a valid 10-digit Indian mobile number."
  }
  if (!enquiry.serviceRequired) {
    errors.serviceRequired = "Please select the service you require."
  } else if (
    allowedServices &&
    !allowedServices.includes(enquiry.serviceRequired)
  ) {
    errors.serviceRequired = "Please select a valid service."
  }
  if (enquiry.message.trim().length < 10) {
    errors.message =
      "Please share at least 10 characters about your requirement."
  }

  return errors
}

export function normalizeEnquiry(enquiry: EnquiryDraft): EnquiryDraft {
  return {
    fullName: enquiry.fullName.trim(),
    companyName: enquiry.companyName.trim(),
    email: enquiry.email.trim().toLowerCase(),
    phone: enquiry.phone.trim(),
    city: enquiry.city.trim(),
    serviceRequired: enquiry.serviceRequired,
    message: enquiry.message.trim(),
  }
}
