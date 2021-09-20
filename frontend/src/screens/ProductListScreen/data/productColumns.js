import { convertItemToLink } from '../../../helpers/converters';
import RowActionCell from '../components/RowActionCell';
import RowImageCell from '../components/RowImageCell';

const productColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 220,
    renderCell: (params) =>
      convertItemToLink(`/product/${params.value}`, params.value),
  },
  { field: 'name', headerName: 'Name', width: 300, editable: true },
  {
    field: 'image',
    headerName: 'Image',
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params) => <RowImageCell {...params} />,
    headerAlign: 'center',
    disableColumnMenu: true,
    disableReorder: true,
  },
  {
    field: 'price',
    headerName: 'Price (₦)',
    width: 140,
    editable: true,
    type: 'number',
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 180,
    editable: true,
  },
  {
    field: 'brand',
    headerName: 'Brand',
    width: 150,
    editable: true,
  },
  {
    field: 'countInStock',
    headerName: 'Stock Count',
    width: 150,
    editable: true,
    type: 'number',
  },
  {
    field: 'numReviews',
    headerName: 'Reviews Count',
    width: 150,
    type: 'number',
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 350,
    editable: true,
  },
  {
    field: 'createdAt',
    headerName: 'Date Created',
    width: 120,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    description: 'Product Actions',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => <RowActionCell {...params} />,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    disableReorder: true,
  },
];

export default productColumns;
