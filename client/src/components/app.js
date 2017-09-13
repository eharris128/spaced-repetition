import React from 'react';
import * as Cookies from 'js-cookie';
import Header from './header';
import QuestionPage from './question-page';
import LoginPage from './login-page';
import Result from './result-page';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentWillMount() {
        // Job 4: Redux-ify all of the state and fetch calls to async actions.
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            fetch('/api/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                if (!res.ok) {
                    if (res.status === 401) {
                        // Unauthorized, clear the cookie and go to
                        // the login page
                        Cookies.remove('accessToken');
                        return;
                    }
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then(currentUser =>
                this.setState({
                    currentUser
                })
            );
        }
    }

    render() {
        return (
            <div className="container">
              <Router>
                <div>
                  <Route exact path="/" render={(props) => <Header currentUser={this.state.currentUser} {...props}/>} />
                  <Route exact path="/api/auth/github" component={LoginPage} />
                  <Route path="/" component={QuestionPage} />
                  {/* <Route path="/" component={Result} /> */}
                </div>
              </Router>
            </div>
          );
    }
}

export default App;
