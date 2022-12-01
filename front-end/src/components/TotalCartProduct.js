import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function TotalCart({ productsCart }) {
  const history = useHistory();
  return (
    <button
      type="button"
      disabled={ productsCart.length === 0 }
      onClick={ () => history.push('/customer/checkout') }
    >
      <span data-testid="customer_products__button-cart">Ver Carrinho </span>
      <span>R$ </span>
      <span data-testid="customer_products__checkout-bottom-value">
        {productsCart
          .reduce((ant, att) => ant + (att.count * att.price), 0)
          .toFixed(2).toString().replace('.', ',')}
      </span>
    </button>
  );
}

TotalCart.propTypes = {
  productsCart: PropTypes.node.isRequired,
};

export default TotalCart;
