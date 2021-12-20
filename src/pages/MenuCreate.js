import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import MenuCreateForm from 'src/components/foodCreate/MenuCreateForm';
import { useDispatch, useSelector } from 'react-redux';
import { createFood, createMenu, updateFood } from 'src/store/actions/foodsAction';
import RoutesString from 'src/routes/routesString';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import API from 'src/api';
import Loader from 'react-loader-spinner';

const MenuCreate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, listMenu } = useSelector((state) => state.foods);
  const [isLoading, setIsLoading] = useState(false);
  const isUpdatePage = !!id;
  const handleSubmit = (values) => {
    const { _id, ...updateValues } = values;
    dispatch(createMenu(updateValues));
  };
  // useEffect(async () => {
  //   if (id) {
  //     setIsLoading(true);
  //     const res = await API({
  //       url: `/foods/${id}`,
  //       method: 'get'
  //     });
  //     setValues(res.data);
  //     setIsLoading(false);
  //   }
  // }, []);
  const [values, setValues] = useState({
    menuName: '',
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
                <MenuCreateForm
                  // isUpdatePage={isUpdatePage}
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

export default MenuCreate;
