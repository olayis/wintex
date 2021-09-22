import {
  convertStatusToIcon,
  convertEmailToLink,
  convertItemToLink,
} from '../../../helpers/converters';

const orderColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 220,
    renderCell: (params) =>
      convertItemToLink(`/orders/${params.value}`, params.value),
  },
  {
    field: 'userId',
    headerName: 'User ID',
    width: 140,
  },
  { field: 'userName', headerName: 'User Name', width: 150 },
  {
    field: 'orderCount',
    headerName: 'Items',
    width: 130,
    type: 'number',
  },
  {
    field: 'paymentMethod',
    headerName: 'Payment Method',
    width: 180,
  },
  {
    field: 'isPaid',
    headerName: 'Paid',
    width: 140,
    headerAlign: 'center',
    align: 'center',
    type: 'boolean',
    renderCell: (params) => convertStatusToIcon(params.value),
  },
  {
    field: 'paymentId',
    headerName: 'Payment ID',
    width: 180,
  },
  {
    field: 'paymentStatus',
    headerName: 'Payment Status',
    width: 180,
  },
  {
    field: 'paymentDate',
    headerName: 'Payment Date',
    width: 180,
  },
  {
    field: 'paymentEmail',
    headerName: 'Payment Email',
    width: 250,
    renderCell: (params) => convertEmailToLink(params.value),
  },
  {
    field: 'taxPrice',
    headerName: 'Tax Price',
    width: 180,
    type: 'number',
  },
  {
    field: 'shippingPrice',
    headerName: 'Shipping Price',
    width: 180,
    type: 'number',
  },
  {
    field: 'totalPrice',
    headerName: 'Total Price',
    width: 180,
    type: 'number',
  },

  {
    field: 'shippingAddress',
    headerName: 'Shipping Address',
    width: 280,
  },
  {
    field: 'isDelivered',
    headerName: 'Delivered',
    width: 140,
    headerAlign: 'center',
    align: 'center',
    type: 'boolean',
    renderCell: (params) => convertStatusToIcon(params.value),
  },
  {
    field: 'deliveredAt',
    headerName: 'Delivery Date',
    width: 180,
  },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    width: 180,
  },
  {
    field: 'dateUpdated',
    headerName: 'Date Updated',
    width: 280,
  },
];

export default orderColumns;
