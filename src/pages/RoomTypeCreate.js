import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import RoomTypeCreateForm from 'src/components/roomCreate/TypeFurCreateForm';
import { useDispatch, useSelector } from 'react-redux';

import RoutesString from 'src/routes/routesString';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import API from 'src/api';
import Loader from 'react-loader-spinner';
import { createTypeRoom, updateTypeRoom } from 'src/store/actions/roomsAction';

const RoomTypeCreate = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.furnitures);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const isUpdatePage = !!id;
  const handleSubmit = async (values) => {
    const { _id, ...updateValues } = values;
    dispatch(
      isUpdatePage ? updateTypeRoom(values) : createTypeRoom(updateValues)
    );
  };

  useEffect(async () => {
    if (id) {
      setIsLoading(true);
      const res = await API({
        url: `/room-types/${id}`,
        method: 'get'
      });
      setValues(res.data);
      setIsLoading(false);
    }
  }, []);
  const [values, setValues] = useState({
    typeName: '',
    capacity: '',
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
                <RoomTypeCreateForm
                  loading={loading}
                  initialValues={values}
                  handleSubmit={handleSubmit}
                  isUpdatePage={isUpdatePage}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default RoomTypeCreate;
