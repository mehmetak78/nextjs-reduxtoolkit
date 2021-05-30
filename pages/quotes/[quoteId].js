import {Fragment, useEffect} from 'react';
//import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

import HighlightedQuote from '../../components/quotes/HighlightedQuote';
import useHttp from '../../hooks/use-http';
import {getSingleQuote} from '../../helpers/QuotesHelper';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import {useRouter} from "next/router";
import PrivateContent from "../../components/UI/PrivateContent";

const QuoteId = (props) => {

  const router = useRouter();

  const {quoteId} = router.query;


  const {sendRequest, status, data: loadedQuote, error} = useHttp(
    getSingleQuote,
    true
  );

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner/>
      </div>
    );
  }

  if (error) {
    return <p className='centered'>{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <PrivateContent>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
    </PrivateContent>
  );
};


export default QuoteId;
