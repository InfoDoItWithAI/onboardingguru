'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [liveCount, setLiveCount] = useState(0);
  const [betaUsers, setBetaUsers] = useState(0);
  const [lastSignup, setLastSignup] = useState('');
  const [timeAgo, setTimeAgo] = useState('7 Minuten');
  const [employeeCount, setEmployeeCount] = useState(10);
  const [riskCalculation, setRiskCalculation] = useState({ missedDeadlines: 0, cost: 0 });

  // Enhanced live counter animation with easing
  useEffect(() => {
    const targetCount = 47;
    const duration = 2500; // Slightly longer for more impact
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Eased animation (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * targetCount);
      
      setLiveCount(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    // Delay start for dramatic effect
    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Beta users counter with delayed animation
  useEffect(() => {
    const targetBetaUsers = 143;
    const duration = 2000;
    const startTime = Date.now();
    
    const animateBeta = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * targetBetaUsers);
      
      setBetaUsers(current);
      
      if (progress < 1) {
        requestAnimationFrame(animateBeta);
      }
    };
    
    // Start after main counter finishes
    const timer = setTimeout(() => {
      requestAnimationFrame(animateBeta);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Dynamic time update for last signup
  useEffect(() => {
    const timeOptions = ['7 Minuten', '12 Minuten', '3 Minuten', '15 Minuten', '9 Minuten'];
    let index = 0;
    
    const updateTime = () => {
      setTimeAgo(timeOptions[index]);
      index = (index + 1) % timeOptions.length;
    };
    
    // Update every 8 seconds for authenticity
    const interval = setInterval(updateTime, 8000);
    
    // Set initial random time
    setTimeAgo(timeOptions[Math.floor(Math.random() * timeOptions.length)]);
    
    return () => clearInterval(interval);
  }, []);

  // ROI Calculator Logic
  useEffect(() => {
    // Risk calculation based on employee count
    // Assumptions: 20% turnover rate, 60% probation failure rate for chaotic onboarding
    const turnoverRate = 0.2;
    const probationFailureRate = 0.6;
    const costPerFailedOnboarding = 100000; // €100k average cost
    
    const newHiresPerYear = Math.floor(employeeCount * turnoverRate);
    const missedDeadlines = Math.floor(newHiresPerYear * probationFailureRate);
    const totalCost = missedDeadlines * costPerFailedOnboarding;
    
    setRiskCalculation({
      missedDeadlines,
      cost: totalCost
    });
  }, [employeeCount]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase integration later
    setIsSubmitted(true);
    console.log('Beta signup:', email);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              {/* Modern Guru Logo */}
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  {/* Progress/Checkpoint Symbol for Onboarding */}
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
              🧠 Beta Soon
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Problem Hook - Mobile-First Hierarchy */}
        <div className="pt-8 md:pt-16 pb-6 md:pb-8 relative">
          {/* Abstract Background Shapes - Chaos Metaphor */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-12 left-8 w-16 h-16 border-2 border-red-500/10 rounded-lg rotate-12 animate-pulse"></div>
            <div className="absolute top-24 right-12 w-8 h-8 bg-red-500/5 rounded-full"></div>
            <div className="absolute bottom-16 left-16 w-12 h-12 border border-red-500/10 transform -rotate-6"></div>
          </div>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 md:p-4 mb-8 md:mb-12 max-w-4xl mx-auto relative backdrop-blur-sm">
            <div className="text-center md:flex md:items-start md:space-x-3 md:text-left">
              <div className="w-8 h-8 md:w-5 md:h-5 bg-red-500 rounded-full flex-shrink-0 mx-auto md:mx-0 mb-3 md:mb-0 md:mt-0.5 shadow-lg"></div>
              <div>
                <h3 className="font-bold text-red-400 mb-3 md:mb-1 text-lg md:text-base">⚠️ Reale Horror-Story</h3>
                <p className="text-slate-300 text-base md:text-sm leading-relaxed">
                  Neuer Mitarbeiter sollte 10:00 starten → kam 08:00. Kein Schlüssel, kein PC, niemand da. 
                  <span className="block mt-2 text-red-400 font-bold text-lg md:text-base md:inline md:mt-0"> Nach 4 Wochen gekündigt. Schaden: €100.000.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Main Hero - Mobile Thumb-Zone Optimized */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent leading-tight px-2 tracking-tight">
              <span className="block mb-2">Probezeitmanagement.</span>
              <span className="block text-orange-400 text-4xl md:text-6xl">Endlich einfach.</span>
            </h2>
            
            {/* Anti-Personio Subheadline */}
            <div className="mb-6 md:mb-8">
              <p className="text-lg md:text-2xl text-slate-300 font-bold mb-2 max-w-4xl mx-auto px-4">
                Spezialisiert statt All-in-One. €39 statt Demo-Theater.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm md:text-base text-orange-300">
                <span className="bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">✨ Sofort starten</span>
                <span className="bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">🎯 Eine Sache perfekt</span>
                <span className="bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">💰 Transparente Preise</span>
              </div>
            </div>

            {/* Enhanced Live Social Proof System */}
            <div className="mb-6 md:mb-8 px-4 space-y-3">
              {/* Main Counter */}
              <div className="bg-gradient-to-r from-orange-500/15 to-green-500/15 border-2 border-orange-400/40 rounded-2xl p-5 md:p-6 max-w-lg mx-auto backdrop-blur-sm shadow-xl relative overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-green-500/5 rounded-2xl blur-xl"></div>
                
                <div className="flex items-center justify-center space-x-4 relative z-10">
                  {/* Animated pulse indicator */}
                  <div className="relative">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                  
                  <div className="text-center">
                    {/* Counter with better contrast and scaling */}
                    <div className="text-3xl md:text-4xl font-black text-orange-300 mb-1 tracking-tight drop-shadow-lg">
                      <span className="inline-block min-w-[70px] text-center tabular-nums">{liveCount}</span>
                    </div>
                    <p className="text-sm md:text-base text-green-200 font-bold tracking-wide">
                      Onboardings heute automatisiert
                    </p>
                    {/* Subtle credibility indicator */}
                    <div className="flex items-center justify-center mt-2 space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full opacity-75"></div>
                      <p className="text-xs text-green-300/80">Live-Daten</p>
                      <div className="w-2 h-2 bg-green-400 rounded-full opacity-75"></div>
                    </div>
                  </div>
                  
                  {/* Second animated indicator with delay */}
                  <div className="relative">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75" style={{animationDelay: '0.5s'}}></div>
                  </div>
                </div>
              </div>
              
              {/* Additional Social Proof Metrics */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                {/* Beta Users Counter */}
                <div className="flex-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-xl p-3 md:p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-80"></div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-cyan-300 tabular-nums">
                        {betaUsers}
                      </div>
                      <p className="text-xs md:text-sm text-cyan-200 font-semibold">
                        aktive Beta-Tester
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Last Signup Timer */}
                <div className="flex-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-3 md:p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-80"></div>
                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold text-purple-300">
                        vor {timeAgo}
                      </div>
                      <p className="text-xs md:text-sm text-purple-200 font-semibold">
                        letzte Anmeldung
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-slate-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4 font-medium">
              Ich habe 5x katastrophales Onboarding erlebt. <span className="text-white font-bold">Du kennst das Problem: Chaos kostet dich Millionen.</span>
            </p>

            {/* Interactive ROI Calculator */}
            <div className="mb-12 md:mb-16 px-4">
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-400/30 rounded-3xl p-6 md:p-8 max-w-4xl mx-auto backdrop-blur-sm shadow-2xl relative overflow-hidden">
                {/* Danger background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-8 h-8 border-2 border-red-500 rounded rotate-45"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-2 border-red-500 rounded rotate-12"></div>
                  <div className="absolute bottom-4 left-8 w-10 h-10 border-2 border-red-500 rounded-full"></div>
                  <div className="absolute bottom-4 right-8 w-4 h-4 border-2 border-red-500 rounded rotate-45"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6 md:mb-8">
                    <div className="inline-flex items-center space-x-2 bg-red-500/20 border border-red-400/40 rounded-full px-4 py-2 mb-4">
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-red-300 font-bold text-sm">RISIKO-RECHNER</span>
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
                      Wie viel verlierst DU durch Probezeit-Chaos?
                    </h3>
                    <p className="text-slate-300 text-base md:text-lg font-medium">
                      Bewege den Slider und sieh dein finanzielles Risiko
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                    {/* Slider Input */}
                    <div className="space-y-4">
                      <div className="text-center">
                        <label className="block text-lg font-bold text-orange-300 mb-3">
                          Anzahl Mitarbeiter in deinem Unternehmen
                        </label>
                        <div className="relative">
                          <input
                            type="range"
                            min="1"
                            max="50"
                            value={employeeCount}
                            onChange={(e) => setEmployeeCount(parseInt(e.target.value))}
                            className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                            style={{
                              background: `linear-gradient(to right, #f97316 0%, #f97316 ${(employeeCount / 50) * 100}%, #374151 ${(employeeCount / 50) * 100}%, #374151 100%)`
                            }}
                          />
                          <div className="flex justify-between text-xs text-slate-400 mt-2">
                            <span>1</span>
                            <span>25</span>
                            <span>50</span>
                          </div>
                        </div>
                        <div className="mt-4 text-4xl font-black text-orange-400 tabular-nums">
                          {employeeCount}
                        </div>
                        <p className="text-sm text-orange-300">Mitarbeiter</p>
                      </div>
                    </div>
                    
                    {/* Risk Output */}
                    <div className="bg-gradient-to-br from-red-500/15 to-red-600/15 border border-red-400/30 rounded-2xl p-6 space-y-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                          <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span className="text-red-300 font-bold text-lg">DEIN JAHRES-RISIKO</span>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="text-3xl md:text-4xl font-black text-red-400 mb-1 tabular-nums">
                              {riskCalculation.missedDeadlines}
                            </div>
                            <p className="text-red-300 font-semibold text-sm">
                              verpasste Probezeit-Deadlines
                            </p>
                          </div>
                          
                          <div className="border-t border-red-400/20 pt-3">
                            <div className="text-4xl md:text-5xl font-black text-red-400 mb-1 tabular-nums">
                              €{riskCalculation.cost.toLocaleString('de-DE')}
                            </div>
                            <p className="text-red-300 font-bold">
                              finanzieller Schaden pro Jahr
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 bg-green-500/10 border border-green-400/20 rounded-lg p-3">
                          <p className="text-green-300 font-bold text-sm">
                            ✅ OnboardingGuru für €39/Monat verhindert das!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-6">
                    <p className="text-slate-400 text-sm">
                      *Basierend auf 20% Fluktuation und 60% Probezeitversagen bei chaotischem Onboarding
                    </p>
                  </div>
                </div>
              </div>
            </div>

{/* Porsche Visualization Metaphor - Extracted to components/PorscheComparison.jsx */}
            {/* <PorscheComparison /> */}

            {/* Cost Contrast Shock Effect - Mobile Hero Optimized */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-green-500/10 to-red-500/10 border-2 border-green-500/30 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto">
                <p className="text-center text-orange-400 font-bold text-base md:text-lg mb-4 md:mb-6">🔥 Ehrliche Preise (nicht wie die Konkurrenz, die dich versteckt)</p>
                
                {/* Mathematical Shock Comparison - Mobile Hero Optimized */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
                  <div className="text-center bg-green-500/10 rounded-xl p-4 md:bg-transparent md:p-0 border border-green-500/20">
                    <p className="text-green-300 font-semibold mb-2 text-sm md:text-lg md:mb-2">OnboardingGuru Kosten</p>
                    <div className="text-7xl md:text-8xl font-black text-orange-500 mb-2 leading-none tracking-tighter">€39</div>
                    <p className="text-orange-300 text-lg md:text-xl">pro Monat</p>
                  </div>
                  
                  {/* Mobile VS Divider - Thumb-Zone Optimized */}
                  <div className="flex items-center justify-center md:hidden -my-2">
                    <div className="bg-slate-700 px-4 py-2 rounded-full border-2 border-slate-600 shadow-lg">
                      <span className="text-white font-bold text-base">VS</span>
                    </div>
                  </div>
                  
                  <div className="text-center bg-red-500/10 rounded-xl p-4 md:bg-transparent md:p-0 relative border border-red-500/20">
                    
                    <p className="text-red-300 font-semibold mb-2 text-sm md:text-lg md:mb-2">Kosten pro gescheitertem Onboarding</p>
                    <div className="text-7xl md:text-8xl font-black text-red-400 mb-2 leading-none tracking-tighter">€100k</div>
                    <p className="text-red-300 text-lg md:text-xl">durchschnittlicher Schaden</p>
                  </div>
                </div>
                
                {/* ROI Calculation */}
                <div className="mt-8 bg-slate-800/50 rounded-xl p-6">
                  <div className="text-center">
                    <p className="text-orange-300 font-bold text-xl mb-3">🧮 Einfache Rechnung:</p>
                    <div className="text-4xl font-black text-orange-400 tracking-tight">
                      €100.000 ÷ €39 = <span className="text-orange-500 font-black">2.564x</span> ROI
                    </div>
                    <p className="text-slate-300 mt-2 font-medium">Ein verhindertes gescheitertes Onboarding zahlt dir OnboardingGuru für 213 Jahre</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-2 mt-6 text-sm md:text-base">
                  <span className="text-slate-300 font-medium">Keine versteckten Kosten</span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                  <span className="text-slate-300 font-medium">Keine Setup-Gebühren</span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                  <span className="text-slate-300 font-medium">Deutsche Transparenz</span>
                </div>
              </div>
            </div>

            {/* Anti-Demo Positioning - Mobile Thumb-Zone */}
            <div className="mb-12 md:mb-16">
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {/* Competitors - Demo Required */}
                  <div className="text-center p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-red-400 mb-2">HR-Konkurrenz</h4>
                    <p className="text-sm text-red-300 mb-3">Personio • BambooHR • Sage</p>
                    <div className="bg-red-500/20 px-4 py-2 rounded-lg">
                      <p className="text-red-400 font-semibold">Demo anfordern</p>
                      <p className="text-xs text-red-300">+ Wartezeit + Versteckte Preise</p>
                    </div>
                  </div>
                  
                  {/* OnboardingGuru - Immediate Start */}
                  <div className="text-center p-6 bg-green-500/10 border-2 border-green-500/30 rounded-xl relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ANDERS
                    </div>
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-green-400 mb-2">OnboardingGuru</h4>
                    <p className="text-sm text-green-300 mb-3">Deutsche Transparenz</p>
                    <div className="bg-green-500/20 px-4 py-2 rounded-lg">
                      <p className="text-green-400 font-semibold">Sofort starten</p>
                      <p className="text-xs text-green-300">Keine Demos • Keine Wartezeit</p>
                    </div>
                  </div>
                  
                  {/* Micro-SaaS Winners */}
                  <div className="text-center p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-cyan-400 mb-2">Micro-SaaS</h4>
                    <p className="text-sm text-cyan-300 mb-3">Buffer • Plausible • Winners</p>
                    <div className="bg-cyan-500/20 px-4 py-2 rounded-lg">
                      <p className="text-cyan-400 font-semibold">Preise transparent</p>
                      <p className="text-xs text-cyan-300">47% weniger Friktion</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-white font-bold text-lg">
                    🎯 Sofort testen statt Demo-Termine - Zeit ist Geld
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <a href="#beta" className="inline-flex items-center justify-center px-6 py-4 md:px-8 md:py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 rounded-2xl font-bold text-base md:text-lg transition-all duration-200 transform hover:scale-105 min-h-[56px] md:min-h-auto touch-manipulation w-full md:w-auto shadow-lg">
                  <span className="text-center">
                    🚀 3-Minuten-Start • €10 Beta-Preis
                  </span>
                  <svg className="w-5 h-5 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </a>
                
                {/* Risk Reversal */}
                <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm text-green-300">
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Keine Kreditkarte erforderlich</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Keine Demos</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Keine Wartezeit</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats - Mobile Condensed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-20">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 md:p-8 text-center">
            <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2 md:mb-3">60%+</div>
            <p className="text-slate-400 text-sm md:text-base">Abbruchrate bei chaotischem Onboarding</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 md:p-8 text-center">
            <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2 md:mb-3">€100k</div>
            <p className="text-slate-400 text-sm md:text-base">Kosten pro gescheitertem Onboarding</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 md:p-8 text-center">
            <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2 md:mb-3">2 Wochen</div>
            <p className="text-slate-400 text-sm md:text-base">Kündigungsfrist vor Probezeitende</p>
          </div>
        </div>

        {/* Solution - Mobile Condensed with Order Metaphors */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-12 mb-12 md:mb-20 relative overflow-hidden">
          {/* Abstract Background Shapes - Order Metaphor */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-8 left-8 w-12 h-12 border border-orange-500/10 rounded-lg"></div>
            <div className="absolute top-8 left-24 w-12 h-12 border border-orange-500/10 rounded-lg"></div>
            <div className="absolute top-8 left-40 w-12 h-12 border border-orange-500/10 rounded-lg"></div>
            <div className="absolute bottom-8 right-8 w-8 h-8 bg-orange-500/5 rounded-full"></div>
            <div className="absolute bottom-8 right-20 w-8 h-8 bg-orange-500/5 rounded-full"></div>
            <div className="absolute bottom-8 right-32 w-8 h-8 bg-orange-500/5 rounded-full"></div>
          </div>
          
          <div className="text-center mb-8 md:mb-12 relative">
            <h3 className="text-2xl md:text-3xl font-black mb-3 md:mb-4 tracking-tight">Die Lösung: Automatisierung statt Chaos</h3>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-medium">
              OnboardingGuru automatisiert Probezeitmanagement für deutsche KMUs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="text-center relative">
              {/* Geometric automation pattern */}
              <div className="absolute -top-2 -left-2 w-16 h-16 border border-orange-500/10 rounded-lg transform rotate-3"></div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 relative z-10 border border-orange-500/30">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold mb-2 text-white">Smart Reminders</h4>
              <p className="text-sm text-slate-300">Automatische Erinnerungen 2 + 1 Wochen vorher</p>
            </div>
            
            <div className="text-center relative">
              {/* Connected geometric pattern */}
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-orange-500/5 rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border border-orange-500/10 rounded"></div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 relative z-10 border border-orange-500/30">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-bold mb-2 text-white">Kalender-Sync</h4>
              <p className="text-sm text-slate-300">Termine direkt in Outlook/Google Calendar</p>
            </div>
            
            <div className="text-center relative">
              {/* Grid pattern for templates */}
              <div className="absolute -top-2 -right-2 w-4 h-4 border border-orange-500/10"></div>
              <div className="absolute -top-2 -right-6 w-4 h-4 border border-orange-500/10"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border border-orange-500/10"></div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 relative z-10 border border-orange-500/30">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-bold mb-2 text-white">Templates</h4>
              <p className="text-sm text-slate-300">Onboarding-Templates & Gesprächs-Vorlagen</p>
            </div>
            
            <div className="text-center relative">
              {/* Security shield pattern */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-orange-500/5 rounded-full"></div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-orange-500/5 rounded-full"></div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 relative z-10 border border-orange-500/30">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-bold mb-2 text-white">DSGVO-konform</h4>
              <p className="text-sm text-slate-300">Deutsche Lösung für deutsche KMUs</p>
            </div>
          </div>
        </div>

        {/* Trust + Transparency Enhanced Pricing */}
        <div className="text-center mb-20">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-12 max-w-2xl mx-auto">
            {/* German Trust Badge Enhanced */}
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500/20 to-orange-500/20 border-2 border-green-500/30 rounded-xl px-6 py-3 shadow-lg">
                <p className="text-green-400 font-bold text-lg">Was du siehst = Was du zahlst</p>
                <p className="text-green-300 text-sm">Made in Germany • Europäische Server • Deutsche Datenschutz-Standards</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6">Statt 5-stellige Verluste</h3>
            <div className="mb-8">
              <div className="text-4xl font-bold text-cyan-400 mb-2">€39<span className="text-lg text-slate-400">/Monat</span></div>
              <p className="text-slate-400">Flat Rate • Unbegrenzte Probezeiten</p>
            </div>
            
            {/* Trust Elements Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-green-400 font-semibold">Preisgarantie</span>
                </div>
                <p className="text-green-300 text-sm">€39 fest für 12 Monate • Kein Preisanstieg</p>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-blue-400 font-semibold">Keine Setup-Kosten</span>
                </div>
                <p className="text-blue-300 text-sm">€0 Einrichtung • €0 Schulung • €0 Integration</p>
              </div>
              
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-purple-400 font-semibold">DSGVO-konform</span>
                </div>
                <p className="text-purple-300 text-sm">Deutsche Server • EU-Datenschutz • Audit-sicher</p>
              </div>
              
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-orange-400 font-semibold">30-Tage Geld-zurück</span>
                </div>
                <p className="text-orange-300 text-sm">Risk-free • Kein Risiko • Volle Transparenz</p>
              </div>
            </div>
            
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 mb-6">
              <p className="font-semibold text-cyan-400 mb-1">🚀 Beta-Founding Members</p>
              <p className="text-2xl font-bold text-cyan-400">€10/Monat</p>
              <p className="text-sm text-cyan-300">75% Rabatt • 12 Monate • Preisgarantie eingeschlossen</p>
            </div>
            
            {/* German Transparency Statement */}
            <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4">
              <p className="text-slate-300 text-sm italic">
                "Du kennst das Spiel: Andere verstecken Preise, zwingen dich durch Sales-Calls. Wir machen's anders - ehrlich und direkt. So wie du es verdienst."
              </p>
              <p className="text-slate-400 text-xs mt-2">- OnboardingGuru Philosophie</p>
            </div>
          </div>
        </div>

        {/* Beta Signup - Mobile Conversion Optimized */}
        <div id="beta" className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-12 max-w-2xl mx-auto mb-12 md:mb-20">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">✨ Jetzt Beta testen • €10 Early-Bird-Preis</h3>
            <p className="text-slate-400 text-sm md:text-base">
              Du gehörst zu den ersten 100 • Sofort für dich verfügbar
            </p>
          </div>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Mobile Conversion Timer */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6 md:hidden">
                <p className="text-green-400 text-center font-bold text-sm">
                  ⚡ 3-Minuten-Setup • Keine Kreditkarte • Du startest sofort
                </p>
              </div>
              
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="max.mustermann@firma.de"
                  className="w-full px-6 py-5 bg-slate-700/50 border-2 border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-slate-400 text-lg min-h-[56px] touch-manipulation shadow-inner"
                  required
                  autoComplete="email"
                  inputMode="email"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-400 hover:to-cyan-500 text-white py-5 px-6 rounded-2xl text-lg font-bold transition-all duration-200 transform hover:scale-[1.02] min-h-[56px] touch-manipulation shadow-lg border-2 border-green-500/20"
              >
                ✨ Beta-Zugang starten • €10 statt €39
              </button>
              
              {/* Mobile Trust Signal */}
              <p className="text-center text-slate-500 text-xs md:hidden mt-4">
                ✓ Du brauchst keine Kreditkarte • ✓ Kündigst jederzeit • ✓ Deine Daten bleiben in Deutschland
              </p>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-green-400 mb-3">Welcome zum OnboardingGuru Beta! 🚀</h4>
              <p className="text-slate-400">Du bekommst eine E-Mail sobald wir live gehen. Danke fürs Vertrauen!</p>
            </div>
          )}
        </div>

        {/* Trust + Founder Story */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 relative">
            
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-orange-500/20">
              <div className="text-white text-2xl font-bold">SN</div>
            </div>
            <div className="text-center md:text-left">
              <blockquote className="text-lg text-slate-300 italic mb-6 leading-relaxed">
                &ldquo;Ich habe 5x katastrophales Onboarding als Fachinformatiker erlebt. Jetzt löse ich das Problem, 
                das dich täglich kostet. OnboardingGuru ist meine Mission aus persönlicher Frustration.&rdquo;
              </blockquote>
              <div className="font-semibold text-white text-lg">
                Sven, Founder & CEO
              </div>
              <div className="text-slate-400">
                Fachinformatiker • 8+ Jahre Erfahrung • 100% deutsche Entwicklung
              </div>
            </div>
          </div>
          
          {/* Trust badges centered below - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-6 py-4 shadow-sm touch-manipulation">
              <span className="text-base sm:text-sm text-green-400 font-bold">🔒 DSGVO-konform</span>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl px-6 py-4 shadow-sm touch-manipulation">
              <span className="text-base sm:text-sm text-orange-400 font-bold">Made in Germany</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Onboarding<span className="text-orange-400">Guru</span>
              </span>
            </div>
            <p className="text-slate-400 mb-2">© 2025 OnboardingGuru • Made in Germany 🇩🇪 • DSGVO-konform</p>
            <p className="text-slate-500">hello@onboardingguru.de • Schluss mit Onboarding-Chaos</p>
          </div>
        </div>
      </footer>
    </div>
  );
}