import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Container
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createWarehouse, updateWareHouse } from 'src/store/actions/warehouseAction';
import { useState, useEffect } from 'react';
import WareHouseCreateForm from '../components/wareHouse/wareHouseCreateForm'
import API from 'src/api';

const WareHouseCreate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isUpdatePage = !!id;

  const handleSubmit = (values) => {
    const { _id, ...updateValues } = values;
    dispatch(
      isUpdatePage ? updateWareHouse(values) : createWarehouse(updateValues)
    );
  };
  useEffect(async () => {
    if (id) {
      const res = await API({
        url: `/warehouse/${id}`,
        method: 'get'
      });
      setValues(
        res.data
      );
    }
  }, []);
  const [values, setValues] = useState({
    name: '',
    type:''
  });

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <WareHouseCreateForm
            isUpdatePage={isUpdatePage}
            initialValues={values}
            handleSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default WareHouseCreate;
