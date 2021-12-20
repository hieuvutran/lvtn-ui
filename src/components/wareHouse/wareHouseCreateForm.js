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
import {useHistory} from "react-router-dom";


const WareHouseCreateForm = ({
  isUpdatePage,
  initialValues,
  handleSubmit,
  loading,
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
        title={isUpdatePage ? 'Chỉnh sửa': 'Thêm mới'}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Tên"
              name="name"
              onChange={formik.handleChange}
              required
              value={formik.values.name}
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
                name="type"
                value={formik.values.type}
                label="Loại"
                onChange={formik.handleChange}
              >
                <MenuItem value={"Đồ ăn"}>Đồ ăn </MenuItem>
                <MenuItem value={"Nước uống"}>Nước uống </MenuItem>
                <MenuItem value={"Loại khác"}>Loại khác </MenuItem>

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
        <Button color="secondary" variant="outlined" onClick={() => history.goBack()} style={{ marginRight: "10px" }}>
          Trở lại
        </Button>
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Card>
  </form>
  );
};

export default WareHouseCreateForm;
