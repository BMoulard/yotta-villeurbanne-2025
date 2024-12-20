import { formatTime } from '../../utils/timeFormatters';

interface Props {
  swimTime: number;
  swimPace: string;
  runTime: number;
  runPace: string;
}

export function ReferenceTimesDisplay({ swimTime, swimPace, runTime, runPace }: Props) {
  return (
    <div className="text-center mb-8 p-4 bg-gray-50 rounded-lg">
      <p className="text-lg font-medium">Temps de référence sur les distances de l'épreuve :</p>
      <p className="text-gray-600">
        Natation 200m : {formatTime(swimTime)} ({swimPace}/100m)
        <br />
        Course à pied 2km : {formatTime(runTime)} ({runPace}/km)
      </p>
    </div>
  );
}