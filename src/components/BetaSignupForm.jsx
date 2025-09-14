'use client';
import { useState } from 'react';
import { insertBetaSignup } from '@/app/lib/supabase';

export default function BetaSignupForm() {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [referralSource, setReferralSource] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [betaCount, setBetaCount] = useState(23);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = {
        email,
        company_name: companyName || null,
        employee_count: employeeCount || null,
        referral_source: referralSource || null,
        founding_member: true
      };

      const result = await insertBetaSignup(formData);
      console.log('Beta signup successful:', result);
      
      setIsSubmitted(true);
      setBetaCount(prev => prev + 1);
    } catch (error) {
      console.error('Beta signup failed:', error);
      // TODO: Show error message to user
      alert('Anmeldung fehlgeschlagen. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-green-500/15 to-green-600/15 border-2 border-green-500/30 rounded-2xl p-8 max-w-lg mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-green-400 mb-2">
              🎉 Welcome Founding Member #{betaCount}!
            </h3>
            <p className="text-green-300 font-semibold mb-4">
              Du bist jetzt Teil der exklusiven Beta-Community
            </p>
          </div>
          
          <div className="bg-green-500/20 border border-green-400/20 rounded-xl p-4 mb-6">
            <p className="text-green-300 text-sm">
              ✅ Beta-Zugang wird per E-Mail versendet<br/>
              ✅ €10/Monat Founding Member Preis gesichert<br/>
              ✅ Direkter Draht zum Gründer-Team
            </p>
          </div>
          
          <p className="text-slate-300 text-sm">
            Du bekommst eine E-Mail, sobald wir live gehen. <br/>
            <strong className="text-white">Danke fürs Vertrauen! 🚀</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
          Founding Member werden
        </h3>
        <p className="text-slate-400 text-sm">
          Nur noch {100 - betaCount} von 100 Plätzen verfügbar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email - Required */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            E-Mail Adresse *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="max.mustermann@firma.de"
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-slate-400 transition-colors min-h-[48px]"
            required
            autoComplete="email"
          />
        </div>

        {/* Company Name - Optional */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Firmenname <span className="text-slate-500">(optional)</span>
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Ihre Firma GmbH"
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-slate-400 transition-colors min-h-[48px]"
          />
        </div>

        {/* Employee Count - Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Mitarbeiteranzahl
          </label>
          <select
            value={employeeCount}
            onChange={(e) => setEmployeeCount(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white min-h-[48px] cursor-pointer"
          >
            <option value="">Bitte auswählen</option>
            <option value="1-10">1-10 Mitarbeiter</option>
            <option value="11-25">11-25 Mitarbeiter</option>
            <option value="26-50">26-50 Mitarbeiter</option>
            <option value="50+">50+ Mitarbeiter</option>
          </select>
        </div>

        {/* Referral Source */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Woher haben Sie von uns gehört?
          </label>
          <select
            value={referralSource}
            onChange={(e) => setReferralSource(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white min-h-[48px] cursor-pointer"
          >
            <option value="">Bitte auswählen</option>
            <option value="linkedin">LinkedIn</option>
            <option value="google">Google Suche</option>
            <option value="recommendation">Empfehlung eines Kollegen</option>
            <option value="hr-community">HR-Community/Forum</option>
            <option value="other">Sonstiges</option>
          </select>
        </div>

        {/* CTA Button */}
        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 disabled:from-slate-600 disabled:to-slate-700 text-white py-4 px-6 rounded-xl text-lg font-bold transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 min-h-[56px] touch-manipulation shadow-lg disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Wird verarbeitet...</span>
            </div>
          ) : (
            '🚀 Founding Member werden - €10 statt €39'
          )}
        </button>

        {/* Trust Signals */}
        <div className="text-center mt-4">
          <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-500 mb-3">
            <span className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>Keine Kreditkarte nötig</span>
            </span>
            <span className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>Jederzeit kündbar</span>
            </span>
            <span className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>DSGVO-konform</span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}