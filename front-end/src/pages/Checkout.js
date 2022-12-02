import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ok = 200;

function Checkout() {
  const history = useHistory();
  const [cart, setCart] = useState([]);
  // const [name, setName] = useState([]);
  const [seller, setSeller] = useState([]);
  const [idSeller, setIdSeller] = useState(0);

  const findSeller = async () => {
    try {
      const result = await axios.get('http://localhost:3001/user/seller');
      console.log(result);
      if (result.status === ok) {
        setSeller(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const finishChecout = async () => {
    // const ok = 200;
    // const notFound = 404;
    try {
      const result = await axios.post('http://localhost:3001/sales/', cart);
      // if (cart) {
      //   if () {}
      //   history.push('customer/orders/<id>');
      // }
      history.push('customer/orders/<id>');
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = (id) => {
    const aux = [...cart];
    aux.map((el) => {
      const a = el;
      if (el.id === id && el.count !== 0) {
        a.count -= 1;
      }
      return a;
    });
    const auxorder = aux.filter((el) => el.count);
    setCart(auxorder);
    localStorage.setItem('carrinho', JSON.stringify(auxorder));
  };

  const getDataFromDb = () => {
    const lsCart = JSON.parse(localStorage.getItem('carrinho'));
    // const lsUser = JSON.parse(localStorage.getItem('user'));

    // setName(lsUser.name);
    setCart(lsCart);
  };

  useEffect(() => {
    findSeller();
    getDataFromDb();
  }, []);

  return (
    <div>
      <p>{ idSeller }</p>
      <h1>Finalizar Pedido</h1>
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
            <td>Remover Item</td>
          </tr>
        </thead>

        <tbody>
          {cart.length > 0 && cart.map((item, i) => (
            <tr key={ item.id }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${i}`
                }
              >
                {i + 1}

              </td>

              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }
              >
                {item.name}

              </td>

              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${i}`
                }
              >
                {item.count}

              </td>

              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${i}`
                }
              >
                {item.price.replace('.', ',')}

              </td>

              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${i}`
                }
              >
                {(item.price * item.count).toFixed(2).toString().replace('.', ',')}

              </td>

              <td>
                <button
                  data-testid={
                    `customer_checkout__element-order-table-remove-${i}`
                  }
                  type="button"
                  onClick={ () => removeItem(item.id) }
                >
                  Remover

                </button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>
          Total
          {' '}
          <span
            data-testid="customer_checkout__element-order-total-price"
          >
            {`${cart
              .reduce((ant, att) => ant + (att.count * att.price), 0)
              .toFixed(2).toString().replace('.', ',')}`}
          </span>

        </p>
      </div>

      <div>
        <h3>Detalhes e Endereço para Entrega</h3>
        <label htmlFor="vendedor">
          P. Vendedora Responsável
          <select
            id="vendedor"
            data-testid="customer_checkout__select-seller"
            onChange={ (e) => setIdSeller(e.target.value) }
          >
            <option hidden>Selecione</option>
            {
              seller ? (seller.map((el) => (
                <option key={ el.id } value={ el.id }>{el.name}</option>
              ))
              )
                : null
            }
          </select>
        </label>
        <label htmlFor="address">
          Endereço
          <input
            data-testid="customer_checkout__input-address"
            id="address"
            type="text"
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            data-testid="customer_checkout__input-address-number"
            id="number"
            type="text"
          />
        </label>

        <button
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={ finishChecout }
        >
          FINALIZAR PEDIDO
        </button>

      </div>
    </div>
  );
}

export default Checkout;
