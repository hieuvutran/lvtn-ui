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
import getInitials from '../../utils/getInitials';
import Loader from 'react-loader-spinner';
import { CheckSquare, Info, Settings, Trash2 } from 'react-feather';
import { useHistory } from 'react-router';
import RoutesString from 'src/routes/routesString';

const HotelListResults = ({ handleDelete, hotels, isLoading,isAdminRole, ...rest }) => {
  const [selectedhotelIds, setSelectedhotelIds] = useState([]);
  const { push } = useHistory();
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedhotelIds;

    if (event.target.checked) {
      newSelectedhotelIds = hotels.map((hotel) => hotel.id);
    } else {
      newSelectedhotelIds = [];
    }

    setSelectedhotelIds(newSelectedhotelIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedhotelIds.indexOf(id);
    let newSelectedhotelIds = [];

    if (selectedIndex === -1) {
      newSelectedhotelIds = newSelectedhotelIds.concat(selectedhotelIds, id);
    } else if (selectedIndex === 0) {
      newSelectedhotelIds = newSelectedhotelIds.concat(
        selectedhotelIds.slice(1)
      );
    } else if (selectedIndex === selectedhotelIds.length - 1) {
      newSelectedhotelIds = newSelectedhotelIds.concat(
        selectedhotelIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedhotelIds = newSelectedhotelIds.concat(
        selectedhotelIds.slice(0, selectedIndex),
        selectedhotelIds.slice(selectedIndex + 1)
      );
    }

    setSelectedhotelIds(newSelectedhotelIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
                  {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedhotelIds.length === hotels.length}
                    color="primary"
                    indeterminate={
                      selectedhotelIds.length > 0
                      && selectedhotelIds.length < hotels.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                  <TableCell>Tên khách sạn</TableCell>
                  <TableCell>Địa chỉ</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Tài khoản quản lý</TableCell>
                  <TableCell>
                    {isAdminRole ? <Settings size="20" /> : ''}
                  </TableCell>
                  
                  {/* <TableCell>
                  Registration date
                </TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {hotels &&
                  Array.isArray(hotels) &&
                  hotels?.slice(0, limit).map((hotel) => (
                    <TableRow
                      hover
                      key={hotel._id}
                      selected={selectedhotelIds.indexOf(hotel.id) !== -1}
                    >
                      {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedhotelIds.indexOf(hotel.id) !== -1}
                      onChange={(event) => handleSelectOne(event, hotel.id)}
                      value="true"
                    />
                  </TableCell> */}
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {hotel.hotelName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{hotel.address}</TableCell>
                      <TableCell>{hotel.phoneNumber}</TableCell>
                      <TableCell>{hotel.managerAcc?.username || ''}</TableCell>
                      {isAdminRole ? <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() =>
                            push(
                              RoutesString.HotelUpdate.replace(':id', hotel._id)
                            )
                          }
                        >
                          <CheckSquare size="20" />
                        </Button>
                        <Button
                          sx={{ mx: 1 }}
                          color="error"
                          onClick={() => handleDelete(hotel._id)}
                          variant="contained"
                        >
                          <Trash2 size="20" />
                        </Button>
                      </TableCell> : <TableCell>
                      <Button
                          variant="outlined"
                          onClick={() =>
                            push(
                              RoutesString.HotelUpdate.replace(':id', hotel._id)
                            )
                          }
                        >
                          <Info size="20" />
                        </Button>
                        </TableCell>}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={hotels?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

HotelListResults.propTypes = {
  hotels: PropTypes.array
};

export default HotelListResults;
