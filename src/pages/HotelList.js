import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import HotelListResults from '../components/hotel/HotelListResults';
import HotelListToolbar from '../components/hotel/HotelListToolbar';
import customers from '../__mocks__/customers';
import API from '../api';
import { useEffect, useRef, useState } from 'react';
import { deleteHotel, getHotels } from '../store/actions/hotelsAction';
import { useDispatch, useSelector } from 'react-redux';
const HotelList = () => {
  const { success, hotels, loading } = useSelector((state) => state.hotels);
  const { user } = useSelector((state) => state.auth);
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const isAdminRole = user?.role ? user?.role == 'admin' : false 
  console.log(isAdminRole)
  useEffect(() => {
    if (isFirstRender.current || success) {
      dispatch(getHotels());
      isFirstRender.current = false;
    }
  }, [success]);
  useEffect(() => {
    if (hotels) {
      setData(hotels);
    }
  }, [hotels]);
  const handleDelete = (id) => {
    dispatch(deleteHotel(id));
  };
  const handleSearch = (keyword) => {
    const updatedData = [...hotels].filter(
      (item) => item.hotelName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
    );
    setData(updatedData);
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
          <HotelListToolbar handleSearch={handleSearch} isAdminRole={isAdminRole}/>
          <Box sx={{ pt: 3 }}>
            <HotelListResults
              handleDelete={handleDelete}
              isLoading={loading}
              hotels={data}
              isAdminRole={isAdminRole}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HotelList;
