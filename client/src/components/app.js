import React from 'react';
import * as Cookies from 'js-cookie';
import Header from './header';
import QuestionPage from './question-page';
import LoginPage from './login-page';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        // Job 4: Redux-ify all of the state and fetch calls to async actions.
        const accessToken = Cookies.get('accessToken');
        console.log('Access token: ', accessToken);
        if (accessToken) {
            fetch('/api/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                console.log('Response: ', res);
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

    // Modify render function ternary or make additional ternary and routing for results page
        // Bring in Router See ace-pomodoro container.js
    render() {
        if (!this.state.currentUser) {
            return (
            <div className='landing-page-container'>
                <Header />;
                <LoginPage />;
            </div>
            )
        }

        return (
        <div className='question-page-container'>
            <Header />;
            <QuestionPage />;
        </div>
        )

    }
}

export default App;
