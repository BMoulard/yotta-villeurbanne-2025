import React, { useState } from 'react';
import BibNumberForm from './components/BibNumberForm';
import PerformanceForm from './components/PerformanceForm';
import ResultsView from './components/ResultsView';
import { AthleteInfo, AthletePerformance, WaveResult } from './types';
import { calculatePace, calculateWaveResults } from './utils/calculations';

export default function App() {
  const [step, setStep] = useState(1);
  const [athleteInfo, setAthleteInfo] = useState<AthleteInfo>({
    fullName: '',
    club: '',
    email: '',
    bibNumber: ''
  });
  const [performance, setPerformance] = useState<AthletePerformance>({
    ...athleteInfo,
    runningDistance: '5km',
    runningMinutes: 0,
    runningSeconds: 0,
    swimmingDistance: '400m',
    swimmingMinutes: 0,
    swimmingSeconds: 0,
    fitnessLevel: 3
  });
  const [results, setResults] = useState<WaveResult[]>([]);

  const handleAthleteInfoSubmit = () => {
    setPerformance(prev => ({
      ...prev,
      ...athleteInfo
    }));
    setStep(2);
  };

  const handlePerformanceSubmit = () => {
    const swimPacePerKm = calculatePace(
      performance.swimmingDistance,
      performance.swimmingMinutes,
      performance.swimmingSeconds
    );
    
    const runPacePerKm = calculatePace(
      performance.runningDistance,
      performance.runningMinutes,
      performance.runningSeconds
    );

    const waveResults = calculateWaveResults(
      swimPacePerKm,
      runPacePerKm,
      performance.fitnessLevel
    );

    setResults(waveResults);
    setStep(3);
  };

  const handleReset = () => {
    setAthleteInfo({
      fullName: '',
      club: '',
      email: '',
      bibNumber: ''
    });
    setPerformance({
      fullName: '',
      club: '',
      email: '',
      bibNumber: '',
      runningDistance: '5km',
      runningMinutes: 0,
      runningSeconds: 0,
      swimmingDistance: '400m',
      swimmingMinutes: 0,
      swimmingSeconds: 0,
      fitnessLevel: 3
    });
    setResults([]);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-950">
      {step === 1 && (
        <BibNumberForm
          athleteInfo={athleteInfo}
          onAthleteInfoChange={setAthleteInfo}
          onSubmit={handleAthleteInfoSubmit}
        />
      )}
      {step === 2 && (
        <PerformanceForm
          performance={performance}
          onPerformanceChange={setPerformance}
          onSubmit={handlePerformanceSubmit}
        />
      )}
      {step === 3 && (
        <ResultsView
          results={results}
          athleteName={athleteInfo.fullName}
          onReset={handleReset}
        />
      )}
    </div>
  );
}