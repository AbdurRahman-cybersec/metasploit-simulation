"use client";

import { useState } from "react";

export default function PayloadTypes() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const payloadTypes = [
    {
      id: "singles",
      name: "Singles (Inline)",
      icon: "🎯",
      color: "#00ff41",
      description: "Self-contained payloads that do everything in one go. They are small and simple.",
      characteristics: [
        "Complete, standalone code",
        "No additional downloads needed",
        "Larger file size than stagers",
        "Reliable for small tasks"
      ],
      examples: [
        { name: "linux/x86/add_user", desc: "Adds a user to the Linux system" },
        { name: "windows/x64/shell_reverse_tcp", desc: "Opens a reverse shell (single payload)" },
        { name: "android/meterpreter_reverse_tcp", desc: "Android reverse TCP meterpreter" },
        { name: "cmd/windows/download_exec", desc: "Download and execute a file" }
      ],
      useCases: ["Add a new user", "Open notepad.exe", "Download a file", "Simple reverse shell"]
    },
    {
      id: "stagers",
      name: "Stagers",
      icon: "🔗",
      color: "#00b4d8",
      description: "Sets up the connection first, then pulls down the rest of the payload. Small initial size.",
      characteristics: [
        "Small initial payload",
        "Establishes connection channel",
        "Downloads the stage",
        "Used with staged payloads"
      ],
      examples: [
        { name: "windows/x64/shell/reverse_tcp", desc: "Staged - downloads shell" },
        { name: "windows/meterpreter/reverse_tcp", desc: "Staged - downloads meterpreter" },
        { name: "linux/meterpreter_reverse_tcp", desc: "Linux meterpreter stager" },
        { name: "java/jsp_shell_reverse_tcp", desc: "JSP shell stager" }
      ],
      useCases: ["Small initial payload", "Bypass size restrictions", "Establish initial connection"]
    },
    {
      id: "stages",
      name: "Stages",
      icon: "📥",
      color: "#ff9500",
      description: "The rest of the payload downloaded by the stager. Allows for bigger and more complex payloads.",
      characteristics: [
        "Downloaded by stager",
        "Larger and more powerful",
        "Full-featured functionality",
        "Meterpreter is a stage"
      ],
      examples: [
        { name: "windows/x64/shell", desc: "64-bit Windows command shell" },
        { name: "windows/x64/meterpreter", desc: "Advanced meterpreter payload" },
        { name: "linux/x64/shell", desc: "64-bit Linux command shell" },
        { name: "python/meterpreter_reverse_tcp", desc: "Python meterpreter stage" }
      ],
      useCases: ["Full meterpreter shell", "Advanced functionality", "Large payload delivery"]
    },
    {
      id: "adapters",
      name: "Adapters",
      icon: "🎭",
      color: "#ff0055",
      description: "Wraps a payload in a different format. Converts it into a PowerShell command, or other formats.",
      characteristics: [
        "Format conversion",
        "Alternative delivery methods",
        "Obfuscation possible",
        "Platform-specific wrappers"
      ],
      examples: [
        { name: "cmd/powershell/base64", desc: "PowerShell base64 encoded payload" },
        { name: "cmd/python_reverse_tcp", desc: "Python script wrapper" },
        { name: "python/meterpreter_reverse_tcp", desc: "Python meterpreter wrapper" },
        { name: "php/meterpreter_reverse_tcp", desc: "PHP script wrapper" }
      ],
      useCases: ["PowerShell delivery", "Python script execution", "PHP web shell", "Bypass restrictions"]
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2 text-[#00ff41]">Payloads Breakdown (Most Important)</h2>
      <p className="text-sm text-[#6e7681] mb-6">
        Payloads are the code that runs on the target system after successful exploitation
      </p>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {payloadTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
            className={`px-4 py-2 rounded font-bold transition-all ${
              selectedType === type.id 
                ? "text-black" 
                : "text-[#e6edf3] border border-[#21262d] hover:border-[#00ff41]"
            }`}
            style={{ 
              backgroundColor: selectedType === type.id ? type.color : "transparent",
              borderColor: selectedType === type.id ? type.color : "#21262d"
            }}
          >
            <span className="mr-2">{type.icon}</span>
            {type.name}
          </button>
        ))}
      </div>

      {/* Detailed Content */}
      {selectedType ? (
        <div className="p-6 border border-[#21262d] rounded bg-[#0d1117] animate-fadeIn">
          {payloadTypes.filter(t => t.id === selectedType).map((type) => (
            <div key={type.id}>
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{type.icon}</span>
                <h3 className="text-xl font-bold" style={{ color: type.color }}>{type.name}</h3>
              </div>
              
              <p className="text-[#e6edf3] mb-4">{type.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-[#6e7681] mb-3">KEY CHARACTERISTICS</h4>
                  <ul className="space-y-2">
                    {type.characteristics.map((char, i) => (
                      <li key={i} className="flex items-center text-sm text-[#e6edf3]">
                        <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: type.color }}></span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#6e7681] mb-3">COMMON USE CASES</h4>
                  <div className="flex flex-wrap gap-2">
                    {type.useCases.map((use, i) => (
                      <span key={i} className="px-2 py-1 bg-[#161b22] rounded text-xs text-[#00b4d8]">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-bold text-[#6e7681] mb-3">EXAMPLES</h4>
                <div className="space-y-2">
                  {type.examples.map((ex, i) => (
                    <div key={i} className="flex items-start p-3 bg-[#161b22] rounded">
                      <code className="text-sm text-[#00ff41] flex-1">{ex.name}</code>
                      <span className="text-xs text-[#6e7681] ml-4">{ex.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {payloadTypes.map((type) => (
            <div 
              key={type.id}
              className="p-4 border border-[#21262d] rounded bg-[#0d1117] hover:border-[#00ff41] transition-colors cursor-pointer"
              onClick={() => setSelectedType(type.id)}
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">{type.icon}</span>
                <h3 className="text-lg font-bold" style={{ color: type.color }}>{type.name}</h3>
              </div>
              <p className="text-sm text-[#6e7681]">{type.description}</p>
              <button className="mt-3 text-xs text-[#00b4d8] hover:underline">
                Click for details →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Naming Convention Visual */}
      <div className="mt-8 p-6 border border-[#21262d] rounded bg-[#161b22]">
        <h3 className="text-lg font-bold mb-4 text-[#e6edf3]">Naming Convention Visual</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="p-4 bg-[#0d1117] rounded text-center">
            <p className="text-xs text-[#6e7681] mb-1">SINGLE (Inline)</p>
            <p className="text-lg text-[#00ff41] font-mono">linux/x64/shell_reverse_tcp</p>
            <p className="text-xs text-[#ff9500] mt-1">underscore "_" = single</p>
          </div>
          <span className="text-2xl text-[#6e7681]">→</span>
          <div className="p-4 bg-[#0d1117] rounded text-center">
            <p className="text-xs text-[#6e7681] mb-1">STAGED</p>
            <p className="text-lg text-[#00ff41] font-mono">windows/x64/shell/reverse_tcp</p>
            <p className="text-xs text-[#ff9500] mt-1">slash "/" = staged</p>
          </div>
        </div>
      </div>
    </div>
  );
}
