import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import "./styling/App.scss";

const App = () => {
  const startTrivia = async () => {};
  const checkAnwer = async (e: React.MouseEvent<HTMLButtonElement>) => {};
  const nextQuestion = () => {};

  return (
    <div className="App">
      <div className="description">
        <h1>React Quiz</h1>
        <QuestionCard />
      </div>
    </div>
  );
};

export default App;
