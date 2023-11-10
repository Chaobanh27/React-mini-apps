import React, { useState } from "react";
import RenderError from "./RenderError";

export const QuizApp = () => {
  const style = {
    container: {
      padding: "20px",
      border: "1px solid #E0E0E0",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    question: {
      fontWeight: "bold",
      marginBottom: "10px",
    },
    options: {
      marginBottom: "5px",
    },
    label: {
      minWidth: "100px",
      textAlign: "start",
      paddingLeft: "10px",
    },
    button: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "#007BFF",
      color: "#FFF",
      fontSize: "14px",
      borderRadius: "5px",
      cursor: "pointer",
    },
    feedback: {
      marginTop: "10px",
      fontSize: "14px",
    },
    restartBtn: {
      backgroundColor: "blue",
      padding: "10px 20px",
    },
  };

  const questions = [
    {
      question: "What is the capital of Vietnam?",
      options: ["Hanoi", "Danang", "HaiPhong", "HoChiMinh"],
      correct: "Hanoi",
    },
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correct: "Paris",
    },
    {
      question: "What is the capital of Germany?",
      options: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
      correct: "Berlin",
    },
    {
      question: "What is the capital of USA?",
      options: ["NewYork", "Las Vegas", "San Francisco", "Washington"],
      correct: "Washington",
    },
    {
      question: "What is the capital of China?",
      options: ["Chongqing", "Shanghai", "Beijing", "Shenzhen"],
      correct: "Beijing",
    },
    {
      question: "What is the capital of South Korea?",
      options: ["Gyeongju", "Incheon", "Busan", "Seoul"],
      correct: "Seoul",
    },
  ];

  const [questionsIndex, setQuestionsIndex] = useState(0);
  const [checked, setChecked] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [error, setError] = useState({});

  const question = questions[questionsIndex];

  function handleAnswerSelected(answer) {
    const userAnswersCopy = [...userAnswers];
    userAnswersCopy[questionsIndex] = answer;
    setUserAnswers(userAnswersCopy);
  }


  function handleChecked(e) {
    let checkedVal = e.target.value;
    setChecked(checkedVal);
    handleAnswerSelected(checkedVal);
  }

  function handleRestartQuiz() {
    setQuestionsIndex(0);
    setUserAnswers([]);
  }

  let score = 0;
  userAnswers.map((value, key) => {
    if (value === questions[key].correct) {
      score++;
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true

    if (checked === "") {
      errorSubmit.status = "Please choose an answer";
      flag = false
    } else {
      if (checked === question.correct) {
        errorSubmit.status = "";
        errorSubmit.checked = "";
        flag = true
      } else {
        errorSubmit.checked = "Incorrect ! pls choose again";
        flag = false
      }
    }

    if(flag){
        setQuestionsIndex(questionsIndex + 1);
        setChecked("");
        setError({})
    }
    else{
        setError(errorSubmit)
    }
  }

  function renderData() {
    if (questions.length > 0) {
      if (questionsIndex < questions.length) {
        let choices = question.options;
        let count = 1;
        return (
          <form style={style.container} onSubmit={handleSubmit}>
            <div id="question" style={style.question}>
              {question.question}
            </div>
            <div style={style.options}>
              {choices.map((value, key) => {
                return (
                  <div key={key}>
                    <input
                      type="radio"
                      name="options"
                      id={"options" + count++}
                      value={value}
                      checked={checked === value}
                      onChange={handleChecked}
                    />
                    <label style={style.label} htmlFor={value}>
                      {value}
                    </label>
                  </div>
                );
              })}
            </div>
            <button style={style.button} id="submitBtn">
              Submit
            </button>
            <div id="feedback" style={style.feedback}>
                <RenderError errors={error}/>
            </div>
          </form>
        );
      } else {
        return (
          <div>
            <h2>
              Quiz Complete! You scored {score} out of {questions.length}!
            </h2>
            <button style={style.restartBtn} onClick={handleRestartQuiz}>
              Restart Quiz
            </button>
          </div>
        );
      }
    }
  }
  return <>
  <h1>Quiz app</h1>
  {renderData()}
  </>;
};
