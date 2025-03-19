// Dans src/app/ranking/page.tsx
"use client";
import RankingCards from '@/components/InternationalRanking';

export default function RankingPage() {
  return (
    <main className="min-h-screen bg-hackatonWhite-400">
      <RankingCards />
    </main>
  );
}