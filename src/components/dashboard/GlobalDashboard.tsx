"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Globe, AlertTriangle, Shield, Users, Bug, Eye, TrendingUp,
  Activity, Zap, Target, Lock, Radio, Server, Database, Fingerprint
} from "lucide-react";
import { cn, formatNumber, getThreatColor } from "@/lib/utils";
import { mockThreatActors, mockCampaigns, mockVulnerabilities, mockAlerts } from "@/lib/mock-data";

function AnimatedNumber({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setCurrent(value); clearInterval(timer); }
      else setCurrent(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span>{formatNumber(current)}</span>;
}

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return (
    <svg className="w-full h-8" viewBox="0 0 100 30">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M ${data.map((v, i) => `${(i / (data.length - 1)) * 100},${30 - ((v - min) / range) * 25}`).join(" L ")} L 100,30 L 0,30 Z`}
        fill={`url(#grad-${color})`}
      />
      <polyline
        points={data.map((v, i) => `${(i / (data.length - 1)) * 100},${30 - ((v - min) / range) * 25}`).join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ThreatGauge({ score, label }: { score: number; label: string }) {
  const color = score >= 80 ? "#EF4444" : score >= 60 ? "#FF8C1A" : score >= 40 ? "#FACC15" : "#22C55E";
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference * 0.75;
  return (
    <div className="flex flex-col items-center">
      <svg className="w-28 h-28" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#232323" strokeWidth="6" strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`} strokeDashoffset="0" transform="rotate(135 50 50)" strokeLinecap="round" />
        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="6" strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`} strokeDashoffset={offset} transform="rotate(135 50 50)" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${color}40)` }} />
        <text x="50" y="48" textAnchor="middle" fill={color} fontSize="22" fontWeight="bold">{score}</text>
        <text x="50" y="62" textAnchor="middle" fill="#3C3C3C" fontSize="8">/ 100</text>
      </svg>
      <span className="text-xs text-[#3C3C3C] mt-1">{label}</span>
    </div>
  );
}

function WorldMapWidget() {
  const attackPoints = [
    { x: 30, y: 35, intensity: 0.9, label: "USA" },
    { x: 52, y: 30, intensity: 0.8, label: "Russia" },
    { x: 55, y: 40, intensity: 0.7, label: "China" },
    { x: 48, y: 32, intensity: 0.6, label: "Europe" },
    { x: 70, y: 45, intensity: 0.5, label: "Asia" },
    { x: 25, y: 55, intensity: 0.4, label: "S. America" },
    { x: 50, y: 55, intensity: 0.3, label: "Africa" },
    { x: 80, y: 60, intensity: 0.2, label: "Oceania" },
  ];

  return (
    <div className="relative w-full h-full bg-[#141414] rounded-xl overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #3C3C3C 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }} />
      <svg className="w-full h-full" viewBox="0 0 100 70">
        {/* Simplified world outline */}
        <path d="M 15,25 Q 20,22 25,24 Q 28,26 30,25 Q 33,23 35,25 L 36,28 Q 34,30 32,32 Q 28,35 24,33 Q 20,31 15,25 Z" fill="#232323" stroke="#3C3C3C" strokeWidth="0.3" />
        <path d="M 45,22 Q 50,20 55,22 Q 58,24 60,23 Q 63,21 66,23 L 67,28 Q 65,32 62,35 Q 58,38 54,36 Q 50,34 46,30 Q 44,27 45,22 Z" fill="#232323" stroke="#3C3C3C" strokeWidth="0.3" />
        <path d="M 62,30 Q 66,28 70,30 Q 74,32 78,30 Q 82,28 85,30 L 86,36 Q 83,40 78,42 Q 72,44 68,40 Q 64,36 62,30 Z" fill="#232323" stroke="#3C3C3C" strokeWidth="0.3" />
        <path d="M 22,40 Q 28,38 32,40 Q 34,42 30,45 Q 26,48 22,45 Q 20,42 22,40 Z" fill="#232323" stroke="#3C3C3C" strokeWidth="0.3" />
        <path d="M 46,42 Q 52,40 56,42 Q 58,46 55,50 Q 50,54 46,50 Q 44,46 46,42 Z" fill="#232323" stroke="#3C3C3C" strokeWidth="0.3" />
        <path d="M 75,50 Q 80,48 85,50 Q 87,52 83,55 Q 78,58 75,55 Q 73,52 75,50 Z" fill="#232323" stroke="#3C3C3C" strokeWidth="0.3" />
        
        {attackPoints.map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r={pt.intensity * 1.5 + 0.5} fill="none" stroke="#FF6B00" strokeWidth="0.2" opacity="0.4">
              <animate attributeName="r" values={`${pt.intensity + 0.5};${pt.intensity * 2 + 1};${pt.intensity + 0.5}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={pt.x} cy={pt.y} r="0.6" fill="#FF6B00">
              <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx={pt.x} cy={pt.y} r={pt.intensity * 0.8} fill="#FF6B00" opacity="0.15" />
          </g>
        ))}

        {/* Attack lines */}
        <line x1="52" y1="30" x2="30" y2="35" stroke="#FF6B00" strokeWidth="0.15" opacity="0.3" strokeDasharray="1,1">
          <animate attributeName="strokeDashoffset" values="0;-2" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="55" y1="40" x2="30" y2="35" stroke="#EF4444" strokeWidth="0.15" opacity="0.3" strokeDasharray="1,1">
          <animate attributeName="strokeDashoffset" values="0;-2" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="55" y1="40" x2="48" y2="32" stroke="#FF8C1A" strokeWidth="0.15" opacity="0.3" strokeDasharray="1,1">
          <animate attributeName="strokeDashoffset" values="0;-2" dur="1.8s" repeatCount="indefinite" />
        </line>
      </svg>
      <div className="absolute bottom-2 left-3 flex items-center gap-3">
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" /><span className="text-[9px] text-[#3C3C3C]">Critical</span></div>
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" /><span className="text-[9px] text-[#3C3C3C]">Active</span></div>
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" /><span className="text-[9px] text-[#3C3C3C]">Monitoring</span></div>
      </div>
    </div>
  );
}

function AlertFeed() {
  return (
    <div className="space-y-2">
      {mockAlerts.map((alert, i) => (
        <div key={i} className={cn(
          "p-3 rounded-lg border transition-all hover:translate-x-1 cursor-pointer",
          alert.severity === "critical" ? "bg-[#EF4444]/5 border-[#EF4444]/20 hover:border-[#EF4444]/40" :
          alert.severity === "high" ? "bg-[#FF8C1A]/5 border-[#FF8C1A]/20 hover:border-[#FF8C1A]/40" :
          "bg-[#FACC15]/5 border-[#FACC15]/20 hover:border-[#FACC15]/40"
        )}>
          <div className="flex items-start gap-2">
            <AlertTriangle className={cn("w-3.5 h-3.5 mt-0.5 flex-shrink-0",
              alert.severity === "critical" ? "text-[#EF4444]" : alert.severity === "high" ? "text-[#FF8C1A]" : "text-[#FACC15]"
            )} />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-white font-medium truncate">{alert.title}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-[#3C3C3C]">{alert.source}</span>
                <span className="text-[10px] text-[#3C3C3C]">•</span>
                <span className="text-[10px] text-[#3C3C3C]">{alert.timestamp.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GlobalDashboard() {
  const chartData1 = useMemo(() => Array.from({ length: 24 }, () => Math.random() * 100 + 20), []);
  const chartData2 = useMemo(() => Array.from({ length: 24 }, () => Math.random() * 80 + 10), []);
  const chartData3 = useMemo(() => Array.from({ length: 24 }, () => Math.random() * 60 + 30), []);

  const stats = [
    { label: "Active IOCs", value: 2847392, icon: Fingerprint, color: "#FF6B00", change: "+12.3%", up: true },
    { label: "Threat Actors", value: 847, icon: Users, color: "#EF4444", change: "+5", up: true },
    { label: "Active Campaigns", value: 234, icon: Target, color: "#3B82F6", change: "+8", up: true },
    { label: "CVEs Tracked", value: 45231, icon: Shield, color: "#22C55E", change: "+127", up: true },
    { label: "Feeds Active", value: 156, icon: Radio, color: "#FACC15", change: "99.8%", up: true },
    { label: "Malware Samples", value: 18234567, icon: Bug, color: "#EF4444", change: "+89K", up: true },
  ];

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Risk Score Row */}
      <div className="grid grid-cols-12 gap-4">
        {/* Global Threat Score */}
        <div className="col-span-3 glass-panel rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[11px] text-[#3C3C3C] uppercase tracking-wider">Global Risk Score</div>
              <div className="text-3xl font-bold text-[#EF4444] mt-1">78</div>
              <div className="text-[11px] text-[#EF4444] mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +3.2% from last week
              </div>
            </div>
            <ThreatGauge score={78} label="Risk" />
          </div>
          <MiniChart data={chartData1} color="#EF4444" />
        </div>

        {/* Threat Activity */}
        <div className="col-span-3 glass-panel rounded-xl p-5">
          <div className="text-[11px] text-[#3C3C3C] uppercase tracking-wider">Threat Activity</div>
          <div className="text-3xl font-bold text-[#FF6B00] mt-1">1,247</div>
          <div className="text-[11px] text-[#FF6B00] mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.7% from yesterday
          </div>
          <MiniChart data={chartData2} color="#FF6B00" />
        </div>

        {/* Campaigns Active */}
        <div className="col-span-3 glass-panel rounded-xl p-5">
          <div className="text-[11px] text-[#3C3C3C] uppercase tracking-wider">Active Campaigns</div>
          <div className="text-3xl font-bold text-[#3B82F6] mt-1">234</div>
          <div className="text-[11px] text-[#3B82F6] mt-1 flex items-center gap-1">
            <Activity className="w-3 h-3" /> 47 targeting your sector
          </div>
          <MiniChart data={chartData3} color="#3B82F6" />
        </div>

        {/* Organization Risk */}
        <div className="col-span-3 glass-panel rounded-xl p-5">
          <div className="text-[11px] text-[#3C3C3C] uppercase tracking-wider">Organization Risk</div>
          <div className="text-3xl font-bold text-[#FACC15] mt-1">62</div>
          <div className="text-[11px] text-[#FACC15] mt-1 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> 3 assets at risk
          </div>
          <MiniChart data={chartData1.slice(0, 12)} color="#FACC15" />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-6 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel rounded-xl p-4 group hover:border-[#FF6B00]/20 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <Icon className="w-4 h-4" style={{ color: stat.color }} />
                <span className="text-[10px] text-[#22C55E] flex items-center gap-0.5">
                  <TrendingUp className="w-2.5 h-2.5" /> {stat.change}
                </span>
              </div>
              <div className="text-xl font-bold text-white mt-2">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="text-[10px] text-[#3C3C3C] mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-4">
        {/* World Map */}
        <div className="col-span-8 glass-panel rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#FF6B00]" />
              <span className="text-sm font-semibold text-white">Global Threat Activity</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#3C3C3C]">Last 24h</span>
              <span className="text-[10px] text-[#FF6B00]">1,247 events</span>
            </div>
          </div>
          <div className="h-64">
            <WorldMapWidget />
          </div>
        </div>

        {/* Alert Feed */}
        <div className="col-span-4 glass-panel rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
              <span className="text-sm font-semibold text-white">Live Alerts</span>
            </div>
            <span className="text-[10px] text-[#EF4444]">3 critical</span>
          </div>
          <div className="h-64 overflow-y-auto pr-1">
            <AlertFeed />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-12 gap-4">
        {/* Top APT Groups */}
        <div className="col-span-4 glass-panel rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-[#EF4444]" />
            <span className="text-sm font-semibold text-white">Top Threat Actors</span>
          </div>
          <div className="space-y-3">
            {mockThreatActors.slice(0, 5).map((actor, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-pointer">
                <div className="w-7 h-7 rounded-lg bg-[#232323] flex items-center justify-center text-[10px] font-bold text-[#FF6B00] group-hover:bg-[#FF6B00]/10 transition-colors">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white font-medium truncate">{actor.name}</div>
                  <div className="text-[10px] text-[#3C3C3C] truncate">{actor.origin} • {actor.type.toUpperCase()}</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] pulse-dot" />
                  <span className="text-[10px] text-[#22C55E]">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="col-span-4 glass-panel rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-sm font-semibold text-white">Active Campaigns</span>
          </div>
          <div className="space-y-3">
            {mockCampaigns.slice(0, 4).map((camp, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-[#232323]/50 border border-[#232323] hover:border-[#3B82F6]/20 transition-all cursor-pointer">
                <div className="text-xs text-white font-medium">{camp.name}</div>
                <div className="text-[10px] text-[#3C3C3C] mt-1">
                  {camp.threatActor} • {camp.targetSectors.slice(0, 2).join(", ")}
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FF6B00]/10 text-[#FF6B00]">{camp.confidence}%</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E]">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Vulnerabilities */}
        <div className="col-span-4 glass-panel rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-[#FACC15]" />
            <span className="text-sm font-semibold text-white">Critical CVEs</span>
          </div>
          <div className="space-y-3">
            {mockVulnerabilities.slice(0, 4).map((vuln, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-[#232323]/50 border border-[#232323] hover:border-[#FACC15]/20 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white font-mono font-medium">{vuln.cve}</span>
                  <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-bold",
                    vuln.cvss >= 9 ? "bg-[#EF4444]/10 text-[#EF4444]" : "bg-[#FF8C1A]/10 text-[#FF8C1A]"
                  )}>{vuln.cvss}</span>
                </div>
                <div className="text-[10px] text-[#3C3C3C] mt-1 truncate">{vuln.description}</div>
                <div className="flex items-center gap-2 mt-1.5">
                  {vuln.kev && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#EF4444]/10 text-[#EF4444]">KEV</span>}
                  {vuln.exploited && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FF8C1A]/10 text-[#FF8C1A]">Exploited</span>}
                  <span className="text-[9px] text-[#3C3C3C]">EPSS: {(vuln.epss * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
