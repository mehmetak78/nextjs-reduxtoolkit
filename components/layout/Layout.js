import React, {Fragment, useEffect, useState} from 'react';
import classes from "./Layout.module.scss";
import Footer from "./Footer";

import Notification from "./Notification";
import Messages from "../messages/Messages";
import Header from "./Header";

import {useDispatch, useSelector} from "react-redux";
import {useSession} from "next-auth/client";
import keys from "../../config/keys";
import {login} from "../../store/authSlice";
import {showNotification} from "../../store/notificationSlice";


const Layout = (props) => {
  const notification = useSelector( state => state.notification);

  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  const [session] = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      const expirationTime = new Date(
        new Date().getTime() +  keys.sessionTimeOut
      );
      dispatch(showNotification('Success!', 'Already Logged In', 'success'));

      dispatch(login(session.user.email, null, expirationTime.toISOString()));
    }
  }, [session]);

  const hideMessagesHandler = () => {
    setIsMessagesOpen(false);
  }

  const showMessagesHandler = () => {
    setIsMessagesOpen(true);
  }

  return (
    <Fragment>
      <Header onShowCart={showMessagesHandler}/>
      {isMessagesOpen && <Messages onClose={hideMessagesHandler}/>}
      <main className={classes.container}>{props.children}</main>
      {notification.content.title && (
        <Notification
          title={notification.content.title}
          message={notification.content.message}
          status={notification.content.status}
        />
      )}
      <Footer />
    </Fragment>
  );
};

export default Layout;
