'use strict';

const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const questionSchema = new Schema({ question: { type: String, required: true}, answer: { type: String, required: true } });
const Questions = mongoose.model('Questions', questionSchema);

questionSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    question: this.question,
    answer: this.answer
  };
};

module.exports = {Questions};

// {
//     "question1": "What does FIFO stand for?",
//     "question1Answer": "First In First Out",
//     "question2": "Is a queue LIFO or FIFO?",
//     "question2Answer": "FIFO"
// }

// {
// 	"question": "What does FIFO stand for?",
// 	"answer": "First In First Out"
// }

// {
// 	"question": "What does LIFO stand for?",
// 	"answer": "Last In First Out"
// }