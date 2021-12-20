import { useState } from 'react';
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
  TextField
} from '@material-ui/core';
import { useFormik } from 'formik';
import Loader from 'react-loader-spinner';
import {useHistory} from "react-router-dom";

const FoodCreateForm = ({
  isUpdatePage,
  initialValues,
  handleSubmit,
  loading,
  accountLoading,
  accounts,
  isAdminRole
}) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true
  });
  const foodTypes = [];
  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          title={isUpdatePage ? 'Chỉnh sửa khách sạn' : 'Thêm khách sạn'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Tên khách sạn"
                name="hotelName"
                onChange={formik.handleChange}
                required
                value={formik.values.hotelName}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="address"
                onChange={formik.handleChange}
                required
                value={formik.values.address}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phoneNumber"
                onChange={formik.handleChange}
                type="tel"
                value={formik.values.phoneNumber}
                variant="outlined"
              />
            </Grid>
            {isAdminRole ? <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Chủ khách sạn
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="managerAcc"
                  value={formik.values.managerAcc}
                  label="Chủ khách sạn"
                  onChange={formik.handleChange}
                >
                  {accounts.map((item) => (
                    <MenuItem value={item._id}>{item.username}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> : ''}
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        ><Button color="secondary" variant="outlined" onClick={() => history.goBack()} style={{marginRight:"10px"}}>
        Trở lại
      </Button>
          {isAdminRole ? <Button color="primary" variant="contained" type="submit">
            {loading ? (
              <Loader height={15} type="Puff" color="#fff" />
            ) : (
              'Submit'
            )}
          </Button> : ''}
        </Box>
      </Card>
    </form>
  );
};

export default FoodCreateForm;
