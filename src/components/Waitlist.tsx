import React, { useState } from 'react';

// ============================================================
// WAITLIST PLACEHOLDER COMPONENT
// This is a UI placeholder for the waitlist feature.
// When ready to go live, replace the handleSubmit function
// with a real API call (e.g., Supabase, Mailchimp, etc.)
// ============================================================

export const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  // Placeholder: just shows a success state without any real API call
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsJoined(true); // TODO: replace with real API call when ready
  };

  return (
    <div className="relative group max-w-md w-full mx-auto">
      {/* Outer glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-red-500 to-amber-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl hover:border-amber-500/50 transition-all duration-500">
        {!isJoined ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-400 text-lg animate-pulse">✦</span>
              <h3 className="text-xl font-bold text-white">Join the Future of Healthcare</h3>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Be the first to experience GLOHSEN. Get exclusive early access and updates.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-black/20 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 rounded-xl h-12 px-4 transition-all"
                required
              />
              <button
                type="submit"
                className="relative h-12 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold shadow-lg hover:shadow-amber-500/25 transition-all duration-300 overflow-hidden group/btn"
              >
                <span className="relative z-10">Join Waitlist</span>
                <div className="absolute inset-y-0 w-8 bg-white/30 skew-x-12 -translate-x-full group-hover/btn:translate-x-[200px] transition-transform duration-700 ease-out" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center space-y-3">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30 text-4xl">✓</div>
            <h3 className="text-2xl font-bold text-white">You're on the list!</h3>
            <p className="text-white/60 text-sm">
              We'll reach out to <span className="text-amber-400 font-medium">{email}</span> as soon as we're ready.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Waitlist;
