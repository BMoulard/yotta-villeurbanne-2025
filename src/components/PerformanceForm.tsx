import React from 'react';
import { FaSwimmer, FaRunning } from 'react-icons/fa';
import { AthletePerformance, SWIMMING_DISTANCES, RUNNING_DISTANCES, FITNESS_LEVELS } from '../types';

interface Props {
  performance: AthletePerformance;
  onPerformanceChange: (performance: AthletePerformance) => void;
  onSubmit: () => void;
}

export default function PerformanceForm({ performance, onPerformanceChange, onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleFitnessLevelClick = (level: number) => {
    onPerformanceChange({
      ...performance,
      fitnessLevel: level
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-950 p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Entrez vos performances</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Swimming Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4">
              <FaSwimmer className="w-8 h-8 text-blue-500 mr-2" />
              <h3 className="text-xl font-semibold">Natation</h3>
            </div>
            
            <div className="w-48 mx-auto">
              <label className="block text-sm font-medium text-gray-700">Distance</label>
              <select
                value={performance.swimmingDistance}
                onChange={(e) => onPerformanceChange({
                  ...performance,
                  swimmingDistance: e.target.value
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {SWIMMING_DISTANCES.map(distance => (
                  <option key={distance} value={distance}>{distance}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 w-48 mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700">Minutes</label>
                <input
                  type="number"
                  value={performance.swimmingMinutes}
                  onChange={(e) => onPerformanceChange({
                    ...performance,
                    swimmingMinutes: parseInt(e.target.value) || 0
                  })}
                  onFocus={(e) => e.target.select()}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Secondes</label>
                <input
                  type="number"
                  value={performance.swimmingSeconds.toString().padStart(2, '0')}
                  onChange={(e) => onPerformanceChange({
                    ...performance,
                    swimmingSeconds: parseInt(e.target.value) || 0
                  })}
                  onFocus={(e) => e.target.select()}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                  max="59"
                />
              </div>
            </div>
          </div>

          {/* Running Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4">
              <FaRunning className="w-8 h-8 text-red-500 mr-2" />
              <h3 className="text-xl font-semibold">Course à pied</h3>
            </div>
            
            <div className="w-48 mx-auto">
              <label className="block text-sm font-medium text-gray-700">Distance</label>
              <select
                value={performance.runningDistance}
                onChange={(e) => onPerformanceChange({
                  ...performance,
                  runningDistance: e.target.value
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              >
                {RUNNING_DISTANCES.map(distance => (
                  <option key={distance} value={distance}>{distance}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 w-48 mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700">Minutes</label>
                <input
                  type="number"
                  value={performance.runningMinutes}
                  onChange={(e) => onPerformanceChange({
                    ...performance,
                    runningMinutes: parseInt(e.target.value) || 0
                  })}
                  onFocus={(e) => e.target.select()}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Secondes</label>
                <input
                  type="number"
                  value={performance.runningSeconds.toString().padStart(2, '0')}
                  onChange={(e) => onPerformanceChange({
                    ...performance,
                    runningSeconds: parseInt(e.target.value) || 0
                  })}
                  onFocus={(e) => e.target.select()}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  min="0"
                  max="59"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fitness Level */}
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
                  className={`w-8 h-8 rounded-full ${level.color} cursor-pointer transition-transform hover:scale-110 ${performance.fitnessLevel === level.level ? 'ring-2 ring-gray-400' : ''}`}
                  title={level.label}
                  onClick={() => handleFitnessLevelClick(level.level)}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-16 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Calculer les résultats
        </button>
      </form>
    </div>
  );
}