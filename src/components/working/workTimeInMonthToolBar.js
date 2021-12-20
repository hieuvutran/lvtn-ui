import {
    Box,
    Card,
    CardContent,
  } from '@material-ui/core';
  import DatePicker from 'react-datepicker';
  import { useState } from 'react';
  import "./style.css";


  const WorkTimeInMonthToolBar = ({
    monthChange
  }) => {
    const [startDate, setStartDate] = useState(new Date());
    const setMonthChange = (date) => {
      monthChange(date);
      setStartDate(date);
    };
  

    return (
      <Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent style={{display: "flex", gap: "10px"}}>
              <Box sx={{ maxWidth: 300 }}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setMonthChange(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        
                    />            
              </Box>
            </CardContent>
          </Card>
        </Box>
      
      </Box>
    );
  };
  
  export default WorkTimeInMonthToolBar;
