'use client';

import React from 'react';
import { MapPin, Trophy, Medal } from 'lucide-react';

interface UserCardProps {
  name: string;
  country: string;
  points: number;
  rank: number;
  image?: string;
}

function getOrdinalSuffix(rank: number): string {
  const tens = rank % 100;
  if (tens >= 11 && tens <= 13) {
    return 'th';
  }
  switch (rank % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export default function UserCard({ name, country, points, rank, image }: UserCardProps) {
  const rankWithSuffix = `${rank}${getOrdinalSuffix(rank)}`;

  return (
    <div className="bg-hackatonPervenche-400 text-hackatonPervencheDark-400 w-full rounded-3xl p-6 shadow-md gap-6 flex flex-col">
      {/* Section nom + pays */}
      <div className="flex gap-4 items-center">
        <img src={image} alt="" className='w-14 h-14 rounded-xl' />
        <div className="text-hackatonPervencheDark-400">
          <h2 className="text-xl font-syncopate font-semibold">{name}</h2>
          <p className="flex items-center text-xs text-hackatonPervencheDark-400">
            <MapPin className="w-4 h-4 mr-1" />
            {country}
          </p>
        </div>
      </div>

      {/* Section points et classement côte à côte dans deux blocs séparés */}
      <div className="flex gap-4">
        {/* Bloc Points */}
        <div className="flex items-center bg-white rounded-xl p-2 flex-1 gap-3">
          <div className="">
            <Trophy className="w-4 h-4" />
          </div>
          {/* <div className="text-center"> */}
            <span className="text-xs font-medium">{points} pts</span>
          {/* </div> */}
        </div>

        {/* Bloc Classement */}
        <div className="flex items-center bg-white rounded-xl p-2 flex-1 gap-3">
          <div className="">
            <Medal className="w-4 h-4" />
          </div>
          {/* <div className="text-center"> */}
            <span className="text-xs font-medium">{rankWithSuffix}</span>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
