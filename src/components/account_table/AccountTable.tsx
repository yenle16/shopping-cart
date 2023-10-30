import type { ChangeEvent, FC, MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import { Box, Button, Card, Container, Stack, SvgIcon, Typography } from '@mui/material';
// import { customersApi } from 'src/api/customers';
// import { Seo } from 'src/components/seo';
// import { useMounted } from 'src/hooks/use-mounted';
// import { usePageView } from 'src/hooks/use-page-view';
// import { useSelection } from 'src/hooks/use-selection';
// import { CustomerListSearch } from 'src/sections/dashboard/customer/customer-list-search';
// import { CustomerListTable } from 'src/sections/dashboard/customer/customer-list-table';
// import type { Customer } from 'src/types/customer';
// import type { Page as PageType } from 'src/types/page';

interface Filters {
  query?: string;
  hasAcceptedMarketing?: boolean;
  isProspect?: boolean;
  isReturning?: boolean;
}

interface CustomersSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy: string;
  sortDir: 'asc' | 'desc';
}

const useCustomersSearch = () => {
  const [state, setState] = useState<CustomersSearchState>({
    filters: {
      query: undefined,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'updatedAt',
    sortDir: 'desc',
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handleSortChange = useCallback(
    (sort: { sortBy: string; sortDir: 'asc' | 'desc' }): void => {
      setState((prevState) => ({
        ...prevState,
        sortBy: sort.sortBy,
        sortDir: sort.sortDir,
      }));
    },
    [],
  );

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    [],
  );

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  }, []);

  return {
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

// interface CustomersStoreState {
//   customers: Customer[];
//   customersCount: number;
// }

// const useCustomersStore = (searchState: CustomersSearchState) => {
//   const isMounted = useMounted();
//   const [state, setState] = useState<CustomersStoreState>({
//     customers: [],
//     customersCount: 0,
//   });

//   const handleCustomersGet = useCallback(async () => {
//     try {
//       const response = await customersApi.getCustomers(searchState);

//       if (isMounted()) {
//         setState({
//           customers: response.data,
//           customersCount: response.count,
//         });
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }, [searchState, isMounted]);

//   useEffect(
//     () => {
//       handleCustomersGet();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [searchState],
//   );

//   return {
//     ...state,
//   };
// };

