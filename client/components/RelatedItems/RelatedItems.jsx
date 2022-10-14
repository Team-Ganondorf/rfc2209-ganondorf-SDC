import React, {useState, useEffect} from 'react';
import ProductList from './ProductList.jsx';
import axios from 'axios';
import { URL } from '../../../config/config.js';

const RelatedItems = ({productID}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/products/${productID}/related`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>
        RelatedItems
      </h1>
      <ProductList products={products}/>
    </div>
  );
};

export default RelatedItems;