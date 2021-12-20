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
import { CheckSquare, Settings, Trash2 } from 'react-feather';
import RoutesString from 'src/routes/routesString';
import { useHistory } from 'react-router';

const AccountListResults = ({ accounts, isLoading, ...rest }) => {
  const [selectedaccountIds, setSelectedaccountIds] = useState([]);
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const { push } = useHistory();
  console.log(accounts)
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
                  <TableCell>ID</TableCell>
                  <TableCell>Tên tài khoản</TableCell>
                  <TableCell>Chức vụ</TableCell>
                  <TableCell>
                    <Settings size="20" />
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {accounts.slice(0, limit).map((account) => (
                  <TableRow
                    hover
                    key={account._id}
                    selected={selectedaccountIds.indexOf(account.id) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {account._id}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{account.username}</TableCell>
                    <TableCell>{account.role}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          push(
                            RoutesString.AccountUpdate.replace(
                              ':id',
                              account._id
                            )
                          )
                        }
                      >
                        <CheckSquare size="20" />
                      </Button>
                      <Button sx={{ mx: 1 }} color="error" variant="contained">
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
        count={accounts.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

AccountListResults.propTypes = {
  accounts: PropTypes.array
};

export default AccountListResults;
