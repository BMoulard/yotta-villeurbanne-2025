import React from 'react';
import { AthleteInfo } from '../types';
import { FormInput } from './common/FormInput';
import { WelcomeBanner } from './common/WelcomeBanner';

interface Props {
  athleteInfo: AthleteInfo;
  onAthleteInfoChange: (info: AthleteInfo) => void;
  onSubmit: () => void;
}

export default function BibNumberForm({ athleteInfo, onAthleteInfoChange, onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = (field: keyof AthleteInfo, value: string) => {
    onAthleteInfoChange({
      ...athleteInfo,
      [field]: value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <WelcomeBanner />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="fullName"
            label="Nom et Prénom"
            value={athleteInfo.fullName}
            onChange={(value) => handleChange('fullName', value)}
            required
            placeholder="Entrez votre nom et prénom"
          />

          <FormInput
            id="club"
            label="Club"
            value={athleteInfo.club}
            onChange={(value) => handleChange('club', value)}
            required
            placeholder="Entrez votre club"
          />

          <FormInput
            id="email"
            label="Email"
            type="email"
            value={athleteInfo.email}
            onChange={(value) => handleChange('email', value)}
            required
            placeholder="Entrez votre email"
          />
          
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Continuer
          </button>
        </form>
      </div>
    </div>
  );
}