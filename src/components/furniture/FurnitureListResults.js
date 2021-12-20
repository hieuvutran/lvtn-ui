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

const FurnitureListResults = ({
  handleDelete,
  furnitures = [],
  isLoading,
  ...rest
}) => {
  const [selectedfurnitureIds, setSelectedfurnitureIds] = useState([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const handleSelectAll = (event) => {
    let newSelectedfurnitureIds;

    if (event.target.checked) {
      newSelectedfurnitureIds = furnitures.map((furniture) => furniture.id);
    } else {
      newSelectedfurnitureIds = [];
    }

    setSelectedfurnitureIds(newSelectedfurnitureIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedfurnitureIds.indexOf(id);
    let newSelectedfurnitureIds = [];

    if (selectedIndex === -1) {
      newSelectedfurnitureIds = newSelectedfurnitureIds.concat(
        selectedfurnitureIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedfurnitureIds = newSelectedfurnitureIds.concat(
        selectedfurnitureIds.slice(1)
      );
    } else if (selectedIndex === selectedfurnitureIds.length - 1) {
      newSelectedfurnitureIds = newSelectedfurnitureIds.concat(
        selectedfurnitureIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedfurnitureIds = newSelectedfurnitureIds.concat(
        selectedfurnitureIds.slice(0, selectedIndex),
        selectedfurnitureIds.slice(selectedIndex + 1)
      );
    }

    setSelectedfurnitureIds(newSelectedfurnitureIds);
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
                  {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedfurnitureIds.length === furnitures.length}
                    color="primary"
                    indeterminate={
                      selectedfurnitureIds.length > 0
                      && selectedfurnitureIds.length < furnitures.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                  <TableCell>Tên nội thất</TableCell>
                  <TableCell>Loại nội thất</TableCell>
                  <TableCell>Ngày thêm</TableCell>
                  <TableCell>
                    <Settings size="20" />
                  </TableCell>
                  {/* <TableCell>
                  Registration date
                </TableCell> */}
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
                      <TableCell>
                        {furniture?.qrCode && (
                          <Button
                            variant="outlined"
                            sx={{ mx: 1 }}
                            onClick={() =>
                              dispatch(
                                openModal({
                                  isOpen: true,
                                  value: furniture.qrCode
                                })
                              )
                            }
                          >
                            <AlertCircle size="20" />
                          </Button>
                        )}
                        <Button
                          variant="outlined"
                          onClick={() =>
                            push(
                              RoutesString.FurnitureUpdate.replace(
                                ':id',
                                furniture?._id
                              )
                            )
                          }
                        >
                          <CheckSquare size="20" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(furniture?._id)}
                          sx={{ mx: 1 }}
                          color="error"
                          variant="contained"
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

FurnitureListResults.propTypes = {
  furnitures: PropTypes.array
};

export default FurnitureListResults;
