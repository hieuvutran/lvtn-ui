import { Box, Container, Grid } from '@material-ui/core';
import BookingCreateForm from 'src/components/booking/BookingForm';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking, updateBooking } from 'src/store/actions/bookingAction';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import API from 'src/api';
import Loader from 'react-loader-spinner';
import moment from 'moment';
import { getRooms } from 'src/store/actions/roomsAction';
import {getHotelsPublic} from 'src/store/actions/hotelsAction';

const BookingCreate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { rooms } = useSelector((state) => state.rooms);
  const {publicHotels = []} = useSelector((state) => state.hotels || []);
  const { loading } = useSelector((state) => state.booking);
  const [isLoading, setIsLoading] = useState(false);

  const isUpdatePage = !!id;
  const handleSubmit = (values) => {
    const { _id, ...updateValues } = values;
    dispatch(
      isUpdatePage ? updateBooking(values) : createBooking(updateValues)
    );
  };
  useEffect(async () => {
    dispatch(getRooms());
    dispatch(getHotelsPublic());
    if (id) {
      setIsLoading(true);
      const res = await API({
        url: `/booking/${id}`,
        method: 'get'
      });
      setValues(res.data);
      setIsLoading(false);
    }
  }, []);
  const [values, setValues] = useState({
    roomId: '',
    cusName: '',
    phoneNumber: '',
    identityCard: '',
    totalAmount: '',
    startDate: moment(
      '2021-09-01T00:00:00.000Z',
      'YYYY-MM-DD hh:mm:ss A Z'
    ).format('yyyy-MM-DD'),
    endDate: moment(
      '2021-09-01T00:00:00.000Z',
      'YYYY-MM-DD hh:mm:ss A Z'
    ).format('yyyy-MM-DD'),
    _id: ''
  });
  
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
            <Grid item xs={12}>
              {isLoading ? (
                <div className="cover">
                  <Loader type="Puff" color="#000" />
                </div>
              ) : (
                <BookingCreateForm
                  isUpdatePage={isUpdatePage}
                  loading={loading}
                  initialValues={values}
                  handleSubmit={handleSubmit}
                  rooms={rooms}
                  hotels={publicHotels}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default BookingCreate;
