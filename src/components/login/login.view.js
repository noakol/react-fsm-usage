import React, {Component} from 'react';
import {Actions} from '../sdk';
import {LoginContext} from './Login';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    static contextType = LoginContext;

    handleInputChange = (event) => {
        const {username, password} = this.state;

        if ((username.length || 
            (event.target.name === 'username' && event.target.value.length)) && 
            (password.length || 
            (event.target.name === 'password' && event.target.value.length))) {
            this.props.transition('toggleValid');
        }

        if (!event.target.value.length) {
            this.props.transition('toggleInvalid');
        }

        this.setState({
            ...this.state,
            [event.target.name]: event.target.value 
        });
    } 

    handleSubmit = async (state) => {
        // this.setState({
        //     ...this.state,
        //     showLoader: true
        // });
        if (state.notSubmitted === 'invalid') {
            this.setState({
                showValidation: true
            });
        } else {
            this.props.transition('submit');
            try {
                const payload = {...this.state};
                const res = await Actions.login(this.props.api, payload);
                this.props.transition('loginSuccess');
                // this.setState({
                //     username: '',
                //     password: '',
                //     showLoader: false
                // });
            } catch (err) {
                console.log(err);
                this.props.transition('logingFailure');
                this.setState({
                    ...this.state,
                    error: err
                })
                // this.setState({
                //     ...this.state,
                //     showLoader: false
                // });
            }
        }
    }

    render () {
        return(
            <LoginContext.Consumer>
                {({currentState}) => 
                    <div className="login-wrapper">
                        <div className="title">
                            My App
                        </div>
                        {this.state.error && 
                        <div className="error">
                            Something went wrong, {this.state.error}
                        </div>}
                        {
                            currentState.notSubmitted === 'invalid' && 
                            this.state.showValidation &&
                            <div>
                                please fill all fields
                            </div>
                        }
                        <div className="field">
                            <lable>User Name</lable>
                            <input 
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                />
                        </div>
                        <div className="field">                
                            <lable>Password</lable>
                            <input 
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                />
                        </div>
                        <button 
                            className="login-submit"
                            onClick={() => this.handleSubmit(currentState)}
                        >
                        submit
                        </button>
                    </div>
                }
            </LoginContext.Consumer>
        );
    }
}