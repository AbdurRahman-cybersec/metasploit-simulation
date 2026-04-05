"use client";

import { useState } from "react";

export default function HelpBar() {
  const [activeTab, setActiveTab] = useState<"concepts" | "workflow" | "modules">("concepts");

  return (
    <div className="w-full border border-[#21262d] rounded-lg bg-[#0d1117] overflow-hidden mb-6">
      <div className="flex border-b border-[#21262d]">
        <button
          onClick={() => setActiveTab("concepts")}
          className={`flex-1 px-4 py-3 text-sm font-bold transition-colors ${
            activeTab === "concepts" 
              ? "bg-[#00ff41] text-black" 
              : "text-[#6e7681] hover:text-[#e6edf3] hover:bg-[#161b22]"
          }`}
        >
          KEY CONCEPTS
        </button>
        <button
          onClick={() => setActiveTab("workflow")}
          className={`flex-1 px-4 py-3 text-sm font-bold transition-colors ${
            activeTab === "workflow" 
              ? "bg-[#00ff41] text-black" 
              : "text-[#6e7681] hover:text-[#e6edf3] hover:bg-[#161b22]"
          }`}
        >
          WORKFLOW
        </button>
        <button
          onClick={() => setActiveTab("modules")}
          className={`flex-1 px-4 py-3 text-sm font-bold transition-colors ${
            activeTab === "modules" 
              ? "bg-[#00ff41] text-black" 
              : "text-[#6e7681] hover:text-[#e6edf3] hover:bg-[#161b22]"
          }`}
        >
          MODULES
        </button>
      </div>

      <div className="p-4">
        {activeTab === "concepts" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-[#ff0055] rounded bg-[#161b22] hover:shadow-[0_0_15px_rgba(255,0,85,0.3)] transition-shadow">
                <h3 className="text-lg font-bold text-[#ff0055] mb-2">💥 Exploit</h3>
                <p className="text-sm text-[#e6edf3]">A piece of code that uses a vulnerability present on the target system.</p>
                <div className="mt-3 p-2 bg-[#0d1117] rounded">
                  <p className="text-xs text-[#6e7681]">Example:</p>
                  <p className="text-sm text-[#00b4d8]">MS17-010 EternalBlue</p>
                </div>
              </div>
              
              <div className="p-4 border border-[#ff9500] rounded bg-[#161b22] hover:shadow-[0_0_15px_rgba(255,149,0,0.3)] transition-shadow">
                <h3 className="text-lg font-bold text-[#ff9500] mb-2">🔓 Vulnerability</h3>
                <p className="text-sm text-[#e6edf3]">A design, coding, or logic flaw affecting the target system.</p>
                <div className="mt-3 p-2 bg-[#0d1117] rounded">
                  <p className="text-xs text-[#6e7681]">Examples:</p>
                  <p className="text-sm text-[#00b4d8]">Missing patches, Unvalidated input, Misconfiguration</p>
                </div>
              </div>

              <div className="p-4 border border-[#00ff41] rounded bg-[#161b22] hover:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-shadow">
                <h3 className="text-lg font-bold text-[#00ff41] mb-2">📦 Payload</h3>
                <p className="text-sm text-[#e6edf3]">Code that runs on target after exploitation to achieve desired result.</p>
                <div className="mt-3 p-2 bg-[#0d1117] rounded">
                  <p className="text-xs text-[#6e7681]">Examples:</p>
                  <p className="text-sm text-[#00b4d8]">reverse_shell, meterpreter</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "workflow" && (
          <div className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-sm">
              <div className="flex items-center">
                <div className="px-4 py-2 bg-[#00b4d8] text-black font-bold rounded">1. RECON</div>
                <span className="text-[#6e7681] mx-2">→</span>
              </div>
              <div className="flex items-center">
                <div className="px-4 py-2 bg-[#00b4d8] text-black font-bold rounded">2. SCAN</div>
                <span className="text-[#6e7681] mx-2">→</span>
              </div>
              <div className="flex items-center">
                <div className="px-4 py-2 bg-[#ff0055] text-white font-bold rounded">3. EXPLOIT</div>
                <span className="text-[#6e7681] mx-2">→</span>
              </div>
              <div className="flex items-center">
                <div className="px-4 py-2 bg-[#00ff41] text-black font-bold rounded">4. PAYLOAD</div>
                <span className="text-[#6e7681] mx-2">→</span>
              </div>
              <div className="flex items-center">
                <div className="px-4 py-2 bg-[#ff9500] text-black font-bold rounded">5. POST</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-[#161b22] rounded text-sm text-[#e6edf3] max-w-2xl">
              <p><span className="text-[#00b4d8]">Recon:</span> Gather information about target</p>
              <p><span className="text-[#00b4d8]">Scan:</span> Find vulnerabilities using auxiliary modules</p>
              <p><span className="text-[#ff0055]">Exploit:</span> Use exploit module to leverage vulnerability</p>
              <p><span className="text-[#00ff41]">Payload:</span> Execute code on target (shell, meterpreter)</p>
              <p><span className="text-[#ff9500]">Post:</span> Post-exploitation (gather credentials, pivot)</p>
            </div>
          </div>
        )}

        {activeTab === "modules" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="p-3 bg-[#161b22] rounded border border-[#21262d]">
              <h4 className="text-[#00b4d8] font-bold mb-1">Auxiliary</h4>
              <p className="text-xs text-[#6e7681]">Scanners, fuzzers, crawlers</p>
            </div>
            <div className="p-3 bg-[#161b22] rounded border border-[#21262d]">
              <h4 className="text-[#ff9500] font-bold mb-1">Encoders</h4>
              <p className="text-xs text-[#6e7681]">Encode payloads to bypass AV</p>
            </div>
            <div className="p-3 bg-[#161b22] rounded border border-[#21262d]">
              <h4 className="text-[#ff0055] font-bold mb-1">Evasion</h4>
              <p className="text-xs text-[#6e7681]">Evade antivirus software</p>
            </div>
            <div className="p-3 bg-[#161b22] rounded border border-[#21262d]">
              <h4 className="text-[#ff0055] font-bold mb-1">Exploits</h4>
              <p className="text-xs text-[#6e7681]">Leverage vulnerabilities</p>
            </div>
            <div className="p-3 bg-[#161b22] rounded border border-[#21262d]">
              <h4 className="text-[#00ff41] font-bold mb-1">NOPs</h4>
              <p className="text-xs text-[#6e7681]">No Operation instructions</p>
            </div>
            <div className="p-3 bg-[#161b22] rounded border border-[#21262d]">
              <h4 className="text-[#00ff41] font-bold mb-1">Payloads</h4>
              <p className="text-xs text-[#6e7681]">Code to run on target</p>
            </div>
            <div className="p-3 bg-[#161b22] rounded border border-[#21262d]">
              <h4 className="text-[#e6edf3] font-bold mb-1">Post</h4>
              <p className="text-xs text-[#6e7681]">Post-exploitation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
