import { ChangeEvent, FC, Fragment, MouseEvent, useCallback, useState } from 'react';
import numeral from 'numeral';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { toast } from 'react-hot-toast';
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { StoreItemProps } from '../../pages/admin/admin-manage-product/AdminManageProduct';
import { useManageProduct } from '../../context/ProductContext';
export type ProductListTableProps = {
  count?: number;
  items?: StoreItemProps[];
  page?: number;
  rowsPerPage?: number;
  totalItems?: number;
  // onPageChange: (event: MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void;
  // onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
const ProductTable: FC<ProductListTableProps> = (props) => {
  type ChangePageEvent = MouseEvent<HTMLButtonElement>;
  const { count = 0, items = [], page = 0, rowsPerPage = 0, totalItems } = props;
  const [currentProduct, setCurrentProduct] = useState<number | null>(null);
  const [title, setTitle] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState<string>();

  const { dispatch } = useManageProduct();

  const handleProductToggle = useCallback((productId: number): void => {
    setCurrentProduct((prevProductId) => {
      if (prevProductId === productId) {
        return null;
      }

      return productId;
    });
  }, []);
  const handleProductClose = useCallback((): void => {
    setCurrentProduct(null);
  }, []);
  const handleProductUpdate = useCallback(
    (product: StoreItemProps): void => {
      console.log();
      const updatedProduct = {
        id: product.id,
        title: title || product.title,
        price: price || product.price,
        description: description || product.description,
        category: product.category,
        image: product.image,
        rating: product.rating,
      };
      dispatch({
        type: 'UPDATE_PRODUCT',
        payload: updatedProduct,
      });
      setCurrentProduct(null);
      toast.success('Product updated');
    },
    [title, price, description],
  );

  const handleProductDelete = useCallback((product: StoreItemProps): void => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: product.id });
    toast.error('Product cannot be deleted');
  }, []);
  return (
    <Fragment>
      <Table sx={{ minWidth: 1200 }}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((product) => {
            const isCurrent = product.id === currentProduct;
            const price = numeral(product.price).format('0,0.00');

            return (
              <Fragment key={product.id}>
                <TableRow hover key={product.id}>
                  <TableCell
                    padding="checkbox"
                    sx={{
                      ...(isCurrent && {
                        position: 'relative',
                        '&:after': {
                          position: 'absolute',
                          content: '" "',
                          top: 0,
                          left: 0,
                          backgroundColor: 'primary.main',
                          width: 3,
                          height: 'calc(100% + 1px)',
                        },
                      }),
                    }}
                    width="25%"
                  >
                    <IconButton onClick={() => handleProductToggle(product.id)}>
                      {isCurrent ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      {product.image ? (
                        <Box
                          sx={{
                            alignItems: 'center',
                            backgroundColor: 'neutral.50',
                            backgroundImage: `url(${product.image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            borderRadius: 1,
                            display: 'flex',
                            height: 80,
                            justifyContent: 'center',
                            overflow: 'hidden',
                            width: 80,
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            alignItems: 'center',
                            backgroundColor: 'neutral.50',
                            borderRadius: 1,
                            display: 'flex',
                            height: 80,
                            justifyContent: 'center',
                            width: 80,
                          }}
                        ></Box>
                      )}
                      <Box
                        sx={{
                          cursor: 'pointer',
                          ml: 2,
                        }}
                      >
                        <Typography variant="subtitle2">{product.title}</Typography>
                        <Typography color="text.secondary" variant="body2">
                          in {product.category}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
                {isCurrent && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      sx={{
                        p: 0,
                        position: 'relative',
                        '&:after': {
                          position: 'absolute',
                          content: '" "',
                          top: 0,
                          left: 0,
                          backgroundColor: 'primary.main',
                          width: 3,
                          height: 'calc(100% + 1px)',
                        },
                      }}
                    >
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Typography variant="h6">Product Details</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={8}>
                                <TextField
                                  defaultValue={product.title}
                                  fullWidth
                                  label="Product Title"
                                  name="title"
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <TextField
                                  defaultValue={product.price}
                                  fullWidth
                                  label="Price"
                                  name="price"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">$</InputAdornment>
                                    ),
                                  }}
                                  type="number"
                                  onChange={(e) => setPrice(parseInt(e.target.value))}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider sx={{ my: 2 }} />
                            <TextField
                              defaultValue={product.description}
                              fullWidth
                              label="Description"
                              name="description"
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Divider />
                      <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        sx={{ p: 2 }}
                      >
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Button
                            onClick={() => {
                              handleProductUpdate(product);
                            }}
                            type="submit"
                            variant="contained"
                          >
                            Update
                          </Button>
                          <Button color="inherit" onClick={handleProductClose}>
                            Cancel
                          </Button>
                        </Stack>
                        <div>
                          <Button
                            onClick={() => {
                              handleProductDelete(product);
                            }}
                            color="error"
                          >
                            Delete product
                          </Button>
                        </div>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </Fragment>
  );
};
export default ProductTable;
