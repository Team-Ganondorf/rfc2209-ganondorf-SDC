import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { URL } from '../../../config/config.js';
import ComparisonModal from './ComparisonModal.jsx';
import Stars from '../Stars.jsx';


const ProductCard = ({product, productA, index, width, handleRelatedItemClick}) => {
  const [card, setCard] = useState({});
  const [image, setImage] = useState(productA);
  const [salePrice, setSalePrice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/products/${product}`)
      .then((response) => {
        setCard(response.data);
      })
      .then(() => {
        axios.get(`${URL}/products/${product}/styles`)
          .then((response) => {
            setImage(response.data.results[0].photos[0].url);
            setSalePrice(response.data.results[0].sale_price);
          });
      })
      .catch(err => console.log(err));
  }, [product]);

  const combineFeatures = (product1, product2) => {
    let repeatedFeatures = {};
    let combinedFeatures = [];
    for (let i = 0; i < product1.length; i++) {
      repeatedFeatures[product1[i].feature] = product1[i].value;
      combinedFeatures.push(product1[i]);
    }
    for (let i = 0; i < product2.length; i++) {
      if (product2[i].value === repeatedFeatures[product2[i].feature]) {
        continue;
      }
      combinedFeatures.push(product2[i]);
    }
    return combinedFeatures;
  };

  useEffect(() => {
    console.log('This is the product', product);
  });

  return (

    <>
      <div className="product-card" style={{width: width, transform: `translateX(-${index * 100}%)`, backgroundImage: `url(${image})`}} onClick={() => {
        handleRelatedItemClick(card.id);
      }}>
        <div className="upper-half" /*style={{backgroundImage: `url(${image})`}}*/>
          <span id="favorite-related" onClick={(event) => {
            event.stopPropagation();
            setShowModal(true);
            const allFeatures = combineFeatures(productA.features, card.features);
            setFeatures(allFeatures);
          }}><strong>✩</strong></span>
        </div>
        <div className="bottom-half">
          <div className="category">{card.category}</div>
          <div><strong>{card.name}</strong></div>
          {salePrice ? <div className="sale-price">{salePrice} <s>{card.default_price}</s></div> : <div className="default-price">{card.default_price}</div>}
          <div style={{width: 'fit-content'}}>
            <Stars productID={product}/>
          </div>
        </div>
      </div>
      <ComparisonModal show={showModal} productA={productA} productB={card} features={features} onClose={() => {
        setShowModal(false);
      }}/>
    </>
  );
};

export default ProductCard;