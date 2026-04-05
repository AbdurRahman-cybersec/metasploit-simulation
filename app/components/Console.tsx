"use client";

import { useState, useEffect, useRef } from "react";

interface ConsoleLine {
  type: "input" | "output" | "error" | "info" | "success";
  content: string;
}

const moduleData: Record<string, string[]> = {
  auxiliary: ["scanner/http/http_version", "scanner/smb/smb_version", "admin/mssql/mssql_enum", "fuzzers/http/http_form_fuzz", "crawler", "sniffer"],
  encoders: ["x86/shikata_ga_nai", "cmd/powershell_base64", "php/base64", "generic/none", "x64 alphanumeric"],
  evasion: ["windows/windows_defender_exe", "windows/applocker_evasion_msbuild", "windows/process_herpaderping", "windows_defender_js_hta"],
  exploits: ["windows/smb/ms17_010_eternalblue", "linux/http/cpanel_cve_2023_45802", "multi/http/struts_dev_mode", "android/browser/webview_addjavascriptinterface", "unix/ftp/proftpd_modcopy"],
  nops: ["x86/optimum", "x64/alphanumeric", "php/generic", "armle/simple", "sparc/simple"],
  payloads: ["windows/x64/shell_reverse_tcp", "linux/x64/shell_reverse_tcp", "android/meterpreter/reverse_tcp", "generic/shell_reverse_tcp", "php/meterpreter_reverse_tcp"],
  post: ["linux/gather/enum_configs", "windows/gather/credential_collector", "multi/manage/shell_to_meterpreter", "android/utility/flip_camera"],
};

const moduleInfo: Record<string, { name: string; description: string; author: string; rank: string; platform: string; options: string[] }> = {
  "windows/smb/ms17_010_eternalblue": {
    name: "windows/smb/ms17_010_eternalblue",
    description: "This module exploits a vulnerability in the SMB protocol (CVE-2017-0143) to execute arbitrary code on the target system.",
    author: "Sleepy",
    rank: "normal",
    platform: "Windows",
    options: ["RHOSTS", "RPORT", "GroomAttempts"]
  },
  "linux/x64/shell_reverse_tcp": {
    name: "linux/x64/shell_reverse_tcp",
    description: "Spawns a command shell (sh) and establishes a reverse TCP connection. This is a single inline payload.",
    author: "metasploit",
    rank: "normal",
    platform: "Linux",
    options: ["LHOST", "LPORT"]
  }
};

