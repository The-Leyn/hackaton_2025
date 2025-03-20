"use client";
import React from "react";
import Link from "next/link";
import { House, UserRound, Medal } from "lucide-react";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/game")) {
    return null; // Ne rien afficher pour la route "/game"
  }
  return (
    <nav className="flex fixed bottom-0 bg-hackatonWhite-400 rounded-t-2xl w-full p-4 items-center justify-around">
      <Link href={`/`}>
        <button className={`cursor-pointer p-2 rounded-xl ${pathname === "/" ? "bg-hackatonPervenche-400" : ""}`}>
          <House className="text-hackatonPervencheDark-400" size={32} />
        </button>
      </Link>
      <Link href={`/ranking`}>
        <button className={`cursor-pointer p-2 rounded-xl ${pathname === "/ranking" ? "bg-hackatonPervenche-400" : ""}`}>
          <Medal className="text-hackatonPervencheDark-400" size={32} />
        </button>
      </Link>
      <Link href={`/profile`}>
        <button className={`cursor-pointer p-2 rounded-xl ${pathname === "/profile" ? "bg-hackatonPervenche-400" : ""}`}>
          <UserRound className="text-hackatonPervencheDark-400" size={32} />
        </button>
      </Link>
    </nav>
  );
}
