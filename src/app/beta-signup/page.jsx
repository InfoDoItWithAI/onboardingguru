'use client';
import { useState } from 'react';
import BetaSignupForm from '@/components/BetaSignupForm';

export default function BetaSignup() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="5" r="2" fill="currentColor" opacity="0.6"/>
                  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                  <circle cx="12" cy="19" r="2" fill="currentColor" opacity="0.6"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-black text-white tracking-tight">
                  Onboarding<span className="text-orange-400">Guru</span>
                </h1>
                <p className="text-xs text-slate-400 font-medium">Probezeitmanagement</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm font-bold shadow-sm">
              🚀 Beta Launch
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="pt-8 md:pt-16 pb-6 md:pb-8 text-center">
          {/* Founding Member Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-2 border-orange-400/40 rounded-xl px-6 py-4 shadow-lg mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <div className="text-orange-300 font-bold text-lg">Founding Member Programm</div>
                <div className="text-orange-400 text-sm">Nur 100 Plätze verfügbar</div>
              </div>
            </div>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-3xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent leading-tight tracking-tight">
            OnboardingGuru Beta - 
            <span className="block text-orange-400 text-4xl md:text-5xl">
              Founding Members gesucht
            </span>
          </h1>

          {/* Subline */}
          <p className="text-xl md:text-2xl text-slate-300 font-bold mb-8 max-w-3xl mx-auto">
            Als einer der ersten 100 Nutzer sparst du 75% - für immer
          </p>

          {/* Value Proposition */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
            {/* Beta Pricing */}
            <div className="bg-gradient-to-br from-green-500/15 to-green-600/15 border-2 border-green-500/30 rounded-xl p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                75% RABATT
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-green-400 mb-2">€10</div>
                <div className="text-lg text-slate-400 line-through mb-2">€39/Monat</div>
                <p className="text-green-300 font-semibold">Beta-Preis für Founding Members</p>
              </div>
            </div>

            {/* Exklusivität */}
            <div className="bg-gradient-to-br from-orange-500/15 to-amber-500/15 border border-orange-500/30 rounded-xl p-6">
              <div className="text-center">
                <div className="text-4xl font-black text-orange-400 mb-2">100</div>
                <p className="text-orange-300 font-semibold mb-2">Founding Member Plätze</p>
                <div className="bg-orange-500/20 px-3 py-1 rounded-full text-orange-300 text-sm">
                  Early Access + direkter Gründer-Kontakt
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 text-slate-300">
                ✅ Early Access zu allen Features
              </span>
              <span className="bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 text-slate-300">
                📞 Direkter Gründer-Kontakt
              </span>
              <span className="bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 text-slate-300">
                🚫 Jederzeit kündbar
              </span>
              <span className="bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 text-slate-300">
                💳 No credit card needed
              </span>
            </div>
          </div>

          {/* Social Proof Counter */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-xl p-4 max-w-sm mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-300">23</div>
                  <p className="text-sm text-cyan-200 font-semibold">
                    Founding Members bereits dabei
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Beta Signup Form */}
          <BetaSignupForm />

          {/* Testimonial Placeholders */}
          <div className="mt-16 mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Was unsere Early Adopters sagen</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">MM</span>
                  </div>
                  <div>
                    <blockquote className="text-slate-300 mb-3 italic">
                      "Das Chaos mit vergessenen Probezeiten ist endlich vorbei! OnboardingGuru hat uns schon 2 teure Kündigungen erspart."
                    </blockquote>
                    <div className="text-orange-300 font-semibold">Max Mustermann</div>
                    <div className="text-slate-500 text-sm">HR-Manager, TechStart GmbH</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">SB</span>
                  </div>
                  <div>
                    <blockquote className="text-slate-300 mb-3 italic">
                      "Endlich ein Tool, das nur eine Sache macht - aber richtig gut. Keine 100 Features, die niemand braucht."
                    </blockquote>
                    <div className="text-cyan-300 font-semibold">Sarah Beispiel</div>
                    <div className="text-slate-500 text-sm">Geschäftsführerin, KMU Solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="5" r="2" fill="currentColor" opacity="0.6"/>
                  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                  <circle cx="12" cy="19" r="2" fill="currentColor" opacity="0.6"/>
                </svg>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Onboarding<span className="text-orange-400">Guru</span>
              </span>
            </div>
            <p className="text-slate-400 mb-2">© 2025 OnboardingGuru • Made in Germany 🇩🇪 • DSGVO-konform</p>
            <p className="text-slate-500">hello@onboardingguru.de</p>
          </div>
        </div>
      </footer>
    </div>
  );
}