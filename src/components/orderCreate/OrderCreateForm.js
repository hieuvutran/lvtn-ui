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


const OrderCreateForm = ({
  isUpdatePage,
  initialValues,
  handleSubmit,
  loading, menu
}) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true
  });
  const orderTypes = [
    {
      value: 'thức ăn',
      label: 'Thức ăn'
    },
    {
      value: 'nước uống',
      label: 'Nước uống'
    }
  ];
  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          title={isUpdatePage ? 'Chỉnh sửa thức ăn' : 'Thêm thức ăn'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Tên thức ăn"
                name="orderName"
                onChange={formik.handleChange}
                required
                value={formik.values.orderName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Loại thức ăn
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="orderType"
                  value={formik.values.orderType}
                  label="Loại thức ăn"
                  onChange={formik.handleChange}
                >
                  {orderTypes.map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Giá tiền"
                name="unitPrice"
                onChange={formik.handleChange}
                required
                value={formik.values.unitPrice}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Số lượng"
                name="quantity"
                onChange={formik.handleChange}
                type="number"
                value={formik.values.quantity}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Menu
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="menu"
                  value={formik.values.menu}
                  label="Loại thức ăn"
                  onChange={formik.handleChange}
                >
                  {menu.map((item) => (
                    <MenuItem value={item._id}>{item.menuName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
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
          <Button color="primary" variant="contained" type="submit">
            {loading ? (
              <Loader height={15} type="Puff" color="#fff" />
            ) : (
              'Submit'
            )}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default OrderCreateForm;
