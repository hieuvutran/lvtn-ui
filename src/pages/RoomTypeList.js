import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import RoomTypeListResults from '../components/room/RoomTypeListResults';
import RoomTypeToolbar from '../components/room/RoomTypeToolbar';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTypeRoom, getRooms, getRoomTypes } from 'src/store/actions/roomsAction';
const RoomTypeList = () => {
  const { success, roomTypes, loading } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (roomTypes) {
      setData(roomTypes);
    }
  }, [roomTypes]);
  console.log('roomTypes', roomTypes);
  useEffect(() => {
    if (isFirstRender.current || success) {
      dispatch(getRoomTypes());
      isFirstRender.current = false;
    }
  }, [success]);
  const handleDelete = (id) => {
    dispatch(deleteTypeRoom(id));
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
          <RoomTypeToolbar />
          <Box sx={{ pt: 3 }}>
            <RoomTypeListResults
              handleDelete={handleDelete}
              isLoading={loading}
              roomTypes={data}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default RoomTypeList;
