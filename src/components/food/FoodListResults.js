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
import Loader from "react-loader-spinner";
import { CheckSquare, Settings, Trash2 } from 'react-feather';
import { useHistory } from 'react-router';
import RoutesString from 'src/routes/routesString';
import foodIcon from 'src/icons/foods.PNG'
import drinkIcon from 'src/icons/drink.PNG'
const FoodIcon = () => <Avatar src={foodIcon} />
const DrinkIcon = () => <Avatar src={drinkIcon} />

const FoodListResults = ({ handleDelete, foods, isLoading, ...rest }) => {
  const [selectedfoodIds, setSelectedfoodIds] = useState([]);
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);
  const handleSelectAll = (event) => {
    let newSelectedfoodIds;

    if (event.target.checked) {
      newSelectedfoodIds = foods.map((food) => food.id);
    } else {
      newSelectedfoodIds = [];
    }

    setSelectedfoodIds(newSelectedfoodIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedfoodIds.indexOf(id);
    let newSelectedfoodIds = [];

    if (selectedIndex === -1) {
      newSelectedfoodIds = newSelectedfoodIds.concat(selectedfoodIds, id);
    } else if (selectedIndex === 0) {
      newSelectedfoodIds = newSelectedfoodIds.concat(selectedfoodIds.slice(1));
    } else if (selectedIndex === selectedfoodIds.length - 1) {
      newSelectedfoodIds = newSelectedfoodIds.concat(selectedfoodIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedfoodIds = newSelectedfoodIds.concat(
        selectedfoodIds.slice(0, selectedIndex),
        selectedfoodIds.slice(selectedIndex + 1)
      );
    }

    setSelectedfoodIds(newSelectedfoodIds);
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
          {isLoading ?
            <div className="cover">
              <Loader type="Puff"
                color="#000" />
            </div>
            :
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedfoodIds.length === foods.length}
                    color="primary"
                    indeterminate={
                      selectedfoodIds.length > 0
                      && selectedfoodIds.length < foods.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                  <TableCell>Ảnh</TableCell>
                  <TableCell>
                    Tên thức ăn
                  </TableCell>
                  <TableCell>
                    Loại thức ăn
                  </TableCell>
                  <TableCell>
                    Giá tiền
                  </TableCell>
                  <TableCell>
                    Số lượng
                  </TableCell>
                  <TableCell>
                    <Settings size="20" />
                  </TableCell>
                  {/* <TableCell>
                  Registration date
                </TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {foods.slice(0, limit).map((food) => (
                  <TableRow
                    hover
                    key={food._id}
                    selected={selectedfoodIds.indexOf(food.id) !== -1}
                  >
                    {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedfoodIds.indexOf(food.id) !== -1}
                      onChange={(event) => handleSelectOne(event, food.id)}
                      value="true"
                    />
                  </TableCell> */}
                    <TableCell>{food.img ? <Avatar alt={food.foodName} src={food.img } /> : <Avatar>NA</Avatar>}</TableCell>                  <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {food.foodName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {food.foodType}
                    </TableCell>
                    <TableCell>
                      {food.unitPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                    </TableCell>
                    <TableCell>
                      {food.quantity}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => push(RoutesString.FoodUpdate.replace(":id", food._id))}

                      >
                        <CheckSquare size="20" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(food._id)}
                        sx={{ mx: 1 }}
                        color="error"
                        variant="contained"
                      >
                        <Trash2 size="20" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>
          }
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={foods.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

FoodListResults.propTypes = {
  foods: PropTypes.array
};

export default FoodListResults;
