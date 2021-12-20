import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  colors,
  Typography,
  CardHeader,
  Divider,
  useTheme
} from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import PeopleIcon from '@material-ui/icons/Money';
import { red, green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


const TotalEmployee = ({ emp, publicHotels }) => {
  console.log(publicHotels)
  const hotelLocal = localStorage.getItem('hotelId');
  const theme = useTheme();
  const hotelData = publicHotels.map(item => {
    let number = 0;
    for (let i = 0; i < emp?.length; i++) {
      if (item._id == emp[i].hotelId) {
        number++
      }
    }
    return { "hotelName": item.hotelName, "quantity": number }
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
    <Card>
      {hotelLocal ?
        (
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
                    TOTAL EMPLOYEE
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="h3"
                  >{emp?.length}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    sx={{
                      backgroundColor: red[600],
                      height: 56,
                      width: 56
                    }}
                  >
                    <PeopleIcon />
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
                    color: green[900],
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
            <CardHeader title="TOTAL EMPLOYEE" />
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
    </Card>
  )
};

export default TotalEmployee;
