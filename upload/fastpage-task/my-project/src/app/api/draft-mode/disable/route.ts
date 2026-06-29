import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirect") || "/";
  const draft = await draftMode();
  draft.disable();
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
