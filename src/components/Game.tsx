"use client"
import Header from "./Header"
import ProgressBar from "./ProgressBar"
import QandA from "./QandA";
import { useState } from "react";

interface GameProps {
  game: object[]; // Possibilité de plusieurs réponses correctes
  userEmail: string;
}
export default function Game({game, userEmail}: GameProps) {

  const gameQuestions = (game[0].data_game as { questions: { question: string; answer: string[]; options: string[] }[] }).questions;
  const numberOfQuestions = gameQuestions.length;
  console.log("Number of questions:", numberOfQuestions);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <main className="h-screen w-screen bg-slate-50 flex flex-col">
      <Header title={"EUNIFY"} subtitle={game[0].name} isVisible={true}>
        <ProgressBar total={numberOfQuestions} current={ currentQuestion } />
      </Header>
      <div className=" p-6 h-full overflow-scroll">
        <QandA questions={gameQuestions} currentQuestionIndex={currentQuestion} setCurrentQuestionIndex={setCurrentQuestion} userEmail={userEmail} />

      </div>
    </main>
  )
}




// "use client"
// import Header from "./Header";
// import ProgressBar from "./ProgressBar";
// import QandA from "./QandA";
// import { useState } from "react";

// interface GameProps {
//   game: {
//     name: string;
//     data_game: {
//       questions: {
//         question: string;
//         answer: string[];
//         options: string[];
//       }[];
//     };
//   }[];
// }

// export default function Game({ game }: GameProps) {
//   const gameQuestions = game[0].data_game.questions;
//   const numberOfQuestions = gameQuestions.length;

//   const [currentQuestion, setCurrentQuestion] = useState(1);

//   return (
//     <main className="h-screen w-screen bg-slate-50 flex flex-col">
//       <Header title="EUNIFY" subtitle={game[0].name} isVisible={true}>
//         <ProgressBar total={numberOfQuestions} current={currentQuestion} />
//       </Header>
//       <div className="p-6 h-full overflow-scroll">
//         <QandA 
//           questions={gameQuestions} 
//           currentQuestionIndex={currentQuestion} 
//           setCurrentQuestionIndex={setCurrentQuestion} 
//         />
//       </div>
//     </main>
//   );
// }
