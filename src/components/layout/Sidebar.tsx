"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Globe, Rss, Fingerprint, Users, Crosshair,
  Shield, Target, Bug, Settings, ChevronLeft, ChevronRight,
  Eye, Lock, Zap, AlertTriangle
} from "lucide-react";

const modules = [
  { id: "dashboard", label: "Global Dashboard", icon: LayoutDashboard },
  { id: "landscape", label: "Threat Landscape", icon: Globe },
  { id: "feeds", label: "Feed Engine", icon: Rss },
  { id: "ioc", label: "IOC Intelligence", icon: Fingerprint },
  { id: "actors", label: "Threat Actors", icon: Users },
  { id: "campaigns", label: "Campaign Intel", icon: Crosshair },
  { id: "vulnerabilities", label: "Vulnerability Intel", icon: Shield },
  { id: "mitre", label: "MITRE ATT&CK", icon: Target },
  { id: "malware", label: "Malware Intel", icon: Bug },
  { id: "digital-risk", label: "Digital Risk", icon: Lock },
];

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen bg-[#0B0B0B] border-r border-[#232323] flex flex-col transition-all duration-300 relative z-20",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-[#232323] gap-3">
        <img src="/logo.svg" alt="BlackSentinel Vision" className="w-8 h-8 flex-shrink-0" />
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-white tracking-wider">BLACKSENTINEL</div>
            <div className="text-[10px] text-[#FF6B00] tracking-[0.2em]">VISION</div>
          </div>
        )}
      </div>

      {/* Status */}
      <div className={cn("px-4 py-3 border-b border-[#232323]", collapsed && "px-2")}>
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#22C55E] pulse-dot" />
            <span className="text-[11px] text-[#D9D9D9]">System Operational</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 rounded-full bg-[#22C55E] pulse-dot" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {modules.map((mod) => {
          const Icon = mod.icon;
          const isActive = activeModule === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => onModuleChange(mod.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all duration-200 mb-0.5 group",
                isActive
                  ? "bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20"
                  : "text-[#D9D9D9]/70 hover:bg-[#232323] hover:text-[#D9D9D9] border border-transparent"
              )}
              title={collapsed ? mod.label : undefined}
            >
              <Icon className={cn("w-4 h-4 flex-shrink-0", isActive && "text-[#FF6B00]")} />
              {!collapsed && <span className="truncate flex-1 text-left">{mod.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse button */}
      <div className="p-2 border-t border-[#232323]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[#D9D9D9]/50 hover:bg-[#232323] hover:text-[#D9D9D9] transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
