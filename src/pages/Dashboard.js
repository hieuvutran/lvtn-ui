import { Helmet } from 'react-helmet';
import { getDashBoard } from 'src/store/actions/dashboardAction';
import {getHotelsPublic} from 'src/store/actions/hotelsAction'
import { Box, Container, Grid } from '@material-ui/core';
import TotalEmployee from '../components/dashboard/TotalEmployee';
import LatestOrders from '../components/dashboard/LatestOrders';
import LatestProducts from '../components/dashboard/LatestProducts';
import Sales from '../components/dashboard/Sales';
import TotalOrder from '../components/dashboard/TotalOrder';
import TotalBooking from '../components/dashboard/TotalBooking';
import TotalCheckIn from '../components/dashboard/TotalCheckIn';
import TrafficByDevice from '../components/dashboard/TrafficByDevice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const { publicHotels = [] } = useSelector((state) => state.hotels || []);
  useEffect(() => {
    dispatch(getHotelsPublic())

  }, [])

  const { dashboard } = useSelector(
    (state) => state.dashboard
  );
  useEffect(() => {
    dispatch(getDashBoard());
  }, []);
  useEffect(() => {
    setData(dashboard);
  }, [dashboard]);
  return (
  <>
    <Helmet>
      <title>Dashboard | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      {data ? 
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalEmployee
            emp = {data?.listEmp}
            publicHotels = {publicHotels}
            />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalBooking
             booking = {data?.listBooking}
             publicHotels = {publicHotels}

             />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalOrder
            totalOrder = {data?.listOrder}
            publicHotels = {publicHotels}

            />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCheckIn
            totalCheckIn = {data?.listCheckin}
            publicHotels = {publicHotels}

            />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales lastSevenDay = {data?.lastSevenDayCheckIn} publicHotels={publicHotels} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders orders = {data?.listOrder}/>
          </Grid>
        </Grid>
      </Container> : " " }
    </Box>
  </>)
};

export default Dashboard;
