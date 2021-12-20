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
import { CheckSquare, Settings, Trash2, AlertCircle } from 'react-feather';
import { useHistory } from 'react-router';
import RoutesString from 'src/routes/routesString';
import { useDispatch } from 'react-redux';
import { openModal } from 'src/store/actions/modalAction';

const BookingListResults = ({
  booking = [],
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
                  <TableCell>Tên nội thất</TableCell>
                  <TableCell>Loại nội thất</TableCell>
                  <TableCell>Ngày thêm</TableCell>
                  <TableCell>
                    <Settings size="20" />
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {furnitures &&
                  Array.isArray(furnitures) &&
                  furnitures.slice(0, limit).map((furniture) => (
                    <TableRow
                      hover
                      key={furniture?._id}
                      selected={
                        selectedfurnitureIds.indexOf(furniture?.id) !== -1
                      }
                    >
                      {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedfurnitureIds.indexOf(furniture.id) !== -1}
                      onChange={(event) => handleSelectOne(event, furniture.id)}
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
                            {furniture?.furName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {furniture?.furnitureTypeId?.furTypeName}
                      </TableCell>
                      <TableCell>{furniture?.createdAt ? furniture?.createdAt.split('.')[0] : ''}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={furnitures?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

BookingListResults.propTypes = {
  booking: PropTypes.array.isRequired
};

export default BookingListResults;
