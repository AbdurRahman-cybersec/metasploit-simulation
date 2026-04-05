"use client";

import { useState } from "react";

interface ModuleDetail {
  name: string;
  icon: string;
  color: string;
  simpleDesc: string;
  detailedDesc: string;
  examples: string[];
  useCases: string[];
}

const moduleDetails: ModuleDetail[] = [
  {
    name: "Auxiliary",
    icon: "🔍",
    color: "#00b4d8",
    simpleDesc: "Supporting tools — scanners, crawlers, fuzzers, brute force",
    detailedDesc: "Auxiliary modules are supporting tools that help in the reconnaissance and scanning phases. They don't exploit vulnerabilities directly but gather information or perform other tasks like scanning ports, enumerating services, or fuzzing inputs to discover vulnerabilities.",
    examples: [
      "auxiliary/scanner/http/http_version - Identify web server versions",
      "auxiliary/scanner/smb/smb_version - Detect SMB versions",
      "auxiliary/scanner/ftp/ftp_version - FTP server scanner",
      "auxiliary/admin/mssql/mssql_enum - Enumerate MSSQL databases",
      "auxiliary/fuzzers/http/http_form_fuzz - Fuzz HTTP forms"
    ],
    useCases: ["Port scanning", "Service enumeration", "Vulnerability scanning", "Brute force attacks", "Crawling websites"]
  },
  {
    name: "Encoders",
    icon: "🔐",
    color: "#ff9500",
    simpleDesc: "Disguise your exploit/payload to dodge antivirus",
    detailedDesc: "Encoders are used to obfuscate the payload to bypass signature-based antivirus detection. They encode the original payload into a different format that may not be detected by antivirus databases. However, modern antivirus with heuristic analysis can still detect encoded payloads.",
    examples: [
      "encoder/x86/shikata_ga_nai - Most popular polymorphic encoder",
      "encoder/cmd/powershell_base64 - PowerShell base64 encoding",
      "encoder/php/base64 - PHP base64 encoding",
      "encoder/generic/none - No encoding"
    ],
    useCases: ["Bypass signature-based AV", "Encode shellcode", "Obfuscate payloads", "Create polymorphic exploits"]
  },
  {
    name: "Evasion",
    icon: "🛡️",
    color: "#ff0055",
    simpleDesc: "More advanced antivirus bypass than encoders",
    detailedDesc: "Evasion modules go beyond encoding - they use advanced techniques to evade detection by modern antivirus software, including heuristic analysis, behavior monitoring, and machine learning-based detection. These are more sophisticated than simple encoders.",
    examples: [
      "evasion/windows/windows_defender_exe - Bypass Windows Defender",
      "evasion/windows/applocker_evasion_msbuild - Bypass AppLocker",
      "evasion/windows/process_herpaderping - Process Herpaderping technique",
      "evasion/windows/applocker_evasion_workflow_compiler"
    ],
    useCases: ["Bypass Windows Defender", "Evade AppLocker policies", "Process injection evasion", "Memory-only payloads"]
  },
  {
    name: "Exploits",
    icon: "💥",
    color: "#ff0055",
    simpleDesc: "The actual attack code, organized by target OS",
    detailedDesc: "Exploits are the actual attack code that takes advantage of vulnerabilities in target systems. They are organized by target operating system and service. An exploit without a payload just crashes the application - it needs a payload to do something useful.",
    examples: [
      "exploit/windows/smb/ms17_010_eternalblue - EternalBlue SMB exploit",
      "exploit/linux/http/cpanel_cve_2023_45802 - cPanel exploit",
      "exploit/multi/http/struts_dev_mode - Apache Struts",
      "exploit/android/browser/webview_addjavascriptinterface",
      "exploit/unix/ftp/proftpd_modcopy"
    ],
    useCases: ["Leverage CVEs", "Execute code on target", "Privilege escalation", "Gain initial access"]
  },
  {
    name: "NOPs",
    icon: "➡️",
    color: "#00ff41",
    simpleDesc: "Filler/padding code to keep payload size consistent",
    detailedDesc: "NOPs (No Operations) are literally instructions that do nothing. They are represented as 0x90 in x86 assembly. NOPs are used as padding or sleds to ensure consistent payload sizes, create landing zones for buffer overflows, or pad shellcode to meet size requirements.",
    examples: [
      "nops/x86/optimum - Optimized x86 NOP sled",
      "nops/x64/alphanumeric - 64-bit alphanumeric NOPs",
      "nops/php/generic - PHP NOP sleds",
      "nops/armle/simple - ARMLE NOP instructions"
    ],
    useCases: ["Buffer overflow padding", "Ensure consistent payload size", "Create NOP sleds", "Format padding for exploits"]
  },
  {
    name: "Payloads",
    icon: "📦",
    color: "#00ff41",
    simpleDesc: "Code that runs on the target after exploitation",
    detailedDesc: "Payloads are the code that executes on the target system after successful exploitation. They provide the functionality you want - whether its a shell, loading malware, stealing data, or running arbitrary commands. Without a payload, exploitation is meaningless.",
    examples: [
      "payload/windows/x64/shell_reverse_tcp - Single reverse shell",
      "payload/windows/x64/shell/reverse_tcp - Staged reverse shell",
      "payload/linux/x64/meterpreter_reverse_tcp - Linux meterpreter",
      "payload/android/meterpreter/reverse_tcp - Android meterpreter"
    ],
    useCases: ["Reverse shells", "Meterpreter sessions", "Add users", "Execute commands", "Data exfiltration"]
  },
  {
    name: "Post",
    icon: "🔧",
    color: "#e6edf3",
    simpleDesc: "Tools used after you're already in (post-exploitation)",
    detailedDesc: "Post modules are used after successful exploitation - during the post-exploitation phase. They help gather more information, escalate privileges, move laterally through the network, persist access, and collect credentials.",
    examples: [
      "post/linux/gather/enum_configs - Linux configuration enumeration",
      "post/windows/gather/credential_collector - Harvest credentials",
      "post/multi/manage/shell_to_meterpreter - Upgrade shell to meterpreter",
      "post/windows/manage/persistence - Create persistence backdoor"
    ],
    useCases: ["Credential harvesting", "Privilege escalation", "Lateral movement", "Persistence", "Data exfiltration"]
  }
];

