import React from "react";
import * as Cookies from "js-cookie";
import Result from "./result-page";
import { connect } from "react-redux";
const { LinkedList } = require("../LinkedList");
const initialState = {
  questions: [],
  questionList: null,
  currentAnswer: null,
  feedback: null,
  currentQuestion: null,
  resultPage: null
};
export class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

    componentWillReceiveProps(nextProps) {
    if(nextProps.restartApp && !this.props.restartApp) {
      this.setState({
        questions: [],
        questionList: null,
        currentAnswer: null,
        feedback: null,
        currentQuestion: null,
        resultPage: null
      });
    }
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
        .then(questions => {
          let questionList = new LinkedList();
          for (let i = 0; i < questions.length; i++) {
            questionList.insert(i, questions[i].question, questions[i].answer);
          }
          this.setState({
            questionList,
            currentQuestion: questionList.head.question,
            currentAnswer: questionList.head.answer
          });
        });
    }
  }

  goToNext(e) {
    e.preventDefault();
    let currentQuestionList = this.state.questionList;

    if (this.state.feedback === "correct") {
      currentQuestionList.remove(0);
    } else if (this.state.feedback === "incorrect") {
      currentQuestionList.insert(
        currentQuestionList.length - 2,
        currentQuestionList.head.question,
        currentQuestionList.head.answer
      );
      currentQuestionList.remove(0);
    }

    this.setState({
      feedback: null,
      currentQuestion: currentQuestionList.head.question,
      currentAnswer: currentQuestionList.head.answer
    });
  }

  submitUserAnswer(e) {
    e.preventDefault();
    if (this.state.questionList.head.next === null) {
      console.log('Now we exit');
      // Handle linking to endScreen based off of state. 
      this.setState({
        resultPage: true
      });
    }

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

  render() {
    let feedback, question, inputForm, infoModal;

    const accessToken = Cookies.get("accessToken");

    if (this.state.currentQuestion && !this.state.feedback) {
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
          <p>The correct answer is: '{this.state.currentAnswer}'</p>
          <button onClick={e => this.goToNext(e)}>Go to next question.</button>
        </div>
      );
    }
    if (accessToken && this.state.currentQuestion && !this.state.feedback) {
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
        <div className="landing">
          <p>
            Welcome to DSA Study using Spaced Repetition. Please login to begin
            studying.
          </p>
        </div>
      );
    }

    if (!this.state.resultPage) {
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
    } else if (this.state.resultPage === true) {
      return (
        <div className="question-container">
          <div className="user-input-container">{<Result />}</div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  restartApp: state.restartApplication,
  currentUser: state.currentUser
});
export default connect(mapStateToProps)(QuestionPage);
