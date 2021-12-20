import { Box, Container } from '@material-ui/core';
import BookingListResults from '../components/booking/CheckInList';
import BookingListToolbar from '../components/booking/CheckInToolBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getCheckIn } from 'src/store/actions/bookingAction';

const CheckInList = () => {
  const { success, checkIn, loading } = useSelector(
    (state) => state.booking
  );
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const today = new Date()
  let query = {
    day : today.toJSON().split("T")[0]
  }
  useEffect(() => {
    dispatch(getCheckIn({query}));
  }, []);

  useEffect(() => {
    if (isFirstRender.current || success) {
      // dispatch(getFurnitures());
      isFirstRender.current = false;
    }
  }, [success]);
  useEffect(() => {
    setData(checkIn);
  }, [checkIn]);
  
  const handleFilter = (evt) => {
    if(evt.target?.value){
      const query = {
        day: evt.target?.value
      }
      dispatch(getCheckIn({query}));
    }
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

export default CheckInList;
