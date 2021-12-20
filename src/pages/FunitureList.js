import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import FurnitureListResults from '../components/furniture/FurnitureListResults';
import FurnitureListToolbar from '../components/furniture/FurnitureListToolbar';
import customers from '../__mocks__/customers';
import {
  deleteFurniture,
  getFurnitures,
  searchFurniture
} from 'src/store/actions/furnituresAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getRooms } from 'src/store/actions/roomsAction';

const FurnitureList = () => {
  const { success, furnitures, loading } = useSelector(
    (state) => state.furnitures
  );
  const { rooms } = useSelector((state) => state.rooms);
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const [room, setRoom] = useState();
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    dispatch(getRooms());
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      setRoom(rooms[0]);
    }
  }, [rooms]);
  const handleChangeRoom = (value) => {
    const room = rooms.find((item) => item._id === value);
    setRoom(room);
  };
  useEffect(() => {
    if (isFirstRender.current || success) {
      // dispatch(getFurnitures());
      isFirstRender.current = false;
    }
  }, [success]);
  useEffect(() => {
    handleFilter( room, keyword);
  }, [room, furnitures, keyword]);
  const handleDelete = (id) => {
    dispatch(deleteFurniture({roomId: room._id,furId: id}));
    dispatch(getRooms());
    setRoom()
    // window.location.reload()
  };
  const handleSearch = (keyword) => {
    setKeyword(keyword);
  };
  const handleFilter = ( room = {}, keyword = '') => {
    const furnitures = room.furnitures || [];
    let updatedData = furnitures;
    // let updatedData = furnitures?.filter(
    //   (item) => item?.roomId?._id === room._id
    // );
    if (keyword) {
      updatedData = updatedData?.filter(
        (item) =>
          item?.furName?.toLowerCase().indexOf(keyword?.toLowerCase()) > -1
      );
    }
    setData(updatedData);
  };
  const handleAddFurniture = (furId) => {
    console.log(furId)
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
        <Container maxWidth={false}>
          <FurnitureListToolbar
            handleChangeRoom={handleChangeRoom}
            rooms={rooms}
            handleSearch={handleSearch}
            room={room}
            handleAddFurniture={handleAddFurniture}
          />
          <Box sx={{ pt: 3 }}>
            <FurnitureListResults
              handleDelete={handleDelete}
              isLoading={loading}
              furnitures={data}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FurnitureList;
