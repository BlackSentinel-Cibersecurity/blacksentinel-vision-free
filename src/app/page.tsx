"use client";

// Free / Open-Source Edition: Dark Web Intel, AI Correlation, Threat
// Predictions, Attack Paths, AI Copilot, and Knowledge Graph are paid-plan
// only — their components are not included in this repository's source at
// all (not just disabled behind a flag). See blacksentinel.io for the full
// platform.

import { useState, useEffect, useSyncExternalStore } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import GlobalDashboard from "@/components/dashboard/GlobalDashboard";
import ThreatLandscape from "@/components/threat-landscape/ThreatLandscape";
import FeedEngine from "@/components/feeds/FeedEngine";
import IOCIntelligence from "@/components/ioc-intelligence/IOCIntelligence";
import ThreatActors from "@/components/threat-actors/ThreatActors";
import CampaignIntelligence from "@/components/campaigns/CampaignIntelligence";
import VulnerabilityIntelligence from "@/components/vulnerabilities/VulnerabilityIntelligence";
import MITREATTCK from "@/components/mitre/MITREATTCK";
import MalwareIntelligence from "@/components/malware/MalwareIntelligence";
import DigitalRiskProtection from "@/components/digital-risk/DigitalRiskProtection";

const modules: Record<string, React.ReactNode> = {
  dashboard: <GlobalDashboard />,
  landscape: <ThreatLandscape />,
  feeds: <FeedEngine />,
  ioc: <IOCIntelligence />,
  actors: <ThreatActors />,
  campaigns: <CampaignIntelligence />,
  vulnerabilities: <VulnerabilityIntelligence />,
  mitre: <MITREATTCK />,
  malware: <MalwareIntelligence />,
  "digital-risk": <DigitalRiskProtection />,
};

function subscribeToAuthStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getAuthSnapshot(): boolean | null {
  const stored = localStorage.getItem("bsv_auth");
  if (!stored) return false;
  try {
    const auth = JSON.parse(stored);
    if (auth.expires < Date.now()) {
      localStorage.removeItem("bsv_auth");
      return false;
    }
    return true;
  } catch {
    localStorage.removeItem("bsv_auth");
    return false;
  }
}

function getAuthServerSnapshot(): boolean | null {
  return null;
}

function AuthCheck({ children }: { children: React.ReactNode }) {
  // Reads an external, mutable source of truth (localStorage) rather than
  // deriving state that lives in React, so this syncs via
  // useSyncExternalStore instead of computing it in an effect.
  const authenticated = useSyncExternalStore(
    subscribeToAuthStorage,
    getAuthSnapshot,
    getAuthServerSnapshot
  );

  useEffect(() => {
    if (authenticated === false) {
      window.location.href = "/login";
    }
  }, [authenticated]);

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <img src="/logo.svg" alt="BlackSentinel Vision" className="w-12 h-12 animate-pulse" />
          <div className="text-sm text-[#3C3C3C]">Verifying access...</div>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return <>{children}</>;
}

export default function Home() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const changeModule = setActiveModule;

  return (
    <AuthCheck>
      <div className="flex h-screen bg-[#0B0B0B] overflow-hidden">
        <Sidebar activeModule={activeModule} onModuleChange={changeModule} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header activeModule={activeModule} onModuleChange={changeModule} />
          <main className="flex-1 overflow-y-auto">
            {modules[activeModule] || <GlobalDashboard />}
          </main>
        </div>
      </div>
    </AuthCheck>
  );
}
