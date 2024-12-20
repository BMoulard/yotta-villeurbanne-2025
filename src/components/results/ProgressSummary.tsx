import { WaveResult } from '../../types';

interface Props {
  results: WaveResult[];
}

export function ProgressSummary({ results }: Props) {
  const completedWaves = results.filter(result => 
    result.wave === 1 || (results[result.wave - 2].totalTime <= results[result.wave - 2].cutOffTime)
  ).length;
  const totalSwimDistance = completedWaves * 200;
  const totalRunDistance = completedWaves * 2;

  return (
    <div className="text-center mb-8 p-4 bg-gray-50 rounded-lg">
      <p className="text-lg font-medium mb-2">Projection de course</p>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-600">Vagues complétées</p>
          <p className="text-xl font-semibold text-red-600">{completedWaves}/5</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Distance natation</p>
          <p className="text-xl font-semibold text-blue-600">{totalSwimDistance}m</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Distance course</p>
          <p className="text-xl font-semibold text-red-600">{totalRunDistance}km</p>
        </div>
      </div>
    </div>
  );
}