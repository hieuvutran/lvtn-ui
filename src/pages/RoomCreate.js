import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import RoomCreateForm from 'src/components/roomCreate/RoomCreateForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  createRoom,
  getRoomTypes,
  updateRoom
} from 'src/store/actions/roomsAction';
import RoutesString from 'src/routes/routesString';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import API from 'src/api';
import Loader from 'react-loader-spinner';
import { getHotels } from '../store/actions/hotelsAction';

const RoomCreate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, roomTypes } = useSelector((state) => state.rooms);
  const [isLoading, setIsLoading] = useState(false);
  const { hotels } = useSelector((state) => state.hotels);

  const isUpdatePage = !!id;
  const handleSubmit = (values) => {
    const { _id, ...updateValues } = values;
    dispatch(isUpdatePage ? updateRoom(values) : createRoom(updateValues));
  };
  useEffect(async () => {
    dispatch(getHotels());
    dispatch(getRoomTypes());
    if (id) {
      setIsLoading(true);
      const res = await API({
        url: `/rooms/${id}`,
        method: 'get'
      });
      let defaultValue = res.data;
      defaultValue.hotelId = res.data?.hotelId?._id || ''
      defaultValue.roomTypeId = res.data?.roomTypeId?._id || ''
      setValues(defaultValue);
      setIsLoading(false);
    }
  }, []);
  const [values, setValues] = useState({
    roomName: '',
    hotelId: '',
    roomTypeId: '',
    roomNo: '',
    unitPrice: 0,
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
                <RoomCreateForm
                  hotels={hotels}
                  roomTypes={roomTypes}
                  isUpdatePage={isUpdatePage}
                  loading={loading}
                  initialValues={values}
                  handleSubmit={handleSubmit}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default RoomCreate;
