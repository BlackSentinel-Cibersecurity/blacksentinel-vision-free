"use client";

import { useState } from "react";
import { Fingerprint, Search, Filter, Download, ExternalLink, Copy, Eye, Shield, Globe, Server } from "lucide-react";
import { cn, getThreatColor } from "@/lib/utils";
import { mockIOCs } from "@/lib/mock-data";

const iocTypes = ["all", "ip", "domain", "url", "hash", "email", "certificate"];

export default function IOCIntelligence() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIOC, setSelectedIOC] = useState(mockIOCs[0]);

  const filteredIOCs = mockIOCs.filter(ioc =>
    (selectedType === "all" || ioc.type === selectedType) &&
    (searchQuery === "" || ioc.value.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center">
            <Fingerprint className="w-5 h-5 text-[#FF6B00]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">IOC Intelligence</h2>
            <p className="text-xs text-[#3C3C3C]">2,847,392 indicators tracked across all sources</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#232323] text-[#D9D9D9] text-xs hover:border-[#3C3C3C] transition-colors">
            <Download className="w-3.5 h-3.5" /> Export STIX
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs hover:bg-[#FF6B00]/20 transition-colors">
            <Fingerprint className="w-3.5 h-3.5" /> Add IOC
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3C3C3C]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search IOCs..."
            className="w-full bg-[#141414] border border-[#232323] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#3C3C3C] focus:outline-none focus:border-[#FF6B00] transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          {iocTypes.map((type) => (
            <button key={type} onClick={() => setSelectedType(type)}
              className={cn("px-3 py-1.5 rounded-lg text-[11px] transition-all border",
                selectedType === type ? "bg-[#FF6B00]/10 border-[#FF6B00]/30 text-[#FF6B00]" : "border-[#232323] text-[#3C3C3C] hover:border-[#3C3C3C]"
              )}>
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* IOC Table + Detail */}
      <div className="grid grid-cols-12 gap-4">
        {/* Table */}
        <div className="col-span-8 glass-panel rounded-xl overflow-hidden">
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-[#141414] z-10">
                <tr className="border-b border-[#232323]">
                  <th className="text-left text-[10px] text-[#3C3C3C] uppercase tracking-wider py-3 px-4">Type</th>
                  <th className="text-left text-[10px] text-[#3C3C3C] uppercase tracking-wider py-3 px-4">Value</th>
                  <th className="text-left text-[10px] text-[#3C3C3C] uppercase tracking-wider py-3 px-4">Level</th>
                  <th className="text-left text-[10px] text-[#3C3C3C] uppercase tracking-wider py-3 px-4">Confidence</th>
                  <th className="text-left text-[10px] text-[#3C3C3C] uppercase tracking-wider py-3 px-4">Source</th>
                  <th className="text-left text-[10px] text-[#3C3C3C] uppercase tracking-wider py-3 px-4">Last Seen</th>
                </tr>
              </thead>
              <tbody>
                {filteredIOCs.map((ioc, i) => (
                  <tr key={i} onClick={() => setSelectedIOC(ioc)}
                    className={cn("border-b border-[#232323]/50 hover:bg-[#FF6B00]/5 cursor-pointer transition-all",
                      selectedIOC.id === ioc.id && "bg-[#FF6B00]/10 border-l-2 border-l-[#FF6B00]"
                    )}>
                    <td className="py-3 px-4">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#232323] text-[#D9D9D9] font-mono uppercase">{ioc.type}</span>
                    </td>
                    <td className="py-3 px-4 text-xs text-white font-mono max-w-[200px] truncate">{ioc.value}</td>
                    <td className="py-3 px-4">
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium",
                        ioc.threatLevel === "critical" ? "bg-[#EF4444]/10 text-[#EF4444]" :
                        ioc.threatLevel === "high" ? "bg-[#FF8C1A]/10 text-[#FF8C1A]" :
                        "bg-[#FACC15]/10 text-[#FACC15]"
                      )}>{ioc.threatLevel}</span>
                    </td>
                    <td className="py-3 px-4 text-xs text-[#D9D9D9]">{ioc.confidence}%</td>
                    <td className="py-3 px-4 text-xs text-[#3C3C3C]">{ioc.source}</td>
                    <td className="py-3 px-4 text-xs text-[#3C3C3C]">{ioc.lastSeen.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="col-span-4 glass-panel rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">IOC Details</span>
            <button className="p-1.5 rounded-lg hover:bg-[#232323] transition-colors">
              <Copy className="w-3.5 h-3.5 text-[#3C3C3C]" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-1">Type</div>
              <div className="text-sm text-white font-mono uppercase">{selectedIOC.type}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-1">Value</div>
              <div className="text-sm text-white font-mono break-all">{selectedIOC.value}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-1">Threat Level</div>
              <span className={cn("text-xs px-2 py-0.5 rounded-full",
                selectedIOC.threatLevel === "critical" ? "bg-[#EF4444]/10 text-[#EF4444]" :
                selectedIOC.threatLevel === "high" ? "bg-[#FF8C1A]/10 text-[#FF8C1A]" :
                "bg-[#FACC15]/10 text-[#FACC15]"
              )}>{selectedIOC.threatLevel.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-1">Confidence</div>
                <div className="text-sm text-white">{selectedIOC.confidence}%</div>
              </div>
              <div>
                <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-1">Reputation</div>
                <div className="text-sm text-white">{selectedIOC.reputation}/100</div>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-1">Tags</div>
              <div className="flex flex-wrap gap-1">
                {selectedIOC.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#232323] text-[#D9D9D9]">{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-1">Campaigns</div>
              <div className="space-y-1">
                {selectedIOC.campaigns.map((camp, i) => (
                  <div key={i} className="text-xs text-[#FF6B00] flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#FF6B00]" /> {camp}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-1">MITRE Tactics</div>
              <div className="flex flex-wrap gap-1">
                {selectedIOC.mitreTactics.map((tactic, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#3B82F6]/10 text-[#3B82F6] font-mono">{tactic}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-1">Context</div>
              <div className="text-xs text-[#D9D9D9]">{selectedIOC.context}</div>
            </div>
            {selectedIOC.geolocation && (
              <div>
                <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider mb-1">Geolocation</div>
                <div className="text-xs text-[#D9D9D9] flex items-center gap-1"><Globe className="w-3 h-3" /> {selectedIOC.geolocation}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
