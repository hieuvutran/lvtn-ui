import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import OrderCreateForm from 'src/components/orderCreate/OrderCreateForm';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, updateOrder } from 'src/store/actions/ordersAction';
import RoutesString from 'src/routes/routesString';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import API from 'src/api';
import Loader from 'react-loader-spinner';

const OrderCreate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, listMenu } = useSelector((state) => state.orders);
  const [isLoading, setIsLoading] = useState(false);
  const isUpdatePage = !!id;
  const handleSubmit = (values) => {
    const { _id, ...updateValues } = values;
    dispatch(isUpdatePage ? updateOrder(values) : createOrder(updateValues));
  };
  useEffect(async () => {
    if (id) {
      setIsLoading(true);
      const res = await API({
        url: `/orders/${id}`,
        method: 'get'
      });
      setValues(res.data);
      setIsLoading(false);
    }
  }, []);
  const [values, setValues] = useState({
    orderName: '',
    orderType: '',
    unitPrice: '',
    quantity: '',
    _id: '',
    menu: ''
  });
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {isLoading ? (
                <div className="cover">
                  <Loader type="Puff" color="#000" />
                </div>
              ) : (
                <OrderCreateForm
                  isUpdatePage={isUpdatePage}
                  loading={loading}
                  initialValues={values}
                  handleSubmit={handleSubmit}
                  menu={listMenu}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default OrderCreate;
