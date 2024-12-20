export interface AthleteInfo {
  fullName: string;
  club: string;
  email: string;
}

export interface AthletePerformance extends AthleteInfo {
  runningDistance: string;
  runningMinutes: number;
  runningSeconds: number;
  swimmingDistance: string;
  swimmingMinutes: number;
  swimmingSeconds: number;
  fitnessLevel: number;
}

export interface WaveResult {
  wave: number;
  waveName: string;
  swimming: number;
  transition: number;
  running: number;
  recovery: number;
  totalTime: number;
  cutOffTime: number;
  swimPace: string;
  runPace: string;
}

export const SWIMMING_DISTANCES = [
  "50m", "100m", "200m", "300m", "400m", "750m", 
  "800m", "1000m", "1500m", "1900m", "3800m", "5000m"
];

export const RUNNING_DISTANCES = [
  "1km", "2km", "3km", "5km", "10km", "21.1km", "42.2km"
];

export const FITNESS_LEVELS = [
  { level: 1, label: "Pas en forme", color: "bg-red-300 hover:bg-red-400" },
  { level: 2, label: "Peu en forme", color: "bg-orange-300 hover:bg-orange-400" },
  { level: 3, label: "Forme moyenne", color: "bg-yellow-300 hover:bg-yellow-400" },
  { level: 4, label: "Bonne forme", color: "bg-lime-300 hover:bg-lime-400" },
  { level: 5, label: "Excellente forme", color: "bg-green-300 hover:bg-green-400" }
];