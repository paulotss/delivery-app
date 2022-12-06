import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [roleUser, setRoleUser] = useState('customer');
  const makeLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const getDatafromLS = () => {
    const { name: n } = JSON.parse(localStorage.getItem('user'));
    setName(n);
  };

  const getRoleUser = () => {
    const { role } = JSON.parse(localStorage.getItem('user'));
    // console.log(pathname.split('/').includes('seller'));
    if (role === 'seller') {
      return setRoleUser('seller');
    }
    if (role === 'administrator') {
      return setRoleUser('administrator');
    }
    setRoleUser('customer');
  };

  useEffect(() => {
    getDatafromLS();
    getRoleUser();
  }, []);
  return (
    <nav>
      <button
        type="button"
        href="/products"
        data-testid="customer_products__element-navbar-link-products"
        onClick={ () => history.push(`/${roleUser}/products`) }

      >
        Produtos
      </button>
      <button
        type="button"
        href="/orders"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => history.push(`/${roleUser}/orders`) }

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

export default Navbar;
