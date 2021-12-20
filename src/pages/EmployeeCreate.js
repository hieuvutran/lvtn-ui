import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import EmployeeCreateForm from 'src/components/employeeCreate/EmployeeCreateForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  createEmployee,
  updateEmployee
} from 'src/store/actions/employeeAction';
import RoutesString from 'src/routes/routesString';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import API from 'src/api';
import Loader from 'react-loader-spinner';
import { getAccounts } from 'src/store/actions/accountsAction';
import moment from 'moment';

const EmployeeCreate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading } = useSelector((state) => state.employee);
  const { accounts } = useSelector((state) => state.accounts);
  const [isLoading, setIsLoading] = useState(false);
  const isUpdatePage = !!id;
  const handleSubmit = (values) => {
    const { _id, ...updateValues } = values;
    dispatch(
      isUpdatePage ? updateEmployee(values) : createEmployee(updateValues)
    );
  };
  useEffect(async () => {
    dispatch(getAccounts());
    if (id) {
      setIsLoading(true);
      const res = await API({
        url: `/employees/${id}`,
        method: 'get'
      });
      const {
        dob = moment(
          '2021-09-01T00:00:00.000Z',
          'YYYY-MM-DD hh:mm:ss A Z'
        ).format('yyyy-MM-DD'),
        // accId,
        ...restData
      } = res.data;

      setValues({
        ...restData,
        role: res?.data?.accId?.role || '',
        username: res?.data?.accId?.username || '',
        dob: moment(dob, 'YYYY-MM-DD hh:mm:ss A Z').format('yyyy-MM-DD')
      });
      setIsLoading(false);
    }
  }, []);
  console.log(
    "moment('2021-09-01T00:00:00.000Z', 'yyyy-MM-dd').format('dd/mm/yyyy')",
    moment('2021-09-01T00:00:00.000Z', 'YYYY-MM-DD hh:mm:ss A Z').format(
      'DD/MM/yyyy'
    )
  );
  const [values, setValues] = useState({
    empName: '',
    dob: moment('2021-09-01T00:00:00.000Z', 'YYYY-MM-DD hh:mm:ss A Z').format(
      'yyyy-MM-DD'
    ),
    address: '',
    phoneNumber: '',
    baseSalary: '',
    typeOfLabor: '',
    identityCard: '',
    role: '',
    username: '',
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
                <EmployeeCreateForm
                  isUpdatePage={isUpdatePage}
                  loading={loading}
                  initialValues={values}
                  handleSubmit={handleSubmit}
                  accounts={accounts}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default EmployeeCreate;
