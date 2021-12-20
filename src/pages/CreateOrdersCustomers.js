import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Checkbox, FormControlLabel , FormGroup,
  FormControl, Select, InputLabel, MenuItem, TextField, Button } from '@material-ui/core';
import OrderCreateForm from 'src/components/orderCreate/OrderCreateForm';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, updateOrder } from 'src/store/actions/ordersAction';
import RoutesString from 'src/routes/routesString';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from 'src/api';
import Loader from 'react-loader-spinner';
import swal from 'sweetalert2';
import { push } from 'connected-react-router';
import QrReader from 'react-qr-reader'

const OrderCreateCustomers = () => {
  const dispatch = useDispatch();
  // const {cusId} = useParams();
  const [menus, setMenus] = useState([]);
  const [menuSelected, setMenuSelected] = useState(null);
  const [listFoods, setListFoods] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)
  const [isRefresh, setIsRefresh] = useState(false)
   const handleChooseMenus = async (menuSelected) => {
    const res = await API({
      url: `/menu/${menuSelected}`,
      method: 'get',
      headers: {hotelid: values.hotelId}
    });
    setListFoods(res?.data?.foods || [])
    setMenuSelected(menuSelected)
    setValues(o => {
      return {...o, menu: menuSelected}
    })
  }
  useEffect(async () => {
    if(values.hotelId){
      const res = await API({
        url: `/menu`,
        method: 'get',
        headers: {hotelid: values.hotelId}
      });
      setMenus(res.data)
    }
  }, [isRefresh]);
  
  const [values, setValues] = useState({
    foods: [],
    roomNo: '',
    cusId:  '',
    menu: '',
    hotelId: ''
  });
  const onHandleSelectFoods = (foodId) => {
    var chosenFoods = values.foods;
    if(chosenFoods.includes(foodId)){
      removeElement(chosenFoods, foodId);
    }else{
      chosenFoods.push(foodId)
    }
    console.log(chosenFoods)
    setValues(o => {
      return {...o, foods: chosenFoods}
    })
  }
  const submitCreateOrder = async () => {
    console.log(values)
    const res = await API({
      url: `/orders`,
      method: 'post',
      data: values,
    });
    console.log(res.code)
    if(res.code == 200){
      swal
      .fire({
        title: 'thành công',
        text: 'Đặt thành công',
        icon: 'success',
        showCancelButton: false,
      }).then(() => dispatch(push(RoutesString.Login)))
    }else{
      swal.fire({
        title: 'thất bại',
        text: res.message,
        icon: 'error'
      });
    }
    
  }

  const handleScan = async (data) => {
        if (data) {
            const {cusId = '', hotelId = ''} = JSON.parse(data);
            if(!cusId) return;
            
            setValues(o => {return {...o, cusId, hotelId}})
            setIsRefresh(!isRefresh)
            swal
            .fire({
              title: 'thành công',
              text: 'thành công',
              icon: 'success',
              showCancelButton: false,
            })
        }
    }
    const handleError = err => {
        console.error(err)
    }
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Mã khách hàng"
                name="cusId"
                required
                value={values.cusId}
                variant="outlined"
                disabled={true}
                helperText="Quét qr-code để điền"
              />
            </Grid>
          <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please enter the roomNo"
                label="Số phòng"
                name="roomNo"
                onChange={(evt) => setValues(o => {return {...o, roomNo: evt.target.value}})}
                required
                value={values.roomNo}
                variant="outlined"
              />
            </Grid>
          <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Menus</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="menu"
                  value={menuSelected}
                  label="Phòng"
                  onChange={(e) => handleChooseMenus(e.target.value)}
                >
                  {menus.map((item) => (
                    <MenuItem value={item._id}>{item.menuName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}> 
            <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            p: 2
          }}
        >
          {!isSuccess ? <Button color="primary" variant="contained" onClick={submitCreateOrder}>
          Submit
          </Button> : ''}
        </Box>
            </Grid>
          <Grid item md={6} xs={12}>
            <FormGroup>
              {listFoods.map(e => (
                <FormControlLabel control={
                   <Checkbox onChange={() => onHandleSelectFoods(e._id)} /> 
                  }
                  label={`${e.foodName}`}
                />
              ))}
              </FormGroup>
          </Grid>
          {values.cusId ? '' : 
            <Grid item md={6} xs={12} style={{}}>
              <label>Cung cấp qr-code khi check-in</label>
            <Box>
              <QrReader
                delay={1000}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
              />
            </Box>
            </Grid>
          }</Grid>
        </Container>
      </Box>
    </>
  );
};

export default OrderCreateCustomers;

function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}