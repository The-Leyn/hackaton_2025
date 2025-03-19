'use client';

import React, { useState } from 'react';

interface ProgressBarProps {
  total: number;
}

export default function ProgressBar({ total }: ProgressBarProps) {
  // Déclare une variable d'état "current" initialisée à 0
  const [current, setCurrent] = useState(0);

  // Calcul du pourcentage de progression
  const progressPercentage = (current / total) * 100;

  // Fonction pour simuler le passage à la question suivante
  const handleNextQuestion = () => {
    // On incrémente seulement si on n'a pas atteint le total
    if (current < total) {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md">
      {/* Affichage du texte de progression */}
      <div className="text-sm font-medium text-white mb-2">
        QUESTION {current}/{total}
      </div>

      {/* Barre de progression */}
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-4 bg-yellow-500 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Bouton pour simuler une mise à jour du state */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleNextQuestion}
      >
        Suivant
      </button>
    </div>
  );
}
