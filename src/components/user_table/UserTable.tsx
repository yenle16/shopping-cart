import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { UserProps } from '../../pages/admin/admin-manage-user/AdminManageUser';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'username', headerName: 'Username', width: 130 },
  {
    field: 'name',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.name.firstname || ''} ${params.row.name.lastname || ''}`,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.address.city || ','} ${params.row.address.street || ''}`,
  },
  {
    field: 'phone',
    headerName: 'PhoneNumber',
    width: 150,
  },
];

type DataTableProps = {
  rows: UserProps[];
};

const UserTable: React.FC<DataTableProps> = ({ rows }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};
export default UserTable;
