import { Box, Container } from '@material-ui/core';
import BookingListResults from '../components/booking/bookingList';
import BookingListToolbar from '../components/booking/bookingToolBar';
// import FurnitureListToolbar from '../components/furniture/FurnitureListToolbar';
import {
  getFurnitures,
} from 'src/store/actions/furnituresAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getBookings } from 'src/store/actions/bookingAction';

const CheckInCustomerList = () => {
  const { success, booking, loading } = useSelector(
    (state) => state.booking
  );
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const [room, setRoom] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(getBookings());
  }, []);

  // useEffect(() => {
  //   if (rooms.length > 0) {
  //     setRoom(rooms[0]);
  //   }
  // }, [rooms]);
  // const handleChangeRoom = (value) => {
  //   const room = rooms.find((item) => item._id === value);
  //   setRoom(room);
  // };
  useEffect(() => {
    if (isFirstRender.current || success) {
      // dispatch(getFurnitures());
      isFirstRender.current = false;
    }
  }, [success]);
  useEffect(() => {
    setData(booking);
  }, [booking]);
  
  const handleFilter = (evt) => {
    if(evt.target?.value){
      console.log(evt.target?.value)
      const query = {
        startDate: evt.target?.value
      }
      dispatch(getBookings({query}));
    }
    // let updatedData = booking;
    // setData(updatedData);
  };
  
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <BookingListToolbar
            handleFilter={handleFilter}
            // handleSearch={handleSearch}
          />
          <Box sx={{ pt: 3 }}>
            <BookingListResults
              isLoading={loading}
              data={data}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CheckInCustomerList;
