# Space Repetition Capstone

Live version at: https://tranquil-lake-52213.herokuapp.com/

## Getting started

First, fork the repo on Github to your own account

### Clone the repo

```sh
$ git clone https://github.com/YOUR_USERNAME_HERE/spaced-repetition-starter
```

```sh
$ cd spaced-repetition-starter
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

### Stretch Goals / 
- Google OAuth
- User generated material

### User Stories
_A user should be able to:_
- Log into the app using OAuth on the landing page
- Can understand how the app works by reading the info on the landing page
- Clicking "Start" on the landing page directs the users to the Main page where it displays the 1st question
- Users is presented with 2 cards,
   - 1st Card: a single question,
   - 2nd Card: a text field and submit button
- User submit answer, both cards flip
   - 1st Card: displays right answer
   - 2nd Card: display difficulty options (3 buttons: easy, med, hard)
- After submitting difficulty option, user moves on to the next question 
- Once User has completed the questions correctly,
   - 2nd card is removed
   - 1st Card displays user's score and completion message
   - Start Again button, which directs user to the 1st questions, resets score
- Can log out of the session, returns to landing page
- User can log back in and return to last question worked on

### Views
- Landing page / login
- Main Page

### Wireframe
[google drive](https://goo.gl/VxpmNT))

### What are we using?
* React
* Redux
* Node.js
* Travis CI
* Heroku
* mlab