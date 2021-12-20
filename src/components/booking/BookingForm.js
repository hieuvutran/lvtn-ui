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
import API from '../../api/index';
import {useHistory} from "react-router-dom";

const BookingForm = ({
  isUpdatePage,
  initialValues,
  handleSubmit,
  loading,
  rooms,
  hotels = []
}) => {
  const history = useHistory();
  const [selectedHotelId, setSelectedHotelId] = useState('');
  const [listRooms, setListRooms] = useState(rooms);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true
  });
  const bookingTypes = [
    {
      value: 'thức ăn',
      label: 'Thức ăn'
    },
    {
      value: 'nước uống',
      label: 'Nước uống'
    }
  ];
  const handleChooseHotels = async (hotelId) => {
    // localStorage.setItem('hotelId', hotelId)
    const res = await API({
      url: `/rooms?hotelId=${hotelId}`,
      method: 'get'
    });
    setListRooms(res.data || [])
    setSelectedHotelId(hotelId)
    formik.setFieldValue('hotelId', hotelId)
  }
  const onUploadFile = async (evt) => {
    if(evt.target.files.length <= 0) {
      formik.setFieldValue('cusName', '')
      formik.setFieldValue('identityCard', '')
    };
    const data = new FormData() 
    data.append('image', evt.target.files[0])
    const res = await API({
      url: `/detect-image`,
      method: 'post',
      data: data
    });
    if(res.code != 200) {
      formik.setFieldValue('cusName', '')
      formik.setFieldValue('identityCard', '')
    };
    const response = res.data[0]
    formik.setFieldValue('cusName', response.name)
    formik.setFieldValue('identityCard', response.id)
  }
  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          title={isUpdatePage ? 'Chỉnh sửa đặt phòng' : 'Đặt phòng'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <label>Gửi CMND để nhận dạng</label>
                <TextField
                  fullWidth
                  // label="Identity Card"
                  name="identityCard"
                  // variant="outlined"
                  type="file"
                  onChange={(evt) => onUploadFile(evt)}
                />
                </Grid>
          </Grid>
          <Grid container spacing={3} marginTop="10px">
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tên khách hàng"
                name="cusName"
                onChange={formik.handleChange}
                required
                value={formik.values.cusName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Chứng minh nhân dân"
                name="identityCard"
                onChange={formik.handleChange}
                required
                value={formik.values.identityCard}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phoneNumber"
                onChange={formik.handleChange}
                required
                value={formik.values.phoneNumber}
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
                  value={selectedHotelId}
                  label="Phòng"
                  onChange={(e) => handleChooseHotels(e.target.value)}
                >
                  {hotels.map((item) => (
                    <MenuItem value={item._id}>{item.hotelName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Ngày nhận phòng"
                name="startDate"
                onChange={formik.handleChange}
                type="date"
                defaultValue={formik.values.startDate}
                value={formik.values.startDate}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
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
                  {listRooms.map((item) => (
                    <MenuItem value={item._id}>{item.roomName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Ngày trả phòng"
                name="endDate"
                onChange={formik.handleChange}
                type="date"
                defaultValue={formik.values.endDate}
                value={formik.values.endDate}
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

export default BookingForm;
