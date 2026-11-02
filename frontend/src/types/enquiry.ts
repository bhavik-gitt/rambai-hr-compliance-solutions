export type Enquiry = {
  fullName: string
  companyName: string
  email: string
  phone: string
  city: string
  serviceRequired: string
  message: string
  submittedAt: string
}

export type EnquiryDraft = Omit<Enquiry, 'submittedAt'>

export type EnquiryField = keyof EnquiryDraft

export type EnquiryFieldErrors = Partial<Record<EnquiryField, string>>

export type EnquiryApiResponse = {
  success: true
  message?: string
  enquiryId?: string
}

export type EnquiryApiErrorResponse = {
  success: false
  message?: string
  code?: string
  fieldErrors?: EnquiryFieldErrors
}
