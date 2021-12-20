import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import getInitials from '../../utils/getInitials';
import Loader from 'react-loader-spinner';
import { CheckSquare, Settings, Trash2 } from 'react-feather';
import RoutesString from 'src/routes/routesString';
const RoomTypeListResults = ({ handleDelete, roomTypes, isLoading, ...rest }) => {
  const [selectedroomIds, setSelectedroomIds] = useState([]);
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
                  <TableCell>Tên loại phòng</TableCell>
                  <TableCell>Capacity</TableCell>
                  <TableCell>
                    <Settings size="20" />
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {roomTypes.slice(0, limit).map((room) => (
                  <TableRow
                    hover
                    key={room._id}
                    selected={selectedroomIds.indexOf(room.id) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {room.typeName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          push(RoutesString.RoomTypeUpdate.replace(':id', room._id))
                        }
                      >
                        <CheckSquare size="20" />
                      </Button>
                      <Button
                        sx={{ mx: 1 }}
                        color="error"
                        variant="contained"
                        onClick={() => handleDelete(room._id)}
                      >
                        <Trash2 size="20" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={roomTypes.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

RoomTypeListResults.propTypes = {
  rooms: PropTypes.array.isRequired
};

export default RoomTypeListResults;
