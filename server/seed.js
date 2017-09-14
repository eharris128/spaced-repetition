'use strict';

const mongoose = require('mongoose');
const { Questions } = require('./models/questions');


// question:
// answer:

const data = [{
  question: 'What is the condition that will end the recusive case in a program?',
  answer: 'Base Case'
}];

mongoose.connect(process.env.MONGO_URI);
Questions.create(data).then(() => console.log('Wahoo'));

// What is the condition that will end the recusive case in a program?
// base case

// Every problem that can be solved recursively can also be solved: 
// iteratively

// what is the name of the notation that measures algorithm speed in terms of growth of the number of operations? 
// big o

// The run time complexity to access any element of an array if the position of the element is known is?
// O(1)

// An array with the last element 'n' will always have an array size equal to
// n

// Stack is a data structure based on the concept:
// Last In First Out

// Queue is a data structure based on the concept:
// First In First Out

// In absence of a linked list, it is possible to implement a queue using:
// Two stacks

// What is a common problem of hashmaps?
// Collision

// The search operation is best performed using Binary search trees with a runtime of
// O(log n)

