export default {
    key: 'login',
    initial: 'notSubmitted',
    states: {
        notSubmitted: {
            initial: 'invalid',
            on: {submit: 'loading'},
            states: {
                invalid: {
                    on: {
                        toggleValid: 'valid'
                    }
                },
                valid: {
                    on: {
                        toggleInvalid: 'invalid'
                    }
                }
            }
        },
        loading: {
            on: {
                loginSuccess: 'submitted',
                logingFailure: 'notSubmitted'
            }
        },
        submitted: {
            on: {
                logout: 'notSubmitted'
            }
        }
    } 
}
