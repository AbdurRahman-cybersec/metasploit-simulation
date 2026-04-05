"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface ConsoleLine {
  type: "input" | "output" | "error" | "info" | "success" | "banner";
  content: string;
}

const searchResults = [
  { id: 0, name: "auxiliary/admin/smb/ms17_010_command", date: "2017-03-14", rank: "normal", desc: "MS17-010 EternalRomance/EternalSynergy/EternalChampion SMB Remote Windows Command Execution" },
  { id: 1, name: "auxiliary/scanner/smb/smb_ms17_010", date: "", rank: "normal", desc: "MS17-010 SMB RCE Detection" },
  { id: 2, name: "exploit/windows/smb/ms17_010_eternalblue", date: "2017-03-14", rank: "average", desc: "MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption" },
  { id: 3, name: "exploit/windows/smb/ms17_010_psexec", date: "2017-03-14", rank: "normal", desc: "MS17-010 EternalRomance/EternalSynergy/EternalChampion SMB Remote Windows Code Execution" },
  { id: 4, name: "exploit/windows/smb/smb_doublepulsar_rce", date: "2017-04-14", rank: "great", desc: "SMB DOUBLEPULSAR Remote Code Execution" },
];

const moduleOptions = [
  { name: "RHOSTS", current: "", required: "yes", desc: "The target host(s), range CIDR identifier, or hosts file with syntax 'file:'" },
  { name: "RPORT", current: "445", required: "yes", desc: "The target port (TCP)" },
  { name: "SMBDomain", current: ".", required: "no", desc: "(Optional) The Windows domain to use for authentication" },
  { name: "SMBPass", current: "", required: "no", desc: "(Optional) The password for the specified username" },
  { name: "SMBUser", current: "", required: "no", desc: "(Optional) The username to authenticate as" },
  { name: "VERIFY_ARCH", current: "true", required: "yes", desc: "Check if remote architecture matches exploit Target." },
  { name: "VERIFY_TARGET", current: "true", required: "yes", desc: "Check if remote OS matches exploit Target." },
];

const payloadOptions = [
  { name: "EXITFUNC", current: "thread", required: "yes", desc: "Exit technique (Accepted: '', seh, thread, process, none)" },
  { name: "LHOST", current: "10.10.220.191", required: "yes", desc: "The listen address (an interface may be specified)" },
  { name: "LPORT", current: "4444", required: "yes", desc: "The listen port" },
];

