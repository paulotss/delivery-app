const CUSTOMER = 'customer';
const SELLER = 'seller';

const dataTestsIds = {
  detalhesPedido: {
    id: `${CUSTOMER}_order_details__element-order-details-label-order-id`,
    name: `${CUSTOMER}_order_details__element-order-details-label-seller-name`,
    date: `${CUSTOMER}_order_details__element-order-details-label-order-date`,
    status: `${CUSTOMER}_order_details__element-order-details-label-delivery-status`,
    check: `${CUSTOMER}_order_details__button-delivery-check`,
    itemId: `${CUSTOMER}_order_details__element-order-table-item-number-`,
    itemName: `${CUSTOMER}_order_details__element-order-table-name-`,
    itemQtd: `${CUSTOMER}_order_details__element-order-table-quantity-`,
    itemPrice: `${CUSTOMER}_order_details__element-order-table-unit-price-`,
    itemUniquePrice: `${CUSTOMER}_order_details__element-order-table-unit-price-`,
    itemSubTotal: `${CUSTOMER}_order_details__element-order-table-sub-total-`,
    totalPrice: `${CUSTOMER}_order_details__element-order-total-price`,
  },
  meusPedidos: {
    id: `${CUSTOMER}_orders__element-order-id-`,
    status: `${CUSTOMER}_orders__element-delivery-status-`,
    date: `${CUSTOMER}_orders__element-order-date-`,
    price: `${CUSTOMER}_orders__element-card-price-`,
  },
  sellerDetalPed: {
    id: `${SELLER}_order_details__element-order-details-label-order-id`,
    name: `${SELLER}_order_details__element-order-details-label-seller-name`,
    date: `${SELLER}_order_details__element-order-details-label-order-date`,
    status: `${SELLER}_order_details__element-order-details-label-delivery-status`,
    check: `${SELLER}_order_details__button-delivery-check`,
    preparando: `${SELLER}_order_details__button-preparing-check`,
    saiuEntrega: `${SELLER}_order_details__button-dispatch-check`,
    itemId: `${SELLER}_order_details__element-order-table-item-number-`,
    itemName: `${SELLER}_order_details__element-order-table-name-`,
    itemQtd: `${SELLER}_order_details__element-order-table-quantity-`,
    itemPrice: `${SELLER}_order_details__element-order-table-unit-price-`,
    itemUniquePrice: `${SELLER}_order_details__element-order-table-unit-price-`,
    itemSubTotal: `${SELLER}_order_details__element-order-table-sub-total-`,
    totalPrice: `${SELLER}_order_details__element-order-total-price`,
  },
  sellerPedidos: {
    id: `${SELLER}_orders__element-order-id-`,
    status: `${SELLER}_orders__element-delivery-status-`,
    date: `${SELLER}_orders__element-order-date-`,
    price: `${SELLER}_orders__element-card-price-`,
  },
};

export default dataTestsIds;
