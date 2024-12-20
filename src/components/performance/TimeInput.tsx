interface Props {
  minutes: number;
  seconds: number;
  onMinutesChange: (value: number) => void;
  onSecondsChange: (value: number) => void;
}

export function TimeInput({ minutes, seconds, onMinutesChange, onSecondsChange }: Props) {
  const formatValue = (value: number) => value.toString().padStart(2, '0');

  return (
    <div className="grid grid-cols-2 gap-4 w-48 mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Minutes</label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => onMinutesChange(parseInt(e.target.value) || 0)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          min="0"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Secondes</label>
        <input
          type="number"
          value={formatValue(seconds)}
          onChange={(e) => onSecondsChange(parseInt(e.target.value) || 0)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          min="0"
          max="59"
        />
      </div>
    </div>
  );
}