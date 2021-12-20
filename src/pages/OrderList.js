import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import OrderListResults from '../components/order/OrderListResults';
import OrderListToolbar from '../components/order/OrderListToolbar';
import customers from '../__mocks__/customers';
import API from '../api';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteOrder,
  getOrders,
  getMenu
} from 'src/store/actions/ordersAction';
const OrderList = () => {
  const { success, listMenu, loading, orders } = useSelector((state) => state.orders);
  const [menu, setMenu] = useState(null);
  const dispatch = useDispatch();
  const [orderDay, setOrderDay] = useState((new Date()).toJSON().split("T")[0])
  const isFirstRender = useRef(true);
  const [listOrders, setListOrders] = useState([])
  useEffect(() => {
    dispatch(getMenu());
    
  }, []);

  useEffect(() => {
    setListOrders(orders)
  }, [orders]);

  // useEffect(() => {
  //   console.log('success', success);
  //   if (isFirstRender.current || success) {
  //     dispatch(getOrders());
  //     isFirstRender.current = false;
  //   }
  // }, [success]);

  console.log('menu', loading, orders, listMenu);
  useEffect(() => {
    if (listMenu.length > 0) {
      setMenu(listMenu[0]);
      dispatch(getOrders({query: { orderDay: orderDay }}));
    }
  }, [listMenu, orderDay]);

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };
  const handleSearch = (keyword) => {
    const updatedOrders = [...menu.orders].filter(
      (item) => item.orderName.indexOf(keyword) > -1
    );
    const updatedMenu = { ...menu, orders: updatedOrders };
    setMenu(updatedMenu);
  };
  const handleChangeMenu = (value) => {
    const menu = listMenu.find((item) => item._id === value);
    dispatch(getOrders({query: {menu: menu._id}}));
    setMenu(menu);
  };
  const handleFilter = (evt) => {
    let dayFilter = evt.target?.value || '';
    setOrderDay(dayFilter)
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
          {!loading && (
            <OrderListToolbar
              listMenu={listMenu}
              handleChangeMenu={handleChangeMenu}
              menu={menu}
              handleFilter={handleFilter}
              orderDay={orderDay}
            />
          )}
          <Box sx={{ pt: 3 }}>
            <OrderListResults
              handleDelete={handleDelete}
              isLoading={loading}
              orders={listOrders || []}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OrderList;
