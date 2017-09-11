# Space Repetition Starter Kit

This should get you started with your Spaced Repetition app. We're giving you your basic directory structure, and the framework for authentication. However, we aren't persisting any information, and it will be your job to add Mongo/Mongoose. There are helpful comments in `server/index.js`.

In development, the starter kit runs two servers. One of which is from `create-react-app`, so you get all the fancy hot reloading, etc, the other is the backend. In production, we generate a static folder with all our React stuff, and serve that with Express.

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

### Get Github OAuth Credentials

### For development

Visit https://github.com/settings/developers

Click 'Register a new application'

- Add `http://localhost:8080` as Homepage URL
- Add `http://localhost:8080/api/auth/github/callback` as Authorization callback URL
- Click 'Register application'

You should get a Client ID and Secret.

Back in your project locally, create an `secret.js` file in the `/server` directory:

(Use the client ID and secret we just got from Github)

```js
module.exports = {
  CLIENT_ID: 'yourId123',
  CLIENT_SECRET: 'yoursecret'
}
```

This file is in ignored by git because it is in your `.gitignore`. Never commit or push 'secret.js', the client id and secret need to be kept safe like a password.

### Local Development

```sh
  npm run dev
```

## Deployment to Heroku

```sh
$ heroku create
```

Configure your Github client id and secret on Heroku:

```sh
$ heroku config:set CLIENT_ID=yourId123 CLIENT_SECRET=yoursecret
```

(You can also do this on dashboard.heroku.com under your app's settings.)

### To deploy:

```sh
$ git push heroku master
```

Your app should be live on Heroku soon, but if you try to `Log in with Github`, you will get an error. Take note of your new app's URL.

#### Create another set of Github OAuth credentials

To fix this, go back to the (Github API Dashboard)[https://github.com/settings/developers] and:

(You might need to use `http` (not `https`) for your Heroku URLs)

- Add `http://your-app-name-123.herokuapp.com` to Homepage URL
- Add `http://your-app-name-123.herokuapp.com/api/auth/github/callback` to Authorization callback URL

Try to log in  `Log in with Github` again, and you're golden!
