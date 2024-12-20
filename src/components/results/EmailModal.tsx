import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onSend: () => void;
}

export function EmailModal({ isOpen, onClose, email, onSend }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recevoir ma simulation</h3>
          <p className="text-gray-600 mb-4">
            Votre simulation sera envoyée à l'adresse email :
            <br />
            <span className="font-medium">{email}</span>
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Annuler
            </button>
            <button
              onClick={onSend}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
            >
              Recevoir ma simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}