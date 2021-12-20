import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import FoodCreateForm from 'src/components/foodCreate/FoodCreateForm';
import { useDispatch, useSelector } from 'react-redux';
import { createFood, updateFood } from 'src/store/actions/foodsAction';
import RoutesString from 'src/routes/routesString';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import API from 'src/api';
import Loader from 'react-loader-spinner';

const FoodCreate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, listMenu } = useSelector((state) => state.foods);
  const [isLoading, setIsLoading] = useState(false);
  const isUpdatePage = !!id;
  const [img, setImg] = useState();

  const handleSubmit = (values) => {
    const { _id, ...updateValues } = values;
    updateValues.img = img;
    values.img = img;
    dispatch(isUpdatePage ? updateFood(values) : createFood(updateValues));
  };
  useEffect(async () => {
    if (listMenu.length > 0) {
      setValues(o => {
        return {...o, menu: listMenu[0]?._id || ''}
      })
    }
  }, [listMenu]);
  useEffect(async () => {
    if (id) {
      setIsLoading(true);
      const res = await API({
        url: `/foods/${id}`,
        method: 'get'
      });
      setValues(res.data);
      setIsLoading(false);
    }
  }, []);

  const upLoadImg = (img) => {
    setImg(img)
  }
  const [values, setValues] = useState({
    foodName: '',
    foodType: '',
    unitPrice: '',
    quantity: '',
    _id: '',
    img: '',
    menu: ''
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
                <FoodCreateForm
                  isUpdatePage={isUpdatePage}
                  loading={loading}
                  initialValues={values}
                  handleSubmit={handleSubmit}
                  menu={listMenu}
                  onUpLoadImg = {upLoadImg}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default FoodCreate;
