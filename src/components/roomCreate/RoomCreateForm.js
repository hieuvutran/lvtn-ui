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

const RoomCreateForm = ({
  isUpdatePage,
  initialValues,
  handleSubmit,
  loading,
  hotels,
  roomTypes
}) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true
  });
  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title={isUpdatePage ? 'Chỉnh sửa phòng' : 'Thêm phòng'} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Tên phòng"
                name="roomName"
                onChange={formik.handleChange}
                required
                value={formik.values.roomName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Khách sạn</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="hotelId"
                  value={formik.values.hotelId}
                  label="Khách sạn"
                  onChange={formik.handleChange}
                >
                  {hotels.map((item) => (
                    <MenuItem value={item._id}>{item.hotelName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Loại phòng
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="roomTypeId"
                  value={formik.values.roomTypeId}
                  label="Loại phòng"
                  onChange={formik.handleChange}
                >
                  {roomTypes.map((item) => (
                    <MenuItem value={item._id}>{item.typeName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Số phòng"
                name="roomNo"
                onChange={formik.handleChange}
                required
                value={formik.values.roomNo}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Giá tiền"
                name="unitPrice"
                onChange={formik.handleChange}
                type="number"
                value={formik.values.unitPrice}
                variant="outlined"
              />
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
        > <Button color="secondary" variant="outlined" onClick={() => history.goBack()} style={{marginRight:"10px"}}>
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

export default RoomCreateForm;
