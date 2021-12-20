import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

const WorkingTimeInMonth = ({
  data = [],
  isLoading,
  ...rest
}) => {
  const [selectedfurnitureIds, ] = useState([]);
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);
  
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const { push } = useHistory();

  
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          {isLoading ? (
            <div className="cover">
              <Loader type="Puff" color="#000" />
            </div>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                <TableCell align="right"></TableCell>
                
                  <TableCell  align="right">Tên NV</TableCell>
                  <TableCell  align="right">Tổng thời gian làm việc trong tháng (giờ)</TableCell>
                  <TableCell align="right"></TableCell>

                </TableRow>
              </TableHead>

              <TableBody>
                {data &&
                  Array.isArray(data) &&
                  data.slice(0, limit).map((e) => (
                    
                    <TableRow
                      hover
                      key={e?.empName}
                      selected={
                        selectedfurnitureIds.indexOf(e?.id) !== -1
                      }
                    >
                      <TableCell  align="right"></TableCell>
                      <TableCell  align="right">{e?.empName || ''}</TableCell>
                      <TableCell  align="right">{e?.workTime}</TableCell>
                      <TableCell  align="right"></TableCell>

                    {/* <TableCell></TableCell> */}
                    </TableRow>
                    
                  ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={data?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

WorkingTimeInMonth.propTypes = {
  working: PropTypes.array.isRequired
};

export default WorkingTimeInMonth;
