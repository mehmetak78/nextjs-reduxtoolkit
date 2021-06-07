import React, {Fragment, useEffect, useState} from 'react';
import {getServerSidePropsPrivate} from "../helpers/PrivatePageHelper";
import {showNotification} from "../store/notificationSlice";
import useHttp from "../hooks/use-http";
import {fetchAuth} from "../helpers/ProductsHelper";
import {useDispatch} from "react-redux";

import styles from '../styles/Products.module.scss';

const Products = (props) => {

  const {sendRequest, status, data, error} = useHttp(fetchAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    sendRequest()
  }, []);

  const [products, setProducts] = useState(null);


  useEffect(() => {
    if (status === 'completed') {
      if (!error) {
        setProducts(data);
        dispatch(showNotification('Success!', 'Successfull Get Products', 'success'));
      } else {
        console.log(error)
        dispatch(showNotification('Get Products Error', error, 'error'));
      }
    }
  }, [status, error]);

  return (
    <Fragment>
      <h1>Products</h1>
      <ul className={styles.products}>
        {products && products.map(product => {
          return (
            <li key={product.code}>
              {product.name} - {product.desc}
            </li>
          )
        })}
      </ul>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  return getServerSidePropsPrivate(context)
}

export default Products;
