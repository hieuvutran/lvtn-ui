import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import Loader from 'react-loader-spinner';
import { CheckSquare, Settings, Trash2, AlertCircle } from 'react-feather';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import RoutesString from 'src/routes/routesString';

const WorkingListResults = ({
  data = [],
  isLoading,
  ...rest
}) => {
  const [selectedfurnitureIds, setSelectedfurnitureIds] = useState([]);
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const { push } = useHistory();

  const handleNavigate = (url) => {
    push(url)
  }
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
                  <TableCell>Tên NV</TableCell>
                  <TableCell>Điểm danh đầu tiên</TableCell>
                  <TableCell>Điểm danh cuối</TableCell>
                  <TableCell>Số giờ</TableCell>
                  <TableCell>
                    <Settings size="20" />
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data &&
                  Array.isArray(data) &&
                  data.slice(0, limit).map((e) => (
                    
                    <TableRow
                      hover
                      key={e?._id}
                      selected={
                        selectedfurnitureIds.indexOf(e?.id) !== -1
                      }
                    >
                      <TableCell>{e?.empId.empName || ''}</TableCell>
                      <TableCell>{(new Date(e?.checkIn[0])).toLocaleString()}</TableCell>
                      <TableCell>{(new Date(e?.checkIn[e.checkIn.length - 1])).toLocaleString()}</TableCell>
                      <TableCell>{e?.workTime}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() =>
                            push(
                              RoutesString.WorkingHistoryList.replace(':id', e.empId)
                            )
                          }
                        >
                          <CheckSquare size="20" />
                        </Button>
                    </TableCell>
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

WorkingListResults.propTypes = {
  working: PropTypes.array.isRequired
};

export default WorkingListResults;
