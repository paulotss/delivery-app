function Navbar() {
  return (
    <nav>
      <a
        href="/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </a>
      <a
        href="/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </a>
      <a
        href="/userFullName"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        Name
      </a>
      <a
        href="/logout"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </a>
    </nav>
  );
}

export default Navbar;
