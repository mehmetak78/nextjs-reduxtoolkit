import React, {Fragment, useEffect, useState} from 'react';
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

import {getServerSidePropsPrivate} from "../helpers/PrivatePageHelper";


const ProfilePage = (props) => {
  const oldPassword = useInput('text', 'password', 'Old Password', (value) => value.trim() !== '')
  const newPassword = useInput('text', 'password', 'New Password', (value) => value.trim() !== '')

  const router = useRouter();
  const dispatch = useDispatch();

  const {sendRequest, status, data, error} = useHttp(fetchAuth);

  useEffect(() => {
    if (status === 'completed') {
      if (!error) {
        router.push('/')
        dispatch(showNotification('Success!', 'Successfull Change Password', 'success'));
      } else {
        console.log(error)
        dispatch(showNotification('Change Password Error', error, 'error'));
      }
    }
  }, [status, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      authType: 'change-password',
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    }
    sendRequest(userData);
  }

  const cancelHandler = () => {
    router.push('/')
  }

  return (
    <Fragment>
      <Form onSubmit={submitHandler}>
        <Card>
          <h1>Profile Page</h1>
          {props.session && <p>{props.session.user.email}</p>}
          <div>
            <Input inputHook={oldPassword}/>
            <Input inputHook={newPassword}/>
          </div>
          <div className={styles["form-actions"]}>
            <Button styletype='btn2' type='button' onClick={cancelHandler}>Cancel</Button>
            <Button>Change Password</Button>
          </div>
          {status === 'pending' && <LoadingSpinner/>}
        </Card>
      </Form>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  return getServerSidePropsPrivate(context)
}

export default ProfilePage;
