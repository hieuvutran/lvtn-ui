import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,MenuItem,Select,InputLabel, FormControl,Card,CardContent,
  Toolbar, Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'src/store/actions/authAction';
import { getHotelsPublic } from 'src/store/actions/hotelsAction';
const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [hotel, setHotel] = useState(null)
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const {publicHotels = []} = useSelector((state) => state.hotels || []);
  let checkInTime = user?.checkIn || 0;
  const [hotelName, setHotelName] = useState(user?.hotelManage?.hotelName || '')
  useEffect(() => {
    if(user?.role == 'admin'){
      dispatch(getHotelsPublic())
      
    }
    if(user?.role == 'manager' ){
      localStorage.setItem('hotelId', user?.hotelManage?._id);
    }
    if(user?.role == 'employee'){
      dispatch(getHotelsPublic())

      console.log(publicHotels[0]?._id == user?.hotelId)
      localStorage.setItem('hotelId', user?.hotelId);
      let hotel = publicHotels?.filter(item =>  item._id == user?.hotelId )
      setHotelName(hotel[0]?.hotelName);

      
    }
    // if(isFirstRender){
    //   const hotelLocal = localStorage.getItem('hotelId');
    //   if(hotelLocal){
    //     setHotel(hotelLocal)
    //   }else{
    //     const defaultHotelFirst = publicHotels[0]?._id || null;
    //     if(defaultHotelFirst){
    //       setHotel(defaultHotelFirst || null);
    //       localStorage.setItem('hotelId', defaultHotelFirst);
    //     }

    //   }
    //   setIsFirstRender(false)
    // }
  }, [])
  const handleChangeHotel = (value) => {
    if(value?.target?.value){
      localStorage.setItem('hotelId', value?.target?.value);
      window.location.reload();
    }
    else{
      localStorage.setItem('hotelId', "");
      window.location.reload();
    }
  }
  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden xlDown>
        {hotelName ? <Button variant="contained" color="success" >KS: {hotelName}</Button> :
        <div style={{height:"50px"}}>
          <FormControl sx={{ minWidth: 100, maxHeight: 30 }}>
          <InputLabel id="demo-simple-select-label" style={{color:"#ffffff"}}>
                  Khách sạn
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="hotel"
                  value={hotel || ''}
                  label="Loại phòng"
                  onChange={handleChangeHotel}
                  style={{color:"#ffffff"}}
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  {publicHotels.map((item) => (
                    <MenuItem value={item._id}>{item.hotelName}</MenuItem>
                  ))}
                </Select>
          </FormControl>
               
        </div>
      }
        <IconButton color="inherit" size="large">
            {checkInTime ? (<Badge
              // onClick={() => dispatch(checkout())}
              color="primary"
              variant="large"
            >
              <AssignmentTurnedInIcon />
            </Badge>) : (<Badge
              // onClick={() => dispatch(checkIn())}
              color="primary"
              variant="large"
            >
              <AddAlarmIcon />
            </Badge>)}
          </IconButton>

          <IconButton color="inherit" size="large">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            onClick={() => dispatch(logout())}
            color="inherit"
            size="large"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
