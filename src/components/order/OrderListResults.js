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
import { CheckSquare, Settings, Trash2 } from 'react-feather';
import { useHistory } from 'react-router';
import RoutesString from 'src/routes/routesString';

const OrderListResults = ({ handleDelete, orders, isLoading, ...rest }) => {
  const [selectedorderIds, setSelectedorderIds] = useState([]);
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
                  {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedorderIds.length === orders.length}
                    color="primary"
                    indeterminate={
                      selectedorderIds.length > 0
                      && selectedorderIds.length < orders.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                  <TableCell>Tên KH</TableCell>
                  <TableCell>Số phòng</TableCell>
                  <TableCell>Ngày order</TableCell>
                  <TableCell>Món ăn</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Tổng tiền</TableCell>
                  <TableCell>
                    <Settings size="20" />
                  </TableCell>
                  {/* <TableCell>
                  Registration date
                </TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.slice(0, limit).map((order) => (
                  <TableRow
                    hover
                    key={order._id}
                    selected={selectedorderIds.indexOf(order.id) !== -1}
                  >
                    <TableCell>{order?.cusName || ''}</TableCell>
                    <TableCell>{order.roomNo.roomName}</TableCell>
                    <TableCell>{order.orderDay.slice(11, 19)}</TableCell>
                    <TableCell>{order?.foods ? order?.foods?.map(e => `${e.foodName} - SL: ${e.quantity}`).join('\n\n') : ''}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.cartTotal.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</TableCell>

                    <TableCell></TableCell>

                    {/* <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          push(
                            RoutesString.OrderUpdate.replace(':id', order._id)
                          )
                        }
                      >
                        <CheckSquare size="20" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(order._id)}
                        sx={{ mx: 1 }}
                        color="error"
                        variant="contained"
                      >
                        <Trash2 size="20" />
                      </Button>
                    </TableCell> */}
                  </TableRow>
                )
                )}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">{orders.reduce((sum, li) => sum + li.cartTotal, 0).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})// 17.5
                  }</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={orders.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OrderListResults.propTypes = {
  orders: PropTypes.array
};

export default OrderListResults;
