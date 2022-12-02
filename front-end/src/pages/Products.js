import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TotalCart from '../components/TotalCartProduct';

function Product() {
  const [products, setProducts] = useState([]);
  const [productsCart, setProductsCart] = useState([]);
  const [name, setName] = useState('');

  const getDatafromLocalstorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // const cart = JSON.parse(localStorage.getItem('carrinho'));
    // console.log(cart);
    // setProducts(cart);

    setName(user.name);
  };

  const addAndRemoveQtd = (e, op, id) => {
    if (op === '+') {
      const newList = products.map((item) => {
        if (item.id === id) {
          item.count += 1;
        }
        return item;
      });
      setProducts(newList);
      setProductsCart(newList.filter((el) => el.count));
    }
    if (op === '-') {
      const newList = products.map((item) => {
        if (item.id === id && item.count > 0) {
          item.count -= 1;
        }
        return item;
      });
      setProducts(newList);
      setProductsCart(newList.filter((el) => el.count));
    }
    if (op === 'geral') {
      const newList = products.map((item) => {
        if (item.id === id) {
          item.count = +e.target.value;
        }
        return item;
      });
      setProducts(newList);
      setProductsCart(newList.filter((el) => el.count));
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
        const teste = result.data.map((item) => ({ ...item, count: 0 }));
        setProducts(teste);
        // setQtd(result.data.map(() => 0));
      }
    } catch (error) {
      if (error.response.status === notFound) {
        setProducts(true);
      }
      // console.log(error.response.status);
    }
    getDatafromLocalstorage();
  };

  const setLocalStorage = () => {
    localStorage.setItem('carrinho', JSON.stringify(productsCart));
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('carrinho'));
    if (products.length === 0) {
      return null;
    }
    console.log(cart);

    setLocalStorage();
  }, [productsCart]);
  return (
    <div>
      <Navbar name={ name } />
      {/* <CardProducts products={ products } /> */}

      <TotalCart productsCart={ productsCart } />

      {products.length !== 0 && (
        products.map((product) => (
          <div key={ product.id }>
            <p
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              {`R$ ${product.price.replaceAll('.', ',')}`}
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
                onClick={ (e) => addAndRemoveQtd(e, '-', product.id) }
              >
                -
              </button>
              <input
                data-testid={ `customer_products__input-card-quantity-${product.id}` }
                type="text"
                value={ product.count }
                onChange={ (e) => addAndRemoveQtd(e, 'geral', product.id) }
              />
              <button
                data-testid={ `customer_products__button-card-add-item-${product.id}` }
                type="button"
                onClick={ (e) => addAndRemoveQtd(e, '+', product.id) }

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

    </div>
  );
}

export default Product;
