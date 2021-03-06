import { useEffect } from 'react';


import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../helpers/QuotesHelper';
import {useRouter} from "next/router";

;

const Newquote = () => {
  const { sendRequest, status } = useHttp(addQuote);

  const router = useRouter();

  useEffect(() => {
    if (status === 'completed') {
      router.push('/quotes');
    }
  }, [status, router]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />;
};

export default Newquote;
