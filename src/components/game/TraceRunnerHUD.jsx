import React from 'react';

// Lightweight HUD that mirrors the Mario runner framing used in RunningGame.
// It is purely visual and driven by props from the Trace The Threat state.
//
// Props:
// - level: current level number
// - questionsAnswered: number of correctly answered questions in this level
// - maxQuestions: total questions required for this level
// - timer: seconds remaining for the current question
// - lives: number of lives remaining (out of 3)
// - show: boolean to control visibility
//
// Movement Logic:
// - Security Analyst (good.png): Moves from left based on questions answered (0-100%)
// - Hacker Threat (hacker.png): Moves from right based on lives lost (0-100%)
//
// Character Images Used:
// - good.png: Represents the player/hero character (bottom lane) - security analyst
// - hacker.png: Represents the cyber threat/attacker (top lane) - the threat being chased

const TraceRunnerHUD = ({ level, questionsAnswered, maxQuestions, timer, lives = 3, show = true }) => {
  if (!show) return null;

  const totalTimeForBar = 30; // purely visual baseline; color and height still reflect urgency
  const clamped = Math.max(0, Math.min(timer ?? 0, totalTimeForBar));
  const pct = totalTimeForBar === 0 ? 0 : (clamped / totalTimeForBar) * 100;

  // Calculate positions based on game state
  const analystProgress = maxQuestions > 0 ? (questionsAnswered / maxQuestions) * 100 : 0; // 0-100% based on questions
  const hackerProgress = (3 - lives) / 3 * 100; // 0-100% based on lives lost (out of 3)

  return (
    <div className="relative w-full">
      {/* Frame */}
      <div className="relative rounded-xl border-2 border-emerald-400/80 shadow-[0_0_0_4px_rgba(16,185,129,0.15)] overflow-hidden">
        {/* Header strip */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 pointer-events-none">
          <div className="text-white font-extrabold text-lg sm:text-xl">Level {level}</div>
          <div className="text-white font-extrabold text-lg sm:text-xl">Questions: {questionsAnswered}/{maxQuestions}</div>
          <div className="text-white font-extrabold text-lg sm:text-xl">{timer ?? 0}s</div>
        </div>

        {/* Sky background grid */}
        <div className="h-72 sm:h-80 md:h-96 lg:h-[28rem] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900 via-slate-900 to-slate-950">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#1e293b_1px,transparent_1px),linear-gradient(90deg,#1e293b_1px,transparent_1px)] bg-[size:32px_32px]"></div>

          {/* Finish Line Banner - Gold for Security Analyst (bottom lane) */}
          <div className="absolute right-0 bottom-4 w-8 h-16 bg-gradient-to-l from-yellow-400 via-yellow-500 to-yellow-600 border-l-4 border-yellow-300 shadow-[0_4px_8px_rgba(250,204,21,0.5)]" />
          
          {/* Finish Line Banner - Silver for Hacker Threat (top lane) */}
          <div className="absolute right-0 bottom-16 w-8 h-16 bg-gradient-to-l from-gray-400 via-gray-500 to-gray-600 border-l-4 border-gray-300 shadow-[0_4px_8px_rgba(156,163,175,0.5)]" />

          {/* Lanes */}
          <div className="absolute inset-x-2 bottom-16 h-16 rounded-md bg-emerald-800/40 border border-emerald-500/40" />
          <div className="absolute inset-x-2 bottom-4 h-16 rounded-md bg-emerald-800/40 border border-emerald-500/40" />

          {/* THREAT lane (top lane) - hacker.png represents the cyber attacker */}
          <div
            className="absolute bottom-[5rem] left-0 h-16 flex items-center"
            style={{ width: '100%' }}
          >
            <div
              className="relative transition-transform duration-500"
              style={{ transform: `translateX(calc(${hackerProgress}%))` }}
            >
              {/* hacker.png - The cyber threat advancing from left when player loses lives */}
              <img
                src="/models/hacker.png"
                alt="hacker threat"
                className="w-12 h-12 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>


          {/* HERO lane (bottom lane) - good.png represents the security analyst */}
          <div
            className="absolute bottom-[1rem] left-0 h-16 flex items-end"
            style={{ width: '100%' }}
          >
            <div
              className="relative flex items-end gap-2 transition-transform duration-500"
              style={{ transform: `translateX(calc(${analystProgress}% - 0%))` }}
            >
              {/* good.png - The player/security analyst advancing from left based on questions answered */}
              <img
                src="/models/good.png"
                alt="security analyst"
                className="w-[50px] h-[66px] object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
              />
              <div className="w-14 h-14 rounded-full border-2 border-red-500/70 bg-red-500/20" />
            </div>
          </div>

          {/* Right timer pillar (fills vertically with remaining time) */}
          <div className="absolute right-2 top-2 bottom-2 w-6 sm:w-7 rounded bg-yellow-400/70 overflow-hidden">
            <div
              className="absolute bottom-0 left-0 right-0 bg-red-500"
              style={{ height: `${100 - pct}%` }}
            />
          </div>

          {/* Decorative clouds and hills for depth */}
          <div className="absolute top-10 left-8 w-24 h-8 rounded-full bg-white/20" />
          <div className="absolute top-12 left-40 w-28 h-10 rounded-full bg-white/20" />
          <div className="absolute top-16 right-36 w-24 h-8 rounded-full bg-white/20" />
          <div className="absolute bottom-8 left-[22%] w-6 h-16 rounded-full bg-emerald-700/70" />
          <div className="absolute bottom-8 right-[28%] w-8 h-20 rounded-full bg-emerald-700/70" />
        </div>
      </div>
    </div>
  );
};

export default TraceRunnerHUD;


