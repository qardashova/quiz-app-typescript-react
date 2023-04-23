import React, { ChangeEvent, useEffect } from "react";
import "../styling/questionCard.scss";
import { FadeLoader } from "react-spinners";
import { ACTION, INITIAL_STATE, quizReducer } from "../API";
import { shuffleArray } from "../utils";
import { useReducer, useState } from "react";
import axios from "axios";

const QuestionCard = () => {
  const [state, dispatch] = useReducer(quizReducer, INITIAL_STATE);
  const { quizesData, loading, error } = state;

  // states for the quiz and questions
  const [start, setStart] = useState<boolean>(false);
  const [suffledAnswers, setSuffledAnswers] = useState<string[]>([]);
  const [yourAnswer, setYourAnswer] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [indexCorrectAnswer, setIndexCorrectAnswer] = useState<number>(0);
  const [selected, setSelected] = useState<boolean>(false);

  // states for the number of the questions
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
  const [allQuestionsNumber, setAllQuestionsNumber] = useState<number>(0);

  // state for the score
  const [score, setScore] = useState<number>(0);

  //! Start
  function startTrial(): void {
    setStart((prev) => !prev);
  }

  //! Fetching Questions Data
  useEffect(() => {
    dispatch({ type: ACTION.CALL_API });
    const fetchQuizes = async () => {
      try {
        let result = await axios.get(
          "https://opentdb.com/api.php?amount=10&type=multiple"
        );
        dispatch({ type: ACTION.SUCCESS, payload: result.data });
      } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: "Error" });
      }
    };
    fetchQuizes();
    // startTrial();
  }, [start]);

  //! States for Answers and Questions Number
  useEffect(() => {
    setSuffledAnswers(
      quizesData?.results[currentQuestionNumber]?.correct_answer
        ? shuffleArray([
            quizesData.results[currentQuestionNumber]?.correct_answer,
            ...quizesData.results[currentQuestionNumber]?.incorrect_answers,
          ])
        : []
    );
    setCorrectAnswer(
      quizesData?.results[currentQuestionNumber]?.correct_answer
        ? quizesData?.results[currentQuestionNumber]?.correct_answer
        : ""
    );
    setAllQuestionsNumber(quizesData?.results?.length);
  }, [quizesData, currentQuestionNumber]);

  //! Finding the correct answer
  useEffect(() => {
    if (shuffleArray.length > 0) {
      setIndexCorrectAnswer(() =>
        suffledAnswers.findIndex((answer) => answer === correctAnswer)
      );
    }
    if (yourAnswer != "" && yourAnswer === correctAnswer) {
      setScore((prev) => prev + 1);
    }
  }, [correctAnswer, yourAnswer]);

  //! Next Question
  function nextQuestion(): void {
    setSelected(false);
    setCurrentQuestionNumber((prev) => prev + 1);
    setYourAnswer("");
  }

  //! Try Again
  function tyrAgain(): void {
    setStart(false);
    setAllQuestionsNumber(0);
    setCurrentQuestionNumber(0);
    setScore(0);
    setIndexCorrectAnswer(0);
    setSelected(false);
    setSuffledAnswers([]);
    setYourAnswer("");
    setCorrectAnswer("");
  }

  console.log(yourAnswer);
  console.log(correctAnswer);
  // console.log(indexCorrectAnswer);

  // console.log(loading);
  console.log(quizesData);
  console.log(currentQuestionNumber, "currentQUestionNumber");
  console.log(allQuestionsNumber, "allQuestions");
  console.log(score, "score");

  // console.log(loading);
  // console.log(quizesData.results);
  // console.log(yourAnswer);

  return (
    <div className="QuestionCard">
      {start ? (
        <div className="main">
          {currentQuestionNumber + 1 == allQuestionsNumber && selected && (
            <h2 className="score">Score: {score}</h2>
          )}
          {loading ? (
            <FadeLoader loading={true} className="spinner" />
          ) : (
            <div className="questions">
              <h4>
                Question {currentQuestionNumber + 1}/{allQuestionsNumber}
              </h4>
              <h3>{quizesData.results[currentQuestionNumber].question}</h3>
              <ul>
                {suffledAnswers?.map((el, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        selected && indexCorrectAnswer === index ? "right" : ""
                      }
                    >
                      <label htmlFor="">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          checked={yourAnswer === el}
                          onChange={() => (
                            setYourAnswer(() => el), setSelected(true)
                          )}
                          disabled={yourAnswer != ""}
                        />
                        {el}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {currentQuestionNumber + 1 == allQuestionsNumber && selected && (
            <button className="try-again" onClick={() => tyrAgain()}>
              Try Again
            </button>
          )}
          {currentQuestionNumber + 1 != allQuestionsNumber && selected && (
            <button className="next" onClick={() => nextQuestion()}>
              Next Question
            </button>
          )}
        </div>
      ) : (
        <div className="main">
          <h2 className="how-smart">How smart are you? :)</h2>
          <button className="start" onClick={startTrial}>
            Start
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
