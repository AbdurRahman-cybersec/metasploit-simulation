import Console from "./components/Console";
import ModuleExplorer from "./components/ModuleExplorer";
import ConceptCards from "./components/ConceptCards";
import PayloadTypes from "./components/PayloadTypes";
import HelpBar from "./components/HelpBar";
import MetasploitDiagram from "./components/MetasploitDiagram";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e6edf3] font-mono">
      <div className="scanline"></div>
      
      <header className="border-b border-[#21262d] p-4 bg-[#161b22]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#00ff41]">Metasploit Framework Simulation</h1>
            <p className="text-sm text-[#6e7681]">Interactive learning tool for understanding Metasploit concepts</p>
          </div>
          <Link href="/msfconsole" className="px-4 py-2 bg-[#00b4d8] text-black font-bold rounded hover:bg-[#0099cc]">
            Task 3: Msfconsole →
          </Link>
        </div>
      </header>

      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        <section className="mb-8">
          <HelpBar />
        </section>

        <section className="mb-8">
          <MetasploitDiagram />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section>
            <h2 className="text-lg font-semibold mb-3 text-[#00b4d8] flex items-center">
              <span className="mr-2">▸</span>MSF Console
            </h2>
            <Console />
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-[#00b4d8] flex items-center">
              <span className="mr-2">▸</span>Key Concepts
            </h2>
            <ConceptCards />
          </section>
        </div>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-[#00b4d8] flex items-center">
            <span className="mr-2">▸</span>Module Categories
          </h2>
          <ModuleExplorer />
        </section>

        <section className="mb-8">
          <PayloadTypes />
        </section>
      </main>

      <footer className="border-t border-[#21262d] p-4 text-center text-[#6e7681] text-sm">
        Metasploit Framework Educational Simulation
      </footer>
    </div>
  );
}
