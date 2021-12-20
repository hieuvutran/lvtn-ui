import { Box, Container } from '@material-ui/core';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import WorkingListResults from '../components/working/workingList';
import WorkingListToolbar from '../components/working/workingToolBar';
import WorkTimeInMonthToolBar from '../components/working/workTimeInMonthToolBar'
import WorkingTimeInMonth from '../components/working/workTimeInMonth'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getWorkingDay, getWorkingMonth } from 'src/store/actions/workingAction';
import { getEmployee } from 'src/store/actions/employeeAction';
import "react-datepicker/dist/react-datepicker.css";

const WorkingList = () => {
  const { success,workingDay = [], workingMonth = [], loading } = useSelector(
    (state) => state.working
  );
  const {employee = [] } = useSelector(
    (state) => state.employee
  );
  let now = new Date();
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [workingMonthData, setWorkingMonthData] = useState([]);
  const [empIdChosen, setEmpIdChosen] = useState(null);
  const [workDay, setWorkDay] = useState(now.toJSON().split('T')[0])
  const Month = now.toJSON().slice(0,7);
  
  useEffect(() => {
    dispatch(getWorkingDay({query:{workDay: workDay}}));
    dispatch(getWorkingMonth({query:{workMonth: Month}}))
    dispatch(getEmployee({}));
  }, []);

  useEffect(() => {
    if (isFirstRender.current || success) {
      isFirstRender.current = false;
    }
  }, [success]);


  useEffect(() => {
    setData(workingDay);
  }, [workingDay]);

  console.log(workingMonth)


  useEffect(() => {
    if(empIdChosen){
      dispatch(getWorkingDay({query:{workDay: workDay, empId: empIdChosen}}));
    }else{
      dispatch(getWorkingDay({query:{workDay: workDay, empId: empIdChosen}}));
    }
  }, [empIdChosen, workDay]);
  
  const handleFilter = (evt) => {
    setWorkDay(evt.target?.value)
    // if(evt.target?.value){
    //   // dispatch(getWorkingDay({query}));
    // }
  };

  const handleChangeEmpId = (empId) => {
    setEmpIdChosen(empId);
  }
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const monthChange = (date) => {
    const Month = date.toJSON().slice(0,7);
    dispatch(getWorkingMonth({query:{workMonth: Month}}))
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
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Hôm nay" value="1" />
            <Tab label="Thống kê" value="2" />
            
          </TabList>
        </Box>
        <TabPanel value="1">
        <Container maxWidth={false}>
          <WorkingListToolbar
            handleFilter={handleFilter}
            // handleSearch={handleSearch}
            handleChangeEmpId={handleChangeEmpId}
            employee={empIdChosen}
            listEmp={employee}
          />
          <Box sx={{ pt: 3 }}>
            <WorkingListResults
              isLoading={loading}
              data={data}
              
            />
          </Box>
        </Container>
        </TabPanel>
        <TabPanel value="2">
        <Container maxWidth={false}>
          <WorkTimeInMonthToolBar
          monthChange={monthChange}
          />
          <Box sx={{ pt: 3 }}>
            <WorkingTimeInMonth
              isLoading={loading}
              data={workingMonth}
              
            />
          </Box>
        </Container>
       
        </TabPanel>
        
      </TabContext>
      </Box>

    </>
  );
};

export default WorkingList;
