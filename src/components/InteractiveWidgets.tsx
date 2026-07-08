import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Timer, Sparkles, Check, Plus, Trash2, Trophy, HelpCircle, Flame, Droplet, Dumbbell } from 'lucide-react';
import { fitnessTips } from '../data';

// Helper to play synthesized beep tone using the Web Audio API (safe, no external files needed)
const playBeepTone = (frequency = 880, duration = 0.1) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = frequency;

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    // Smooth fade out
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (error) {
    console.warn('Audio play restricted by browser autoplay policy', error);
  }
};

export default function InteractiveWidgets() {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. WORKOUT TIMER STATE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [timerMode, setTimerMode] = useState<'stopwatch' | 'tabata' | 'hiit'>('stopwatch');
  const [timerRunning, setTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // For HIIT / Tabata structures
  const [currentRound, setCurrentRound] = useState(1);
  const [timerPhase, setTimerPhase] = useState<'work' | 'rest'>('work');
  const [tabataWorkSecs, setTabataWorkSecs] = useState(20);
  const [tabataRestSecs, setTabataRestSecs] = useState(10);
  const [tabataTotalRounds, setTabataTotalRounds] = useState(8);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle timer ticks
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        if (timerMode === 'stopwatch') {
          setSeconds(prev => prev + 1);
        } else {
          // HIIT & Tabata countdown logic
          setSeconds(prev => {
            if (prev <= 1) {
              // Phase change beep
              playBeepTone(1100, 0.25);
              
              if (timerPhase === 'work') {
                // Transition to rest
                setTimerPhase('rest');
                return timerMode === 'tabata' ? tabataRestSecs : 30; // 30s rest for HIIT
              } else {
                // Transition back to work
                if (currentRound >= tabataTotalRounds) {
                  // Workout complete!
                  setTimerRunning(false);
                  playBeepTone(1320, 0.6);
                  alert('Elite Training Session Completed! Sensational commitment.');
                  return 0;
                } else {
                  setCurrentRound(r => r + 1);
                  setTimerPhase('work');
                  return timerMode === 'tabata' ? tabataWorkSecs : 45; // 45s work for HIIT
                }
              }
            }
            // Sound warning on final 3 seconds
            if (prev <= 4) {
              playBeepTone(550, 0.08);
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning, timerMode, timerPhase, currentRound, tabataWorkSecs, tabataRestSecs, tabataTotalRounds]);

  const handleStartPause = () => {
    setTimerRunning(!timerRunning);
    playBeepTone(880, 0.08);
  };

  const handleReset = () => {
    setTimerRunning(false);
    setCurrentRound(1);
    setTimerPhase('work');
    if (timerMode === 'stopwatch') {
      setSeconds(0);
    } else if (timerMode === 'tabata') {
      setSeconds(tabataWorkSecs);
    } else {
      setSeconds(45); // HIIT base work is 45s
    }
    playBeepTone(440, 0.12);
  };

  // Change mode resets
  const handleModeChange = (mode: 'stopwatch' | 'tabata' | 'hiit') => {
    setTimerMode(mode);
    setTimerRunning(false);
    setCurrentRound(1);
    setTimerPhase('work');
    if (mode === 'stopwatch') {
      setSeconds(0);
    } else if (mode === 'tabata') {
      setSeconds(tabataWorkSecs);
    } else {
      setSeconds(45);
    }
  };

  // Format MM:SS
  const formatTime = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };


  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. DAILY PROGRESS TRACKER STATE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [streak, setStreak] = useState(5);
  const [waterGlasses, setWaterGlasses] = useState(4);
  const [proteinGrams, setProteinGrams] = useState(60);
  const [customGoals, setCustomGoals] = useState<{ id: string; text: string; done: boolean }[]>([
    { id: '1', text: 'Compound barbell squat (5 sets)', done: true },
    { id: '2', text: '15 mins core plank progression', done: false },
    { id: '3', text: 'Post-workout stretch recovery', done: false }
  ]);
  const [newGoalText, setNewGoalText] = useState('');

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    setCustomGoals(prev => [
      ...prev,
      { id: Date.now().toString(), text: newGoalText.trim(), done: false }
    ]);
    setNewGoalText('');
  };

  const handleToggleGoal = (id: string) => {
    setCustomGoals(prev => prev.map(g => {
      if (g.id === id) {
        const nextDone = !g.done;
        // Increment streak if everything is complete
        return { ...g, done: nextDone };
      }
      return g;
    }));
  };

  const handleDeleteGoal = (id: string) => {
    setCustomGoals(prev => prev.filter(g => g.id !== id));
  };


  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. FITNESS MINI-QUIZ STATE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);

  const quizQuestions = [
    {
      q: 'Which muscle training style is optimized for symmetrical size (hypertrophy)?',
      options: [
        { t: '1-3 rep heavy singles', val: 0 },
        { t: '8-12 rep control sets with 3s negatives', val: 10 },
        { t: 'Unlimited light cardiovascular drills', val: 2 }
      ]
    },
    {
      q: 'When is the optimal target timeframe to ingest protein post-workout?',
      options: [
        { t: 'Within 30-60 minutes (anabolic sync)', val: 10 },
        { t: 'Exactly 24 hours later', val: 0 },
        { t: 'Only right before sleeping', val: 3 }
      ]
    },
    {
      q: 'What physiology parameter is stimulated during HIIT workouts?',
      options: [
        { t: 'Cortisol spikes only', val: 1 },
        { t: 'Slow steady cardiac endurance', val: 3 },
        { t: 'EPOC oxygen debt (accelerates metabolic deficit)', val: 10 }
      ]
    }
  ];

  const handleAnswer = (val: number) => {
    setScore(s => s + val);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(s => s + 1);
    } else {
      setQuizEnded(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizStep(0);
    setScore(0);
    setQuizEnded(false);
    setQuizStarted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* COLUMN 1: WORKOUT TIMER PANEL */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-neutral-800 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-display font-bold text-xl text-white tracking-wide uppercase flex items-center gap-2">
                <Timer className="text-electric-orange" size={20} /> Gym Timer Studio
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">Control your working pace with audio triggers</p>
            </div>
            
            {/* Mode Selectors */}
            <div className="flex bg-neutral-900 border border-neutral-800 p-0.5 rounded-lg">
              <button
                id="btn-timer-stopwatch"
                onClick={() => handleModeChange('stopwatch')}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded transition-colors ${timerMode === 'stopwatch' ? 'bg-electric-orange text-white' : 'text-neutral-500 hover:text-white'}`}
              >
                Stopwatch
              </button>
              <button
                id="btn-timer-tabata"
                onClick={() => handleModeChange('tabata')}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded transition-colors ${timerMode === 'tabata' ? 'bg-electric-orange text-white' : 'text-neutral-500 hover:text-white'}`}
              >
                Tabata
              </button>
              <button
                id="btn-timer-hiit"
                onClick={() => handleModeChange('hiit')}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded transition-colors ${timerMode === 'hiit' ? 'bg-electric-orange text-white' : 'text-neutral-500 hover:text-white'}`}
              >
                HIIT
              </button>
            </div>
          </div>

          {/* TIMER DISPLAY GAUGE */}
          <div className="relative py-8 flex flex-col items-center justify-center">
            
            {/* Visual background circle progress */}
            <div className="relative w-52 h-52 flex flex-col items-center justify-center">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="104"
                  cy="104"
                  r="90"
                  stroke="#171717"
                  strokeWidth="8"
                  fill="transparent"
                />
                {timerMode !== 'stopwatch' && (
                  <circle
                    cx="104"
                    cy="104"
                    r="90"
                    stroke={timerPhase === 'work' ? '#ff5500' : '#3b82f6'}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 90}
                    strokeDashoffset={
                      timerMode === 'tabata' 
                        ? (2 * Math.PI * 90) * (1 - seconds / (timerPhase === 'work' ? tabataWorkSecs : tabataRestSecs))
                        : (2 * Math.PI * 90) * (1 - seconds / (timerPhase === 'work' ? 45 : 30))
                    }
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-linear"
                  />
                )}
              </svg>

              <div className="text-center z-10">
                {timerMode !== 'stopwatch' && (
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border ${timerPhase === 'work' ? 'text-electric-orange border-electric-orange/20 bg-electric-orange/5' : 'text-blue-400 border-blue-500/20 bg-blue-500/5'}`}>
                    {timerPhase === 'work' ? 'Work Interval' : 'Rest Phase'}
                  </span>
                )}
                <h4 className="text-5xl font-mono font-black text-white tracking-tight mt-3">{formatTime(seconds)}</h4>
                {timerMode !== 'stopwatch' && (
                  <p className="text-[10px] text-neutral-500 mt-1 uppercase font-semibold">
                    Round {currentRound} / {tabataTotalRounds}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Mode Specific Inputs for Tabata */}
          {timerMode === 'tabata' && !timerRunning && (
            <div className="grid grid-cols-3 gap-3 bg-neutral-900/40 border border-neutral-900 p-3 rounded-xl mb-4 text-xs">
              <div>
                <label className="text-neutral-500 font-semibold uppercase text-[9px] block mb-0.5">Work (s)</label>
                <input
                  id="input-timer-work"
                  type="number"
                  value={tabataWorkSecs}
                  onChange={e => {
                    const v = parseInt(e.target.value) || 20;
                    setTabataWorkSecs(v);
                    setSeconds(v);
                  }}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white rounded p-1 text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="text-neutral-500 font-semibold uppercase text-[9px] block mb-0.5">Rest (s)</label>
                <input
                  id="input-timer-rest"
                  type="number"
                  value={tabataRestSecs}
                  onChange={e => setTabataRestSecs(parseInt(e.target.value) || 10)}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white rounded p-1 text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="text-neutral-500 font-semibold uppercase text-[9px] block mb-0.5">Rounds</label>
                <input
                  id="input-timer-rounds"
                  type="number"
                  value={tabataTotalRounds}
                  onChange={e => setTabataTotalRounds(parseInt(e.target.value) || 8)}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white rounded p-1 text-center font-mono font-bold"
                />
              </div>
            </div>
          )}
        </div>

        {/* Timer Control Buttons */}
        <div className="flex gap-4 pt-4 border-t border-neutral-900">
          <button
            id="btn-timer-toggle"
            onClick={handleStartPause}
            className={`flex-1 py-3 px-4 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${timerRunning ? 'bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-950/60' : 'bg-electric-orange hover:bg-electric-orange-hover text-white shadow-lg shadow-electric-orange/15'}`}
          >
            {timerRunning ? (
              <><Pause size={15} /> Pause Timer</>
            ) : (
              <><Play size={15} /> Launch Timer</>
            )}
          </button>
          
          <button
            id="btn-timer-reset"
            onClick={handleReset}
            className="px-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
            title="Reset to Baseline"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* COLUMN 2: PROGRESS TRACKER & QUIZ */}
      <div className="space-y-6">
        
        {/* INTERACTIVE TRACKER CARD */}
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-neutral-800">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="font-display font-bold text-xl text-white tracking-wide uppercase flex items-center gap-2">
                <Trophy className="text-yellow-500" size={18} /> Daily Progress Tracker
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">Real-time lifestyle task dashboard</p>
            </div>
            
            <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-lg text-xs font-black flex items-center gap-1">
              <Flame size={14} fill="currentColor" /> STREAK: {streak} DAYS
            </div>
          </div>

          {/* Quick Metrics sliders / counters */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="p-3 bg-neutral-950/40 rounded-xl border border-neutral-900 text-xs">
              <span className="text-neutral-500 text-[9px] uppercase font-bold flex items-center gap-1 mb-1">
                <Droplet size={11} className="text-blue-400" /> Water Intake
              </span>
              <div className="flex items-center justify-between">
                <span className="text-white font-mono font-bold">{waterGlasses} / 8 Glasses</span>
                <div className="flex gap-1">
                  <button
                    id="btn-tracker-water-sub"
                    onClick={() => setWaterGlasses(g => Math.max(0, g - 1))}
                    className="w-5 h-5 bg-neutral-900 border border-neutral-800 hover:text-white rounded flex items-center justify-center text-xs text-neutral-500"
                  >
                    -
                  </button>
                  <button
                    id="btn-tracker-water-add"
                    onClick={() => setWaterGlasses(g => Math.min(12, g + 1))}
                    className="w-5 h-5 bg-neutral-900 border border-neutral-800 hover:text-white rounded flex items-center justify-center text-xs text-neutral-500"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-full bg-neutral-900 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-400 h-full transition-all duration-300" style={{ width: `${Math.min(100, (waterGlasses / 8) * 100)}%` }} />
              </div>
            </div>

            <div className="p-3 bg-neutral-950/40 rounded-xl border border-neutral-900 text-xs">
              <span className="text-neutral-500 text-[9px] uppercase font-bold flex items-center gap-1 mb-1">
                <Dumbbell size={11} className="text-electric-orange" /> Protein Logged
              </span>
              <div className="flex items-center justify-between">
                <span className="text-white font-mono font-bold">{proteinGrams}g / 130g</span>
                <div className="flex gap-1">
                  <button
                    id="btn-tracker-protein-sub"
                    onClick={() => setProteinGrams(g => Math.max(0, g - 10))}
                    className="w-5 h-5 bg-neutral-900 border border-neutral-800 hover:text-white rounded flex items-center justify-center text-xs text-neutral-500"
                  >
                    -
                  </button>
                  <button
                    id="btn-tracker-protein-add"
                    onClick={() => setProteinGrams(g => Math.min(250, g + 10))}
                    className="w-5 h-5 bg-neutral-900 border border-neutral-800 hover:text-white rounded flex items-center justify-center text-xs text-neutral-500"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-full bg-neutral-900 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-electric-orange h-full transition-all duration-300" style={{ width: `${Math.min(100, (proteinGrams / 130) * 100)}%` }} />
              </div>
            </div>
          </div>

          {/* Goals Checklist */}
          <div className="space-y-2 mb-4 max-h-[170px] overflow-y-auto pr-1">
            {customGoals.map(g => (
              <div key={g.id} className="flex items-center justify-between bg-neutral-900/60 border border-neutral-900 rounded-lg p-2.5 text-xs text-neutral-300">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    id={`checkbox-tracker-goal-${g.id}`}
                    type="checkbox"
                    checked={g.done}
                    onChange={() => handleToggleGoal(g.id)}
                    className="accent-electric-orange rounded"
                  />
                  <span className={`${g.done ? 'line-through text-neutral-500' : 'text-neutral-300'}`}>{g.text}</span>
                </label>
                <button
                  id={`btn-tracker-delete-goal-${g.id}`}
                  onClick={() => handleDeleteGoal(g.id)}
                  className="text-neutral-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>

          {/* Add Goal Input */}
          <form onSubmit={handleAddGoal} className="flex gap-2">
            <input
              id="input-tracker-new-goal"
              type="text"
              value={newGoalText}
              onChange={e => setNewGoalText(e.target.value)}
              placeholder="Add physical target e.g. run 5km..."
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs px-3 py-2 text-white outline-none focus:border-electric-orange"
            />
            <button
              id="btn-tracker-add-goal"
              type="submit"
              className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:text-white text-neutral-400 p-2 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus size={16} />
            </button>
          </form>
        </div>

        {/* QUIZ AND MOTIVATION AREA */}
        <div className="glass-card p-6 rounded-2xl border border-neutral-800">
          {!quizStarted ? (
            <div className="text-center space-y-4 py-2">
              <div className="mx-auto w-12 h-12 bg-electric-orange/10 border border-electric-orange/20 rounded-full flex items-center justify-center">
                <HelpCircle size={22} className="text-electric-orange animate-bounce" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider">Test Your Muscle Knowledge</h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1">Answer 3 scientific questions to test your training efficiency parameters and earn dynamic profile tips!</p>
              </div>
              <button
                id="btn-launch-quiz"
                onClick={() => setQuizStarted(true)}
                className="inline-block bg-electric-orange hover:bg-electric-orange-hover text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wider cursor-pointer"
              >
                Begin 60-Sec Fitness Quiz
              </button>
            </div>
          ) : quizEnded ? (
            <div className="text-center space-y-3 py-2">
              <div className="mx-auto w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center">
                <Trophy size={22} className="text-green-500" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Quiz Completed!</h4>
                <p className="text-lg text-electric-orange font-bold font-mono mt-1">SCORE: {score} / 30 PTS</p>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1">
                  {score >= 30 && 'Phenomenal knowledge! You understand hypertrophy and nutrient delivery parameters like a certified trainer.'}
                  {score >= 20 && score < 30 && 'Great score. Master muscle negatives and continuous hydration to elevate performance.'}
                  {score < 20 && 'A great opportunity to learn. Work alongside coach Vikram Gowda on the gym floor!'}
                </p>
              </div>
              <button
                id="btn-restart-quiz"
                onClick={handleResetQuiz}
                className="text-xs font-bold text-neutral-400 hover:text-white uppercase underline mt-1 cursor-pointer"
              >
                Retake Quiz
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] uppercase font-bold text-electric-orange tracking-widest">Question {quizStep + 1} of 3</span>
                <span className="text-[10px] text-neutral-500 font-bold">Gym Trivia Core</span>
              </div>
              <h5 className="font-display text-xs md:text-sm text-white font-semibold leading-relaxed mb-4">
                {quizQuestions[quizStep].q}
              </h5>
              <div className="space-y-2">
                {quizQuestions[quizStep].options.map((opt, idx) => (
                  <button
                    id={`btn-quiz-option-${quizStep}-${idx}`}
                    key={idx}
                    onClick={() => handleAnswer(opt.val)}
                    className="w-full text-left bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 p-2.5 rounded-lg text-xs text-neutral-300 transition-all cursor-pointer hover:pl-3.5"
                  >
                    {opt.t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
