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
import {USER_ROLE} from '../../constants/enums';
import {useHistory} from "react-router-dom";

const EmployeeCreateForm = ({
  isUpdatePage,
  initialValues,
  handleSubmit,
  loading,
  accounts
}) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true
  });
  const contractTypes = [
    {
      value: 'FULL_TIME',
      label: 'Fulltime'
    },
    {
      value: 'PART_TIME',
      label: 'Parttime'
    }
  ];
  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          title={isUpdatePage ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tên nhân viên"
                name="empName"
                onChange={formik.handleChange}
                required
                value={formik.values.empName}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Ngày sinh"
                name="dob"
                type="date"
                inputFormat="dd-mm-yyyy"
                onChange={formik.handleChange}
                required
                defaultValue={formik.values.dob}
                value={formik.values.dob}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="address"
                onChange={formik.handleChange}
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
                value={formik.values.phoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Lương cơ bản"
                name="baseSalary"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.baseSalary}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Loại hợp đồng
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="typeOfLabor"
                  value={formik.values.typeOfLabor}
                  label="Loại hợp đồng"
                  onChange={formik.handleChange}
                >
                  {contractTypes.map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Chứng minh nhân dân"
                name="identityCard"
                onChange={formik.handleChange}
                value={formik.values.identityCard}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="role"
                  value={formik.values.role}
                  label="role"
                  onChange={formik.handleChange}
                >
                  {Object.values(USER_ROLE).map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tên tài khoản"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
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

export default EmployeeCreateForm;
