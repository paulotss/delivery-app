import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Product() {
  const [products, setProducts] = useState([]);
  const [qtd, setQtd] = useState([]);
  const [name, setName] = useState('');

  const getDatafromLocalstorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    setName(user.name);
  };

  const addAndRemoveQtd = (op, i) => {
    if (op === '+') {
      const aux = qtd;
      console.log(aux);
      aux[i] += 1;
      setQtd(aux);
    }
    if (op === '-') {
      const aux = qtd;
      console.log(aux);
      aux[i] = aux[i] > 0 ? aux[i] - 1 : 0;
      setQtd(aux);
    }
  };

  const getProducts = async () => {
    const ok = 200;
    const notFound = 404;
    // console.log('awd');
    try {
      const result = await axios.get('http://localhost:3001/products/');
      // console.log(result.data[1].url_image);
      if (result.status === ok) {
        setProducts(result.data);
        setQtd(result.data.map(() => 0));
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === notFound) {
        setProducts(true);
      }
      // console.log(error.response.status);
    }
  };

  useEffect(() => {
    getProducts();
    getDatafromLocalstorage();
  }, []);
  return (
    <>
      <Navbar name={ name } />
      {/* <CardProducts products={ products } /> */}
      <p>Products</p>
      <p>Products</p>

      {products.length !== 0 && (
        products.map((product, i) => (
          <div key={ product.id }>
            <p
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              {product.price}
            </p>
            <img
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
              src={ product.url_image }
              alt={ product.name }
            />
            <div>
              <button
                data-testid={ `customer_products__button-card-rm-item-${product.id}` }
                type="button"
                onClick={ () => addAndRemoveQtd('-', i) }
              >
                -
              </button>
              <input
                data-testid={ `customer_products__input-card-quantity-${product.id}` }
                type="number"
                value={ qtd[i] }
              />
              <button
                data-testid={ `customer_products__button-card-add-item-${product.id}` }
                type="button"
                onClick={ () => addAndRemoveQtd('+', i) }

              >
                +
              </button>
            </div>
            <p
              data-testid={ `customer_products__element-card-title-${product.id}` }
            >
              {product.name}
            </p>
          </div>
        ))
      )}

    </>
  );
}

export default Product;
