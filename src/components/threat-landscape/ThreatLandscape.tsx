"use client";

import { useState } from "react";
import { Globe, Filter, Layers, Activity, Zap, AlertTriangle, Target, Bug, Server } from "lucide-react";
import { cn } from "@/lib/utils";

const regions = [
  { name: "North America", threats: 1847, campaigns: 89, topActor: "APT28", risk: 82 },
  { name: "Europe", threats: 1234, campaigns: 67, topActor: "APT29", risk: 75 },
  { name: "Asia Pacific", threats: 2156, campaigns: 112, topActor: "Lazarus Group", risk: 88 },
  { name: "Middle East", threats: 892, campaigns: 45, topActor: "APT33", risk: 71 },
  { name: "South America", threats: 567, campaigns: 23, topActor: "Fin7", risk: 58 },
  { name: "Africa", threats: 345, campaigns: 12, topActor: "Transparent Tribe", risk: 45 },
];

const threatTypes = [
  { type: "Ransomware", count: 1247, trend: "+23%", color: "#EF4444" },
  { type: "APT Espionage", count: 892, trend: "+12%", color: "#FF6B00" },
  { type: "Phishing", count: 3456, trend: "+45%", color: "#FACC15" },
  { type: "Supply Chain", count: 234, trend: "+67%", color: "#3B82F6" },
  { type: "DDoS", count: 1890, trend: "-5%", color: "#22C55E" },
  { type: "Zero-Day Exploits", count: 89, trend: "+120%", color: "#EF4444" },
];

const activeCampaigns = [
  { name: "Operation Shadow Network", actor: "APT28", target: "Government/Defense", status: "active", confidence: 88 },
  { name: "CryptoHeist 2026", actor: "Lazarus Group", target: "Cryptocurrency", status: "active", confidence: 85 },
  { name: "Healthcare Breach Wave", actor: "LockBit", target: "Healthcare", status: "active", confidence: 82 },
  { name: "TelecomSpy", actor: "Salt Typhoon", target: "Telecommunications", status: "active", confidence: 80 },
  { name: "Supply Chain Storm", actor: "APT29", target: "Technology", status: "emerging", confidence: 75 },
];

