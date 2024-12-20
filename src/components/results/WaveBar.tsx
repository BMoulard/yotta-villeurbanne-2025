import { formatTime } from '../../utils/timeFormatters';

interface Props {
  swimming: number;
  transition: number;
  running: number;
  recovery: number;
  totalTime: number;
  cutOffTime: number;
  isLastWave?: boolean;
  previousWaveTime?: number;
  previousWaveCutoff?: number;
}

export function WaveBar({ 
  swimming, 
  transition, 
  running, 
  recovery, 
  totalTime, 
  cutOffTime, 
  isLastWave,
  previousWaveTime,
  previousWaveCutoff
}: Props) {
  // A wave is disabled if the previous wave's time exceeded its cutoff
  const isDisabled = previousWaveTime !== undefined && 
                    previousWaveCutoff !== undefined && 
                    previousWaveTime > previousWaveCutoff;
  
  // Calculate positions based on the total wave duration (25 minutes = 1500 seconds)
  const TOTAL_WAVE_DURATION = 1500; // 25 minutes in seconds
  const scale = TOTAL_WAVE_DURATION / totalTime;
  const cutOffPosition = (cutOffTime / TOTAL_WAVE_DURATION) * 100;

  const stripePattern = isDisabled ? {
    backgroundImage: 'repeating-linear-gradient(45deg, #9ca3af33 0, #9ca3af33 10px, transparent 10px, transparent 20px)'
  } : {};

  const renderSegment = (width: number, color: string, type: string, time: number) => (
    <div 
      style={{ width: `${(width * scale/TOTAL_WAVE_DURATION)*100}%` }}
      className={`${color} ${isDisabled ? 'opacity-50' : ''} relative group h-full`}
    >
      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
        {type}: {formatTime(time)}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <div className="h-8 flex rounded-lg overflow-hidden" style={stripePattern}>
        {renderSegment(swimming, 'bg-blue-500', 'Natation', swimming)}
        {renderSegment(transition, 'bg-gray-400', 'Transition', transition)}
        {renderSegment(running, 'bg-red-500', 'Course', running)}
        {recovery > 0 && (
          <div 
            style={{width: `${(recovery * scale/TOTAL_WAVE_DURATION)*100}%`}}
            className={`${isLastWave ? "bg-gray-200 bg-striped" : `bg-green-500 ${isDisabled ? 'opacity-50' : ''}`} h-full relative group`}
          >
            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
              Récupération: {formatTime(recovery)}
            </div>
          </div>
        )}
      </div>
      {!isLastWave && (
        <>
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-black"
            style={{left: `${cutOffPosition}%`}}
          />
          <div 
            className="absolute -bottom-5 text-xs text-gray-600"
            style={{left: `${cutOffPosition}%`, transform: 'translateX(-50%)'}}
          >
            {Math.floor(cutOffTime / 60)}:00
          </div>
        </>
      )}
    </div>
  );
}