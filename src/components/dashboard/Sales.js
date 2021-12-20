import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

function getSevenDay() {
  let arrDay = [];
  for (let a = 7; a > 0; a--) {
    const curr = new Date();
    let firstday = new Date(curr.setDate(curr.getDate() - a + 1)).toUTCString().slice(5, 11);


    arrDay.push(firstday)
  }
  return arrDay
}

const Sales = ({ lastSevenDay,  publicHotels}) => {
  const hotelLocal = localStorage.getItem('hotelId');
  console.log(hotelLocal)
  const listcolor = [colors.indigo[500], colors.red[600], colors.orange[600], colors.blue[600] ]
  const theme = useTheme();
  const week = getSevenDay()
  let today = new Date()
  const hotelData = publicHotels.map(item => {
    let arrData = [0, 0, 0, 0, 0, 0, 0]
    for (let a = 6; a >= 0; a--) {
      for (let i = 0; i < lastSevenDay?.length; i++) {
        const day = new Date(lastSevenDay[i]?.createAt)
        if (day.getDate() == (today.getDate() - a) && item._id == lastSevenDay[i]?.roomId.hotelId) {
          arrData[6 - a]++
        }
      }
    }
    return { "hotelName": item.hotelName, "quantity": arrData, "hotelId": item._id }
  })
  const data = hotelLocal ? {
     datasets: hotelData.filter(hotel=> hotel.hotelId == hotelLocal).map((hotel,index) => {
      return{
        "backgroundColor":listcolor[index],
        "barPercentage": 1,
        "barThickness": 12,
        "borderRadius": 4,
        "categoryPercentage": 1,
        "data": hotel.quantity,
        "label": hotel.hotelName,
        "maxBarThickness": 10

    }
      })
    ,
    labels: week
  }:
  {
    datasets: hotelData.map((hotel,index) => {
      return{
        "backgroundColor":listcolor[index],
        "barPercentage": 1,
        "barThickness": 12,
        "borderRadius": 4,
        "categoryPercentage": 1,
        "data": hotel.quantity,
        "label": hotel.hotelName,
        "maxBarThickness": 10
      }
      })
    ,
    labels: week
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon />}
            size="small"
            variant="text"
          >
            Last 7 days
          </Button>
        )}
        title="Latest Booking"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

export default Sales;
