import React, {useState} from 'react';
import Card from "../components/UI/Card";
import styles from '../styles/Login.module.scss'
import Form from "../components/UI/Form";
import useInput from "../hooks/useInput";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import {useRouter} from "next/router";

import { signIn } from 'next-auth/client';

import LoadingSpinner from "../components/UI/LoadingSpinner";
import {showNotification} from "../store/notificationSlice";
import {useDispatch} from "react-redux";
import {login} from "../store/authSlice";
import keys from "../config/keys";


const LoginPage = (props) => {
  const username = useInput('text', 'name', 'User Name', (value) => value.trim() !== '')
  const password = useInput('text', 'password', 'Password', (value) => value.trim() !== '')

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email: username.value,
      password: password.value,
    });
    setIsLoading(false);

    if (!result.error) {
      // set some auth state
      const expirationTime = new Date(
        new Date().getTime() +  keys.sessionTimeOut
      );
      dispatch(login(username.value, null, expirationTime.toISOString()));
      dispatch(showNotification('Success!', 'Successfull Login', 'success'));
      router.replace('/');
    }
    else {
      dispatch(showNotification('Error', result.error, 'error'));
    }
  }

  const cancelHandler = () => {
    router.push('/')
  }

  return (
    <Form onSubmit={submitHandler}>
      <Card>
        <h1>Login Page</h1>
        <div>
          <Input inputHook={username}/>
          <Input inputHook={password}/>
        </div>
        <div className={styles["form-actions"]}>
          <Button styletype='btn2' type='button' onClick={cancelHandler}>Cancel</Button>
          <Button>Login</Button>
        </div>
        {isLoading && <LoadingSpinner/>}
      </Card>
    </Form>
  );
}

export default LoginPage;
