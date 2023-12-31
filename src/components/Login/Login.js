import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";
import Input from "../UI/Card/Input/Input";

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

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
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
    if(formIsValid){
    authCtx.onLogin(emailStates.value, passwordStates.value);
    }else if(!emailIsValid){
      emailInputRef.current.focus();
    }else if(!passwordIsValid){
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
            ref = {emailInputRef}
            name='email'
            type='email'
            label='E-Mail'
            value={emailStates.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            isValid={emailIsValid}
        />
        <Input
            ref = {passwordInputRef}
            name='password'
            type='password'
            label='Password'
            value={passwordStates.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            isValid={passwordIsValid}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
