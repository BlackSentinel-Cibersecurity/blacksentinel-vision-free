"use client";

import { useState } from "react";
import { Users, ExternalLink, Shield, Target, Globe, Calendar, Activity, AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockThreatActors } from "@/lib/mock-data";

const typeFilters = ["all", "apt", "ransomware", "cybercriminal", "hacktivist"];

export default function ThreatActors() {
  const [selectedActor, setSelectedActor] = useState(mockThreatActors[0]);
  const [selectedType, setSelectedType] = useState("all");

  const filtered = mockThreatActors.filter(a => selectedType === "all" || a.type === selectedType);

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-[#FF6B00]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Threat Actor Intelligence</h2>
            <p className="text-xs text-[#3C3C3C]">847 threat actor profiles tracked</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {typeFilters.map((type) => (
          <button key={type} onClick={() => setSelectedType(type)}
            className={cn("px-3 py-1.5 rounded-lg text-[11px] transition-all border",
              selectedType === type ? "bg-[#FF6B00]/10 border-[#FF6B00]/30 text-[#FF6B00]" : "border-[#232323] text-[#3C3C3C] hover:border-[#3C3C3C]"
            )}>
            {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Actor List */}
        <div className="col-span-5 space-y-2">
          {filtered.map((actor, i) => (
            <div key={i} onClick={() => setSelectedActor(actor)}
              className={cn("glass-panel rounded-xl p-4 cursor-pointer transition-all hover:border-[#FF6B00]/20",
                selectedActor.id === actor.id && "border-[#FF6B00]/40 bg-[#FF6B00]/5"
              )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#232323] flex items-center justify-center text-sm font-bold text-[#FF6B00]">
                    {actor.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm text-white font-semibold">{actor.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={cn("text-[9px] px-1.5 py-0.5 rounded-full",
                        actor.type === "apt" ? "bg-[#EF4444]/10 text-[#EF4444]" :
                        actor.type === "ransomware" ? "bg-[#FF8C1A]/10 text-[#FF8C1A]" :
                        "bg-[#3B82F6]/10 text-[#3B82F6]"
                      )}>{actor.type.toUpperCase()}</span>
                      <span className="text-[9px] text-[#3C3C3C]">{actor.origin}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] pulse-dot" />
                  <ChevronRight className="w-4 h-4 text-[#3C3C3C]" />
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {actor.aliases.slice(0, 2).map((alias, j) => (
                  <span key={j} className="text-[9px] text-[#3C3C3C] italic">{alias}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Actor Detail */}
        <div className="col-span-7 glass-panel rounded-xl p-6 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">{selectedActor.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn("text-[10px] px-2 py-0.5 rounded-full",
                  selectedActor.type === "apt" ? "bg-[#EF4444]/10 text-[#EF4444]" :
                  selectedActor.type === "ransomware" ? "bg-[#FF8C1A]/10 text-[#FF8C1A]" :
                  "bg-[#3B82F6]/10 text-[#3B82F6]"
                )}>{selectedActor.type.toUpperCase()}</span>
                <span className="text-[10px] text-[#3C3C3C]">Origin: {selectedActor.origin}</span>
                <span className="text-[10px] text-[#3C3C3C]">•</span>
                <span className="text-[10px] text-[#22C55E] flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> Active
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white font-medium">{selectedActor.confidence}%</div>
              <div className="text-[10px] text-[#3C3C3C]">Confidence</div>
            </div>
          </div>

          <p className="text-xs text-[#D9D9D9] leading-relaxed">{selectedActor.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-[#141414]">
              <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-2">Motivation</div>
              <div className="text-xs text-white">{selectedActor.motivation}</div>
            </div>
            <div className="p-3 rounded-lg bg-[#141414]">
              <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-2">Last Activity</div>
              <div className="text-xs text-white">{selectedActor.lastActivity.toLocaleDateString()}</div>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-2">Target Sectors</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedActor.targetSectors.map((sector, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#FF6B00]/10 text-[#FF6B00]">{sector}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-2">Target Countries</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedActor.targetCountries.map((country, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#3B82F6]/10 text-[#3B82F6]">{country}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-2">Tools & Malware</div>
            <div className="flex flex-wrap gap-1.5">
              {[...selectedActor.tools, ...selectedActor.malware].map((tool, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#232323] text-[#D9D9D9] font-mono">{tool}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-2">MITRE ATT&CK Techniques</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedActor.ttps.map((ttp, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#3B82F6]/10 text-[#3B82F6] font-mono">{ttp}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-2">Known Campaigns</div>
            <div className="space-y-1.5">
              {selectedActor.campaigns.map((camp, i) => (
                <div key={i} className="text-xs text-[#FF6B00] flex items-center gap-2 p-2 rounded bg-[#141414]">
                  <Target className="w-3 h-3" /> {camp}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
