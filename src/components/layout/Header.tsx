"use client";

import { Bell, Search, Settings, User, AlertTriangle, ChevronDown, ExternalLink, X, LogOut } from "lucide-react";
import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeModule: string;
  onModuleChange?: (module: string) => void;
}

const moduleNames: Record<string, string> = {
  dashboard: "Global Dashboard",
  landscape: "Global Threat Landscape",
  feeds: "Threat Feed Aggregation Engine",
  ioc: "IOC Intelligence",
  actors: "Threat Actor Intelligence",
  campaigns: "Campaign Intelligence",
  vulnerabilities: "Vulnerability Intelligence",
  mitre: "MITRE ATT&CK Intelligence",
  malware: "Malware Intelligence",
  "digital-risk": "Digital Risk Protection",
};

const notifications = [
  { id: 1, title: "APT28 C2 Server Detected in Network Range", severity: "critical", source: "BlackSentinel Guardian", time: "2m ago", action: "ioc", read: false },
  { id: 2, title: "CVE-2026-3821 Exploit Attempts Detected", severity: "critical", source: "BlackSentinel Pulse", time: "15m ago", action: "vulnerabilities", read: false },
  { id: 3, title: "LockBit 3.0 Ransomware Hash Detected", severity: "high", source: "BlackSentinel Nexus", time: "1h ago", action: "malware", read: false },
  { id: 4, title: "Typosquatting Domain Registered for Brand", severity: "medium", source: "Digital Risk Protection", time: "3h ago", action: "digital-risk", read: true },
  { id: 5, title: "New APT29 Campaign Identified", severity: "high", source: "Threat Actor Intelligence", time: "12h ago", action: "actors", read: true },
];

function subscribeToAuthStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getUserNameSnapshot(): string {
  const stored = localStorage.getItem("bsv_auth");
  if (!stored) return "Admin";
  try {
    const auth = JSON.parse(stored);
    return auth.user?.name || auth.user?.username || "Admin";
  } catch {
    return "Admin";
  }
}

function getUserNameServerSnapshot(): string {
  return "Admin";
}

function getUserRoleSnapshot(): string {
  const stored = localStorage.getItem("bsv_auth");
  if (!stored) return "Administrator";
  try {
    const auth = JSON.parse(stored);
    const role = auth.user?.role;
    return role ? role.charAt(0).toUpperCase() + role.slice(1) : "Administrator";
  } catch {
    return "Administrator";
  }
}

function getUserRoleServerSnapshot(): string {
  return "Administrator";
}

export default function Header({ activeModule, onModuleChange }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Derived from an external, mutable source (localStorage), so this reads
  // via useSyncExternalStore rather than copying it into local state in an
  // effect.
  const userName = useSyncExternalStore(
    subscribeToAuthStorage,
    getUserNameSnapshot,
    getUserNameServerSnapshot
  );
  const userRole = useSyncExternalStore(
    subscribeToAuthStorage,
    getUserRoleSnapshot,
    getUserRoleServerSnapshot
  );
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !searchOpen) { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") { setSearchOpen(false); setNotifOpen(false); }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [searchOpen]);

  const handleNotifClick = (action: string) => {
    setNotifOpen(false);
    if (onModuleChange) onModuleChange(action);
  };

  const handleLogout = () => {
    localStorage.removeItem("bsv_auth");
    window.location.href = "/login";
  };

  return (
    <header className="h-14 bg-[#0B0B0B] border-b border-[#232323] flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-[15px] font-semibold text-white">
          {moduleNames[activeModule] || "Dashboard"}
        </h1>
        <div className="flex items-center gap-1.5 ml-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] pulse-dot" />
          <span className="text-[11px] text-[#FF6B00] font-medium">LIVE</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative" ref={searchRef}>
          <button onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-lg hover:bg-[#232323] text-[#D9D9D9]/70 hover:text-[#D9D9D9] transition-colors">
            <Search className="w-4 h-4" />
          </button>
          {searchOpen && (
            <div className="absolute right-0 top-12 w-96 glass-panel rounded-xl p-3 fade-in z-50">
              <input autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search IOCs, actors, CVEs, campaigns..."
                className="w-full bg-[#141414] border border-[#3C3C3C] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#3C3C3C] focus:outline-none focus:border-[#FF6B00] transition-colors" />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#3C3C3C]">Press / to focus search</span>
                <span className="text-[11px] text-[#3C3C3C]">ESC to close</span>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={notifRef}>
          <button onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-lg hover:bg-[#232323] text-[#D9D9D9]/70 hover:text-[#D9D9D9] transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-12 w-96 glass-panel rounded-xl overflow-hidden fade-in z-50">
              <div className="p-3 border-b border-[#232323] flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Alerts</div>
                  <div className="text-[11px] text-[#3C3C3C]">{notifications.filter(n => !n.read).length} unread notifications</div>
                </div>
                <button onClick={() => setNotifOpen(false)} className="text-[#3C3C3C] hover:text-white"><X className="w-4 h-4" /></button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif, i) => (
                  <div key={i}
                    onClick={() => handleNotifClick(notif.action)}
                    className={cn("px-4 py-3 border-b border-[#232323] hover:bg-[#141414] cursor-pointer transition-colors",
                      !notif.read && "bg-[#FF6B00]/5"
                    )}>
                    <div className="flex items-start gap-2">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                        notif.severity === "critical" ? "bg-[#EF4444]" :
                        notif.severity === "high" ? "bg-[#FF8C1A]" : "bg-[#FACC15]"
                      )} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-white font-medium">{notif.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-[#3C3C3C]">{notif.source}</span>
                          <span className="text-[10px] text-[#3C3C3C]">|</span>
                          <span className="text-[10px] text-[#3C3C3C]">{notif.time}</span>
                        </div>
                        <div className="text-[10px] text-[#FF6B00] mt-1 flex items-center gap-1">
                          Click to view <ExternalLink className="w-2.5 h-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center border-t border-[#232323]">
                <button onClick={() => { setNotifOpen(false); if (onModuleChange) onModuleChange("dashboard"); }}
                  className="text-xs text-[#FF6B00] hover:text-[#FF8C1A] transition-colors">
                  View All Alerts
                </button>
              </div>
            </div>
          )}
        </div>

        <button className="p-2 rounded-lg hover:bg-[#232323] text-[#D9D9D9]/70 hover:text-[#D9D9D9] transition-colors">
          <Settings className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 ml-2 pl-3 border-l border-[#232323]">
          <div className="w-8 h-8 rounded-lg bg-[#232323] flex items-center justify-center">
            <User className="w-4 h-4 text-[#D9D9D9]" />
          </div>
          <div className="text-right">
            <div className="text-xs text-white font-medium">{userName}</div>
            <div className="text-[10px] text-[#3C3C3C]">{userRole}</div>
          </div>
          <button onClick={handleLogout}
            className="p-1.5 rounded-lg hover:bg-[#EF4444]/10 text-[#D9D9D9]/50 hover:text-[#EF4444] transition-colors ml-1"
            title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
