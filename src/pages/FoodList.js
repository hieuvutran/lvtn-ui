import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import FoodListResults from '../components/food/FoodListResults';
import FoodListToolbar from '../components/food/FoodListToolbar';
import customers from '../__mocks__/customers';
import API from '../api';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFood, getFoods, getMenu } from 'src/store/actions/foodsAction';
const FoodList = () => {
  const { success, listMenu, loading } = useSelector((state) => state.foods);
  const [menu, setMenu] = useState(null);
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current || success) {
      dispatch(getMenu());
      isFirstRender.current = false;
    }
  }, [success]);

  useEffect(() => {
    if (listMenu.length > 0) {
      setMenu(listMenu);
    }
  }, [listMenu]);
  const handleDelete = (id) => {
    dispatch(deleteFood(id));
  };
  const handleSearch = (keyword) => {
    const updatedMenu = [...listMenu].filter(
      (item) => item.foodName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
      );
      console.log(updatedMenu)

    setMenu(updatedMenu);
  };
  const handleChangeMenu = (value) => {
    // const menu = listMenu.find((item) => item._id === value);
    // setMenu(menu);
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
          {!loading && (
            <FoodListToolbar
              listMenu={listMenu}
              handleChangeMenu={handleChangeMenu}
              menu={menu}
              handleSearch={handleSearch}
            />
          )}
          <Box sx={{ pt: 3 }}>
            <FoodListResults
              handleDelete={handleDelete}
              isLoading={loading}
              foods={menu || []}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FoodList;
