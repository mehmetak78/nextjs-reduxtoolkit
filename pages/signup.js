import React, { useContext, useEffect} from 'react';
import Card from "../components/UI/Card";
import styles from '../styles/Login.module.scss'
import Form from "../components/UI/Form";
import useInput from "../hooks/useInput";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import {useRouter} from "next/router";

import useHttp from "../hooks/use-http";
import {fetchAuth} from "../helpers/NextAuthHelper";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import {useDispatch} from "react-redux";
import {showNotification} from "../store/notificationSlice";
import {login} from "../store/authSlice";
import keys from "../config/keys";

const SignupPage = (props) => {
  const username = useInput('text', 'name', 'User Name', (value) => value.trim() !== '')
  const password = useInput('text', 'password', 'Password', (value) => value.trim() !== '')

  const router = useRouter();
  const dispatch = useDispatch();


  const {sendRequest, status, data, error} = useHttp(fetchAuth);


  useEffect(() => {
    if (status === 'completed') {
      if (!error) {
        const expirationTime = new Date(
          new Date().getTime() +  keys.sessionTimeOut
        );
        dispatch(login(username.value, null, expirationTime.toISOString()));
        router.push('/')
        dispatch(showNotification('Success!','Successfull Signup','success'));
      } else {
        console.log(error)
        dispatch(showNotification('Signup Error',error,'error'));
      }
    }
  }, [status, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      authType: 'signup',
      username: username.value,
      password: password.value
    }
    sendRequest(userData);
  }

  const cancelHandler = () => {
    router.push('/')
  }

  return (
    <Form onSubmit={submitHandler}>
      <Card>
        <h1>Signup Page</h1>
        <div>
          <Input inputHook={username}/>
          <Input inputHook={password}/>
        </div>
        <div className={styles["form-actions"]}>
          <Button styletype='btn2' type='button' onClick={cancelHandler}>Cancel</Button>
          <Button>Sign Up</Button>
        </div>
        {status === 'pending' && <LoadingSpinner/>}
      </Card>
    </Form>
  );
}

export default SignupPage;
