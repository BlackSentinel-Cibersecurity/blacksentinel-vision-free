"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("bsv_auth", JSON.stringify({
          token: data.token,
          user: data.user,
          expires: Date.now() + 24 * 60 * 60 * 1000,
        }));
        window.location.href = "/";
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FF6B00 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6B00]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#EF4444]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="glass-panel rounded-2xl p-8 border border-[#232323]">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img src="/logo.svg" alt="BlackSentinel Vision" className="w-16 h-16 mb-4" />
            <h1 className="text-2xl font-bold text-white tracking-wider">BLACKSENTINEL</h1>
            <div className="text-sm text-[#FF6B00] tracking-[0.3em] font-medium">VISION</div>
            <div className="text-xs text-[#3C3C3C] mt-2">Autonomous Cyber Threat Intelligence</div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-[11px] text-[#3C3C3C] uppercase tracking-wider mb-2 block">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3C3C3C]" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="w-full bg-[#141414] border border-[#232323] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#3C3C3C] focus:outline-none focus:border-[#FF6B00] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#3C3C3C] uppercase tracking-wider mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3C3C3C]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-[#141414] border border-[#232323] rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder-[#3C3C3C] focus:outline-none focus:border-[#FF6B00] transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3C3C3C] hover:text-[#D9D9D9] transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 text-xs text-[#EF4444]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-3 rounded-xl font-semibold text-sm transition-all",
                loading
                  ? "bg-[#FF6B00]/50 text-white/50 cursor-not-allowed"
                  : "bg-[#FF6B00] text-white hover:bg-[#FF8C1A] active:scale-[0.98]"
              )}
            >
              {loading ? "Authenticating..." : "Access Platform"}
            </button>
          </form>

          {/* Default credentials info */}
          <div className="mt-6 p-4 rounded-lg bg-[#141414] border border-[#232323]">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span className="text-[10px] text-[#3C3C3C] uppercase tracking-wider">Default Credentials</span>
            </div>
            <div className="text-xs text-[#D9D9D9]">
              <div>Username: <span className="font-mono text-[#FF6B00]">admin</span></div>
              <div>Password: <span className="font-mono text-[#FF6B00]">blacksentinel</span></div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <div className="text-[10px] text-[#3C3C3C]">BlackSentinel Vision v1.0.0</div>
            <div className="text-[10px] text-[#3C3C3C] mt-1">Autonomous Cyber Threat Intelligence Platform</div>
          </div>
        </div>
      </div>
    </div>
  );
}
