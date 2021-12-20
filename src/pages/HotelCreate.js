import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import HotelCreateForm from 'src/components/hotelCreate/HotelCreateForm';
import { useDispatch, useSelector } from 'react-redux';
import { createHotel, updateHotel } from 'src/store/actions/hotelsAction';
import RoutesString from 'src/routes/routesString';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import API from 'src/api';
import Loader from 'react-loader-spinner';
import { getAccounts } from 'src/store/actions/accountsAction';
import { USER_ROLE } from 'src/constants/enums';

const HotelCreate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading } = useSelector((state) => state.hotels);
  const { loading: accountLoading, accounts } = useSelector(
    (state) => state.accounts
  );
  const [isLoading, setIsLoading] = useState(false);
  const isUpdatePage = !!id;
  const { user } = useSelector((state) => state.auth);
  const isAdminRole = user?.role ? user?.role == 'admin' : false 
  const handleSubmit = (values) => {
    const { _id, ...updateValues } = values;
    dispatch(isUpdatePage ? updateHotel(values) : createHotel(updateValues));
  };
  useEffect(async () => {
    dispatch(getAccounts({ role: USER_ROLE.MANAGEMENT }));
    if (id) {
      setIsLoading(true);
      const res = await API({
        url: `/hotels/${id}`,
        method: 'get'
      });
      setValues(res.data);
      setIsLoading(false);
    }
  }, []);
  const [values, setValues] = useState({
    hotelName: '',
    address: '',
    phoneNumber: '',
    managerAcc: '',
    _id: ''
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
                <HotelCreateForm
                  isUpdatePage={isUpdatePage}
                  loading={loading}
                  initialValues={values}
                  handleSubmit={handleSubmit}
                  accountLoading={accountLoading}
                  accounts={accounts}
                  isAdminRole={isAdminRole}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HotelCreate;
