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

const FurnitureCreateForm = ({
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
          title={isUpdatePage ? 'Chỉnh sửa loại nội thất' : 'Thêm loại nội thất'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tên loại nội thất"
                name="furTypeName"
                onChange={formik.handleChange}
                required
                value={formik.values.furTypeName}
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

export default FurnitureCreateForm;
