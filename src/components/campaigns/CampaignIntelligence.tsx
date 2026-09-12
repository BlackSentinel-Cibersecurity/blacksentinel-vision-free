"use client";

import { useState } from "react";
import { Target, ExternalLink, Shield, Users, Bug, Calendar, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockCampaigns } from "@/lib/mock-data";

export default function CampaignIntelligence() {
  const [selectedCampaign, setSelectedCampaign] = useState(mockCampaigns[0]);

  return (
    <div className="p-6 space-y-6 fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center">
          <Target className="w-5 h-5 text-[#FF6B00]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Campaign Intelligence</h2>
          <p className="text-xs text-[#3C3C3C]">234 active campaigns tracked globally</p>
        </div>
      </div>

      {/* Campaign Visualization - Attack Chain */}
      <div className="glass-panel rounded-xl p-5">
        <div className="text-sm font-semibold text-white mb-4">Campaign Attack Chain - {selectedCampaign.name}</div>
        <div className="flex items-center justify-between gap-2">
          {["Recon", "Weaponize", "Deliver", "Exploit", "Install", "C2", "Actions"].map((phase, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className={cn("w-full h-12 rounded-lg flex items-center justify-center text-xs font-medium transition-all",
                i < 5 ? "bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20" :
                i === 5 ? "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 glow-red" :
                "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20"
              )}>{phase}</div>
              {i < 6 && <div className="w-full h-0.5 bg-gradient-to-r from-[#FF6B00]/30 to-[#FF6B00]/10" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Campaign List */}
        <div className="col-span-5 space-y-3">
          {mockCampaigns.map((camp, i) => (
            <div key={i} onClick={() => setSelectedCampaign(camp)}
              className={cn("glass-panel rounded-xl p-4 cursor-pointer transition-all hover:border-[#FF6B00]/20",
                selectedCampaign.id === camp.id && "border-[#FF6B00]/40 bg-[#FF6B00]/5"
              )}>
              <div className="flex items-center justify-between">
                <div className="text-sm text-white font-semibold">{camp.name}</div>
                <span className={cn("text-[9px] px-2 py-0.5 rounded-full",
                  camp.status === "active" ? "bg-[#22C55E]/10 text-[#22C55E]" :
                  camp.status === "emerging" ? "bg-[#FACC15]/10 text-[#FACC15]" :
                  "bg-[#3C3C3C]/30 text-[#3C3C3C]"
                )}>{camp.status}</span>
              </div>
              <div className="text-[10px] text-[#FF6B00] mt-1">{camp.threatActor}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {camp.malware.map((m, j) => (
                  <span key={j} className="text-[9px] px-1.5 py-0.5 rounded bg-[#EF4444]/10 text-[#EF4444] font-mono">{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Campaign Detail */}
        <div className="col-span-7 glass-panel rounded-xl p-6 space-y-5">
          <div>
            <h3 className="text-xl font-bold text-white">{selectedCampaign.name}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF6B00]/10 text-[#FF6B00]">{selectedCampaign.threatActor}</span>
              <span className="text-[10px] text-[#3C3C3C]">Confidence: {selectedCampaign.confidence}%</span>
            </div>
          </div>

          <p className="text-xs text-[#D9D9D9] leading-relaxed">{selectedCampaign.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-[#141414]">
              <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-2">Start Date</div>
              <div className="text-xs text-white flex items-center gap-1"><Calendar className="w-3 h-3" /> {selectedCampaign.startDate.toLocaleDateString()}</div>
            </div>
            <div className="p-3 rounded-lg bg-[#141414]">
              <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-2">Status</div>
              <div className="text-xs text-[#22C55E] flex items-center gap-1"><Activity className="w-3 h-3" /> Active</div>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-2">Target Sectors</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedCampaign.targetSectors.map((s, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#FF6B00]/10 text-[#FF6B00]">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-2">Malware Used</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedCampaign.malware.map((m, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#EF4444]/10 text-[#EF4444] font-mono">{m}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-2">MITRE Techniques</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedCampaign.ttps.map((t, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#3B82F6]/10 text-[#3B82F6] font-mono">{t}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-2">Related IOCs</div>
            <div className="space-y-1.5">
              {selectedCampaign.iocs.map((ioc, i) => (
                <div key={i} className="text-xs text-white font-mono p-2 rounded bg-[#141414] border border-[#232323]">{ioc}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
