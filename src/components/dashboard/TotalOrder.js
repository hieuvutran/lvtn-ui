import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  colors,
  useTheme, CardHeader, Divider
} from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import { indigo } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


const TotalOrder = ({ totalOrder, publicHotels }) => {
  let amount = totalOrder?.reduce((sum, li) => sum + li.cartTotal, 0)
  amount = amount?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

  const hotelLocal = localStorage.getItem('hotelId');
  const theme = useTheme();

  const hotelData = publicHotels.map(item => {
    let total = 0;
    for (let i = 0; i < totalOrder?.length; i++) {
      if (item._id == totalOrder[i].roomNo.hotelId) {
        total += totalOrder[i].cartTotal
      }
    }
    return { "hotelName": item.hotelName, "quantity": total }
  })

  const data = {
    datasets: [
      {
        data: hotelData.map(hotel => hotel.quantity),
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.blue[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: hotelData.map(hotel => hotel.hotelName)
  };
  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };
  return (
    <div>
      {hotelLocal ? (
        <Card
          sx={{ height: '100%' }}
        >
          <CardContent>
            <Grid
              container
              spacing={3}
              sx={{ justifyContent: 'space-between' }}
            >
              <Grid item>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="h6"
                >
                  AMOUNT ORDER TODAY
                </Typography>
                <Typography
                  color="textPrimary"
                  variant="h3"
                >
                  {amount}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  sx={{
                    backgroundColor: indigo[600],
                    height: 56,
                    width: 56
                  }}
                >
                  <AttachMoneyIcon />
                </Avatar>
              </Grid>
            </Grid>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                pt: 2
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: colors.green[900],
                  mr: 1
                }}
              >

              </Typography>
              <Typography
                color="textSecondary"
                variant="caption"
              >
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) :
        (
          <Card >
            <CardHeader title="AMOUNT ORDER TODAY" />
            <Divider />
            <CardContent>
              <Box
                sx={{
                  height: 300,
                  position: 'relative'
                }}
              >
                <Doughnut
                  data={data}
                  options={options}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  pt: 2
                }}
              >
              </Box>
            </CardContent>
          </Card>
        )
      }
    </div>
  )
};

export default TotalOrder;
