import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { WaveResult } from '../types';
import { WaveBar } from './results/WaveBar';
import { WaveHeader } from './results/WaveHeader';
import { ReferenceTimesDisplay } from './results/ReferenceTimesDisplay';
import { ProgressSummary } from './results/ProgressSummary';
import { Legend } from './results/Legend';
import { formatTime } from '../utils/timeFormatters';

interface Props {
  results: WaveResult[];
  athleteName: string;
  onReset: () => void;
}

export default function ResultsView({ results, athleteName, onReset }: Props) {
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!resultsRef.current) return;

    const element = resultsRef.current;
    const opt = {
      margin: 1,
      filename: `simulation-course-${athleteName.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-950 p-4">
      <div ref={resultsRef} className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">
          Planificateur de course pour {athleteName}
        </h2>

        <ReferenceTimesDisplay 
          swimTime={results[0].swimming}
          swimPace={results[0].swimPace}
          runTime={results[0].running}
          runPace={results[0].runPace}
        />

        <ProgressSummary results={results} />

        <div className="space-y-6 mb-8">
          {results.map((result, index) => {
            const previousWaveTime = index > 0 ? results[index - 1].totalTime : undefined;
            const previousWaveCutoff = index > 0 ? results[index - 1].cutOffTime : undefined;
            const isLastWave = index === results.length - 1;

            return (
              <div key={result.wave} className="space-y-2">
                <WaveHeader
                  waveNumber={result.wave}
                  waveName={result.waveName}
                  totalTime={formatTime(result.totalTime)}
                  isLastWave={isLastWave}
                />
                <WaveBar
                  swimming={result.swimming}
                  transition={result.transition}
                  running={result.running}
                  recovery={result.recovery}
                  totalTime={result.totalTime}
                  cutOffTime={result.cutOffTime}
                  isLastWave={isLastWave}
                  previousWaveTime={previousWaveTime}
                  previousWaveCutoff={previousWaveCutoff}
                />
              </div>
            );
          })}
        </div>

        <Legend />

        <div className="mt-8">
          <button
            onClick={handleExportPDF}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4"
          >
            Télécharger en PDF
          </button>
          <button
            onClick={onReset}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Faire une nouvelle simulation
          </button>
        </div>
      </div>
    </div>
  );
}