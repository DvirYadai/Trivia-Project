import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "../App.css";
import TriviaBoard from "../Components/TriviaBoard";

export default function Main() {
  const [start, setStart] = useState(false);
  const [firstQuestion, setFirstQuestion] = useState({});
  const [clickedHighScore, setClickedHighScore] = useState(false);
  const [highScore, setHighScore] = useState([]);
  const history = useHistory();

  const getSavedQuestion = async () => {
    try {
      const res = await axios.get("/trivia/saved_question");
      setFirstQuestion(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const startButton = async () => {
    await getSavedQuestion();
    setStart(true);
  };

  const highScoreButton = async () => {
    try {
      const res = await axios.get("/high_score");
      setClickedHighScore(true);
      const sorted = res.data.sort((a, b) => b.score - a.score);
      setHighScore(sorted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-div">
      <h1>Welcome {history.location.search.slice(10)}</h1>
      <h2>Hope you'll enjoy 😃</h2>
      {start ? (
        <TriviaBoard firstQuestion={firstQuestion} />
      ) : (
        <div className="start-page">
          <div className="instruction">
            <h3>Instruction</h3>
            <ul>
              <li>
                Once you clicked the start button the game will start and you
                will have 20 seconds to answer each question.
              </li>
              <li>
                If you answer correct, in the next question you will have 0.5
                second less than the previous question.
              </li>
              <li>You have only one chance to answer correctly</li>
              <li>
                You have only 3 life, once you answer wrong on 3 questions the
                game will be over.
              </li>
            </ul>
          </div>
          <button onClick={highScoreButton}>High scores table</button>
          <button onClick={startButton}>Start</button>
          <div className="high-score-div">
            {clickedHighScore && (
              <table className="high-score-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>User</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {highScore.map((obj, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{obj.name}</td>
                      <td>{obj.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
