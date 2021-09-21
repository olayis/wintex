const orderRows = (orders) =>
  orders.map((order) => ({
    id: order._id,
    userId: order.user._id,
    userName: order.user.name,
    orderCount: order.orderItems.length,
    paymentMethod: order.paymentMethod,
    isPaid: order.isPaid,
    paymentId: order.paymentResult ? order.paymentResult.id : '',
    paymentStatus: order.paymentResult ? order.paymentResult.status : '',
    paymentDate: order.paidAt,
    paymentEmail: order.paymentResult ? order.paymentResult.email_address : '',
    taxPrice: order.taxPrice,
    shippingPrice: order.shippingPrice,
    totalPrice: order.totalPrice,
    shippingAddress: `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country} (${order.shippingAddress.postalCode})`,
    isDelivered: order.isDelivered,
    deliveredAt: order.deliveredAt,
    dateCreated: order.createdAt,
    dateUpdated: order.updatedAt,
  }));

export default orderRows;
