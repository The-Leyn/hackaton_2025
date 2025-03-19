"use client";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  isVisible: boolean;
  titleGame?: string | null;
  children?: ReactNode;
}

export default function Header({ title, subtitle, isVisible, titleGame = null, children }: HeaderProps) {
  return (
    <header className="bg-hackatonPervencheDark-400 text-hackatonWhite-400 py-8 px-6 rounded-b-3xl gap-6 flex flex-col">
      <div>
        {subtitle && <h2 className="font-poppins font-light uppercase">{subtitle}</h2>}
        <h1 className="font-syncopate text-3xl">{title}</h1>
        {/* Affichage du bouton basé sur la prop isVisible */}
        {isVisible && (
          <>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
              onClick={() => window.history.back()} // Retour à la page précédente
            >
              <ChevronLeft size={24} />
            </button>
            {titleGame && <p>{titleGame}</p>}
          </>
        )}
      </div>
      {children}
    </header>
  );
}
