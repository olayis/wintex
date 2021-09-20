const productsRow = (products) =>
  products.map((product) => ({
    id: product._id,
    name: product.name,
    image: product.image,
    price: product.price,
    category: product.category,
    brand: product.brand,
    countInStock: product.countInStock,
    numReviews: product.numReviews,
    description: product.description,
    createdAt: product.createdAt.substring(0, 10),
  }));

export default productsRow;
