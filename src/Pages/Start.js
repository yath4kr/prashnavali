import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Start = () => {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [arr, setArr] = useState([]);
  const [options, setOptions] = useState([]);
  const [select, setSelect] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    setArr([]);
    setOptions([]);
    setLoading(false);
    apiCall();
  }, []);

  const dataManager = async () => {
    const userID = window.localStorage.getItem("userID");
    const res = await axios.post(
      "https://prashnavali.onrender.com/auth/update",
      {
        score,
        userID,
      }
    );
    console.log(res);
  };

  const selectHandler = (e, val) => {
    setSelect(val);
  };

  const apiCall = async () => {
    try {
      const res = await axios.get(
        "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
      );
      setArr(res.data.results);
      setOptions([
        ...res.data.results[index].incorrect_answers,
        res.data.results[index].correct_answer,
      ]);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const nextHandle = () => {
    console.log(select);
    if (select == arr[index].correct_answer) {
      setScore(score + 1);
    }
    if (index == 9) {
      setIndex(index + 1);
      dataManager();
      return;
    }
    setOptions(
      [
        ...arr[index + 1].incorrect_answers,
        arr[index + 1].correct_answer,
      ].sort()
    );
    setIndex(index + 1);
    setSelect("");
  };

  if (!loading) {
    return (
      <div>
        <h1 className="loading">Loading...</h1>
      </div>
    );
  } else {
    if (index < arr.length) {
      return (
        <div className="questBody">
          <h1>
            {index + 1}. {arr[index].question}
          </h1>
          {options.map((opt, ind) => {
            return (
              <>
                <h3 className="options" onClick={(e) => selectHandler(e, opt)}>
                  <span className="options">
                    {ind + 1}. {opt}
                  </span>
                </h3>
              </>
            );
          })}
          <br />
          <h4>selected option - {select}</h4>
          <h4>Current Score - {score} </h4>
          <br />
          <button
            className="nextButton"
            onClick={() => {
              nextHandle();
            }}
          >
            Next
          </button>
        </div>
      );
    } else {
      return (
        <div className="result">
          <h1>Your Score is :- </h1>
          <h1>{score}</h1>
          <h1>Keep it up :)</h1>
        </div>
      );
    }
  }
};
