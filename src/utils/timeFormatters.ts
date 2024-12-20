export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatPaceWithTotal = (totalSeconds: number, distance: string, pacePerUnit: string): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}min${seconds.toString().padStart(2, '0')} (${pacePerUnit}/100m)`;
};