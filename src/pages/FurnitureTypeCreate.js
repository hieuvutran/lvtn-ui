import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import TypeFurCreateForm from 'src/components/furnitureCreate/TypeFurCreateForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  createFurniture,
  getFurnitureTypes,
  updateFurniture,
  createFurnitureType
} from 'src/store/actions/furnituresAction';
import RoutesString from 'src/routes/routesString';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import API from 'src/api';
import Loader from 'react-loader-spinner';

const FurnitureTypeCreate = () => {
  const dispatch = useDispatch();
  const { loading, furnitureTypes } = useSelector((state) => state.furnitures);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSubmit = async (values) => {
    const { _id, ...updateValues } = values;
    dispatch(
      createFurnitureType(updateValues)
    );
  };

  const [values, setValues] = useState({
    furTypeName: '',
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
                <TypeFurCreateForm
                  isUpdatePage={false}
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

export default FurnitureTypeCreate;
