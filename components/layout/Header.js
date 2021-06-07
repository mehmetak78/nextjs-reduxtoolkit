import classes from './Header.module.scss';
import Link from 'next/link'
import HeaderMessagesButton from "../messages/HeaderMessagesButton";
import LogoMak from "./LogoMAK";

import { useSession, signOut } from 'next-auth/client';

function Header(props) {

  const [session, loading] = useSession();

  const logoutHandler = () => {
    signOut();
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <LogoMak/>
        <p>Next With Context</p>
      </div>

      <nav>
        {
          !session && !loading &&
          <ul>
            <li>
              <Link href='/login'>Login</Link>
            </li>
            <li>
              <Link href='/signup'>SignUp</Link>
            </li>
          </ul>
        }
        {
          session &&
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/products'>Products</Link>
            </li>
            <li>
              <Link href='/quotes'>Quotes</Link>
            </li>
            <li>
              <Link href='/newquote'>AddQuote</Link>
            </li>
            <li>
              <Link href='/meetups'>Meetups</Link>
            </li>
            <li>
              <Link href='/new-meetup'>AddMeetup</Link>
            </li>
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
            <li>
              <button className={classes.button} onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        }
      </nav>

      <HeaderMessagesButton onClick={props.onShowCart}/>
    </header>
  );
}

export default Header;