export default function ModuleExplorer() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2 text-[#00ff41]">The 7 Module Types</h2>
      <p className="text-sm text-[#6e7681] mb-6">
        Metasploit contains 7 types of modules that work together during a penetration test
      </p>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
        {moduleDetails.map((mod) => (
          <button
            key={mod.name}
            onClick={() => setSelectedModule(selectedModule === mod.name ? null : mod.name)}
            className={`p-4 border rounded text-left transition-all ${
              selectedModule === mod.name 
                ? "border-[#00ff41] bg-[#0d1117]" 
                : "border-[#21262d] bg-[#161b22] hover:border-[#6e7681]"
            }`}
            style={{ borderColor: selectedModule === mod.name ? mod.color : "#21262d" }}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">{mod.icon}</span>
              <span className="font-bold" style={{ color: mod.color }}>{mod.name}</span>
            </div>
            <p className="text-xs text-[#6e7681]">{mod.simpleDesc}</p>
          </button>
        ))}
      </div>

      {/* Detailed View */}
      {selectedModule && (
        <div className="p-6 border border-[#00ff41] rounded bg-[#0d1117] mb-6">
          {moduleDetails.filter(m => m.name === selectedModule).map((mod) => (
            <div key={mod.name}>
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{mod.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: mod.color }}>{mod.name}</h3>
                  <p className="text-[#6e7681]">{mod.simpleDesc}</p>
                </div>
              </div>

              <div className="mb-4 p-4 bg-[#161b22] rounded">
                <h4 className="font-bold text-[#e6edf3] mb-2">What it does:</h4>
                <p className="text-sm text-[#e6edf3]">{mod.detailedDesc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-[#6e7681] mb-2 text-sm">EXAMPLES</h4>
                  <div className="space-y-2">
                    {mod.examples.map((ex, i) => (
                      <div key={i} className="p-2 bg-[#161b22] rounded">
                        <code className="text-xs text-[#00b4d8]">{ex}</code>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-[#6e7681] mb-2 text-sm">USE CASES</h4>
                  <div className="flex flex-wrap gap-2">
                    {mod.useCases.map((use, i) => (
                      <span key={i} className="px-2 py-1 bg-[#161b22] rounded text-xs text-[#00ff41]">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Table */}
      <div className="p-4 border border-[#21262d] rounded bg-[#0d1117]">
        <h3 className="font-bold text-[#e6edf3] mb-3">Quick Reference Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#21262d]">
                <th className="text-left p-2 text-[#6e7681]">Module</th>
                <th className="text-left p-2 text-[#6e7681]">Purpose</th>
                <th className="text-left p-2 text-[#6e7681]">Phase</th>
              </tr>
            </thead>
            <tbody>
              {moduleDetails.map((mod) => (
                <tr key={mod.name} className="border-b border-[#21262d]">
                  <td className="p-2 font-bold" style={{ color: mod.color }}>{mod.icon} {mod.name}</td>
                  <td className="p-2 text-[#e6edf3]">{mod.simpleDesc}</td>
                  <td className="p-2 text-[#6e7681]">
                    {mod.name === "Auxiliary" && "Recon/Scan"}
                    {mod.name === "Exploits" && "Exploitation"}
                    {mod.name === "Payloads" && "Post-Exploit"}
                    {mod.name === "Post" && "Post-Exploitation"}
                    {mod.name === "Encoders" && "Obfuscation"}
                    {mod.name === "Evasion" && "Obfuscation"}
                    {mod.name === "NOPs" && "Exploitation"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
