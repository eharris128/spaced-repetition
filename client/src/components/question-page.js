import React from "react";
import * as Cookies from "js-cookie";
import Result from "./result-page";
import { connect } from "react-redux";
import {resetState} from '../actions/index';
const { LinkedList } = require("../LinkedList");
const initialState = {
  questionList: null,
  currentAnswer: null,
  feedback: null,
  currentQuestion: null,
  resultPage: null,
  demoLoginComplete: false
};
export class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.restartApp && !this.props.restartApp) {
      this.setState({
        questions: [],
        feedback: null,
        resultPage: null
      });

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
          for (let i = 0; i < questions.questions.length; i++) {
            questionList.insert(i, questions.questions[i].question, questions.questions[i].answer);
          }
            this.setState({
              questionList,
              currentQuestion: questionList.head.question,
              currentAnswer: questionList.head.answer
            });
          });
          this.props.dispatch(resetState());
        }
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
          for (let i = 0; i < questions.questions.length; i++) {
            questionList.insert(i, questions.questions[i].question, questions.questions[i].answer);
          }
          this.setState({
            questionList,
            currentQuestion: questionList.head.question,
            currentAnswer: questionList.head.answer
          });
        });
    }
  }

  fetchQuestions() {
    console.log('Only fetch once? UserId for auth: ', this.props.userId);
    if (!this.state.demoLoginComplete) {
      fetch("/api/post", {
        headers: {
          Authorization: `Bearer ${this.props.userId}`
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
          for (let i = 0; i < questions.questions.length; i++) {
            questionList.insert(i, questions.questions[i].question, questions.questions[i].answer);
          }
          this.setState({
            questionList,
            currentQuestion: questionList.head.question,
            currentAnswer: questionList.head.answer,
            demoLoginComplete: true
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
    console.log('Our state: ', this.props);
    let feedback, question, inputForm, infoModal;
    const accessToken = Cookies.get("accessToken");
    if (this.props.userId && !this.state.demoLoginComplete) {
      this.fetchQuestions();
    }
    if (this.state.currentQuestion && !this.state.feedback && accessToken) {
      question = <div className="question">{this.state.currentQuestion}</div>;
    }
    if (this.state.feedback === "correct") {
      feedback = (
        <div className="right-answer">
          <p>Correct Answer. Great Job!</p>
          <button className="btn button blue" autoFocus onClick={e => this.goToNext(e)}>Next question</button>
        </div>
      );
    }
    if (this.state.feedback === "incorrect") {
      feedback = (
        <div className="wrong-answer">
          <p>Incorrect. Keep studying.</p>
          <p>The correct answer is: '{this.state.currentAnswer}'</p>
          <button className="btn blue" autoFocus onClick={e => this.goToNext(e)}>Next question</button>
        </div>
      );
    }
    if (accessToken && this.state.currentQuestion && !this.state.feedback) {
      inputForm = (
        <form onSubmit={e => this.submitUserAnswer(e)}>
          <input autoFocus
          className="s2"
            aria-label="your answer"
            id="userInput"
            type="text"
            placeholder="Enter your answer"
            ref={input => (this.userInput = input)}
          />
          <button className="btn blue" type="submit">Submit</button>
        </form>
      );
    }
    if (!accessToken) {
      infoModal = (
        <div className="landing">
          <h3>
            Welcome to <span className="bold">Study Hard</span>! This application is using Spaced Repetition to help you better understand Data Structures and Algorithms. Please login to begin
            studying.
          </h3>
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
  userId: state.userId
});

export default connect(mapStateToProps)(QuestionPage);