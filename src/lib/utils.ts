import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function getThreatColor(level: string): string {
  switch (level.toLowerCase()) {
    case "critical": return "#EF4444";
    case "high": return "#FF8C1A";
    case "medium": return "#FACC15";
    case "low": return "#22C55E";
    case "info": return "#3B82F6";
    default: return "#D9D9D9";
  }
}

export function getThreatBg(level: string): string {
  switch (level.toLowerCase()) {
    case "critical": return "bg-threat-critical";
    case "high": return "bg-threat-high";
    case "medium": return "bg-threat-medium";
    case "low": return "bg-threat-low";
    default: return "bg-bsv-gray-dark";
  }
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
