import React from "react";
import * as Cookies from "js-cookie";

export default class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentAnswer: null,
      feedback: null,
      currentQuestion: null
    };
  }

  componentDidMount() {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
    fetch("/api/post", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(questions =>
        this.setState({
          questions,
          currentQuestion: questions[0].question,
          currentAnswer: questions[0].answer
        })
      );
    }

  }

  submitUserAnswer(e) {
    e.preventDefault();
    let userInput = this.userInput.value.toLowerCase();
    let correctAnswer = this.state.currentAnswer.toLowerCase();
    this.userInput.value = "";
    if (userInput === correctAnswer) {
      this.setState({
        feedback: "correct"
      });
    } else {
      this.setState({
        feedback: "incorrect"
      });
    }
  }

  goToNext(e) {
    e.preventDefault();
    console.log('Clicked to next question.')
  }
  
  render() {
    let feedback, question, inputForm, infoModal;

    const accessToken = Cookies.get("accessToken");
    if (this.state.currentQuestion) {
      console.log("Answer: ", this.state.currentQuestion);
      question = <div className="question">{this.state.currentQuestion}</div>;
    }
    if (this.state.feedback === "correct") {
      feedback = (
        <div className="right-answer">
          <p>Correct Answer. Great Job!</p>
          <button onClick={e => this.goToNext(e)}>Go to next question.</button>
        </div>
      );
    }
    if (this.state.feedback === "incorrect") {
      feedback = (
        <div className="wrong-answer">
          <p>Incorrect. Keep studying.</p>
          <button onClick={e => this.goToNext(e)}>Go to next question.</button>
        </div>
      );
    }
    // Looks at both if user is logged in, and if state's current question has been defined 
    // in order to render form and current question to the UI at the same time.
    if (accessToken && this.state.currentQuestion) {
      inputForm = (
        <form onSubmit={e => this.submitUserAnswer(e)}>
          <input
            aria-label="your answer"
            id="userInput"
            type="text"
            placeholder="My Answer"
            ref={input => (this.userInput = input)}
          />
          <button type="submit">Submit</button>
        </form>
      );
    }
    if (!accessToken) {
      infoModal = (
        <div className='landing'>
          <p> Welcome to DSA Study using Spaced Repetition. Please login to begin studying.</p>
        </div>
      )
    }
    return (
      <div className="question-container">
        <div className="user-input-container">
          {infoModal}
          {question}
          {inputForm}
          {feedback}
        </div>
      </div>
    );
  }
}
