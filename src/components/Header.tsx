"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  isVisible: boolean;
  titleGame?: string | null;
  children?: ReactNode;
}

export default function Header({ title, subtitle, isVisible, children }: HeaderProps) {
  return (
    <header className="bg-hackatonPervencheDark-400 text-hackatonWhite-400 py-8 px-6 rounded-b-3xl gap-6 flex flex-col relative">
      <div>
        {subtitle && <h2 className={`font-poppins font-light uppercase ${isVisible ? "text-center font-semibold uppercase" : ""}`}>{subtitle}</h2>}
        {!isVisible && <h1 className="font-syncopate text-3xl">{title}</h1>}
        {/* Affichage du bouton basé sur la prop isVisible */}
        {isVisible && (
          <>
            <Link href={"/"} className="absolute left-4 top-[42px] transform -translate-y-1/2 text-white">
              <ChevronLeft size={24} />
            </Link>
          </>
        )}
      </div>
      {children}
    </header>
  );
}
