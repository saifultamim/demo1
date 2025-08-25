import { apiDelay } from "@/utils/Delay";

export async function POST(req) {
  try {
    await apiDelay(500);
    const { phoneNumber, purpose } = await req.json();
    const result = phoneNumberSchema.safeParse({ phoneNumber });
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }
    const { isCompleteRegistration } =
      await studentService.checkRegistrationStatus(phoneNumber);
    if (purpose === OTP_PURPOSE.REGISTRATION && isCompleteRegistration) {
      return NextResponse.json(
        { error: "Account already registered" },
        { status: 400 }
      );
    }

    if (purpose === OTP_PURPOSE.FORGOT_PASSWORD && !isCompleteRegistration) {
      return NextResponse.json({ error: "Account not found" }, { status: 400 });
    }

    const { success, error } = await authService.sendOtp(phoneNumber);
    console.log("surcess ", success);
    if (!success) {
      console.error("OTP Send Error:", error);
      return NextResponse.json(
        {
          error: "Failed to process OTP request. Try again later",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to process OTP request. Try again later";
    console.error("API Error:", {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error: "Failed to process OTP request. Try again later",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
