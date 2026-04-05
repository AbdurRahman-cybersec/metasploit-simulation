"use client";

import { useState } from "react";

export default function ConceptCards() {
  const [active, setActive] = useState<string | null>(null);

  const concepts = [
    {
      id: "exploit",
      title: "Exploit",
      color: "#ff0055",
      icon: "💣",
      definition: "A piece of code that uses a vulnerability present on the target system.",
      example: "Using MS17-010 (EternalBlue) to exploit SMB vulnerability"
    },
    {
      id: "vulnerability",
      title: "Vulnerability",
      color: "#ff9500",
      icon: "🔓",
      definition: "A design, coding, or logic flaw affecting the target system.",
      example: "Missing patch, unvalidated input, misconfiguration"
    },
    {
      id: "payload",
      title: "Payload",
      color: "#00ff41",
      icon: "📦",
      definition: "The code that runs on the target system after successful exploitation.",
      example: "reverse_shell, meterpreter, add_user"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {concepts.map((concept) => (
        <div
          key={concept.id}
          className={`p-4 border rounded transition-all cursor-pointer ${
            active === concept.id ? "border-[#00ff41] bg-[#0d1117]" : "border-[#21262d] bg-[#161b22]"
          }`}
          onClick={() => setActive(active === concept.id ? null : concept.id)}
          style={{ borderColor: active === concept.id ? concept.color : "#21262d" }}
        >
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{concept.icon}</span>
            <h3 className="text-lg font-bold" style={{ color: concept.color }}>{concept.title}</h3>
          </div>
          <p className="text-sm text-[#e6edf3] mb-2">{concept.definition}</p>
          {active === concept.id && (
            <div className="mt-2 p-2 bg-[#0d1117] rounded">
              <p className="text-xs text-[#6e7681]">Example:</p>
              <p className="text-sm text-[#00b4d8]">{concept.example}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
