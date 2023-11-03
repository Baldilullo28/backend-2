class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    if (this.validateProduct(product)) {
      // Genera un ID único para el producto (puedes usar una librería como `uuid` para esto)
      product.id = generateProductId();
      this.products.push(product);
      return product;
    }
    return null;
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId) {
    return this.products.find(product => product.id === productId);
  }

  updateProduct(productId, updatedProduct) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      return this.products[index];
    }
    return null;
  }

  deleteProduct(productId) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1);
      return deletedProduct[0];
    }
    return null;
  }

  validateProduct(product) {
    if (product.title && product.price) {
      return true;
    }
    return false;
  }
}

module.exports = ProductManager;
