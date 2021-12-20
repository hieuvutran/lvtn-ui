import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
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
  const {id}=useParams();
  const {loading}=useSelector(state=>state.foods)
  const [isLoading,setIsLoading]=useState(false);
  const isUpdatePage= !!id;
  const handleSubmit=(values)=>{
    const {_id,...updateValues} =values
     dispatch(isUpdatePage? updateFood(values) : createFood(updateValues))
    }
    useEffect(async () => {
      if(id){
        setIsLoading(true)
        const res = await API({
          url:`/foods/${id}`,
          method:'get'
        })
        setValues(res.data);
        setIsLoading(false)
      }
    }, [])
const [values,setValues]=useState( {foodName: '',
foodType: '',
unitPrice: '',
quantity: '',
_id:''})
 return <>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
              {isLoading?
  <div className="cover">
              <Loader type="Puff" color="#000" />
  </div>
:
            <FoodCreateForm isUpdatePage={isUpdatePage} loading={loading} initialValues={values} handleSubmit={handleSubmit} />
          }
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
};

export default FoodCreate;
