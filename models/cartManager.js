class CartManager {
  constructor() {
    this.carts = [];
  }

  addCart(cart) {
    if (this.validateCart(cart)) {
      // Genera un ID único para el carrito (puedes usar una librería como `uuid` para esto)
      cart.id = generateCartId();
      this.carts.push(cart);
      return cart;
    }
    return null;
  }

  getCarts() {
    return this.carts;
  }

  getCartById(cartId) {
    return this.carts.find(cart => cart.id === cartId);
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);
    if (cart) {
      // Agregar la lógica para agregar productos al carrito aquí
      const productIndex = cart.products.findIndex(product => product.productId === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      return cart;
    }
    return null;
  }

  deleteCart(cartId) {
    const index = this.carts.findIndex(cart => cart.id === cartId);
    if (index !== -1) {
      const deletedCart = this.carts.splice(index, 1);
      return deletedCart[0];
    }
    return null;
  }

  validateCart(cart) {
    if (cart.userId) {
      return true;
    }
    return false;
  }
}

module.exports = CartManager;
