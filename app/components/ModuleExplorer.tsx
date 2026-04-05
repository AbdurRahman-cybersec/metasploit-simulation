"use client";

import { useState } from "react";

interface ModuleCategoryProps {
  name: string;
  icon: string;
  description: string;
  submodules: string[];
}

const categories: ModuleCategoryProps[] = [
  {
    name: "Auxiliary",
    icon: "🔍",
    description: "Supporting modules: scanners, fuzzers, crawlers",
    submodules: ["scanner", "fuzzers", "gather", "dos", "admin"]
  },
  {
    name: "Encoders",
    icon: "🔐",
    description: "Encode payloads to bypass signature-based AV",
    submodules: ["x86", "x64", "cmd", "php", "generic"]
  },
  {
    name: "Evasion",
    icon: "🛡️",
    description: "Modules to evade antivirus software",
    submodules: ["windows/defender", "applocker", "process_herpaderping"]
  },
  {
    name: "Exploits",
    icon: "💥",
    description: "Code that leverages vulnerabilities",
    submodules: ["windows", "linux", "multi", "android", "bsd"]
  },
  {
    name: "NOPs",
    icon: "➡️",
    description: "No Operation instructions for buffer padding",
    submodules: ["x86", "x64", "armle", "sparc"]
  },
  {
    name: "Payloads",
    icon: "📦",
    description: "Code that runs on the target system",
    submodules: ["singles", "stagers", "stages", "adapters"]
  },
  {
    name: "Post",
    icon: "🔧",
    description: "Post-exploitation modules",
    submodules: ["linux", "windows", "multi", "gather", "manage"]
  }
];

export default function ModuleExplorer() {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggle = (name: string) => {
    if (expanded.includes(name)) {
      setExpanded(expanded.filter(e => e !== name));
    } else {
      setExpanded([...expanded, name]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-[#00ff41]">Module Categories</h2>
      <div className="space-y-2">
        {categories.map((cat) => (
          <div key={cat.name} className="border border-[#21262d] rounded overflow-hidden">
            <button
              onClick={() => toggle(cat.name)}
              className="w-full flex items-center p-3 bg-[#161b22] hover:bg-[#21262d] transition-colors text-left"
            >
              <span className="mr-3 text-lg">{cat.icon}</span>
              <span className="flex-1 font-semibold text-[#e6edf3]">{cat.name}</span>
              <span className="text-[#6e7681] text-xs">{expanded.includes(cat.name) ? "▼" : "▶"}</span>
            </button>
            {expanded.includes(cat.name) && (
              <div className="p-3 bg-[#0d1117] border-t border-[#21262d]">
                <p className="text-[#6e7681] text-sm mb-2">{cat.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.submodules.map(sub => (
                    <span key={sub} className="px-2 py-1 bg-[#21262d] rounded text-xs text-[#00b4d8]">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
