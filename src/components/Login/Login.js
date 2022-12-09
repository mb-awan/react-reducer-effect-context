import React, {useContext, useEffect, useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";

const emailReducer = (prevState, action) => {
  if(action.type === 'USER_INPUT'){
    return {value: action.value, isValid: action.value.includes('@')};
  }
  else if(action.type === 'INPUT_BLUR'){
    return {value: prevState.value, isValid: prevState.value.includes('@')};
  }
  return {value: '' ,valid: false};
}

const passwordReducer = (prevState, action) => {
  if(action.type === 'USER_INPUT'){
    return {value: action.value, isValid: action.value.trim().length >= 6};
  }
  else if(action.type === 'INPUT_BLUR'){
    return {value: prevState.value, isValid: prevState.value.trim().length >= 6};
  }
  return {value: '' ,valid: false};
}

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const [ emailStates, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: false});
  const [ passwordStates, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: false});
  const [formIsValid, setFormIsValid] = useState(false);

  const { isValid: emailIsValid} = emailStates;
  const { isValid: passwordIsValid} = passwordStates;
  useEffect(()=> {
    // const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(emailIsValid && passwordIsValid);
    // }, 500);

    return () => {
      console.log('CLEANUP');
      // clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', value: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', value: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailStates.value, passwordStates.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailStates.isValid ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailStates.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordStates.isValid ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordStates.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
