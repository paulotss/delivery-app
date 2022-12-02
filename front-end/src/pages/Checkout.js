import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Checkout() {
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [name, setName] = useState([]);

  const finishChecout = async () => {
    // const ok = 200;
    // const notFound = 404;
    try {
      // const result = await axios.post('http://localhost:3001/products/',{});
      // console.log(result.data[1].url_image);
      // if (result.status === ok) {
      // }
    } catch (error) {
      console.log(error);
    }
    history.push('customer/orders/<id>');
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
    setCart(aux);
  };

  const getDataFromDb = () => {
    const lsCart = JSON.parse(localStorage.getItem('carrinho'));
    const lsUser = JSON.parse(localStorage.getItem('user'));

    setName(lsUser.name);
    setCart(lsCart);
  };
  useEffect(() => {
    getDataFromDb();
  }, []);

  return (
    <div>
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
            {`R$ ${cart
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
          >
            <option>{name}</option>
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
