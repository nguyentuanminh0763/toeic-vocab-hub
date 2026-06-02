'use client';

import { useQuiz } from '../hooks/useQuiz';
import SetupScreen from './SetupScreen';
import QuestionScreen from './QuestionScreen';
import ResultScreen from './ResultScreen';

export default function Quiz() {
  const { screen, questions, qIndex, result, startQuiz, handleAnswer, retryWrong, goSetup } = useQuiz();

  return (
    <div className="flex flex-col items-center w-full">
      {screen === 'setup' && <SetupScreen onStart={startQuiz} />}
      {screen === 'quiz' && questions[qIndex] && (
        <QuestionScreen
          key={qIndex}
          question={questions[qIndex]}
          index={qIndex}
          total={questions.length}
          correctCount={result.correct}
          wrongCount={result.wrong.length}
          onAnswer={handleAnswer}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          result={result}
          onRetry={goSetup}
          onRetryWrong={retryWrong}
        />
      )}
    </div>
  );
}
