import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    platform: "BlackSentinel Vision",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NEXT_PUBLIC_BSV_ENV || "development",
    edition: "free",
    modules: [
      "dashboard",
      "threat-landscape",
      "feed-engine",
      "ioc-intelligence",
      "threat-actors",
      "campaign-intelligence",
      "vulnerability-intelligence",
      "mitre-attack",
      "malware-intel",
      "digital-risk-protection",
    ],
  });
}
