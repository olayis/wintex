import RowMenuCell from '../components/RowMenuCell';
import {
  convertAdimStatusToIcon,
  convertEmailToLink,
} from '../../../helpers/converters';

const userColumns = [
  { field: 'id', headerName: 'ID', width: 230 },
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
    description: 'isAdmin values can only be true or false when editing',
    width: 140,
    headerAlign: 'center',
    align: 'center',
    editable: true,
    renderCell: (params) => convertAdimStatusToIcon(params.value),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    description: 'User Actions',
    headerAlign: 'center',
    align: 'center',
    renderCell: RowMenuCell,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    disableReorder: true,
  },
];

export default userColumns;
