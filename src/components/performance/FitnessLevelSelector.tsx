import { FITNESS_LEVELS } from '../../types';

interface Props {
  currentLevel: number;
  onChange: (level: number) => void;
}

export function FitnessLevelSelector({ currentLevel, onChange }: Props) {
  return (
    <div className="mt-12 max-w-md mx-auto">
      <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
        Niveau de forme
      </label>
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-full mt-2 relative">
          <span className="text-xs text-gray-500 absolute left-0 -bottom-6">
            Très peu entraîné
          </span>
          <span className="text-xs text-gray-500 absolute right-0 -bottom-6">
            Très en forme
          </span>
          {FITNESS_LEVELS.map((level) => (
            <div 
              key={level.level}
              className={`w-8 h-8 rounded-full ${level.color} cursor-pointer transition-transform hover:scale-110 ${currentLevel === level.level ? 'ring-2 ring-gray-400' : ''}`}
              title={level.label}
              onClick={() => onChange(level.level)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}