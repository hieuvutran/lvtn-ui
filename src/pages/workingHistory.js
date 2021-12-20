import { Box, Container } from '@material-ui/core';
import WorkingHistoryListResults from '../components/working/workingHistory';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getWorkingDay,getWorkingDayHistory } from 'src/store/actions/workingAction';
import { getEmployee } from 'src/store/actions/employeeAction';
import { useParams } from 'react-router';

const WorkingHistoryList = () => {
  const { success,workingDayHistory = [], loading } = useSelector(
    (state) => state.working
  );
  const { id } = useParams();
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
      if(id){
          dispatch(getWorkingDayHistory({query:{empId: id}}));
      }
  }, []);

  useEffect(() => {
    if (isFirstRender.current || success) {
      isFirstRender.current = false;
    }
  }, [success]);

  useEffect(() => {
    setData(workingDayHistory)
  }, [workingDayHistory]);

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
          <Box sx={{ pt: 3 }}>
            <WorkingHistoryListResults
              isLoading={loading}
              data={data}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default WorkingHistoryList;
