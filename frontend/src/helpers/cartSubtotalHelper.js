const cartSubtotalHelper = (cartItems) => ({
  cartSubtotalCount: cartItems.reduce((acc, item) => acc + item.qty, 0),
  cartSubtotalPrice: cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2),
});

export default cartSubtotalHelper;
