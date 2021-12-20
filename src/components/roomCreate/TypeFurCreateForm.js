import { useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import { useFormik } from 'formik';
import Loader from 'react-loader-spinner';
import {useHistory} from "react-router-dom";

const RoomTypeForm = ({
  initialValues,
  handleSubmit,
  loading,
  isUpdatePage
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
          title={ isUpdatePage ? 'Cập nhật loại phòng' :'Thêm loại phòng'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tên loại phòng"
                name="typeName"
                onChange={formik.handleChange}
                required
                value={formik.values.typeName}
                variant="outlined"
              />
            </Grid>
            
            <Grid item md={6} xs={12}>
            <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">Capacity</InputLabel> */}
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="capacity"
                  value={formik.values.capacity}
                  label="Capacity"
                  onChange={formik.handleChange}
                >
                  {ROOM_TYPES.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </TextField>
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

const ROOM_TYPES = [
  'phòng đơn',
  'phòng đôi',
  '4 người',
  '6 người',
]

export default RoomTypeForm;