// const useCustomersIds = (customers: Customer[] = []) => {
//   return useMemo(() => {
//     return customers.map((customer) => customer.id);
//   }, [customers]);
// };
type PageType<T = any> = T & FC;
const AccountTable: PageType = () => {
  // const selectedSome = selected.length > 0 && selected.length < items.length;
  // const selectedAll = items.length > 0 && selected.length === items.length;
  // const enableBulkActions = selected.length > 0;

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button color="inherit" size="small" startIcon={<UploadIcon />}>
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={
                      <SvgIcon>
                        <SaveAltIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  startIcon={
                    <SvgIcon>
                      <AddIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>

            {/* <Box sx={{ position: 'relative' }}>
              {enableBulkActions && (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    alignItems: 'center',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
                    display: enableBulkActions ? 'flex' : 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    px: 2,
                    py: 0.5,
                    zIndex: 10,
                  }}
                >
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                  <Button color="inherit" size="small">
                    Delete
                  </Button>
                  <Button color="inherit" size="small">
                    Edit
                  </Button>
                </Stack>
              )}
              <Scrollbar>
                <Table sx={{ minWidth: 700 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedAll}
                          indeterminate={selectedSome}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectAll?.();
                            } else {
                              onDeselectAll?.();
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Orders</TableCell>
                      <TableCell>Spent</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((customer) => {
                      const isSelected = selected.includes(customer.id);
                      const location = `${customer.city}, ${customer.state}, ${customer.country}`;
                      const totalSpent = numeral(customer.totalSpent).format(
                        `${customer.currency}0,0.00`,
                      );

                      return (
                        <TableRow hover key={customer.id} selected={isSelected}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isSelected}
                              onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                                if (event.target.checked) {
                                  onSelectOne?.(customer.id);
                                } else {
                                  onDeselectOne?.(customer.id);
                                }
                              }}
                              value={isSelected}
                            />
                          </TableCell>
                          <TableCell>
                            <Stack alignItems="center" direction="row" spacing={1}>
                              <Avatar
                                src={customer.avatar}
                                sx={{
                                  height: 42,
                                  width: 42,
                                }}
                              >
                                {getInitials(customer.name)}
                              </Avatar>
                              <div>
                                <Link
                                  color="inherit"
                                  component={RouterLink}
                                  href={paths.dashboard.customers.details}
                                  variant="subtitle2"
                                >
                                  {customer.name}
                                </Link>
                                <Typography color="text.secondary" variant="body2">
                                  {customer.email}
                                </Typography>
                              </div>
                            </Stack>
                          </TableCell>
                          <TableCell>{location}</TableCell>
                          <TableCell>{customer.totalOrders}</TableCell>
                          <TableCell>
                            <Typography variant="subtitle2">{totalSpent}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              component={RouterLink}
                              href={paths.dashboard.customers.edit}
                            >
                              <SvgIcon>
                                <Edit02Icon />
                              </SvgIcon>
                            </IconButton>
                            <IconButton
                              component={RouterLink}
                              href={paths.dashboard.customers.details}
                            >
                              <SvgIcon>
                                <ArrowRightIcon />
                              </SvgIcon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Scrollbar>
              <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Box> */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};
//   const customersSearch = useCustomersSearch();
//   const customersStore = useCustomersStore(customersSearch.state);
//   const customersIds = useCustomersIds(customersStore.customers);
//   const customersSelection = useSelection<string>(customersIds);

//   usePageView();
//   return (
//     <>
//       <Seo title="Dashboard: Customer List" />
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 8,
//         }}
//       >
//         <Container maxWidth="xl">
//           <Stack spacing={4}>
//             <Stack direction="row" justifyContent="space-between" spacing={4}>
//               <Stack spacing={1}>
//                 <Typography variant="h4">Customers</Typography>
//                 <Stack alignItems="center" direction="row" spacing={1}>
//                   <Button
//                     color="inherit"
//                     size="small"
//                     startIcon={
//                       <SvgIcon>
//                         <UploadIcon />
//                       </SvgIcon>
//                     }
//                   >
//                     Import
//                   </Button>
//                   <Button color="inherit" size="small" startIcon={<SaveAltIcon />}>
//                     Export
//                   </Button>
//                 </Stack>
//               </Stack>
//               <Stack alignItems="center" direction="row" spacing={3}>
//                 <Button startIcon={<AddIcon />} variant="contained">
//                   Add
//                 </Button>
//               </Stack>
//             </Stack>
//             <Card>
//               <CustomerListSearch
//                 onFiltersChange={customersSearch.handleFiltersChange}
//                 onSortChange={customersSearch.handleSortChange}
//                 sortBy={customersSearch.state.sortBy}
//                 sortDir={customersSearch.state.sortDir}
//               />
//               <CustomerListTable
//                 count={customersStore.customersCount}
//                 items={customersStore.customers}
//                 onDeselectAll={customersSelection.handleDeselectAll}
//                 onDeselectOne={customersSelection.handleDeselectOne}
//                 onPageChange={customersSearch.handlePageChange}
//                 onRowsPerPageChange={customersSearch.handleRowsPerPageChange}
//                 onSelectAll={customersSelection.handleSelectAll}
//                 onSelectOne={customersSelection.handleSelectOne}
//                 page={customersSearch.state.page}
//                 rowsPerPage={customersSearch.state.rowsPerPage}
//                 selected={customersSelection.selected}
//               />
//             </Card>
//           </Stack>
//         </Container>
//       </Box>
//     </>
//   );
// };

export default AccountTable;
