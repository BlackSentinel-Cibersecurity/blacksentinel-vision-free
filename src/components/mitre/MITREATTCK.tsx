"use client";

import { useState } from "react";
import { Target, Shield, AlertTriangle, ExternalLink, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { mitreData } from "@/lib/mock-data";

const tacticColors: Record<string, string> = {
  "TA0043": "#8B5CF6", "TA0042": "#EC4899", "TA0001": "#EF4444", "TA0002": "#F97316",
  "TA0003": "#EAB308", "TA0004": "#84CC16", "TA0005": "#22C55E", "TA0006": "#14B8A6",
  "TA0007": "#06B6D4", "TA0008": "#3B82F6", "TA0009": "#6366F1", "TA0011": "#8B5CF6",
  "TA0010": "#A855F7", "TA0040": "#EF4444",
};

export default function MITREATTCK() {
  const [selectedTactic, setSelectedTactic] = useState<string | null>(null);
  const [view, setView] = useState<"matrix" | "coverage">("matrix");

  return (
    <div className="p-6 space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-[#FF6B00]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">MITRE ATT&CK Intelligence</h2>
            <p className="text-xs text-[#3C3C3C]">Complete tactical framework mapping</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setView("matrix")}
            className={cn("px-3 py-1.5 rounded-lg text-[11px] transition-all border",
              view === "matrix" ? "bg-[#FF6B00]/10 border-[#FF6B00]/30 text-[#FF6B00]" : "border-[#232323] text-[#3C3C3C]"
            )}>Matrix</button>
          <button onClick={() => setView("coverage")}
            className={cn("px-3 py-1.5 rounded-lg text-[11px] transition-all border",
              view === "coverage" ? "bg-[#FF6B00]/10 border-[#FF6B00]/30 text-[#FF6B00]" : "border-[#232323] text-[#3C3C3C]"
            )}>Coverage</button>
        </div>
      </div>

      {/* Coverage Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Techniques", value: 201, color: "#FF6B00" },
          { label: "Covered by Detection", value: 147, color: "#22C55E" },
          { label: "Gaps Identified", value: 54, color: "#EF4444" },
          { label: "BlackSentinel Coverage", value: "89%", color: "#3B82F6" },
        ].map((stat, i) => (
          <div key={i} className="glass-panel rounded-xl p-4">
            <div className="text-[10px] text-[#3C3C3C] uppercase tracking-wider">{stat.label}</div>
            <div className="text-2xl font-bold mt-1" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* MITRE Matrix */}
      <div className="glass-panel rounded-xl p-5 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {mitreData.tactics.map((tactic, i) => (
            <div key={tactic.id} className="w-48 flex-shrink-0">
              <div className={cn("px-3 py-2 rounded-t-lg text-xs font-semibold text-white",
                selectedTactic === tactic.id ? "opacity-100" : "opacity-80"
              )} style={{ backgroundColor: tacticColors[tactic.id] || "#FF6B00" }}>
                {tactic.name}
              </div>
              <div className="bg-[#141414] rounded-b-lg border border-[#232323] border-t-0 p-2 space-y-1.5 min-h-[200px]">
                {tactic.techniques.map((tech, j) => (
                  <div key={j} className={cn(
                    "p-2 rounded text-[10px] cursor-pointer transition-all border",
                    j % 5 === 0 ? "bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444]" :
                    j % 3 === 0 ? "bg-[#FF8C1A]/10 border-[#FF8C1A]/20 text-[#FF8C1A]" :
                    "bg-[#22C55E]/10 border-[#22C55E]/20 text-[#22C55E]"
                  )}>
                    <div className="font-mono">{tech}</div>
                    <div className="text-[8px] opacity-60 mt-0.5">
                      {j % 5 === 0 ? "Detected" : j % 3 === 0 ? "Partial" : "Covered"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#22C55E]/20 border border-[#22C55E]/30" /><span className="text-[10px] text-[#D9D9D9]">Detected</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#FF8C1A]/20 border border-[#FF8C1A]/30" /><span className="text-[10px] text-[#D9D9D9]">Partial Coverage</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#EF4444]/20 border border-[#EF4444]/30" /><span className="text-[10px] text-[#D9D9D9]">Not Detected</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#3B82F6]/20 border border-[#3B82F6]/30" /><span className="text-[10px] text-[#D9D9D9]">BlackSentinel Native</span></div>
      </div>
    </div>
  );
}
