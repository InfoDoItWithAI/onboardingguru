'use client';
import { useState, useEffect } from 'react';

export default function PorscheComparison() {
  const [badHires, setBadHires] = useState(3);
  const [porscheCount, setPorscheCount] = useState(0);

  // Porsche Calculator Logic
  useEffect(() => {
    const costPerBadHire = 100000; // €100k per bad hire
    const porschePrice = 120000; // €120k average Porsche 911 price
    const totalLoss = badHires * costPerBadHire;
    const porsches = Math.floor(totalLoss / porschePrice);
    
    setPorscheCount(porsches);
  }, [badHires]);

  return (
    <div className="mb-12 md:mb-16 px-4">
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-amber-400/30 rounded-3xl p-6 md:p-8 max-w-4xl mx-auto backdrop-blur-sm shadow-2xl relative overflow-hidden">
        {/* Luxury background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-8 left-8 w-12 h-12 border-2 border-amber-400 rounded-full"></div>
          <div className="absolute top-8 right-8 w-8 h-8 border-2 border-amber-400 rounded rotate-45"></div>
          <div className="absolute bottom-8 left-12 w-6 h-6 bg-amber-400 rounded-full"></div>
          <div className="absolute bottom-8 right-12 w-10 h-10 border-2 border-amber-400 rounded"></div>
        </div>
        
        <div className="relative z-10">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 rounded-full px-4 py-2 mb-4">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-amber-300 font-bold text-sm">VERLUST-VISUALISIERUNG</span>
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
              Stell dir vor: Deine Fehlentscheidungen = Porsche 911
            </h3>
            <p className="text-slate-300 text-base md:text-lg font-medium">
              Jeder schlechte Hire kostet dich einen Sportwagen
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Bad Hires Slider */}
            <div className="space-y-4">
              <div className="text-center">
                <label className="block text-lg font-bold text-amber-300 mb-3">
                  Anzahl schlechter Hires in den letzten Jahren
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={badHires}
                    onChange={(e) => setBadHires(parseInt(e.target.value))}
                    className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(badHires / 10) * 100}%, #374151 ${(badHires / 10) * 100}%, #374151 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                </div>
                <div className="mt-4 text-4xl font-black text-amber-400 tabular-nums">
                  {badHires}
                </div>
                <p className="text-sm text-amber-300">schlechte Hires</p>
              </div>
            </div>
            
            {/* Porsche Visualization */}
            <div className="bg-gradient-to-br from-amber-500/15 to-yellow-600/15 border border-amber-400/30 rounded-2xl p-6 space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <svg className="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                  </svg>
                  <span className="text-amber-300 font-bold text-xl">DEINE PORSCHE-SAMMLUNG</span>
                </div>
                
                {/* Dynamic Porsche Icons */}
                <div className="flex flex-wrap justify-center gap-2 mb-4 min-h-[60px]">
                  {Array.from({ length: Math.min(porscheCount, 8) }, (_, i) => (
                    <div key={i} className="transform transition-all duration-300 hover:scale-110">
                      <svg className="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                      </svg>
                    </div>
                  ))}
                  {porscheCount > 8 && (
                    <div className="text-amber-400 font-bold text-2xl">
                      +{porscheCount - 8}
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-4xl md:text-5xl font-black text-amber-400 mb-1 tabular-nums">
                      {porscheCount}
                    </div>
                    <p className="text-amber-300 font-bold">
                      Porsche 911 hättest du kaufen können
                    </p>
                  </div>
                  
                  <div className="border-t border-amber-400/20 pt-3">
                    <div className="text-2xl font-bold text-amber-300 mb-1">
                      €{(badHires * 100000).toLocaleString('de-DE')}
                    </div>
                    <p className="text-amber-200 text-sm">
                      Verlust durch schlechte Hires
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 bg-orange-500/10 border border-orange-400/20 rounded-lg p-3">
                  <p className="text-orange-300 font-bold text-sm">
                    🚗 €39/Monat verhindert {porscheCount} Porsche Verlust!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-slate-400 text-sm italic">
              "Ein Porsche 911 kostet €120.000 • Ein schlechter Hire kostet €100.000"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}