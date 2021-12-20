import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import RoomListResults from '../components/room/RoomListResults';
import RoomListToolbar from '../components/room/RoomListToolbar';
import customers from '../__mocks__/customers';
import API from '../api';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoom, getRooms } from 'src/store/actions/roomsAction';
const RoomList = () => {
  const { success, rooms, loading } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (rooms) {
      setData(rooms);
    }
  }, [rooms]);
  console.log('rooms', rooms);
  useEffect(() => {
    if (isFirstRender.current || success) {
      dispatch(getRooms());
      isFirstRender.current = false;
    }
  }, [success]);
  const handleDelete = (id) => {
    dispatch(deleteRoom(id));
  };
  const handleSearch = (keyword) => {
    const updatedData = [...rooms].filter(
      (item) => item.roomName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
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
          <RoomListToolbar handleSearch={handleSearch} />
          <Box sx={{ pt: 3 }}>
            <RoomListResults
              handleDelete={handleDelete}
              isLoading={loading}
              rooms={data}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default RoomList;