export default function MsfconsolePage() {
  const [activeSection, setActiveSection] = useState<string | null>("intro");
  const [showConsole, setShowConsole] = useState(false);
  const [searchQuery, setSearchQuery] = useState("ms17-010");
  const [searchResults2, setSearchResults2] = useState<string[]>([]);

  const sections = [
    { id: "intro", title: "1. Introduction", icon: "📝" },
    { id: "basics", title: "2. Basic Commands", icon: "⌨️" },
    { id: "context", title: "3. Context & Use", icon: "🎯" },
    { id: "options", title: "4. Show Options", icon: "⚙️" },
    { id: "search", title: "5. Search Command", icon: "🔍" },
    { id: "ranking", title: "6. Exploit Ranking", icon: "📊" },
  ];

  const processSearch = () => {
    const results: string[] = [];
    searchResults.forEach(r => {
      if (r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.desc.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.push(r.name);
      }
    });
    setSearchResults2(results);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e6edf3] font-mono">
      <div className="scanline"></div>
      
      <header className="border-b border-[#21262d] p-4 bg-[#161b22]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#00ff41]">Task 3: Msfconsole</h1>
            <p className="text-sm text-[#6e7681]">Mastering the Metasploit Console</p>
          </div>
          <div className="flex gap-2">
            <Link href="/" className="px-4 py-2 bg-[#161b22] text-[#e6edf3] rounded hover:bg-[#21262d]">
              ← Main
            </Link>
            <Link href="/modules" className="px-4 py-2 bg-[#00ff41] text-black font-bold rounded hover:bg-[#00cc33]">
              Task 4 →
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

        {/* Section 1: Introduction */}
        <section className="mb-8 p-6 border border-[#21262d] rounded bg-[#0d1117]">
          <h2 className="text-xl font-bold text-[#00ff41] mb-4">1. Introduction to Msfconsole</h2>
          
          <div className="space-y-4 text-sm">
            <p className="text-[#e6edf3]">
              The <span className="text-[#00ff41]">msfconsole</span> is your main interface to the Metasploit Framework. You can launch it using the <code className="bg-[#161b22] px-2 py-1 rounded">msfconsole</code> command.
            </p>

            <div className="p-4 bg-[#161b22] rounded border-l-4 border-[#00ff41]">
              <p className="text-[#6e7681] mb-2">Terminal:</p>
              <p className="text-[#e6edf3]">root@ip-10-10-220-191:~# <span className="text-[#00b4d8]">msfconsole</span></p>
            </div>

            <p className="text-[#e6edf3]">
              Once launched, the command line changes to <span className="text-[#00ff41]">msf6</span> (or msf5 depending on version). The console supports most Linux commands like <code className="bg-[#161b22] px-2 py-1 rounded">ls</code>, <code className="bg-[#161b22] px-2 py-1 rounded">ping</code>, <code className="bg-[#161b22] px-2 py-1 rounded">clear</code>.
            </p>

            <div className="p-4 bg-[#161b22] rounded font-mono text-xs">
              <p className="text-[#ff9500] mb-2">banner art appears...</p>
              <p className="text-[#00ff41]">=&#91; metasploit v6.0 &#93;</p>
              <p className="text-[#00b4d8]">+ -- --=&#91; 2048 exploits - 1105 auxiliary - 344 post &#93;</p>
              <p className="text-[#00b4d8]">+ -- --=&#91; 562 payloads - 45 encoders - 10 nops &#93;</p>
              <p className="text-[#00b4d8]">+ -- --=&#91; 7 evasion &#93;</p>
              <p className="text-[#00ff41] mt-2">msf6 &gt;</p>
            </div>
          </div>
        </section>

        {/* Section 2: Basic Commands */}
        <section className="mb-8 p-6 border border-[#21262d] rounded bg-[#0d1117]">
          <h2 className="text-xl font-bold text-[#00ff41] mb-4">2. Basic Commands</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-[#161b22] rounded">
              <h3 className="font-bold text-[#00b4d8] mb-2">help</h3>
              <p className="text-[#6e7681]">Show available commands or help for specific command</p>
              <code className="text-xs text-[#00ff41] mt-2 block">msf6 &gt; help set</code>
            </div>

            <div className="p-4 bg-[#161b22] rounded">
              <h3 className="font-bold text-[#00b4d8] mb-2">history</h3>
              <p className="text-[#6e7681]">Show commands you typed earlier</p>
              <code className="text-xs text-[#00ff41] mt-2 block">msf6 &gt; history</code>
            </div>

            <div className="p-4 bg-[#161b22] rounded">
              <h3 className="font-bold text-[#00b4d8] mb-2">Tab Completion</h3>
              <p className="text-[#6e7681]">Press Tab to auto-complete commands</p>
              <code className="text-xs text-[#00ff41] mt-2 block">msf6 &gt; he[TAB] &#8594; help</code>
            </div>

            <div className="p-4 bg-[#161b22] rounded">
              <h3 className="font-bold text-[#00b4d8] mb-2">Linux Commands</h3>
              <p className="text-[#6e7681]">Run ls, ping, clear, etc. Note: no output redirection</p>
              <code className="text-xs text-[#00ff41] mt-2 block">msf6 &gt; ls -la</code>
            </div>
          </div>
        </section>

        {/* Section 3: Context & Use */}
        <section className="mb-8 p-6 border border-[#21262d] rounded bg-[#0d1117]">
          <h2 className="text-xl font-bold text-[#00ff41] mb-4">3. Context & The use Command</h2>
          
          <div className="space-y-4 text-sm">
            <p className="text-[#e6edf3]">
              <span className="text-[#00ff41]">msfconsole is context-managed</span>. Parameters set for one module are lost when you switch to another module unless set as global.
            </p>

            <div className="p-4 bg-[#161b22] rounded">
              <p className="text-[#6e7681] mb-2">Select a module:</p>
              <p className="text-[#00ff41]">msf6 &gt; <span className="text-[#00b4d8]">use exploit/windows/smb/ms17_010_eternalblue</span></p>
              <p className="text-[#ff9500] mt-2">[*] No payload configured, defaulting to windows/x64/meterpreter/reverse_tcp</p>
              <p className="text-[#00ff41] mt-2">msf6 exploit(windows/smb/ms17_010_eternalblue) &gt;</p>
            </div>

            <p className="text-[#e6edf3]">
              The prompt changes to show you are in the context of that exploit. Use <code className="bg-[#161b22] px-2 py-1 rounded">back</code> to exit context.
            </p>

            <div className="p-3 bg-[#161b22] rounded">
              <p className="text-[#00ff41]">msf6 exploit(windows/smb/ms17_010_eternalblue) &gt; <span className="text-[#00b4d8]">back</span></p>
              <p className="text-[#00ff41]">msf6 &gt;</p>
            </div>
          </div>
        </section>

        {/* Section 4: Show Options */}
        <section className="mb-8 p-6 border border-[#21262d] rounded bg-[#0d1117]">
          <h2 className="text-xl font-bold text-[#00ff41] mb-4">4. show options Command</h2>
          
          <div className="space-y-4 text-sm">
            <p className="text-[#e6edf3]">
              Shows parameters required for the current module. Different modules need different options.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#21262d]">
                    <th className="text-left p-2 text-[#6e7681]">Name</th>
                    <th className="text-left p-2 text-[#6e7681]">Current Setting</th>
                    <th className="text-left p-2 text-[#6e7681]">Required</th>
                    <th className="text-left p-2 text-[#6e7681]">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {moduleOptions.map((opt, i) => (
                    <tr key={i} className="border-b border-[#21262d]">
                      <td className="p-2 text-[#00ff41]">{opt.name}</td>
                      <td className="p-2 text-[#ff9500]">{opt.current || "(empty)"}</td>
                      <td className="p-2 text-[#ff0055]">{opt.required}</td>
                      <td className="p-2 text-[#6e7681]">{opt.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-[#161b22] rounded">
              <p className="text-[#6e7681] mb-2">Payload options (windows/x64/meterpreter/reverse_tcp):</p>
              {payloadOptions.map((opt, i) => (
                <div key={i} className="flex text-xs">
                  <span className="w-24 text-[#00ff41]">{opt.name}</span>
                  <span className="w-24 text-[#ff9500]">{opt.current}</span>
                  <span className="w-16 text-[#ff0055]">{opt.required}</span>
                  <span className="text-[#6e7681]">{opt.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Search Command */}
        <section className="mb-8 p-6 border border-[#21262d] rounded bg-[#0d1117]">
          <h2 className="text-xl font-bold text-[#00ff41] mb-4">5. search Command</h2>
          
          <div className="space-y-4 text-sm">
            <p className="text-[#e6edf3]">
              Search for modules using CVE numbers, names, or target systems. One of the most useful commands!
            </p>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search term..."
                className="flex-1 p-2 bg-[#161b22] border border-[#21262d] rounded text-[#e6edf3]"
              />
              <button
                onClick={processSearch}
                className="px-4 py-2 bg-[#00ff41] text-black font-bold rounded"
              >
                Search
              </button>
            </div>

            <div className="p-4 bg-[#161b22] rounded font-mono text-xs">
              <p className="text-[#00ff41] mb-2">msf6 &gt; search {searchQuery}</p>
              <p className="text-[#6e7681] mb-2">Matching Modules ================</p>
              {searchResults.map((r, i) => (
                <div key={i} className="mb-1">
                  <span className="text-[#6e7681]">{' '}</span>
                  <span className="text-[#00b4d8] w-4 inline-block">{i}</span>
                  <span className="text-[#00ff41]">{r.name}</span>
                  <span className="text-[#6e7681] ml-2">({r.rank})</span>
                </div>
              ))}
            </div>

            <p className="text-[#e6edf3]">
              Use <code className="bg-[#161b22] px-2 py-1 rounded">use 0</code> or <code className="bg-[#161b22] px-2 py-1 rounded">use exploit/windows/smb/ms17_010_eternalblue</code> to select.
            </p>

            <div className="p-3 bg-[#161b22] rounded">
              <p className="text-[#6e7681] text-xs mb-2">Search filters:</p>
              <code className="text-xs text-[#00ff41] block">search type:exploit platform:linux</code>
              <code className="text-xs text-[#00ff41] block">search cve:2017 name:heartbleed</code>
              <code className="text-xs text-[#00ff41] block">search auxiliary telnet</code>
            </div>
          </div>
        </section>

        {/* Section 6: Exploit Ranking */}
        <section className="mb-8 p-6 border border-[#21262d] rounded bg-[#0d1117]">
          <h2 className="text-xl font-bold text-[#00ff41] mb-4">6. Exploit Ranking</h2>
          
          <div className="space-y-4 text-sm">
            <p className="text-[#e6edf3]">
              Exploits are rated based on reliability. Low-ranking exploits may work perfectly while excellent ones may fail.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-[#161b22] rounded border-l-4 border-[#6e7681]">
                <p className="font-bold text-[#6e7681]">Manual</p>
                <p className="text-xs text-[#6e7681]">Not tested</p>
              </div>
              <div className="p-3 bg-[#161b22] rounded border-l-4 border-[#ff0055]">
                <p className="font-bold text-[#ff0055]">Low</p>
                <p className="text-xs text-[#6e7681]">Does not work consistently</p>
              </div>
              <div className="p-3 bg-[#161b22] rounded border-l-4 border-[#ff9500]">
                <p className="font-bold text-[#ff9500]">Average</p>
                <p className="text-xs text-[#6e7681]">May take some extra work</p>
              </div>
              <div className="p-3 bg-[#161b22] rounded border-l-4 border-[#00b4d8]">
                <p className="font-bold text-[#00b4d8]">Normal</p>
                <p className="text-xs text-[#6e7681]">Average functioning</p>
              </div>
              <div className="p-3 bg-[#161b22] rounded border-l-4 border-[#00ff41]">
                <p className="font-bold text-[#00ff41]">Good</p>
                <p className="text-xs text-[#6e7681]">Works in most cases</p>
              </div>
              <div className="p-3 bg-[#161b22] rounded border-l-4 border-[#00ff41]">
                <p className="font-bold text-[#00ff41]">Great</p>
                <p className="text-xs text-[#6e7681]">Great targeting</p>
              </div>
              <div className="p-3 bg-[#161b22] rounded border-l-4 border-[#00ff41]">
                <p className="font-bold text-[#00ff41]">Excellent</p>
                <p className="text-xs text-[#6e7681]">Works in all situations</p>
              </div>
            </div>

            <div className="p-3 bg-[#ff0055]/20 border border-[#ff0055] rounded">
              <p className="text-[#ff0055] text-xs">
                ⚠️ Remember: A low-ranking exploit may work perfectly, and an excellent ranked exploit may not work at all!
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Console Demo */}
        <section className="mb-8 p-6 border border-[#00ff41] rounded bg-[#0d1117]">
          <h2 className="text-xl font-bold text-[#00ff41] mb-4">Interactive Console Demo</h2>
          
          <p className="text-sm text-[#6e7681] mb-4">
            Try out these commands on the main page console: help, show, use, info, search, options, set, run, back
          </p>
          
          <div className="p-4 bg-[#161b22] rounded text-xs font-mono">
            <p className="text-[#6e7681]">Quick Commands Reference:</p>
            <div className="mt-2 space-y-1">
              <p><span className="text-[#00b4d8]">help</span> - Show help</p>
              <p><span className="text-[#00b4d8]">show exploits</span> - List all exploits</p>
              <p><span className="text-[#00b4d8]">use [module]</span> - Select module</p>
              <p><span className="text-[#00b4d8]">show options</span> - Show module options</p>
              <p><span className="text-[#00b4d8]">set RHOSTS [IP]</span> - Set target</p>
              <p><span className="text-[#00b4d8]">run</span> - Execute module</p>
              <p><span className="text-[#00b4d8]">search [term]</span> - Search modules</p>
              <p><span className="text-[#00b4d8]">info</span> - Show module info</p>
              <p><span className="text-[#00b4d8]">back</span> - Exit context</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#21262d] p-4 text-center text-[#6e7681] text-sm">
        Metasploit Framework Educational Simulation - Task 3
      </footer>
    </div>
  );
}
