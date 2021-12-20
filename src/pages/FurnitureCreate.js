import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import FurnitureCreateForm from 'src/components/furnitureCreate/FurnitureCreateForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  createFurniture,
  getFurnitureTypes,
  updateFurniture
} from 'src/store/actions/furnituresAction';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import API from 'src/api';
import Loader from 'react-loader-spinner';
import { getRooms } from 'src/store/actions/roomsAction';

const FurnitureCreate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, furnitureTypes } = useSelector((state) => state.furnitures);
  const { rooms } = useSelector((state) => state.rooms);
  const [isLoading, setIsLoading] = useState(false);
  const isUpdatePage = !!id;
  const [open, setOpen] = useState(false);
  const handleSubmit = (values) => {
    const { _id, ...updateValues } = values;
    dispatch(
      isUpdatePage ? updateFurniture(values) : createFurniture(updateValues)
    );
  };
  useEffect(async () => {
    dispatch(getRooms());
    dispatch(getFurnitureTypes());
    if (id) {
      setIsLoading(true);
      const res = await API({
        url: `/furnitures/${id}`,
        method: 'get'
      });
      const { roomId ='', furnitureTypeId, ...rest } = res.data;
      setValues({
        ...rest,
        // roomId: roomId._id,
        furnitureTypeId: furnitureTypeId._id
      });
      setIsLoading(false);
    }
  }, []);
  const [values, setValues] = useState({
    furName: '',
    furnitureTypeId: '',
    quantity: 1,
    // roomId: '',
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
                <FurnitureCreateForm
                  isUpdatePage={isUpdatePage}
                  loading={loading}
                  initialValues={values}
                  handleSubmit={handleSubmit}
                  rooms={rooms}
                  furnitureTypes={furnitureTypes}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default FurnitureCreate;
