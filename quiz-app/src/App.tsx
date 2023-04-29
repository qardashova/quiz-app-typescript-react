import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import "./styling/App.scss";

const App = () => {

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
