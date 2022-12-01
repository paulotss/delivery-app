import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ name }) {
  const history = useHistory();
  const makeLogout = () => {
    localStorage.clear();
    history.push('/login');
  };
  return (
    <nav>
      <button
        type="button"
        href="/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </button>
      <button
        type="button"
        href="/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </button>
      <button
        type="button"
        href="/userFullName"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {name}
      </button>
      <button
        type="button"
        onClick={ makeLogout }
        href="/logout"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </nav>
  );
}

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Navbar;
