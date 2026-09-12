"use client";

import { useState } from "react";
import { Rss, RefreshCw, CheckCircle, AlertTriangle, XCircle, Clock, ExternalLink, Filter, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockFeeds } from "@/lib/mock-data";
import { timeAgo } from "@/lib/utils";

export default function FeedEngine() {
  const [selectedType, setSelectedType] = useState("all");

  const typeColors: Record<string, string> = {
    osint: "#3B82F6",
    commercial: "#FF6B00",
    government: "#22C55E",
    darkweb: "#EF4444",
    isac: "#FACC15",
    cert: "#FF8C1A",
  };

  const statusIcons: Record<string, React.ReactNode> = {
    active: <CheckCircle className="w-3.5 h-3.5 text-[#22C55E]" />,
    error: <XCircle className="w-3.5 h-3.5 text-[#EF4444]" />,
    paused: <AlertTriangle className="w-3.5 h-3.5 text-[#FACC15]" />,
  };

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center">
            <Rss className="w-5 h-5 text-[#FF6B00]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Threat Feed Aggregation Engine</h2>
            <p className="text-xs text-[#3C3C3C]">Ingest, normalize, and correlate threat intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs hover:bg-[#FF6B00]/20 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Sync All
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#232323] text-[#D9D9D9] text-xs hover:border-[#3C3C3C] transition-colors">
            <Search className="w-3.5 h-3.5" /> Add Feed
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: "Total Feeds", value: mockFeeds.length, icon: Rss, color: "#FF6B00" },
          { label: "Active", value: mockFeeds.filter(f => f.status === "active").length, icon: CheckCircle, color: "#22C55E" },
          { label: "Total IOCs", value: "20.4M", icon: Filter, color: "#3B82F6" },
          { label: "Avg Confidence", value: "89%", icon: AlertTriangle, color: "#FACC15" },
          { label: "Last Sync", value: "2m ago", icon: Clock, color: "#FF8C1A" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4" style={{ color: stat.color }} />
                <span className="text-[10px] text-[#3C3C3C] uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        {["all", "osint", "commercial", "government", "darkweb"].map((type) => (
          <button key={type} onClick={() => setSelectedType(type)}
            className={cn("px-3 py-1.5 rounded-lg text-[11px] transition-all border",
              selectedType === type ? "bg-[#FF6B00]/10 border-[#FF6B00]/30 text-[#FF6B00]" : "border-[#232323] text-[#3C3C3C] hover:border-[#3C3C3C]"
            )}>
            {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="space-y-3">
        {mockFeeds.filter(f => selectedType === "all" || f.type === selectedType).map((feed, i) => (
          <div key={i} className="glass-panel rounded-xl p-4 hover:border-[#FF6B00]/20 transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${typeColors[feed.type]}15` }}>
                  <Rss className="w-5 h-5" style={{ color: typeColors[feed.type] }} />
                </div>
                <div>
                  <div className="text-sm text-white font-medium">{feed.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${typeColors[feed.type]}15`, color: typeColors[feed.type] }}>
                      {feed.type.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-[#3C3C3C]">Reliability: {feed.reliability}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-sm text-white font-medium">{feed.iocCount.toLocaleString()}</div>
                  <div className="text-[10px] text-[#3C3C3C]">IOCs</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white font-medium">{feed.confidence}%</div>
                  <div className="text-[10px] text-[#3C3C3C]">Confidence</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-[#3C3C3C]">{timeAgo(feed.lastUpdate)}</div>
                  <div className="text-[10px] text-[#3C3C3C]">Last update</div>
                </div>
                <div className="flex items-center gap-1.5">
                  {statusIcons[feed.status]}
                  <span className="text-[10px] capitalize text-[#D9D9D9]">{feed.status}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#3C3C3C] hover:text-[#FF6B00] transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deduplication & Conflict Resolution */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel rounded-xl p-5">
          <div className="text-sm font-semibold text-white mb-3">Deduplication Engine</div>
          <div className="space-y-2">
            {[
              { source: "AlienVault OTX", dupes: 23456, removed: "12.3%" },
              { source: "VirusTotal", dupes: 8923, removed: "5.7%" },
              { source: "Abuse.ch", dupes: 1234, removed: "8.9%" },
            ].map((d, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#232323]">
                <span className="text-xs text-[#D9D9D9]">{d.source}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#3C3C3C]">{d.dupes.toLocaleString()} dupes</span>
                  <span className="text-[10px] text-[#22C55E]">{d.removed} removed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel rounded-xl p-5">
          <div className="text-sm font-semibold text-white mb-3">Conflict Resolution</div>
          <div className="space-y-2">
            {[
              { ioc: "185.220.101.x", conflict: "Confidence mismatch", resolution: "Merged (highest priority)" },
              { ioc: "evil-domain.com", conflict: "Threat level conflict", resolution: "Upgraded to Critical" },
              { ioc: "a1b2c3d4...", conflict: "Duplicate hash", resolution: "Deduplicated" },
            ].map((c, i) => (
              <div key={i} className="py-2 border-b border-[#232323]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white font-mono">{c.ioc}</span>
                  <span className="text-[10px] text-[#22C55E]">{c.resolution}</span>
                </div>
                <div className="text-[10px] text-[#3C3C3C] mt-0.5">{c.conflict}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
