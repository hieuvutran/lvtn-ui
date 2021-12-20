import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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

const CheckInListResults = ({
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
                  <TableCell>Tên KH</TableCell>
                  <TableCell>Số điện thoại </TableCell>
                  <TableCell>Check-In</TableCell>
                  <TableCell>Phòng</TableCell>
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
                      <TableCell>{e?.cusId?.cusName || ''}</TableCell>
                      <TableCell>{e?.cusId?.phoneNumber || ''}</TableCell>
                      <TableCell>{(new Date(e?.createdAt)).toLocaleString()}</TableCell>
                      <TableCell>{e?.roomId?.roomName || ''}</TableCell>

                      <TableCell></TableCell>
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

CheckInListResults.propTypes = {
  booking: PropTypes.array
};

export default CheckInListResults;
