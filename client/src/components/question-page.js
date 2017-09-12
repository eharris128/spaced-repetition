import React from "react";
import * as Cookies from "js-cookie";

export default class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

    // Follow this format of storing all questions from DB in local state to make it easier to validate user answer.

    // questions: [
    //   {
    //     question: "What does FIFO stand for?",
    //     answer: "First In First Out"
    //   },
    //   {
    //     question: "What does LIFO stand for?",
    //     answer: "Last In First Out"
    //   }
  componentDidMount() {
    const accessToken = Cookies.get("accessToken");
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
          questions
        })
      );
  }
  submitUserAnswer(e) {
    e.preventDefault();
    // look at state.questions[0] / question to inspect answer for question

  }
  render() {
    const questions = <li> {this.state.questions}</li>;
    // const questions = this.state.questions.map((question, index) =>
    //     <li key={index}>{question}</li>
    // );

    return (
      <div className="question-container">
        <ul className="question-list">{questions}</ul>
        <div className="user-input-container">
          <form onSubmit={e => this.submitUserAnswer(e)}>
            <input
              aria-label="your answer"
              id="userInput"
              type="text"
              placeholder="My Answer"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
