import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import dataTestsIds from '../utils/dataTestIds';
import Navbar from '../components/Navbar';

const ok = 200;

function DetalhesPedido() {
  const params = useLocation();
  const [saleId, setSaleId] = useState(0);
  // const [name, setName] = useState([]);
  const [dataSale, setDataSale] = useState({});
  const getDataSale = async () => {
    try {
      const sale = params.pathname.split('/').pop();
      setSaleId(params.pathname.split('/').pop());

      const result = await axios.get(`http://localhost:3001/sales/bysaleId/${sale}`);
      // result
      if (result.status === ok) {
        console.log(result.data.saleDate);
        const dia = new Date(result.data.saleDate).getDate().toString();
        const diaF = (dia.length === 1) ? `0${dia}` : dia;
        const mes = (new Date(result.data.saleDate).getMonth() + 1).toString();
        const mesF = (mes.length === 1) ? `0${mes}` : mes;
        const anoF = new Date(result.data.saleDate).getFullYear();

        setDataSale({ ...result.data, date: `${diaF}/${mesF}/${anoF}` });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataSale();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Detalhes do Pedido</h1>

      {Object.keys(dataSale).length > 0 && (

        <div>
          <span>Pedido </span>
          <span data-testid={ dataTestsIds.detalhesPedido.id }>
            {saleId}
          </span>
          <span data-testid={ dataTestsIds.detalhesPedido.name }>
            {dataSale?.idSeller?.name}
          </span>
          <span data-testid={ dataTestsIds.detalhesPedido.date }>
            {dataSale?.date}
          </span>
          <span data-testid={ dataTestsIds.detalhesPedido.status }>
            {dataSale.status}
          </span>

          <button
            data-testid={ dataTestsIds.detalhesPedido.check }
            type="button"
            disabled
          >
            Marcar como Entregue
          </button>

        </div>
      )}
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
          </tr>

        </thead>

        <tbody>
          {console.log(dataSale)}
          {Object.keys(dataSale).length > 0 && dataSale.products.map((item, i) => (
            <tr key={ item.id }>
              <td
                data-testid={ dataTestsIds.detalhesPedido.itemId + i }
              >
                {i + 1}

              </td>

              <td
                data-testid={ dataTestsIds.detalhesPedido.itemName + i }
              >
                {item.name}

              </td>

              <td
                data-testid={ dataTestsIds.detalhesPedido.itemQtd + i }
              >
                {item.SaleProduct.quantity}

              </td>

              <td
                data-testid={ dataTestsIds.detalhesPedido.itemPrice + i }
              >
                {item.price}

              </td>

              <td
                data-testid={ dataTestsIds.detalhesPedido.itemSubTotal + i }
              >
                {item.SaleProduct.quantity * item.price}

              </td>

            </tr>

          ))}

        </tbody>
      </table>

      {Object.keys(dataSale).length > 0 && (
        <div>
          <p>
            Total
            {' '}
            <span
              data-testid={ dataTestsIds.detalhesPedido.totalPrice }
            >
              {(dataSale.totalPrice).replace('.', ',')}
            </span>

          </p>
        </div>
      )}

    </div>
  );
}

export default DetalhesPedido;