export default function Console({ onCommand }: { onCommand?: (cmd: string) => void }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ConsoleLine[]>([
    { type: "info", content: "Metasploit Framework Console v6.0" },
    { type: "info", content: "Type 'help' for available commands" },
    { type: "info", content: "Type 'tutorial' for a quick guide" },
  ]);
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd: string) => {
    const parts = cmd.trim().split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    const newHistory: ConsoleLine[] = [{ type: "input", content: `msf6 ${currentModule ? `(${currentModule})` : ""} > ${cmd}` }];

    switch (command) {
      case "help":
        newHistory.push({ type: "output", content: "Available Commands:" });
        newHistory.push({ type: "output", content: "  help                    Show this help message" });
        newHistory.push({ type: "output", content: "  tutorial               Quick interactive tutorial" });
        newHistory.push({ type: "output", content: "  show [category]        Show modules (auxiliary, encoders, evasion, exploits, nops, payloads, post)" });
        newHistory.push({ type: "output", content: "  use [module]           Select a module" });
        newHistory.push({ type: "output", content: "  info                   Show selected module details" });
        newHistory.push({ type: "output", content: "  options                Show module options" });
        newHistory.push({ type: "output", content: "  set [option] [value]   Set module option" });
        newHistory.push({ type: "output", content: "  search [term]          Search modules" });
        newHistory.push({ type: "output", content: "  back                   Exit current module" });
        newHistory.push({ type: "output", content: "  run                    Execute module" });
        newHistory.push({ type: "output", content: "  clear                  Clear console" });
        break;

      case "tutorial":
        newHistory.push({ type: "info", content: "=== METASPLOIT QUICK TUTORIAL ===" });
        newHistory.push({ type: "output", content: "Step 1: Find a module - Use 'search' or 'show exploits'" });
        newHistory.push({ type: "output", content: "Step 2: Select a module - Use 'use [module]'" });
        newHistory.push({ type: "output", content: "Step 3: Configure options - Use 'set RHOSTS [target]'" });
        newHistory.push({ type: "output", content: "Step 4: Run the exploit - Use 'run'" });
        newHistory.push({ type: "success", content: "Try: show payloads" });
        break;

      case "show":
        if (!args) {
          newHistory.push({ type: "error", content: "Please specify a category or type:" });
          newHistory.push({ type: "output", content: "  auxiliary, encoders, evasion, exploits, nops, payloads, post" });
        } else if (args === "payloads" || moduleData[args]) {
          const key = args === "payloads" ? "payloads" : args;
          newHistory.push({ type: "success", content: `Modules in ${key}:` });
          moduleData[key].forEach(m => {
            newHistory.push({ type: "output", content: `    ${m}` });
          });
          newHistory.push({ type: "info", content: `Total: ${moduleData[key].length} modules` });
        } else {
          newHistory.push({ type: "error", content: `Unknown category: ${args}` });
        }
        break;

      case "use":
        if (!args) {
          newHistory.push({ type: "error", content: "Usage: use [module_path]" });
          newHistory.push({ type: "info", content: "Example: use windows/smb/ms17_010_eternalblue" });
        } else {
          setCurrentModule(args);
          newHistory.push({ type: "success", content: `[*] Using ${args}` });
          newHistory.push({ type: "info", content: `Module loaded. Type 'info' for details, 'options' to see configuration.` });
        }
        break;

      case "info":
        if (currentModule && moduleInfo[currentModule]) {
          const info = moduleInfo[currentModule];
          newHistory.push({ type: "info", content: `Name: ${info.name}` });
          newHistory.push({ type: "info", content: `Description: ${info.description}` });
          newHistory.push({ type: "info", content: `Author: ${info.author}` });
          newHistory.push({ type: "info", content: `Rank: ${info.rank}` });
          newHistory.push({ type: "info", content: `Platform: ${info.platform}` });
        } else if (currentModule) {
          newHistory.push({ type: "info", content: `Module: ${currentModule}` });
          newHistory.push({ type: "info", content: "Description: (Simulated - no detailed info available)" });
        } else if (args && moduleInfo[args]) {
           const info = moduleInfo[args];
           newHistory.push({ type: "info", content: `Name: ${info.name}` });
           newHistory.push({ type: "info", content: `Description: ${info.description}` });
        } else {
          newHistory.push({ type: "error", content: currentModule ? "No module selected" : "Please specify a module" });
        }
        break;

      case "options":
        if (currentModule && moduleInfo[currentModule]) {
           newHistory.push({ type: "info", content: "Module options:" });
           moduleInfo[currentModule].options.forEach(opt => {
             newHistory.push({ type: "output", content: `    ${opt}` });
           });
        } else if (currentModule) {
           newHistory.push({ type: "info", content: "RHOSTS  - Target IP" });
           newHistory.push({ type: "info", content: "RPORT   - Target Port" });
        } else {
           newHistory.push({ type: "error", content: "No module selected" });
        }
        break;

      case "set":
        const setParts = args.split(" ");
        if (setParts.length >= 2) {
          newHistory.push({ type: "success", content: `${setParts[0]} => ${setParts.slice(1).join(" ")}` });
        } else {
          newHistory.push({ type: "error", content: "Usage: set [option] [value]" });
        }
        break;

      case "search":
        if (!args) {
          newHistory.push({ type: "error", content: "Usage: search [term]" });
        } else {
          const results: string[] = [];
          Object.values(moduleData).flat().forEach(m => {
            if (m.toLowerCase().includes(args.toLowerCase())) {
              results.push(m);
            }
          });
          if (results.length > 0) {
            newHistory.push({ type: "success", content: `Search results for '${args}':` });
            results.forEach(r => newHistory.push({ type: "output", content: `    ${r}` }));
          } else {
            newHistory.push({ type: "error", content: "No matching modules found" });
          }
        }
        break;

      case "back":
        if (currentModule) {
          setCurrentModule(null);
          newHistory.push({ type: "info", content: "msf6 > back" });
        } else {
          newHistory.push({ type: "error", content: "Not in a module context" });
        }
        break;

      case "clear":
        setHistory([]);
        return;

      case "run":
      case "exploit":
        if (currentModule) {
          newHistory.push({ type: "info", content: `[*] Running ${currentModule}...` });
          newHistory.push({ type: "output", content: "[*] Preparing exploit..." });
          newHistory.push({ type: "output", content: "[*] Sending payload..." });
          newHistory.push({ type: "success", content: "[+] SUCCESS: Session 1 opened" });
          newHistory.push({ type: "info", content: "[*] Meterpreter session 1 opened..." });
        } else {
          newHistory.push({ type: "error", content: "No module selected. Use 'use [module]' first." });
        }
        break;

      case "":
        break;

      default:
        newHistory.push({ type: "error", content: `Unknown command: ${command}. Type 'help' for commands.` });
    }

    setHistory([...history, ...newHistory]);
    if (onCommand) onCommand(cmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input);
      setCommandHistory([...commandHistory, input]);
      setHistoryIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(newIndex === commandHistory.length ? "" : commandHistory[newIndex]);
      }
    }
  };

  return (
    <div className="flex flex-col h-[450px] border-2 border-[#00ff41] rounded-lg bg-[#0d1117] font-mono text-sm relative overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.3)]">
      <div className="flex items-center justify-between px-3 py-2 bg-[#00ff41] text-black font-bold">
        <span className="flex items-center gap-2">
          <span className="text-lg">⬡</span> Metasploit Console
        </span>
        <span className="text-xs">msf6</span>
      </div>
      <div className="flex-1 p-4 overflow-y-auto console-scroll" ref={scrollRef}>
        {history.map((line, i) => (
          <div key={i} className={`mb-1 whitespace-pre-wrap ${
            line.type === "input" ? "text-[#e6edf3]" :
            line.type === "output" ? "text-[#e6edf3]" :
            line.type === "error" ? "text-[#ff0055] font-bold" :
            line.type === "info" ? "text-[#00b4d8]" :
            line.type === "success" ? "text-[#00ff41] font-bold" : "text-[#e6edf3]"
          }`}>
            {line.content}
          </div>
        ))}
      </div>
      <div className="flex items-center p-3 border-t-2 border-[#00ff41] bg-[#0d1117]">
        <span className="text-[#00ff41] mr-2 font-bold">►</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-[#e6edf3] caret-[#00ff41]"
          placeholder="Type command..."
          autoFocus
        />
      </div>
    </div>
  );
}
