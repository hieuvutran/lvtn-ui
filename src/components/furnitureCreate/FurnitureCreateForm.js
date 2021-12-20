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
import {useLocation} from 'react-router-dom'


const FurnitureCreateForm = ({
  isUpdatePage,
  initialValues,
  handleSubmit,
  loading,
  furnitureTypes,
  rooms
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
        <CardHeader
          title={isUpdatePage ? 'Chỉnh sửa ' : 'Thêm mới'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tên"
                name="furName"
                onChange={formik.handleChange}
                required
                value={formik.values.furName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Loại
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="furnitureTypeId"
                  value={formik.values.furnitureTypeId}
                  label="Loại"
                  onChange={formik.handleChange}
                >
                  {furnitureTypes.map((item) => (
                    <MenuItem value={item._id}>{item.furTypeName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* <Grid item md={6} xs={12}>
              <TextField
                type="number"
                fullWidth
                label="Số lượng"
                name="quantity"
                onChange={formik.handleChange}
                required
                value={formik.values.quantity}
                variant="outlined"
              />
            </Grid> */}
            {/* <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Phòng</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="roomId"
                  value={formik.values.roomId}
                  label="Phòng"
                  onChange={formik.handleChange}
                >
                  {rooms.map((item) => (
                    <MenuItem value={item._id}>{item.roomName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
           <Button color="secondary" variant="outlined" onClick={() => history.goBack()} style={{marginRight:"10px"}}>
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

export default FurnitureCreateForm;
