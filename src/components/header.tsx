'use client';

import React from "react";
import { ChevronLeft } from 'lucide-react';


interface HeaderProps {
  title: string;
  subtitle?: string;
  isVisible: boolean;
  titleGame: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, isVisible, titleGame = null }) => {
  return (
    <header className="bg-[#1C0D40] text-white p-6 text-center relative">
      {subtitle && <h2>{subtitle}</h2>}
      <h1>{title}</h1>
      
      {/* Affichage du bouton basé sur la prop isVisible */}
      {isVisible && (
        <>
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
          onClick={() => window.history.back()}  // Retour à la page précédente
        >
          <ChevronLeft size={24} />
        </button>
        <p>{titleGame}</p>
        </>
      )}
    </header>
  );
};


export default Header;
