"use client";

export default function PayloadTypes() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6 text-[#00ff41]">Payload Types</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border border-[#21262d] rounded bg-[#0d1117]">
          <div className="flex items-center mb-3">
            <span className="text-[#00b4d8] mr-2">●</span>
            <h3 className="text-lg font-bold text-[#00b4d8]">Single (Inline) Payloads</h3>
          </div>
          <p className="text-sm text-[#6e7681] mb-3">
            Self-contained payloads that don't need to download additional components.
          </p>
          <div className="bg-[#161b22] p-3 rounded">
            <p className="text-xs text-[#6e7681]">Example:</p>
            <p className="text-sm text-[#00ff41] font-mono">generic/shell_reverse_tcp</p>
          </div>
          <p className="text-xs text-[#6e7681] mt-2">Identifier: underscore "_" between words</p>
        </div>

        <div className="p-4 border border-[#21262d] rounded bg-[#0d1117]">
          <div className="flex items-center mb-3">
            <span className="text-[#ff9500] mr-2">●</span>
            <h3 className="text-lg font-bold text-[#ff9500]">Staged Payloads</h3>
          </div>
          <p className="text-sm text-[#6e7681] mb-3">
            Two-part payloads: stager downloads the stage for smaller initial size.
          </p>
          <div className="bg-[#161b22] p-3 rounded">
            <p className="text-xs text-[#6e7681]">Example:</p>
            <p className="text-sm text-[#00ff41] font-mono">windows/x64/shell/reverse_tcp</p>
          </div>
          <p className="text-xs text-[#6e7681] mt-2">Identifier: slash "/" between words</p>
        </div>
      </div>

      <div className="mt-6 p-4 border border-[#21262d] rounded bg-[#161b22]">
        <h3 className="text-md font-bold mb-3 text-[#e6edf3]">Payload Directories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="p-2 bg-[#0d1117] rounded">
            <p className="text-[#00ff41] font-semibold">Adapters</p>
            <p className="text-xs text-[#6e7681]">Wrap payloads (e.g., Powershell)</p>
          </div>
          <div className="p-2 bg-[#0d1117] rounded">
            <p className="text-[#00ff41] font-semibold">Singles</p>
            <p className="text-xs text-[#6e7681]">Self-contained (adduser, notepad)</p>
          </div>
          <div className="p-2 bg-[#0d1117] rounded">
            <p className="text-[#00ff41] font-semibold">Stagers</p>
            <p className="text-xs text-[#6e7681]">Setup connection channel</p>
          </div>
          <div className="p-2 bg-[#0d1117] rounded">
            <p className="text-[#00ff41] font-semibold">Stages</p>
            <p className="text-xs text-[#6e7681]">Downloaded by stager</p>
          </div>
        </div>
      </div>
    </div>
  );
}
