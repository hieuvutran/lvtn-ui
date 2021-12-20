import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
} from '@material-ui/core';
import Loader from 'react-loader-spinner';
import { CheckSquare, Settings, Trash2, AlertCircle } from 'react-feather';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import RoutesString from 'src/routes/routesString';
import { openModal } from 'src/store/actions/modalAction';

const WareHouseResults = ({
  data = [],
  isLoading,
  handleDelete,
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
                  <TableCell>Tên</TableCell>
                  <TableCell>Loại</TableCell>
                  <TableCell>Thời gian nhập</TableCell>
                  <TableCell>Thời gian xuất</TableCell>
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
                      <TableCell>{e?.name || ''}</TableCell>
                      <TableCell>{e?.type || ''}</TableCell>
                      <TableCell>{e?.stockReceivingAt ? (new Date(e?.stockReceivingAt)).toLocaleString() : ''}</TableCell>
                      <TableCell>{e?.stockDeliveringAt ? (new Date(e?.stockDeliveringAt)).toLocaleString() : ''}</TableCell>
                      <TableCell>
                      <Button
                            variant="outlined"
                            sx={{ mx: 1 }}
                            onClick={() =>
                              dispatch(
                                openModal({
                                  isOpen: true,
                                  value: e?.qrCode || ''
                                })
                              )
                            }
                          >
                            <AlertCircle size="20" />
                          </Button>
                        <Button
                          variant="outlined"
                          onClick={() =>
                            push(
                              RoutesString.WareHouseUpdate.replace(':id', e._id)
                            )
                          }
                        >
                          <CheckSquare size="20" />
                        </Button>

                        <Button
                        sx={{ mx: 1 }}
                        color="error"
                        variant="contained"
                        onClick={() => handleDelete(e._id)}
                      >
                        <Trash2 size="20" />
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

WareHouseResults.propTypes = {
};

export default WareHouseResults;
