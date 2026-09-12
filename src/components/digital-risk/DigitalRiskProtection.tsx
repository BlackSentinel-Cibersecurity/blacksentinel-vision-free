"use client";

import { Lock, Globe, AlertTriangle, Shield, Eye, ExternalLink, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const digitalRisks = [
  { id: 1, type: "Typosquatting", domain: "blacksentinel-vison.com", target: "blacksentinel.com", risk: "critical", status: "active", registrar: "GoDaddy", discovered: "2 days ago" },
  { id: 2, type: "Phishing", domain: "bsv-secure-login.net", target: "blacksentinel.com", risk: "critical", status: "active", registrar: "Namecheap", discovered: "1 week ago" },
  { id: 3, type: "Brand Impersonation", domain: "blacksentinel-inc.com", target: "blacksentinel.com", risk: "high", status: "monitoring", registrar: "Cloudflare", discovered: "3 days ago" },
  { id: 4, type: "Code Repository", domain: "github.com/leaked-bsv-keys", target: "Internal Code", risk: "high", status: "takedown", registrar: "GitHub", discovered: "5 days ago" },
  { id: 5, type: "Certificate Misuse", domain: "*.blacksentinel.xyz", target: "SSL Certificate", risk: "medium", status: "monitoring", registrar: "Let's Encrypt", discovered: "1 day ago" },
  { id: 6, type: "Fake App", domain: "Play Store: BlackSentinel VPN", target: "Brand", risk: "high", status: "active", registrar: "Google", discovered: "4 days ago" },
];

export default function DigitalRiskProtection() {
  return (
    <div className="p-6 space-y-6 fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center">
          <Lock className="w-5 h-5 text-[#FF6B00]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Digital Risk Protection</h2>
          <p className="text-xs text-[#3C3C3C]">Brand monitoring and external threat surface</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: "Monitored Assets", value: 247, icon: Eye, color: "#FF6B00" },
          { label: "Active Risks", value: 23, icon: AlertTriangle, color: "#EF4444" },
          { label: "Critical", value: 5, icon: Shield, color: "#EF4444" },
          { label: "Takedowns", value: 12, icon: Lock, color: "#22C55E" },
          { label: "Domains Monitored", value: 156, icon: Globe, color: "#3B82F6" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4" style={{ color: stat.color }} />
                <span className="text-[10px] text-[#3C3C3C] uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Risk Items */}
      <div className="glass-panel rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-white">Detected Digital Risks</span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-[11px]">
              <AlertTriangle className="w-3 h-3" /> {digitalRisks.filter(r => r.risk === "critical").length} Critical
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {digitalRisks.map((risk, i) => (
            <div key={i} className={cn("p-4 rounded-xl border transition-all hover:translate-x-1",
              risk.risk === "critical" ? "bg-[#EF4444]/5 border-[#EF4444]/20" :
              risk.risk === "high" ? "bg-[#FF8C1A]/5 border-[#FF8C1A]/20" :
              "bg-[#141414] border-[#232323]"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center",
                    risk.risk === "critical" ? "bg-[#EF4444]/10" : risk.risk === "high" ? "bg-[#FF8C1A]/10" : "bg-[#232323]"
                  )}>
                    <Globe className={cn("w-4 h-4",
                      risk.risk === "critical" ? "text-[#EF4444]" : risk.risk === "high" ? "text-[#FF8C1A]" : "text-[#3C3C3C]"
                    )} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] px-1.5 py-0.5 rounded" style={{
                        backgroundColor: risk.risk === "critical" ? "rgba(239,68,68,0.1)" : risk.risk === "high" ? "rgba(255,140,26,0.1)" : "rgba(35,35,35,1)",
                        color: risk.risk === "critical" ? "#EF4444" : risk.risk === "high" ? "#FF8C1A" : "#3C3C3C"
                      }}>{risk.type}</span>
                      <span className={cn("text-[9px] px-1.5 py-0.5 rounded",
                        risk.status === "active" ? "bg-[#EF4444]/10 text-[#EF4444]" :
                        risk.status === "takedown" ? "bg-[#22C55E]/10 text-[#22C55E]" :
                        "bg-[#FACC15]/10 text-[#FACC15]"
                      )}>{risk.status}</span>
                    </div>
                    <div className="text-sm text-white font-mono mt-1">{risk.domain}</div>
                    <div className="text-[10px] text-[#3C3C3C]">Targeting: {risk.target} • Registrar: {risk.registrar} • {risk.discovered}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-[10px] hover:bg-[#EF4444]/20 transition-colors">
                    Block
                  </button>
                  <ExternalLink className="w-4 h-4 text-[#3C3C3C] hover:text-[#FF6B00] cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
