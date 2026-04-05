"use client";

import { useState } from "react";

export default function MetasploitDiagram() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="w-full p-6 border border-[#21262d] rounded-lg bg-[#0d1117]">
      <h2 className="text-xl font-bold mb-6 text-[#00ff41] text-center">Attack Flow Diagram</h2>
      
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        {/* Attacker */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:hidden"
        >
          <div className="w-16 h-16 bg-[#ff0055] rounded-full flex items-center justify-center text-2xl">👤</div>
        </div>

        {/* Attacker (Desktop) */}
        <div className="hidden md:block absolute left-[5%] top-1/2 -translate-y-1/2">
          <div className="w-20 h-20 bg-[#ff0055] rounded-full flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(255,0,85,0.5)]">👤</div>
          <p className="text-center text-[#ff0055] font-bold mt-2">Attacker</p>
        </div>

        {/* Main Flow Container */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 ml-0 md:ml-24">
          
          {/* Vulnerability */}
          <div 
            className={`relative p-4 border-2 rounded-lg transition-all cursor-pointer ${
              hoveredItem === "vuln" ? "border-[#ff9500] shadow-[0_0_20px_rgba(255,149,0,0.5)]" : "border-[#21262d]"
            } bg-[#161b22] min-w-[140px]`}
            onMouseEnter={() => setHoveredItem("vuln")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="text-3xl text-center mb-2">🔓</div>
            <h3 className="text-[#ff9500] font-bold text-center">Vulnerability</h3>
            <p className="text-xs text-[#6e7681] text-center mt-1">Flaw in target</p>
            {hoveredItem === "vuln" && (
              <div className="absolute -bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-[#0d1117] border border-[#ff9500] rounded text-xs w-48 z-10">
                Design, coding, or logic flaw that can be exploited
              </div>
            )}
          </div>

          {/* Arrow 1 */}
          <div className="text-[#00b4d8] text-2xl">→</div>

          {/* Exploit */}
          <div 
            className={`relative p-4 border-2 rounded-lg transition-all cursor-pointer ${
              hoveredItem === "exploit" ? "border-[#ff0055] shadow-[0_0_20px_rgba(255,0,85,0.5)]" : "border-[#21262d]"
            } bg-[#161b22] min-w-[140px]`}
            onMouseEnter={() => setHoveredItem("exploit")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="text-3xl text-center mb-2">💥</div>
            <h3 className="text-[#ff0055] font-bold text-center">Exploit</h3>
            <p className="text-xs text-[#6e7681] text-center mt-1">Leverages vuln</p>
            {hoveredItem === "exploit" && (
              <div className="absolute -bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-[#0d1117] border border-[#ff0055] rounded text-xs w-48 z-10">
                Code that uses the vulnerability to attack
              </div>
            )}
          </div>

          {/* Arrow 2 */}
          <div className="text-[#00b4d8] text-2xl">→</div>

          {/* Payload */}
          <div 
            className={`relative p-4 border-2 rounded-lg transition-all cursor-pointer ${
              hoveredItem === "payload" ? "border-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.5)]" : "border-[#21262d]"
            } bg-[#161b22] min-w-[140px]`}
            onMouseEnter={() => setHoveredItem("payload")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="text-3xl text-center mb-2">📦</div>
            <h3 className="text-[#00ff41] font-bold text-center">Payload</h3>
            <p className="text-xs text-[#6e7681] text-center mt-1">Runs on target</p>
            {hoveredItem === "payload" && (
              <div className="absolute -bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-[#0d1117] border border-[#00ff41] rounded text-xs w-48 z-10">
                Code that executes after successful exploitation
              </div>
            )}
          </div>

        </div>

        {/* Target System */}
        <div className="hidden md:block absolute right-[5%] top-1/2 -translate-y-1/2">
          <div className="w-20 h-20 bg-[#1a1a2e] border-2 border-[#00b4d8] rounded flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(0,180,216,0.5)]">🖥️</div>
          <p className="text-center text-[#00b4d8] font-bold mt-2">Target</p>
        </div>
        
        {/* Target (Mobile) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:hidden">
          <div className="w-12 h-12 bg-[#1a1a2e] border-2 border-[#00b4d8] rounded flex items-center justify-center text-xl">🖥️</div>
        </div>
      </div>

      {/* Connection Lines Visualization */}
      <div className="mt-8 pt-4 border-t border-[#21262d]">
        <h3 className="text-sm font-bold text-[#6e7681] mb-3">How it works:</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-[#ff9500]">1.</span>
            <p className="text-[#e6edf3]">Attacker finds a <span className="text-[#ff9500]">vulnerability</span> in the target system</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#ff0055]">2.</span>
            <p className="text-[#e6edf3]">Uses an <span className="text-[#ff0055]">exploit</span> - code that takes advantage of that vulnerability</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#00ff41]">3.</span>
            <p className="text-[#e6edf3]">Delivers a <span className="text-[#00ff41]">payload</span> - code that runs on the target to achieve the goal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
