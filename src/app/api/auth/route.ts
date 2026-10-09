import { NextResponse } from "next/server";
import { randomBytes, timingSafeEqual } from "crypto";
import jwt from "jsonwebtoken";

// ============================================================================
// Sign-in for the open-source edition: one operator account.
//
// SECURITY FIX: this used to hold three hard-coded demo accounts, and the
// login page printed the admin password ("blacksentinel") for anyone to read.
// The operator is now configured in .env (scripts/init-env.sh writes a random
// ADMIN_PASSWORD); with no ADMIN_PASSWORD, sign-in stays off instead of
// falling back to a known password.
//
// The signing secret no longer has a built-in fallback either: without a real
// JWT_SECRET (32+ characters) each server process uses a random one, and
// tokens end when it restarts. (Previously production threw on a missing
// JWT_SECRET, which made every sign-in fail under docker compose.)
// ============================================================================

function signingSecret(): string {
  const value = process.env.JWT_SECRET?.trim();
  if (value && value.length >= 32 && !/change|your[-_]|example|placeholder|insecure|dev[-_]/i.test(value)) {
    return value;
  }
  return randomBytes(32).toString("hex");
}

const SIGNING_SECRET = signingSecret();

const OPERATOR = {
  username: (process.env.ADMIN_USERNAME || "admin").trim(),
  role: "admin",
  name: "Administrator",
  email: (process.env.ADMIN_EMAIL || "admin@blacksentinel.local").trim(),
  permissions: ["read", "write", "admin", "export", "configure"],
};

function sameSecret(given: string, expected: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password || typeof username !== "string" || typeof password !== "string") {
      return NextResponse.json({
        success: false,
        message: "Username and password are required",
      }, { status: 400 });
    }

    const adminPassword = process.env.ADMIN_PASSWORD?.trim();
    if (!adminPassword || adminPassword.length < 12) {
      return NextResponse.json({
        success: false,
        message: "Sign-in is not configured. Set ADMIN_PASSWORD (12+ characters) in .env; scripts/init-env.sh creates one.",
      }, { status: 503 });
    }

    if (username.trim() !== OPERATOR.username || !sameSecret(password, adminPassword)) {
      return NextResponse.json({
        success: false,
        message: "Invalid username or password",
      }, { status: 401 });
    }

    const token = jwt.sign(
      { sub: OPERATOR.username, role: OPERATOR.role, permissions: OPERATOR.permissions },
      SIGNING_SECRET,
      { expiresIn: "24h" },
    );

    return NextResponse.json({
      success: true,
      token,
      user: OPERATOR,
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}
