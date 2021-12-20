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
import { USER_ROLE } from 'src/constants/enums';
import {useHistory} from "react-router-dom";

const AccountCreateForm = ({
  isUpdatePage,
  initialValues,
  handleSubmit,
  loading
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
          title={isUpdatePage ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tên tài khoản"
                disabled={isUpdatePage}
                name="username"
                onChange={formik.handleChange}
                required
                value={formik.values.username}
                variant="outlined"
              />
            </Grid>
            {isUpdatePage ? '' : <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                required
                value={formik.values.password}
                variant="outlined"
              />
            </Grid>}
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chức vụ</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="role"
                  value={formik.values.role}
                  label="Loại thức ăn"
                  onChange={formik.handleChange}
                >
                  {Object.keys(USER_ROLE).map((key) => (
                    <MenuItem value={USER_ROLE[key]}>{key}</MenuItem>
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

export default AccountCreateForm;
