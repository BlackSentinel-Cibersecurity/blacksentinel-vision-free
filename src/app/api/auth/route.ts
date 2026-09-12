import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ============================================================================
// SECURITY NOTICE — this is still a demo/stub auth layer, not a real user
// store. It was previously WORSE than that: plaintext passwords compared
// directly, and "JWT" tokens that were never actually signed (the code just
// base64-encoded a hardcoded string "blacksentinel-secret" as if it were a
// signature — anyone reading the source could forge an admin token without
// ever calling this endpoint, since there was no real secret and no real
// HMAC). Fixed here:
//   - Passwords are now bcrypt hashes, never compared in plaintext.
//   - Tokens are now real HMAC-signed JWTs via a required JWT_SECRET.
// What is NOT fixed (out of scope for a security patch, needs a real design
// decision): these 3 accounts are still a hardcoded in-memory array, not a
// real user database — anyone with these credentials still gets in, and
// there's no way to add/remove/rotate users without editing source. Replace
// this with a real user store (e.g. the same Supabase-backed auth the main
// website already uses) before this product is exposed to real customers.
// ============================================================================

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === "production") {
  throw new Error(
    "JWT_SECRET is required in production. Refusing to start with no signing secret.",
  );
}
// Dev-only fallback so `next dev` keeps working without extra setup; never
// reached in production because of the throw above.
const SIGNING_SECRET = JWT_SECRET || "dev-only-insecure-secret-do-not-deploy";

interface DemoUser {
  username: string;
  passwordHash: string;
  role: string;
  name: string;
  email: string;
  permissions: string[];
}

const users: DemoUser[] = [
  {
    username: "admin",
    // bcrypt hash of the original demo password — kept for continuity of
    // the demo accounts, never stored/compared as plaintext now.
    passwordHash: "$2a$12$j6k99ALPsjp6amLABmUPr.8EYAfHvlfdTDCh3TSyJE6J0UN4eySHK",
    role: "admin",
    name: "Administrator",
    email: "admin@blacksentinel.com",
    permissions: ["read", "write", "admin", "export", "configure"],
  },
  {
    username: "analyst",
    passwordHash: "$2a$12$WIYnFOyktyPV5CC/1Dyrw..Ly.vpBVi6pWZlVRtnIs70EP0mZwT/u",
    role: "analyst",
    name: "Threat Analyst",
    email: "analyst@blacksentinel.com",
    permissions: ["read", "write", "export"],
  },
  {
    username: "viewer",
    passwordHash: "$2a$12$/IlA0RUTA2t5s5tS..mE3uQRnzE07mQaIDJhjE5/fjV5AYEHxHFfm",
    role: "viewer",
    name: "Read Only User",
    email: "viewer@blacksentinel.com",
    permissions: ["read"],
  },
];

function generateToken(user: DemoUser): string {
  return jwt.sign(
    { sub: user.username, role: user.role, permissions: user.permissions },
    SIGNING_SECRET,
    { expiresIn: "24h" },
  );
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

    const user = users.find((u) => u.username === username);
    // Always run bcrypt.compare, even when the user isn't found, against a
    // fixed dummy hash — comparing only on a match would let a timing
    // difference (real hash check vs. instant return) leak which usernames
    // exist.
    const isValid = user
      ? await bcrypt.compare(password, user.passwordHash)
      : await bcrypt.compare(password, "$2a$12$j6k99ALPsjp6amLABmUPr.8EYAfHvlfdTDCh3TSyJE6J0UN4eySHK");

    if (!user || !isValid) {
      return NextResponse.json({
        success: false,
        message: "Invalid username or password",
      }, { status: 401 });
    }

    const token = generateToken(user);

    return NextResponse.json({
      success: true,
      token,
      user: {
        username: user.username,
        role: user.role,
        name: user.name,
        email: user.email,
        permissions: user.permissions,
      },
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}
