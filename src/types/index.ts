export type ThreatLevel = "critical" | "high" | "medium" | "low" | "info";

export interface IOC {
  id: string;
  type: "ip" | "domain" | "url" | "hash" | "email" | "certificate" | "wallet" | "asn";
  value: string;
  threatLevel: ThreatLevel;
  confidence: number;
  reputation: number;
  firstSeen: Date;
  lastSeen: Date;
  source: string;
  tags: string[];
  campaigns: string[];
  malware: string[];
  apt: string[];
  mitreTactics: string[];
  geolocation?: string;
  asn?: string;
  context?: string;
}

export interface ThreatActor {
  id: string;
  name: string;
  aliases: string[];
  type: "apt" | "ransomware" | "hacktivist" | "cybercriminal" | "iac";
  motivation: string;
  origin: string;
  targetSectors: string[];
  targetCountries: string[];
  capabilities: string[];
  tools: string[];
  malware: string[];
  campaigns: string[];
  ttps: string[];
  confidence: number;
  active: boolean;
  lastActivity: Date;
  description: string;
}

export interface Campaign {
  id: string;
  name: string;
  threatActor: string;
  status: "active" | "inactive" | "emerging";
  startDate: Date;
  endDate?: Date;
  targetSectors: string[];
  targetCountries: string[];
  malware: string[];
  ttps: string[];
  iocs: string[];
  description: string;
  confidence: number;
}

export interface Vulnerability {
  id: string;
  cve: string;
  cvss: number;
  epss: number;
  kev: boolean;
  exploited: boolean;
  description: string;
  affectedSoftware: string[];
  malware: string[];
  apt: string[];
  mitigation: string;
  publishedDate: Date;
}

export interface ThreatFeed {
  id: string;
  name: string;
  type: "osint" | "darkweb" | "commercial" | "government" | "isac" | "cert";
  status: "active" | "error" | "paused";
  lastUpdate: Date;
  iocCount: number;
  confidence: number;
  reliability: string;
}

export interface Alert {
  id: string;
  title: string;
  severity: ThreatLevel;
  source: string;
  timestamp: Date;
  read: boolean;
  category: string;
  relatedAssets: string[];
}

export interface DashboardWidget {
  id: string;
  type: string;
  title: string;
  size: "sm" | "md" | "lg" | "xl";
  position: { x: number; y: number };
}
