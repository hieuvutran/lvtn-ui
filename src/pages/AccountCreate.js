import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import AccountCreateForm from 'src/components/accountCreate/AccountCreateForm';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, updateAccount } from 'src/store/actions/accountsAction';
import RoutesString from 'src/routes/routesString';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import API from 'src/api';
import Loader from 'react-loader-spinner';

const AccountCreate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading } = useSelector((state) => state.accounts);
  const [isLoading, setIsLoading] = useState(false);
  const isUpdatePage = !!id;
  const handleSubmit = (values) => {
    const { _id, ...updateValues } = values;
    dispatch(
      isUpdatePage ? updateAccount(values) : createAccount(updateValues)
    );
  };
  useEffect(async () => {
    if (id) {
      setIsLoading(true);
      const res = await API({
        url: `/accounts/${id}`,
        method: 'get'
      });
      setValues(res.data);
      setIsLoading(false);
    }
  }, []);
  const [values, setValues] = useState({
    username: '',
    password: '',
    role: '',
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
                <AccountCreateForm
                  isUpdatePage={isUpdatePage}
                  loading={loading}
                  initialValues={values}
                  handleSubmit={handleSubmit}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AccountCreate;
