import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RoutesString from 'src/routes/routesString';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
  Typography
} from '@material-ui/core';
import Loader from 'react-loader-spinner';
import { CheckSquare, Settings, Trash2 } from 'react-feather';
const RoomListResults = ({ handleDelete, rooms, isLoading, ...rest }) => {
  const [selectedroomIds, setSelectedroomIds] = useState([]);
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedroomIds;

    if (event.target.checked) {
      newSelectedroomIds = rooms.map((room) => room.id);
    } else {
      newSelectedroomIds = [];
    }

    setSelectedroomIds(newSelectedroomIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedroomIds.indexOf(id);
    let newSelectedroomIds = [];

    if (selectedIndex === -1) {
      newSelectedroomIds = newSelectedroomIds.concat(selectedroomIds, id);
    } else if (selectedIndex === 0) {
      newSelectedroomIds = newSelectedroomIds.concat(selectedroomIds.slice(1));
    } else if (selectedIndex === selectedroomIds.length - 1) {
      newSelectedroomIds = newSelectedroomIds.concat(
        selectedroomIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedroomIds = newSelectedroomIds.concat(
        selectedroomIds.slice(0, selectedIndex),
        selectedroomIds.slice(selectedIndex + 1)
      );
    }

    setSelectedroomIds(newSelectedroomIds);
  };

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
                  <TableCell>Tên phòng</TableCell>
                  <TableCell>Tên khách sạn</TableCell>
                  <TableCell>Loại phòng</TableCell>
                  <TableCell>Số phòng</TableCell>
                  <TableCell>Giá tiền</TableCell>
                  <TableCell>Tình trạng phòng</TableCell>

                  <TableCell>
                    <Settings size="20" />
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rooms.slice(0, limit).map((room) => (
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
                          {room.roomName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{room.hotelId?.hotelName}</TableCell>
                    <TableCell>{room.roomTypeId.typeName}</TableCell>
                    <TableCell>{room.roomNo}</TableCell>
                    <TableCell>{room.unitPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</TableCell>
                    <TableCell>{room.status ? <Chip label="Đã cho thuê" color='secondary'/> :  <Chip label="Còn trống" color='primary'/>}</TableCell>

                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          push(RoutesString.RoomUpdate.replace(':id', room._id))
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
        count={rooms.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

RoomListResults.propTypes = {
  rooms: PropTypes.array
};

export default RoomListResults;
