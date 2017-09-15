import React from 'react';
import * as Cookies from 'js-cookie';
import Header from './header';
import QuestionPage from './question-page';
import LoginPage from './login-page';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentWillMount() {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            fetch('/api/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                if (!res.ok) {
                    if (res.status === 401) {
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
                <Header currentUser={this.state.currentUser}/>
                <Router>
                    <div>
                        <Route exact path="/api/auth/github" render={(props) => <LoginPage currentUser={this.state.currentUser} {...props}/>} />
                        <Route exact path="/" render={(props) => <QuestionPage currentUser={this.state.currentUser} {...props}/>} />
                    </div>
                </Router>
            </div>
          );
    }
}

export default App;