export default function ThreatLandscape() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#FF6B00]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Global Threat Landscape</h2>
            <p className="text-xs text-[#3C3C3C]">Real-time worldwide threat intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {["all", "apt", "ransomware", "phishing", "supply-chain"].map((f) => (
            <button key={f} onClick={() => setSelectedFilter(f)}
              className={cn("px-3 py-1.5 rounded-lg text-[11px] transition-all border",
                selectedFilter === f ? "bg-[#FF6B00]/10 border-[#FF6B00]/30 text-[#FF6B00]" : "border-[#232323] text-[#3C3C3C] hover:border-[#3C3C3C]"
              )}>
              {f === "all" ? "All Threats" : f.charAt(0).toUpperCase() + f.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map */}
      <div className="glass-panel rounded-xl p-5">
        <div className="relative h-96 bg-[#0B0B0B] rounded-lg overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3C3C3C 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }} />
          <svg className="w-full h-full" viewBox="0 0 100 60">
            {/* World regions */}
            <path d="M 10,20 Q 15,15 22,18 Q 28,22 35,20 Q 38,18 40,22 L 42,28 Q 38,32 32,35 Q 25,38 18,34 Q 12,30 10,20 Z" fill="#141414" stroke="#3C3C3C" strokeWidth="0.2" className="hover:fill-[#FF6B00]/5 cursor-pointer transition-all" />
            <path d="M 42,16 Q 48,12 56,15 Q 60,18 64,16 Q 68,14 72,16 L 74,22 Q 70,28 65,32 Q 58,36 52,33 Q 46,30 42,24 Q 40,20 42,16 Z" fill="#141414" stroke="#3C3C3C" strokeWidth="0.2" />
            <path d="M 68,24 Q 74,20 80,24 Q 86,28 92,24 Q 95,22 98,24 L 98,32 Q 94,36 88,40 Q 80,44 74,38 Q 68,32 68,24 Z" fill="#141414" stroke="#3C3C3C" strokeWidth="0.2" />
            <path d="M 18,38 Q 24,36 30,38 Q 32,40 28,44 Q 24,48 18,44 Q 16,41 18,38 Z" fill="#141414" stroke="#3C3C3C" strokeWidth="0.2" />
            <path d="M 46,36 Q 52,34 58,36 Q 60,40 56,46 Q 50,50 46,46 Q 44,41 46,36 Z" fill="#141414" stroke="#3C3C3C" strokeWidth="0.2" />

            {/* Animated threat points */}
            {[
              { x: 25, y: 24, size: 2, color: "#EF4444", label: "North America" },
              { x: 54, y: 22, size: 1.8, color: "#FF6B00", label: "Europe" },
              { x: 80, y: 28, size: 2.2, color: "#EF4444", label: "Asia Pacific" },
              { x: 58, y: 32, size: 1.2, color: "#FACC15", label: "Middle East" },
              { x: 24, y: 42, size: 0.8, color: "#22C55E", label: "South America" },
              { x: 50, y: 42, size: 0.6, color: "#3B82F6", label: "Africa" },
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy={pt.y} r={pt.size + 0.5} fill="none" stroke={pt.color} strokeWidth="0.15" opacity="0.4">
                  <animate attributeName="r" values={`${pt.size};${pt.size * 2.5};${pt.size}`} dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={pt.x} cy={pt.y} r={pt.size * 0.4} fill={pt.color}>
                  <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx={pt.x} cy={pt.y} r={pt.size * 0.8} fill={pt.color} opacity="0.1" />
              </g>
            ))}

            {/* Attack flow lines */}
            <line x1="54" y1="22" x2="25" y2="24" stroke="#FF6B00" strokeWidth="0.1" opacity="0.2" strokeDasharray="0.5,0.5">
              <animate attributeName="strokeDashoffset" values="0;-1" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="80" y1="28" x2="25" y2="24" stroke="#EF4444" strokeWidth="0.1" opacity="0.2" strokeDasharray="0.5,0.5">
              <animate attributeName="strokeDashoffset" values="0;-1" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="80" y1="28" x2="54" y2="22" stroke="#FF8C1A" strokeWidth="0.1" opacity="0.15" strokeDasharray="0.5,0.5">
              <animate attributeName="strokeDashoffset" values="0;-1" dur="3.5s" repeatCount="indefinite" />
            </line>
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 glass-panel rounded-lg p-3">
            <div className="text-[10px] text-[#3C3C3C] mb-2 font-medium">THREAT LEVEL</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#EF4444]" /><span className="text-[10px] text-[#D9D9D9]">Critical (9+)</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#FF6B00]" /><span className="text-[10px] text-[#D9D9D9]">High (7-8.9)</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#FACC15]" /><span className="text-[10px] text-[#D9D9D9]">Medium (4-6.9)</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#22C55E]" /><span className="text-[10px] text-[#D9D9D9]">Low (0-3.9)</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Regions */}
        <div className="col-span-2 glass-panel rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-[#FF6B00]" />
            <span className="text-sm font-semibold text-white">Regional Activity</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {regions.map((region, i) => (
              <div key={i} className={cn(
                "p-3 rounded-lg border transition-all cursor-pointer",
                selectedRegion === region.name
                  ? "bg-[#FF6B00]/5 border-[#FF6B00]/30"
                  : "bg-[#141414] border-[#232323] hover:border-[#3C3C3C]"
              )} onClick={() => setSelectedRegion(region.name)}>
                <div className="text-xs text-white font-medium">{region.name}</div>
                <div className="text-xl font-bold text-[#FF6B00] mt-1">{region.threats}</div>
                <div className="text-[10px] text-[#3C3C3C]">threats detected</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#3B82F6]/10 text-[#3B82F6]">{region.campaigns} campaigns</span>
                  <span className="text-[9px] text-[#3C3C3C]">Top: {region.topActor}</span>
                </div>
                <div className="mt-2 w-full h-1 bg-[#232323] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${region.risk}%`, background: region.risk >= 80 ? "#EF4444" : region.risk >= 60 ? "#FF6B00" : "#22C55E" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Types */}
        <div className="glass-panel rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-[#EF4444]" />
            <span className="text-sm font-semibold text-white">Threat Types</span>
          </div>
          <div className="space-y-3">
            {threatTypes.map((tt, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: tt.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white">{tt.type}</span>
                    <span className={cn("text-[10px]", tt.trend.startsWith("+") ? "text-[#EF4444]" : "text-[#22C55E]")}>{tt.trend}</span>
                  </div>
                  <div className="text-[10px] text-[#3C3C3C]">{tt.count.toLocaleString()} events</div>
                  <div className="w-full h-1 bg-[#232323] rounded-full mt-1 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(tt.count / 3500) * 100}%`, backgroundColor: tt.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Campaigns Table */}
      <div className="glass-panel rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-[#3B82F6]" />
          <span className="text-sm font-semibold text-white">Active Campaigns Worldwide</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#232323]">
                <th className="text-left text-[10px] text-[#3C3C3C] uppercase tracking-wider py-2 px-3">Campaign</th>
                <th className="text-left text-[10px] text-[#3C3C3C] uppercase tracking-wider py-2 px-3">Threat Actor</th>
                <th className="text-left text-[10px] text-[#3C3C3C] uppercase tracking-wider py-2 px-3">Target Sector</th>
                <th className="text-left text-[10px] text-[#3C3C3C] uppercase tracking-wider py-2 px-3">Status</th>
                <th className="text-left text-[10px] text-[#3C3C3C] uppercase tracking-wider py-2 px-3">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {activeCampaigns.map((camp, i) => (
                <tr key={i} className="border-b border-[#232323]/50 hover:bg-[#141414] cursor-pointer transition-colors">
                  <td className="py-3 px-3 text-xs text-white font-medium">{camp.name}</td>
                  <td className="py-3 px-3 text-xs text-[#FF6B00]">{camp.actor}</td>
                  <td className="py-3 px-3 text-xs text-[#D9D9D9]">{camp.target}</td>
                  <td className="py-3 px-3">
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full",
                      camp.status === "active" ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-[#FACC15]/10 text-[#FACC15]"
                    )}>{camp.status}</span>
                  </td>
                  <td className="py-3 px-3 text-xs text-[#D9D9D9]">{camp.confidence}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
