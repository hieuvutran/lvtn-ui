import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import EmployeeAddPictureModal from './EmployeeAddPictureModal'
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography, TextField, Fab,
  Grid
} from '@material-ui/core';
import Loader from 'react-loader-spinner';
import { CheckSquare, Settings, Trash2 } from 'react-feather';
import { useHistory } from 'react-router';
import RoutesString from 'src/routes/routesString';
import { useDispatch, useSelector } from 'react-redux';

const EmployeeListResults = ({
  handleDelete,
  employees,
  isLoading,
  ...rest
}) => {
  const [selectedemployeeIds, setSelectedemployeeIds] = useState([]);
  const [selectedempPicture, setSelectedempPicture] = useState([]);

  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);
  const { success, employee, loading } = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = async (emp) => {
    await setSelectedempPicture(emp);
    await setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
    console.log("CLOSE")
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const { push } = useHistory();
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
                    checked={selectedemployeeIds.length === employees.length}
                    color="primary"
                    indeterminate={
                      selectedemployeeIds.length > 0
                      && selectedemployeeIds.length < employees.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                  <TableCell>Ảnh</TableCell>
                  <TableCell>Tên nhân viên</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Lương cơ bản</TableCell>
                  <TableCell>Loại hợp đồng</TableCell>
                  <TableCell>CMND</TableCell>
                  <TableCell>
                    <Settings size="20" />
                  </TableCell>
                  {/* <TableCell>
                  Registration date
                </TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {employees.slice(0, limit).map((employee) => (
                  <TableRow
                    hover
                    key={employee._id}
                    selected={selectedemployeeIds.indexOf(employee.id) !== -1}
                  >
                    <TableCell>{employee.image ? <Avatar alt={employee.empName} src={employee.image[0]} /> : <Avatar>NA</Avatar>}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {employee.empName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{employee.phoneNumber}</TableCell>
                    <TableCell>{employee.baseSalary}</TableCell>
                    <TableCell>
                      {employee.typeOfLabor.replace('_', ' ')}
                    </TableCell>
                    <TableCell>{employee.identityCard}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleOpen(employee)}>Ảnh</Button>
                      {open ?
                        <EmployeeAddPictureModal
                          employee={selectedempPicture}
                          handleClose={handleClose}
                          open={open}
                        /> : ""
                      }
                      <Button
                        sx={{ mx: 1 }}
                        variant="outlined"
                        onClick={() =>
                          push(
                            RoutesString.EmployeeUpdate.replace(
                              ':id',
                              employee._id
                            )
                          )
                        }
                      >
                        <CheckSquare size="20" />
                      </Button>
                      <Button
                        sx={{ mx: 1 }}
                        color="error"
                        variant="contained"
                        onClick={() => handleDelete(employee._id)}
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
        count={employees.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

EmployeeListResults.propTypes = {
  employees: PropTypes.array.isRequired
};

export default EmployeeListResults;
