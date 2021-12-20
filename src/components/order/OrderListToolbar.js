import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { Link } from 'react-router-dom';
import RoutesString from 'src/routes/routesString';

const OrderListToolbar = ({ menu, listMenu, handleChangeMenu, handleFilter, orderDay }) => (
  <Box>
    {/* <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button>Import</Button>
      <Button sx={{ mx: 1 }}>Export</Button>
      <Link to={RoutesString.OrderCreate}>
        <Button color="primary" variant="contained">
          Thêm thức ăn
        </Button>
      </Link>
    </Box> */}
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          {/* <Box sx={{ maxWidth: 500 }}>
            <TextField
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
              placeholder="Search customer"
              variant="outlined"
            />
          </Box> */}
          <Box sx={{ maxWidth: 200, paddingTop: 5 }}>
            {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              value={menu?._id || ''}
              name="orderType"
              label="Menu"
              onChange={(e) => {
                handleChangeMenu(e.target.value);
              }}
            >
              {listMenu.map((item) => (
                <MenuItem value={item._id}>{item.menuName}</MenuItem>
              ))}
            </Select> */}
            <InputLabel>Ngày</InputLabel>
                <TextField
                  fullWidth
                  type="date"
                  defaultValue={orderDay}
                  onChange={handleFilter}
                  InputProps={{
                    // startAdornment: (
                    //   <InputAdornment position="start">
                    //     <SvgIcon fontSize="small" color="action">
                    //       <SearchIcon
                    //         onClick={() =>
                    //             handleFilter(inputSearch.current.value)
                    //         }
                    //       />
                    //     </SvgIcon>
                    //   </InputAdornment>
                    // )
                  }}
                  placeholder="Ngày"
                  variant="outlined"
                />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default OrderListToolbar;
