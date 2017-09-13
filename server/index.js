const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const keys = require('./config/keys');
const mongoose = require('mongoose');
const { Users } = require('./models/users');
const { Questions } = require('./models/questions');

mongoose.connect(keys.MONGO_URI);
let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  MONGO_URI: process.env.MONGO_URI
};
if (process.env.NODE_ENV !== 'production') {
  secret = require('./config/keys');
}
const app = express();

// Look at what this does:
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );
app.use(bodyParser.json());
// Allows CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(passport.initialize());
passport.use(
  new GitHubStrategy(
    {
      clientID: secret.CLIENT_ID,
      clientSecret: secret.CLIENT_SECRET,
      callbackURL: '/api/auth/github/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      // Job 1: Set up Mongo/Mongoose, create a User model which store the
      // github id, and the access token
      // Job 2: Update this callback to either update or create the user
      // so it contains the correct access token
      // const user = database[accessToken] = {
      // gitHubId: profile.id,
      // accessToken: accessToken
      // };
      // Look to see if user is already in database - could use accessToken
      // User.findOne({accessToken: accessToken})
      // .then( user => {
      // // if the user is there, then return user
      // if (user) {
      // return cb(null, user);
      // } else {
      // // if the user is not there, then we will create a new user
      // User.create({
      // gitHubId: accessToken
      // })
      // }
      // })
      // .then(user => {
      // return cb(null, user);
      // })
      const user = {
        gitHubId: profile.id,
        accessToken: accessToken,
        token: accessToken
      };
      return cb(null, user);
    }
  )
);
passport.use(
  new BearerStrategy((token, done) => {
    // Job 3: Update this callback to try to find a user with a
    // matching access token. If they exist, let em in, if not,
    // don't.
    Users.findOne({ token: token }).then(user => {
      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    });
  })
);

// app.get('/api/post', (req, res) => {
//   Questions.find()
//     .exec()
//     .then(questions => {
//       res.json({
//         questions: questions.map(question => question)
//       });
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });

// Added body-parser to be able to parse req.body
// req.body is now found, however it req.body.question === undefined
// app.post('/api/post', (req, res) => {
//   // console.log('hope: ', req.body);
//   // This function should be able to parse req.body but ??
//   Questions.create({
//     question: 'What does LIFO stand for?',
//     answer: 'Last In First Out'
//   })
//     .then(()=> {
//       console.log('Lifes problems: ', req.body);
//       res.status(201).json(req.body);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });

// app.post('/api/post', (req, res) => {
//   // This function should be able to parse req.body but ??
//   Questions.create({
//     question: req.body.question,
//     answer: req.body.answer
//   })
//     .then(()=> {
//       console.log('Lifes problems: ', req.body);
//       res.status(201).json(req.body);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });
app.delete('/api/post/:id', (req, res) => {
  Questions.findByIdAndRemove(req.params.id)
    .exec()
    .then(question => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

// Authentication Flow
app.get(
  '/api/auth/github',
  passport.authenticate('github', { scope: ['profile'] })
);

app.get(
  '/api/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
    session: false
  }),
  (req, res) => {
    // console.log('Endpoint: ', Users);
    Users.findOneAndUpdate(
      { id: req.user.gitHubId },
      {
        $set: {
          id: req.user.gitHubId,
          token: req.user.accessToken
        }
      },
      { upsert: true, new: true }
    ).then(user => {
      res.cookie('accessToken', req.user.accessToken, { expires: 0 });
      res.redirect('/');
    });
  }
);

app.get('/api/auth/logout', (req, res) => {
  req.logout();
  res.clearCookie('accessToken');
  res.redirect('/');
});

app.get(
  '/api/me',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    Users.findOne({ token: req.user.token })
      .then(user => {
        res.status(200).send(user);
      })
      .catch(err => {
        console.err(err);
        res.status(204).send(err);
      });
  }
);

app.get(
  '/api/post',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    Questions.find()
      .exec()
      .then(questions => {
        // console.log('Questions coming from DB: ', questions);
        const questionArray = questions.map(question => ({
          question: question.question,
          answer: question.answer
        }));
        return questionArray;
      })
      .then(questions => res.json(questions))
      .catch(err => console.error(err)); 
  });



// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));
// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function

app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});

let server;
function runServer(port = 3001) {
  return new Promise((resolve, reject) => {
    mongoose.connect(secret.MONGO_URI, err => {
      if (err) {
        return reject(err);
      }
    });
    server = app
      .listen(port, () => {
        resolve();
      })
      .on('error', reject);
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
if (require.main === module) {
  runServer();
}
module.exports = {
  app,
  runServer,
  closeServer
};