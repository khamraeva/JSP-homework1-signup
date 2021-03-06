import React, { useState } from 'react';
import Input from '../Input/Input';
import './SignUp.css';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}/;
    return re.test(password);
}

function SignUp() {
    const [formControls, setFormControls] = useState({
        firstName: {
            value: '',
            label: 'First name',
            type: 'text',
            errorMessage: 'Please enter your name',
            valid: false,
            touched: false,
            validation: {
                required: true
            }
        },
        lastName: {
            value: '',
            label: 'Last name',
            type: 'text',
            errorMessage: 'Please enter your last name',
            valid: false,
            touched: false,
            validation: {
                required: true
            }
        },
        email: {
            value: '',
            type: 'email',
            label: 'Email',
            errorMessage: 'Please enter a valid email',
            valid: false,
            touched: false,
            validation: {
                required: true,
                email: true
            }
        },
        password: {
            value: '',
            type: 'Password',
            label: 'Password',
            errorMessage: 'Your password needs to be 8-64 characters long and contain one uppercase letter and a number',
            valid: false,
            touched: false,
            validation: {
                required: true,
                password: true
            }
        },
        confirmPassword: {
            label: 'Confirm password',
            type: 'password',
            errorMessage: 'Please make sure your passwords match',
            valid: false,
            touched: false,
            validation: {
                required: true,
                checkPasswords: true
            }
        }
    });


    const submitHandler = event => {
        event.preventDefault();
    }

    const onChangeHandler = (event, controlName) => {
        const formControl = { ...formControls };

        const control = { ...formControl[controlName] };

        control.value = event.target.value;
        control.touched = true;
        control.valid = validateControl(control.value, control.validation);

        formControl[controlName] = control;
        
        setFormControls({
            ...formControl
        });
    }

    const validateControl = (value, validation) => {
        if (!validation) {
            return true;
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid;
        }

        if (validation.password) {
            isValid = validatePassword(value) && isValid;
        }

        if (validation.checkPasswords) {
            const password = formControls.password.value;
            const confirmPassword = value;
            isValid = (password === confirmPassword) && isValid;
        }

        return isValid;
    }

    return (
        <div className={'signup-container'}>
            <h1>Sign Up</h1>
            <form
                onSubmit={submitHandler}
                className={'signup-form'}>
                {Object.keys(formControls).map((controlName, index) => {
                    const control = formControls[controlName];
                    return (
                        < Input
                            key={controlName + index}
                            type={control.type}
                            value={control.value}
                            valid={control.valid}
                            touched={control.touched}
                            label={control.label}
                            shouldValidate={!!control.validation}
                            errorMessage={control.errorMessage}
                            onChange={event => onChangeHandler(event, controlName)}
                        />
                    )
                })
                }
                <div className='btn-wrapper'>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )

}

export default SignUp