import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Select,
  MenuItem
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { Link } from 'react-router-dom';
import RoutesString from 'src/routes/routesString';
import { useRef, useState } from 'react';

const FoodListToolbar = ({
  handleSearch,
  menu,
  listMenu,
  handleChangeMenu
}) => {
  const timeOut = useRef(null);
  const handleChange = (e) => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
    timeOut.current = setTimeout(() => {
      console.log('e.target.value', e.target.value);
      handleSearch(e.target.value);
    }, 500);
  };
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        {/* <Button>Import</Button>
        <Button sx={{ mx: 1 }}>Export</Button> */}
        {/* <Link to={RoutesString.MenuCreate}>
          <Button sx={{ mx: 1 }} color="primary" variant="contained">
            Thêm menu
          </Button>
        </Link> */}
        <Link to={RoutesString.FoodCreate}>
          <Button color="primary" variant="contained">
            Thêm thức ăn
          </Button>
        </Link>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search thức ăn"
                variant="outlined"
              />
            </Box>
            {/* <Box sx={{ maxWidth: 200, paddingTop: 5 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                value={menu?._id || ''}
                name="foodType"
                label="Menu"
                onChange={(e) => {
                  handleChangeMenu(e.target.value);
                }}
              >
                {listMenu.map((item) => (
                  <MenuItem value={item._id}>{item.menuName}</MenuItem>
                ))}
              </Select>
            </Box> */}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FoodListToolbar;
