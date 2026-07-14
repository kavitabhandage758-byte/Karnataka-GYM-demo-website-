import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Droplet, Flame, Compass, Calculator, Dumbbell, User, Info, CheckCircle2 } from 'lucide-react';

type TabType = 'bmi' | 'calories' | 'water' | 'protein' | 'bodyfat';

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<TabType>('bmi');

  // BMI State
  const [bmiWeight, setBmiWeight] = useState('70');
  const [bmiHeight, setBmiHeight] = useState('175');
  const [bmiAge, setBmiAge] = useState('25');
  const [bmiGender, setBmiGender] = useState<'Male' | 'Female'>('Male');
  const [bmiResult, setBmiResult] = useState<{ score: number; status: string; color: string; advice: string } | null>(null);

  // Calories Burned State
  const [calActivity, setCalActivity] = useState('hiit');
  const [calWeight, setCalWeight] = useState('75');
  const [calDuration, setCalDuration] = useState('45');
  const [calResult, setCalResult] = useState<number | null>(null);

  // Water State
  const [waterWeight, setWaterWeight] = useState('70');
  const [waterExercise, setWaterExercise] = useState('60');
  const [waterClimate, setWaterClimate] = useState('hot'); // hot, moderate, cold
  const [waterResult, setWaterResult] = useState<number | null>(null);

  // Protein State
  const [protWeight, setProtWeight] = useState('75');
  const [protGoal, setProtGoal] = useState('muscle'); // muscle, fatloss, maintain
  const [protLevel, setProtLevel] = useState('heavy'); // light, moderate, heavy
  const [protResult, setProtResult] = useState<{ min: number; max: number } | null>(null);

  // Body Fat State
  const [bfGender, setBfGender] = useState<'Male' | 'Female'>('Male');
  const [bfHeight, setBfHeight] = useState('175');
  const [bfWaist, setBfWaist] = useState('85');
  const [bfNeck, setBfNeck] = useState('38');
  const [bfHip, setBfHip] = useState('95'); // only relevant for female
  const [bfResult, setBfResult] = useState<{ bf: number; status: string; color: string } | null>(null);

  // Handlers with optional event parameters to support both instant updates and form submissions
  const handleCalculateBmi = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const w = parseFloat(bmiWeight);
    const h = parseFloat(bmiHeight) / 100; // to meters
    if (!w || !h || h <= 0) return;

    const score = parseFloat((w / (h * h)).toFixed(1));
    let status = '';
    let color = '';
    let advice = '';

    if (score < 18.5) {
      status = 'Underweight';
      color = 'text-blue-400 border-blue-500/20 bg-blue-500/5';
      advice = 'Consuming calorie-dense foods, building dynamic muscle mass with progressive strength sets, and working with our dietitian Anjali Sharma can support a healthy upward adjustment.';
    } else if (score >= 18.5 && score < 25) {
      status = 'Healthy weight';
      color = 'text-green-400 border-green-500/20 bg-green-500/5';
      advice = 'Incredible metric alignment! Maintain your robust current baseline using variable HIIT training, deep recovery sessions, and 1.6g protein per kg of bodyweight.';
    } else if (score >= 25 && score < 30) {
      status = 'Overweight';
      color = 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5';
      advice = 'Incorporate structural cardio blocks and a slight calorie deficit. Our fat-loss program combined with compound weight lifts will help transition fat tissue into lean muscle mass safely.';
    } else {
      status = 'Obese';
      color = 'text-red-500 border-red-500/20 bg-red-500/5';
      advice = 'Prioritize highly structured cardiorespiratory coaching and a sustainable whole-food diet. Our trainers prioritize low-impact joints movements to secure steady, risk-free reduction.';
    }

    setBmiResult({ score, status, color, advice });
  };

  const handleCalculateCalories = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const w = parseFloat(calWeight);
    const d = parseFloat(calDuration);
    if (!w || !d) return;

    // MET values
    // HIIT = 9.0, Strength = 6.0, Cardio Running = 8.0, Boxing = 7.5, Cycling = 7.0, Yoga = 3.0
    let met = 6.0;
    switch (calActivity) {
      case 'hiit': met = 9.0; break;
      case 'strength': met = 5.5; break;
      case 'cardio': met = 8.0; break;
      case 'boxing': met = 7.5; break;
      case 'cycling': met = 7.0; break;
      case 'yoga': met = 3.0; break;
    }

    // Formula: Calories = MET * 3.5 * weight (kg) / 200 * duration (mins)
    const burned = Math.round((met * 3.5 * w * d) / 200);
    setCalResult(burned);
  };

  const handleCalculateWater = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const w = parseFloat(waterWeight);
    const ex = parseFloat(waterExercise);
    if (!w) return;

    // Base requirement: 35ml per kg
    let baseWater = w * 0.035;

    // Add 0.5L for every 30 mins of exercise
    const workoutAdd = (ex / 30) * 0.5;

    // Climate addition
    let climateAdd = 0;
    if (waterClimate === 'hot') climateAdd = 0.7; // hot Belagavi summer
    else if (waterClimate === 'cold') climateAdd = -0.3;

    const total = parseFloat((baseWater + workoutAdd + climateAdd).toFixed(2));
    setWaterResult(total);
  };

  const handleCalculateProtein = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const w = parseFloat(protWeight);
    if (!w) return;

    let multiplierMin = 1.2;
    let multiplierMax = 1.6;

    if (protGoal === 'muscle') {
      multiplierMin = 1.8;
      multiplierMax = 2.4;
    } else if (protGoal === 'fatloss') {
      multiplierMin = 1.6;
      multiplierMax = 2.0;
    }

    if (protLevel === 'heavy') {
      multiplierMin += 0.2;
      multiplierMax += 0.2;
    } else if (protLevel === 'light') {
      multiplierMin -= 0.2;
      multiplierMax -= 0.2;
    }

    setProtResult({
      min: Math.round(w * multiplierMin),
      max: Math.round(w * multiplierMax)
    });
  };

  const handleCalculateBodyFat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const h = parseFloat(bfHeight);
    const w = parseFloat(bfWaist);
    const n = parseFloat(bfNeck);
    const hip = parseFloat(bfHip);

    if (bfGender === 'Male') {
      if (!h || !w || !n || h <= 0) return;
      const diff = w - n;
      if (diff <= 0) {
        setBfResult({ bf: 0, status: 'Invalid measurements', color: 'text-red-500' });
        return;
      }
      // US Navy formula (metric): 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
      const bfVal = (86.010 * Math.log10(diff) - 70.041 * Math.log10(h) + 36.76);
      const bf = isNaN(bfVal) ? 0 : parseFloat(Math.max(0, bfVal).toFixed(1));
      let status = 'Fit';
      let color = 'text-green-400';
      if (bf < 6) { status = 'Essential Fat'; color = 'text-blue-400'; }
      else if (bf >= 6 && bf < 14) { status = 'Athletic'; color = 'text-teal-400'; }
      else if (bf >= 14 && bf < 18) { status = 'Fit'; color = 'text-green-400'; }
      else if (bf >= 18 && bf < 25) { status = 'Average'; color = 'text-yellow-500'; }
      else { status = 'High body fat'; color = 'text-red-500'; }
      setBfResult({ bf, status, color });
    } else {
      if (!h || !w || !n || !hip || h <= 0) return;
      const sum = w + hip - n;
      if (sum <= 0) {
        setBfResult({ bf: 0, status: 'Invalid measurements', color: 'text-red-500' });
        return;
      }
      // Female: 162.033 * log10(waist + hip - neck) - 125.08 * log10(height) - 97.68
      const bfVal = (162.033 * Math.log10(sum) - 125.08 * Math.log10(h) - 97.68);
      const bf = isNaN(bfVal) ? 0 : parseFloat(Math.max(0, bfVal).toFixed(1));
      let status = 'Fit';
      let color = 'text-green-400';
      if (bf < 14) { status = 'Essential Fat'; color = 'text-blue-400'; }
      else if (bf >= 14 && bf < 21) { status = 'Athletic'; color = 'text-teal-400'; }
      else if (bf >= 21 && bf < 25) { status = 'Fit'; color = 'text-green-400'; }
      else if (bf >= 25 && bf < 32) { status = 'Average'; color = 'text-yellow-500'; }
      else { status = 'High body fat'; color = 'text-red-500'; }
      setBfResult({ bf, status, color });
    }
  };

  // Run initial calculations and set up real-time automatic calculations
  React.useEffect(() => {
    handleCalculateBmi();
  }, [bmiWeight, bmiHeight, bmiAge, bmiGender]);

  React.useEffect(() => {
    handleCalculateCalories();
  }, [calActivity, calWeight, calDuration]);

  React.useEffect(() => {
    handleCalculateWater();
  }, [waterWeight, waterExercise, waterClimate]);

  React.useEffect(() => {
    handleCalculateProtein();
  }, [protWeight, protGoal, protLevel]);

  React.useEffect(() => {
    handleCalculateBodyFat();
  }, [bfGender, bfHeight, bfWaist, bfNeck, bfHip]);

  return (
    <section id="calculators" className="py-20 md:py-28 relative overflow-hidden bg-neutral-950 border-t border-neutral-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-on-scroll">
          <span className="text-electric-orange text-xs font-bold tracking-widest uppercase border border-electric-orange/20 px-3 py-1 rounded-full bg-electric-orange/5">
            Fitness Analytics
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight leading-none">
            Health & Fitness <span className="text-electric-orange">Calculators</span>
          </h2>
          <p className="text-neutral-500 text-xs md:text-sm leading-relaxed">
            Get accurate, scientifically backed evaluations of your body mass index, daily calorie expenditure, metabolic rate, protein requirements, and target body fat percentages.
          </p>
        </div>

        {/* Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-neutral-900/60 p-2 rounded-xl border border-neutral-800">
        <button
          id="btn-tab-bmi"
          onClick={() => setActiveTab('bmi')}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === 'bmi' ? 'bg-electric-orange text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
        >
          <Calculator size={15} /> BMI Calculator
        </button>
        <button
          id="btn-tab-calories"
          onClick={() => setActiveTab('calories')}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === 'calories' ? 'bg-electric-orange text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
        >
          <Flame size={15} /> Calories Burned
        </button>
        <button
          id="btn-tab-water"
          onClick={() => setActiveTab('water')}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === 'water' ? 'bg-electric-orange text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
        >
          <Droplet size={15} /> Water Intake
        </button>
        <button
          id="btn-tab-protein"
          onClick={() => setActiveTab('protein')}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === 'protein' ? 'bg-electric-orange text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
        >
          <Dumbbell size={15} /> Protein Needs
        </button>
        <button
          id="btn-tab-bodyfat"
          onClick={() => setActiveTab('bodyfat')}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === 'bodyfat' ? 'bg-electric-orange text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
        >
          <Activity size={15} /> Body Fat
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Form Pane */}
        <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between">
          <div>
            <h4 className="font-display font-semibold text-lg text-white uppercase tracking-wide flex items-center gap-2 mb-4">
              {activeTab === 'bmi' && <><Calculator className="text-electric-orange" size={18} /> BMI Parameters</>}
              {activeTab === 'calories' && <><Flame className="text-electric-orange" size={18} /> Met activity burned</>}
              {activeTab === 'water' && <><Droplet className="text-electric-orange" size={18} /> Hydration Level</>}
              {activeTab === 'protein' && <><Dumbbell className="text-electric-orange" size={18} /> Muscle Protein Goal</>}
              {activeTab === 'bodyfat' && <><Activity className="text-electric-orange" size={18} /> US Navy Circumference</>}
            </h4>

            {/* TAB 1: BMI */}
            {activeTab === 'bmi' && (
              <form onSubmit={handleCalculateBmi} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Gender</label>
                    <div className="flex bg-neutral-900 rounded-lg p-1 border border-neutral-800">
                      <button
                        id="btn-bmi-gender-male"
                        type="button"
                        onClick={() => setBmiGender('Male')}
                        className={`flex-1 py-1.5 rounded text-xs font-semibold ${bmiGender === 'Male' ? 'bg-neutral-800 text-electric-orange shadow-sm' : 'text-neutral-500'}`}
                      >
                        Male
                      </button>
                      <button
                        id="btn-bmi-gender-female"
                        type="button"
                        onClick={() => setBmiGender('Female')}
                        className={`flex-1 py-1.5 rounded text-xs font-semibold ${bmiGender === 'Female' ? 'bg-neutral-800 text-electric-orange shadow-sm' : 'text-neutral-500'}`}
                      >
                        Female
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Age (yrs)</label>
                    <input
                      id="input-bmi-age"
                      type="number"
                      value={bmiAge}
                      onChange={(e) => setBmiAge(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-electric-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Height (cm)</label>
                  <input
                    id="input-bmi-height"
                    type="range"
                    min="120"
                    max="220"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(e.target.value)}
                    className="w-full accent-electric-orange h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 mt-1">
                    <span>120 cm</span>
                    <span className="font-mono font-bold text-electric-orange">{bmiHeight} cm</span>
                    <span>220 cm</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Weight (kg)</label>
                  <input
                    id="input-bmi-weight"
                    type="range"
                    min="40"
                    max="150"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(e.target.value)}
                    className="w-full accent-electric-orange h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 mt-1">
                    <span>40 kg</span>
                    <span className="font-mono font-bold text-electric-orange">{bmiWeight} kg</span>
                    <span>150 kg</span>
                  </div>
                </div>

                <button
                  id="btn-calculate-bmi"
                  type="submit"
                  className="w-full bg-electric-orange hover:bg-electric-orange-hover text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer mt-2"
                >
                  Recalculate BMI Metric
                </button>
              </form>
            )}

            {/* TAB 2: CALORIES BURNED */}
            {activeTab === 'calories' && (
              <form onSubmit={handleCalculateCalories} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Select Activity</label>
                  <select
                    id="select-cal-activity"
                    value={calActivity}
                    onChange={(e) => setCalActivity(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-electric-orange outline-none"
                  >
                    <option value="hiit">HIIT (High-Intensity Intervals)</option>
                    <option value="strength">Heavy Strength Lift Session</option>
                    <option value="cardio">Cardio Running (8km/h average)</option>
                    <option value="boxing">Heavy Bag Boxing Training</option>
                    <option value="cycling">Indoor Cycling Spin Class</option>
                    <option value="yoga">Dynamic Vinyasa Power Yoga</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Your Weight (kg)</label>
                  <input
                    id="input-cal-weight"
                    type="number"
                    value={calWeight}
                    onChange={(e) => setCalWeight(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-electric-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Duration (Minutes)</label>
                  <input
                    id="input-cal-duration"
                    type="range"
                    min="10"
                    max="120"
                    step="5"
                    value={calDuration}
                    onChange={(e) => setCalDuration(e.target.value)}
                    className="w-full accent-electric-orange h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 mt-1">
                    <span>10 mins</span>
                    <span className="font-mono font-bold text-electric-orange">{calDuration} minutes</span>
                    <span>120 mins</span>
                  </div>
                </div>

                <button
                  id="btn-calculate-calories"
                  type="submit"
                  className="w-full bg-electric-orange hover:bg-electric-orange-hover text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Calculate Calories Burned
                </button>
              </form>
            )}

            {/* TAB 3: WATER INTAKE */}
            {activeTab === 'water' && (
              <form onSubmit={handleCalculateWater} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Body Weight (kg)</label>
                  <input
                    id="input-water-weight"
                    type="number"
                    value={waterWeight}
                    onChange={(e) => setWaterWeight(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-electric-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Daily Workout Duration (mins)</label>
                  <input
                    id="input-water-exercise"
                    type="range"
                    min="0"
                    max="180"
                    step="10"
                    value={waterExercise}
                    onChange={(e) => setWaterExercise(e.target.value)}
                    className="w-full accent-electric-orange h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 mt-1">
                    <span>Rest Day</span>
                    <span className="font-mono font-bold text-electric-orange">{waterExercise} mins</span>
                    <span>180 mins</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Belagavi Seasonal Climate</label>
                  <select
                    id="select-water-climate"
                    value={waterClimate}
                    onChange={(e) => setWaterClimate(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-electric-orange outline-none"
                  >
                    <option value="hot">Hot Summer / Humid Weather (+0.7L)</option>
                    <option value="moderate">Moderate / Standard Weather (Base)</option>
                    <option value="cold">Cool / Rainy Winter Season (-0.3L)</option>
                  </select>
                </div>

                <button
                  id="btn-calculate-water"
                  type="submit"
                  className="w-full bg-electric-orange hover:bg-electric-orange-hover text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Recommend Hydration
                </button>
              </form>
            )}

            {/* TAB 4: PROTEIN NEEDS */}
            {activeTab === 'protein' && (
              <form onSubmit={handleCalculateProtein} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Body Weight (kg)</label>
                  <input
                    id="input-protein-weight"
                    type="number"
                    value={protWeight}
                    onChange={(e) => setProtWeight(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-electric-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Primary Fitness Goal</label>
                  <select
                    id="select-protein-goal"
                    value={protGoal}
                    onChange={(e) => setProtGoal(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-electric-orange outline-none"
                  >
                    <option value="muscle">Muscle Bulk / Hypertrophy (Higher)</option>
                    <option value="fatloss">Fat Loss Tone / Tissue preservation</option>
                    <option value="maintain">Baseline Body Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Workout Activity Density</label>
                  <select
                    id="select-protein-level"
                    value={protLevel}
                    onChange={(e) => setProtLevel(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:border-electric-orange outline-none"
                  >
                    <option value="light">Light Workout (1-2 days/week)</option>
                    <option value="moderate">Moderate Active (3-4 days/week)</option>
                    <option value="heavy">Highly Active Elite (5-7 days/week)</option>
                  </select>
                </div>

                <button
                  id="btn-calculate-protein"
                  type="submit"
                  className="w-full bg-electric-orange hover:bg-electric-orange-hover text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Determine Protein Budget
                </button>
              </form>
            )}

            {/* TAB 5: BODY FAT */}
            {activeTab === 'bodyfat' && (
              <form onSubmit={handleCalculateBodyFat} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Gender</label>
                    <select
                      id="select-bf-gender"
                      value={bfGender}
                      onChange={(e) => setBfGender(e.target.value as 'Male' | 'Female')}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Height (cm)</label>
                    <input
                      id="input-bf-height"
                      type="number"
                      value={bfHeight}
                      onChange={(e) => setBfHeight(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Waist Circum (cm)</label>
                    <input
                      id="input-bf-waist"
                      type="number"
                      value={bfWaist}
                      onChange={(e) => setBfWaist(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Neck Circum (cm)</label>
                    <input
                      id="input-bf-neck"
                      type="number"
                      value={bfNeck}
                      onChange={(e) => setBfNeck(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                {bfGender === 'Female' && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase">Hip Circum (cm)</label>
                    <input
                      id="input-bf-hip"
                      type="number"
                      value={bfHip}
                      onChange={(e) => setBfHip(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white outline-none"
                    />
                  </div>
                )}

                <button
                  id="btn-calculate-bodyfat"
                  type="submit"
                  className="w-full bg-electric-orange hover:bg-electric-orange-hover text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Estimate US Navy BF %
                </button>
              </form>
            )}
          </div>

          <div className="text-[10px] text-neutral-600 border-t border-neutral-900 pt-3 mt-4 flex items-center gap-1.5 leading-tight">
            <Info size={11} className="shrink-0" /> Note: These metrics are calculated dynamically based on baseline formulas and should be validated alongside certified professional fitness checkups.
          </div>
        </div>

        {/* Dynamic Display / Gauge Area */}
        <div className="lg:col-span-7 bg-neutral-950/40 border border-neutral-900 rounded-2xl p-6 md:p-8 flex flex-col justify-center items-center relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-electric-orange/5 blur-3xl pointer-events-none" />

          {/* DISPLAY 1: BMI RESULT WITH CIRCULAR SVG GAUGE */}
          {activeTab === 'bmi' && bmiResult && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center text-center space-y-5"
            >
              {/* Circular Gauge */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="absolute w-full h-full transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="75"
                    stroke="#171717"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="88"
                    cy="88"
                    r="75"
                    stroke="#ff5500"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 75}
                    // Map BMI to stroke dashoffset. Let's cap max BMI display in circle at 40. Percent = BMI / 40.
                    initial={{ strokeDashoffset: 2 * Math.PI * 75 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 75 * (1 - Math.min(bmiResult.score, 40) / 40) }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-display font-extrabold text-white tracking-tight">{bmiResult.score}</span>
                  <span className="text-[10px] uppercase text-neutral-500 tracking-wider font-semibold">BMI Score</span>
                </div>
              </div>

              {/* Text Output */}
              <div className="space-y-2 max-w-md">
                <div className={`px-4 py-1 rounded-full text-xs font-bold border inline-block uppercase tracking-wider ${bmiResult.color}`}>
                  {bmiResult.status}
                </div>
                <h5 className="font-display font-semibold text-lg text-white">Advice for Healthy Balance</h5>
                <p className="text-xs text-neutral-400 leading-relaxed">{bmiResult.advice}</p>
              </div>

              {/* Indicator Bar */}
              <div className="w-full max-w-sm pt-2">
                <div className="h-1.5 bg-neutral-900 rounded-full flex overflow-hidden">
                  <div className={`h-full w-[25%] bg-blue-500/85 ${bmiResult.score < 18.5 ? 'ring-2 ring-white scale-y-125' : ''}`} title="Underweight" />
                  <div className={`h-full w-[25%] bg-green-500/85 ${bmiResult.score >= 18.5 && bmiResult.score < 25 ? 'ring-2 ring-white scale-y-125' : ''}`} title="Normal" />
                  <div className={`h-full w-[25%] bg-yellow-500/85 ${bmiResult.score >= 25 && bmiResult.score < 30 ? 'ring-2 ring-white scale-y-125' : ''}`} title="Overweight" />
                  <div className={`h-full w-[25%] bg-red-500/85 ${bmiResult.score >= 30 ? 'ring-2 ring-white scale-y-125' : ''}`} title="Obese" />
                </div>
                <div className="flex justify-between text-[9px] text-neutral-500 mt-1 uppercase font-semibold">
                  <span>&lt; 18.5</span>
                  <span>18.5 - 24.9</span>
                  <span>25.0 - 29.9</span>
                  <span>30.0 +</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* DISPLAY 2: CALORIES RESULT */}
          {activeTab === 'calories' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6 max-w-sm"
            >
              <div className="mx-auto w-20 h-20 bg-electric-orange/10 border border-electric-orange/20 rounded-full flex items-center justify-center">
                <Flame size={36} className="text-electric-orange" />
              </div>
              <div>
                <span className="block text-5xl font-display font-extrabold text-white tracking-tight font-mono">
                  {calResult || '---'} <span className="text-lg text-neutral-500">kcal</span>
                </span>
                <span className="text-[10px] uppercase text-neutral-500 font-semibold tracking-widest mt-1 block">Burned Calories Pool</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                During a intense <span className="text-white font-semibold">{calDuration} minute</span> block of activity at this specific weight, your skeletal systems consume highly loaded energy units. Add compound lifts to sustain high daily resting metabolism!
              </p>
              <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-900 text-left text-xs text-neutral-400 flex items-center gap-2.5">
                <CheckCircle2 className="text-electric-orange shrink-0" size={16} />
                <span>Tip: A double protein snack within 35 minutes optimizes muscle retention.</span>
              </div>
            </motion.div>
          )}

          {/* DISPLAY 3: WATER RESULT */}
          {activeTab === 'water' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6 max-w-sm"
            >
              <div className="mx-auto w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center">
                <Droplet size={36} className="text-blue-400" />
              </div>
              <div>
                <span className="block text-5xl font-display font-extrabold text-white tracking-tight font-mono">
                  {waterResult || '---'} <span className="text-lg text-neutral-500">Liters</span>
                </span>
                <span className="text-[10px] uppercase text-neutral-500 font-semibold tracking-widest mt-1 block">Daily Hydration Budget</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Your cells demand optimal fluid volume to preserve intra-muscular pressure and flush cellular wastes safely during and after workouts. Sip roughly 250ml every 15 minutes of heavy sweat sessions.
              </p>
              <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-900 text-left text-xs text-neutral-400 flex items-center gap-2.5">
                <CheckCircle2 className="text-blue-400 shrink-0" size={16} />
                <span>Equates to roughly <span className="text-white font-semibold">{waterResult ? Math.ceil(waterResult * 4) : '---'} standard glasses</span> per day.</span>
              </div>
            </motion.div>
          )}

          {/* DISPLAY 4: PROTEIN RESULT */}
          {activeTab === 'protein' && protResult && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6 max-w-md"
            >
              <div className="mx-auto w-20 h-20 bg-electric-orange/10 border border-electric-orange/20 rounded-full flex items-center justify-center">
                <Dumbbell size={36} className="text-electric-orange" />
              </div>
              <div>
                <span className="block text-5xl font-display font-extrabold text-white tracking-tight font-mono">
                  {protResult.min} - {protResult.max} <span className="text-lg text-neutral-500">grams</span>
                </span>
                <span className="text-[10px] uppercase text-neutral-500 font-semibold tracking-widest mt-1 block">Daily Protein Target</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                To maximize skeletal muscular protein synthesis, divide this total budget across 4 to 5 equal feeds of 30-40g. Perfect sources include whole eggs, lean poultry, clean paneer, sattu, lentils, or isolate whey shake.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-left">
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-900 text-xs">
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">Minimum Threshold</span>
                  <span className="text-white font-bold text-sm block mt-0.5">{protResult.min}g/day</span>
                  <span className="text-[10px] text-neutral-400">Protects muscular catabolism</span>
                </div>
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-900 text-xs">
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">Optimal Peak</span>
                  <span className="text-electric-orange font-bold text-sm block mt-0.5">{protResult.max}g/day</span>
                  <span className="text-[10px] text-neutral-400">Triggers growth & hypertrophy</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* DISPLAY 5: BODY FAT RESULT */}
          {activeTab === 'bodyfat' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6 max-w-sm"
            >
              {bfResult ? (
                <>
                  <div className="mx-auto w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center relative">
                    <span className="text-2xl font-display font-black text-white">{bfResult.bf}%</span>
                  </div>
                  <div>
                    <span className={`block text-2xl font-display font-extrabold uppercase tracking-wide ${bfResult.color}`}>
                      {bfResult.status}
                    </span>
                    <span className="text-[10px] uppercase text-neutral-500 font-semibold tracking-widest mt-1 block">Body Fat Assessment</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Circumference measurements analyze relative fat layers across critical core channels. To safely adjust ratios, couple rigorous strength programs with a 300kcal metabolic deficit.
                  </p>
                </>
              ) : (
                <div className="space-y-3">
                  <Compass size={40} className="mx-auto text-neutral-600 animate-spin" />
                  <p className="text-xs text-neutral-400">Fill in circumference details and click calculate to estimate Body Fat metrics.</p>
                </div>
              )}
            </motion.div>
          )}

        </div>
      </div>
    </div>
  </section>
);
}
