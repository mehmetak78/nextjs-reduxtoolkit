import '../styles/globals.css'
import Layout from "../components/layout/Layout";

import {Provider as ReduxProvider} from 'react-redux';
import {Provider as NextAuthProvider} from 'next-auth/client';

import {store} from '../store';

function MyApp({Component, pageProps}) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ReduxProvider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ReduxProvider>
    </NextAuthProvider>
  )
}

export default MyApp
