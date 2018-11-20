import React, {Component} from 'react';
import {BaseApi} from '../sdk';
import FSMWrapper, {Context} from '../fsm';
import LoginComponent from './login.view';
import Dashboard from './dashboard.view';
import Loader from './loader';
import config from './config';
import loginStateConfig from './login.state';

const api = new BaseApi({baseUrl: 'mocks/', ...config});

export const LoginContext = Context;

class Login extends Component {
    constructor(props) {
        super(props);
    }

    static contextType = LoginContext;

    render() {
        const {currentState} = this.context;
        return (
            <div className="login-container">
                {
                    (currentState.notSubmitted || currentState === 'loading') && 
                    <LoginComponent api={api} transition={this.context.transition} />
                }
                {
                   currentState === 'loading' && <Loader /> 
                }
                {
                    currentState === 'submitted' &&  <Dashboard />
                }
            </div>
        );
    }
}

export default FSMWrapper(loginStateConfig)(Login);