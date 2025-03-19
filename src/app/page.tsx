import Image from "next/image";
import UserCard from "@/components/UserCard";
import ProgressBar from "@/components/ProgressBar";
import QandA from "@/components/QandA";
import questionsData from '@/db/scripts/questions.json';


// export default function Page() {
//   return (
//     <main className="flex justify-center items-center min-h-screen bg-gray-50">
//       <UserCard
//         name="Amaury"
//         country="France"
//         points={2500}
//         rank={13}
//       />
//     </main>
//   );
// }

// export default function QuizPage() {
//   // Exemple : 8 questions répondues sur 12
//   const currentAnswered = 9;
//   const totalQuestions = 24;

//   return (
//     <main className="min-h-screen bg-purple-900 flex items-center justify-center p-4">
//       <ProgressBar total={totalQuestions} />
//     </main>
//   );
// }



export default function HomePage() {
  return (
    <main className="h-screen bg-gray-200">
      <QandA questions={questionsData} />
    </main>
  );
}


