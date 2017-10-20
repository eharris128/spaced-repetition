# Space Repetition Capstone

Live version at: https://tranquil-lake-52213.herokuapp.com/

## Getting started

First, fork the repo on Github to your own account

### Clone the repo

```sh
$ git clone https://github.com/eharris128/spaced-repetition
```

```sh
$ npm install
```

You can run it locally now with `npm run dev`, but the Github OAuth stuff won't work without your own credentials.

## Description
- Simple learning app using a spaced repetition technique for helping users to prep for their Data Structures and Algorithms interview.

### MVP Features
1. Spaced repetition algorithm
2. GitHub OAuth

### User Stories
_A user should be able to:_
- Log into the app using OAuth on the landing page
- Can understand how the app works by reading the info on the landing page
- Clicking "Login With GitHub" on the landing page directs the users to the Main page where it displays the 1st question
- User is presented with a question
- User submits an answer
   - Answer validation message is displayed as well as the correct answer
- Can log out of the session, returns to landing page

### Views
- Landing page / login
- Main Page

### What are we using?
* React
* Redux
* Node.js
* Travis CI
* Heroku
* mlab

### Documentation of API
* GET /api/post
  - Retrieves questions
* POST /api/post
  - Adds question to the database
* DELETE /api/post/:id
  - Delete question by id 