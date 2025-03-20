"use client";
import React, { useState } from "react";
// import { updateGlobalScore } from "@/db/services/users";
import { setUserScore } from "@/app/setScore";
interface QuestionItem {
  question: string;
  options: string[];
  answer: string[]; // Possibilité de plusieurs réponses correctes
}

interface QandAProps {
  questions: QuestionItem[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  userEmail: string;

}

export default function QandA({ questions, currentQuestionIndex, setCurrentQuestionIndex, userEmail }: QandAProps) {
  // Limiter à 3 questions :
  // const data = questions.slice(0, 3);
//   const { user } = useUser();
//   const userEmail = user?.emailAddresses[0].emailAddress
//  console.log(user?.emailAddresses[0].emailAddress);
  
  const data = questions;

  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[][]>(Array(data.length).fill([]));

  const currentQuestion = data[currentQuestionIndex];
``
  console.log(`Score Actuel: ${score} !"`);
  

  const handleSelectOption = (option: string) => {
    setSelectedOptions((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
  };

  const handleValidate = () => {
    if (selectedOptions.length === 0) return;

    // Enregistrer les réponses de l'utilisateur
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = [...selectedOptions];
    setUserAnswers(newUserAnswers);

    const isCorrect =
      selectedOptions.length === currentQuestion.answer.length && currentQuestion.answer.every((ans) => selectedOptions.includes(ans));

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOptions([]);
    } else {
      setCurrentQuestionIndex(nextIndex);
      setIsFinished(true);
      setUserScore( score, userEmail)

    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setScore(0);
    setIsFinished(false);
    setUserAnswers(Array(data.length).fill([]));
  };

  if (isFinished) {

    return (
      <div className="w-full h-screen bg-hackatonWhite-400 flex flex-col justify-between rounded-xl">
        <div className="w-full max-w-md bg-white p-6 rounded-xl mx-auto overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4 text-purple-900">Quiz terminé !</h1>
          <p className="text-lg text-purple-900 mb-6">
            Votre score : {score} / {data.length}
          </p>

          <div className="space-y-6 mb-6">
            <h2 className="text-xl font-semibold text-purple-900">Récapitulatif :</h2>

            {data.map((q, index) => {
              const userAnswer = userAnswers[index];
              const isCorrectAnswer = userAnswer.length === q.answer.length && q.answer.every((ans) => userAnswer.includes(ans));

              return (
                <div key={index} className="border border-purple-100 rounded-lg p-4">
                  <h3 className="font-medium text-purple-900 mb-2">
                    Question {index + 1}: {q.question}
                  </h3>

                  <div className="mb-2">
                    <p className="text-sm text-purple-700">Votre réponse :</p>
                    <ul className="ml-5 list-disc">
                      {userAnswer.length > 0 ? (
                        userAnswer.map((ans, i) => (
                          <li key={i} className="text-purple-900">
                            {ans}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">Aucune réponse</li>
                      )}
                    </ul>
                  </div>

                  <div className="mb-2">
                    <p className="text-sm text-purple-700">Réponse correcte :</p>
                    <ul className="ml-5 list-disc">
                      {q.answer.map((ans, i) => (
                        <li key={i} className="text-purple-900">
                          {ans}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`mt-2 px-3 py-1 inline-block rounded-full text-sm font-medium ${
                      isCorrectAnswer ? "bg-green-300 text-green-400" : "bg-red-400 text-white"
                    }`}
                  >
                    {isCorrectAnswer ? "Correct" : "Incorrect"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleRestart}
            className="
              w-full py-3 
              rounded-full 
              bg-yellow-400 
              hover:bg-yellow-500 
              text-black 
              font-semibold
              transition-colors 
              duration-300
            "
          >
            RECOMMENCER LE QUIZ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  gap-6 flex flex-col justify-between">
      <div className="w-full max-w-m rounded-xl mx-auto overflow-y-auto">
        <h2 className="text-xl font-semibold mb-6 text-hackatonPervencheDark-400">{currentQuestion.question}</h2>

        <ul className="space-y-3 mb-4">
          {currentQuestion.options.map((option, index) => (
            <li key={index}>
              <label
                onClick={() => handleSelectOption(option)}
                className={`block w-full text-center px-4 py-3 
                  cursor-pointer 
                  rounded-full border 
                  transition-colors 
                  ${selectedOptions.includes(option) ? "bg-purple-200 border-purple-400" : "bg-purple-50 border-purple-200 hover:bg-purple-100"}
                `}
              >
                <input type="checkbox" checked={selectedOptions.includes(option)} onChange={() => handleSelectOption(option)} className="hidden" />
                <span className="text-purple-900 font-medium">{option}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-md mx-auto">
        <button
          onClick={handleValidate}
          className="
          flex justify-center items-center rounded-2xl p-5
            w-full py-3 
            bg-hackatonGold-400 
            text-hackatonPervencheDark-400
            cursor-pointer
            font-semibold
          "
        >
          Validate
        </button>
      </div>
    </div>
  );
}

// "use client";
// import React, { useState } from "react";

// interface QuestionItem {
//   question: string;
//   options: string[];
//   answer: string[];
// }

// interface QandAProps {
//   questions: QuestionItem[];
//   currentQuestionIndex: number;
//   setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
// }

// export default function QandA({ questions, currentQuestionIndex, setCurrentQuestionIndex }: QandAProps) {
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
//   const [score, setScore] = useState(0);
//   const [isFinished, setIsFinished] = useState(false);
//   const [userAnswers, setUserAnswers] = useState<string[][]>(Array(questions.length).fill([]));

//   const currentQuestion = questions[currentQuestionIndex];

//   const handleSelectOption = (option: string) => {
//     setSelectedOptions((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
//   };

//   const handleValidate = () => {
//     if (selectedOptions.length === 0) return;

//     const newUserAnswers = [...userAnswers];
//     newUserAnswers[currentQuestionIndex] = [...selectedOptions];
//     setUserAnswers(newUserAnswers);

//     const isCorrect =
//       selectedOptions.length === currentQuestion.answer.length &&
//       currentQuestion.answer.every((ans) => selectedOptions.includes(ans));

//     if (isCorrect) {
//       setScore((prevScore) => prevScore + 1);
//     }

//     const nextIndex = currentQuestionIndex + 1;
//     if (nextIndex < questions.length) {
//       setCurrentQuestionIndex(nextIndex);
//       setSelectedOptions([]);
//     } else {
//       setIsFinished(true);
//     }
//   };

//   return isFinished ? (
//     <div className="w-full h-screen bg-white flex flex-col justify-between p-6">
//       <div className="w-full max-w-md bg-white p-6 rounded-xl mx-auto overflow-y-auto">
//         <h1 className="text-2xl font-bold mb-4 text-purple-900">Quiz terminé !</h1>
//         <p className="text-lg text-purple-900 mb-6">Votre score : {score} / {questions.length}</p>
//         <button
//           onClick={() => setCurrentQuestionIndex(0)}
//           className="w-full py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition-colors duration-300"
//         >
//           RECOMMENCER LE QUIZ
//         </button>
//       </div>
//     </div>
//   ) : (
//     <div className="w-full gap-6 flex flex-col justify-between">
//       <div className="w-full max-w-m rounded-xl mx-auto overflow-y-auto">
//         <h2 className="text-xl font-semibold mb-6 text-hackatonPervencheDark-400">{currentQuestion.question}</h2>
//         <ul className="space-y-3 mb-4">
//           {currentQuestion.options.map((option, index) => (
//             <li key={index}>
//               <label
//                 onClick={() => handleSelectOption(option)}
//                 className={`block w-full text-center px-4 py-3
//                   cursor-pointer
//                   rounded-full border
//                   transition-colors
//                   ${selectedOptions.includes(option) ? "bg-purple-200 border-purple-400" : "bg-purple-50 border-purple-200 hover:bg-purple-100"}
//                 `}
//               >
//                 <input type="checkbox" checked={selectedOptions.includes(option)} onChange={() => handleSelectOption(option)} className="hidden" />
//                 <span className="text-purple-900 font-medium">{option}</span>
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="w-full max-w-md mx-auto">
//         <button
//           onClick={handleValidate}
//           className="flex justify-center items-center rounded-2xl p-5 w-full py-3 bg-hackatonGold-400 text-hackatonPervencheDark-400 cursor-pointer font-semibold"
//         >
//           Validate
//         </button>
//       </div>
//     </div>
//   );
// }
