import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { appendLeadToSheet } from "@/lib/google-sheets";
import { sendLeadNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

// Verify reCAPTCHA token with Google
async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.warn("reCAPTCHA secret key not configured");
    return { success: true }; // Allow if not configured
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return { success: data.success && data.score >= 0.5, score: data.score };
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return { success: false };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, zipCode, fenceType, message, campaign, recaptchaToken } = body ?? {};

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);
      if (!recaptchaResult.success) {
        console.warn(`reCAPTCHA failed with score: ${recaptchaResult.score}`);
        return NextResponse.json(
          { error: "Security verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

    const callbackRequest = await prisma.callbackRequest.create({
      data: {
        name: name ?? "",
        phone: phone ?? "",
        email: email ?? null,
        zipCode: zipCode ?? null,
        fenceType: fenceType ?? null,
        message: message ?? null,
        campaign: campaign ?? "general",
        status: "new",
      },
    });

    // Send to Google Sheets (non-blocking)
    appendLeadToSheet({
      name,
      phone,
      email,
      zipCode,
      fenceType,
      message,
      campaign,
    }).catch((err) => console.error("Google Sheets error:", err));

    // Send email notification (non-blocking)
    sendLeadNotification({
      name,
      phone,
      email,
      zipCode,
      fenceType,
      message,
      campaign,
    }).catch((err) => console.error("Email notification error:", err));

    return NextResponse.json(
      { success: true, id: callbackRequest?.id ?? null },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating callback request:", error);
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}
