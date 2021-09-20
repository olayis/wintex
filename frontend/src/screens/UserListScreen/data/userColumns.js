import RowActionCell from '../components/RowActionCell';
import {
  convertAdimStatusToIcon,
  convertEmailToLink,
} from '../../../helpers/converters';

const userColumns = [
  { field: 'id', headerName: 'ID', width: 220 },
  { field: 'name', headerName: 'Name', width: 250, editable: true },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    editable: true,
    renderCell: (params) => convertEmailToLink(params.value),
  },
  {
    field: 'isAdmin',
    headerName: 'Is Admin',
    width: 140,
    headerAlign: 'center',
    align: 'center',
    editable: true,
    type: 'boolean',
    renderCell: (params) => convertAdimStatusToIcon(params.value),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    description: 'User Actions',
    headerAlign: 'center',
    align: 'center',
    renderCell: RowActionCell,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    disableReorder: true,
  },
];

export default userColumns;
