import { FaTrophy } from 'react-icons/fa';

interface Props {
  waveNumber: number;
  waveName: string;
  totalTime: string;
  isLastWave?: boolean;
}

export function WaveHeader({ waveNumber, waveName, totalTime, isLastWave }: Props) {
  return (
    <div className="text-sm font-medium text-gray-700 mb-2">
      <span>
        {isLastWave ? (
          <>
            {waveNumber}|{waveName} <FaTrophy className="text-yellow-500 inline-block mx-1" /> - {totalTime}
          </>
        ) : (
          <>
            {waveNumber}|{waveName} - {totalTime}
          </>
        )}
      </span>
    </div>
  );
}