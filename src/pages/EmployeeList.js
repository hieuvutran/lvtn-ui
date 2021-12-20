import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import EmployeeListResults from '../components/employee/EmployeeListResults';
import EmployeeListToolbar from '../components/employee/EmployeeListToolbar';
import customers from '../__mocks__/customers';
import API from '../api';
import { useEffect, useRef, useState } from 'react';
import { deleteEmployee, getEmployee } from '../store/actions/employeeAction';
import { useDispatch, useSelector } from 'react-redux';
const EmployeeList = () => {
  const { success, employee, loading } = useSelector((state) => state.employee);
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (isFirstRender.current || success) {
      dispatch(getEmployee());
      isFirstRender.current = false;
    }
  }, [success]);
  useEffect(() => {
    if (employee) {
      setData(employee);
    }
  }, [employee]);
  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };
  const handleSearch = (keyword) => {
    const updatedData = [...employee].filter(
      (item) => item.empName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
    );
    setData(updatedData);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <EmployeeListToolbar handleSearch={handleSearch} />
          <Box sx={{ pt: 3 }}>
            <EmployeeListResults
              handleDelete={handleDelete}
              isLoading={loading}
              employees={data}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default EmployeeList;
