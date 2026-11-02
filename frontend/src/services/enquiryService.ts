import {
  Enquiry,
  EnquiryApiErrorResponse,
  EnquiryApiResponse,
  EnquiryFieldErrors,
} from "../types/enquiry"

export class EnquiryConfigurationError extends Error {}

export class EnquirySubmissionError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string,
    public readonly fieldErrors?: EnquiryFieldErrors,
  ) {
    super(message)
    this.name = "EnquirySubmissionError"
  }
}

async function readResponse(
  response: Response,
): Promise<EnquiryApiResponse | EnquiryApiErrorResponse | null> {
  const contentType = response.headers.get("content-type")
  if (!contentType?.includes("application/json")) return null

  try {
    return (await response.json()) as EnquiryApiResponse | EnquiryApiErrorResponse
  } catch {
    return null
  }
}

export async function submitEnquiry(
  enquiry: Enquiry,
  options?: { signal?: AbortSignal },
): Promise<EnquiryApiResponse> {
  const endpoint = import.meta.env.VITE_ENQUIRY_API_ENDPOINT?.trim()
  if (!endpoint) {
    throw new EnquiryConfigurationError(
      "Online enquiry delivery is not configured yet. Please continue on WhatsApp, call, or email RAMBAI directly.",
    )
  }

  let response: Response
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
      signal: options?.signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      throw error
    throw new EnquirySubmissionError(
      "We could not connect to the enquiry service. Please try WhatsApp, phone, or email instead.",
    )
  }
  const body = await readResponse(response)

  if (!response.ok || body?.success !== true) {
    const errorBody = body?.success === false ? body : null
    throw new EnquirySubmissionError(
      errorBody?.message ??
        "We could not submit your enquiry. Please try WhatsApp, phone, or email instead.",
      response.status,
      errorBody?.code,
      errorBody?.fieldErrors,
    )
  }

  return body
}
