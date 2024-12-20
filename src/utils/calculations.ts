import { WaveResult } from '../types';

export const calculatePace = (distance: string, minutes: number, seconds: number) => {
  const totalSeconds = minutes * 60 + seconds;
  const distanceValue = parseFloat(distance.replace(/[^0-9.]/g, ''));
  
  // Convert to meters/kilometers for standardization
  const distanceInMeters = distance.includes('km') ? distanceValue * 1000 : distanceValue;
  
  return totalSeconds / (distanceInMeters / 1000); // seconds per km
};

export const formatPace = (secondsPerKm: number, isSwimming: boolean) => {
  if (isSwimming) {
    // Convert to 100m pace for swimming
    const secondsPer100m = secondsPerKm / 10;
    const minutes = Math.floor(secondsPer100m / 60);
    const seconds = Math.floor(secondsPer100m % 60);
    return `${minutes}'${seconds.toString().padStart(2, '0')}`;
  } else {
    // Format as per km pace for running
    const minutes = Math.floor(secondsPerKm / 60);
    const seconds = Math.floor(secondsPerKm % 60);
    return `${minutes}'${seconds.toString().padStart(2, '0')}`;
  }
};

const calculateDegradationFactor = (waveIndex: number, fitnessLevel: number): number => {
  return 1 + (waveIndex * (6 - fitnessLevel) * 0.005);
};

const calculateSegmentTime = (baseTime: number, degradationFactor: number): number => {
  return baseTime * degradationFactor;
};

export const calculateWaveResults = (
  swimPacePerKm: number,
  runPacePerKm: number,
  fitnessLevel: number
): WaveResult[] => {
  const TRANSITION_TIME = 30; // seconds
  const WAVE_INTERVAL = 25 * 60; // 25 minutes in seconds
  const TIME_LIMITS = [25 * 60, 21 * 60, 17 * 60, 13 * 60, 13 * 60];
  const WAVE_NAMES = ["Kilo", "Mega", "Giga", "Tera", "Peta"];
  
  return TIME_LIMITS.map((timeLimit, index) => {
    const degradationFactor = calculateDegradationFactor(index, fitnessLevel);
    
    const swimming = calculateSegmentTime(swimPacePerKm * 0.2, degradationFactor); // 200m swimming
    const running = calculateSegmentTime(runPacePerKm * 2, degradationFactor); // 2km running
    const baseTime = swimming + TRANSITION_TIME + running;
    
    // Calculate recovery time (if any)
    const recovery = index < 4 ? Math.max(0, WAVE_INTERVAL - baseTime) : (WAVE_INTERVAL - baseTime);
    
    return {
      wave: index + 1,
      waveName: WAVE_NAMES[index],
      swimming,
      transition: TRANSITION_TIME,
      running,
      recovery,
      totalTime: baseTime,
      cutOffTime: timeLimit,
      swimPace: formatPace(swimPacePerKm, true),
      runPace: formatPace(runPacePerKm, false)
    };
  });
};