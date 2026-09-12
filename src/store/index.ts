import { create } from "zustand";
import type { Alert, IOC, ThreatActor, Campaign, ThreatFeed, Vulnerability } from "@/types";

interface AppState {
  sidebarOpen: boolean;
  activeModule: string;
  alerts: Alert[];
  iocs: IOC[];
  threatActors: ThreatActor[];
  campaigns: Campaign[];
  feeds: ThreatFeed[];
  vulnerabilities: Vulnerability[];
  globalRiskScore: number;
  toggleSidebar: () => void;
  setActiveModule: (module: string) => void;
  addAlert: (alert: Alert) => void;
  markAlertRead: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  activeModule: "dashboard",
  alerts: [],
  iocs: [],
  threatActors: [],
  campaigns: [],
  feeds: [],
  vulnerabilities: [],
  globalRiskScore: 78,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setActiveModule: (module) => set({ activeModule: module }),
  addAlert: (alert) => set((s) => ({ alerts: [alert, ...s.alerts] })),
  markAlertRead: (id) =>
    set((s) => ({
      alerts: s.alerts.map((a) => (a.id === id ? { ...a, read: true } : a)),
    })),
}));
