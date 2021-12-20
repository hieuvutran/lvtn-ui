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
    Modal
  } from '@material-ui/core';
  import { Link } from '@material-ui/icons';
  import { useRef, useState } from 'react';
  import { Search as SearchIcon } from 'react-feather';
  import { NavLink } from 'react-router-dom';
  import RoutesString from 'src/routes/routesString';
  import API from '../../api/index';
  import swal from 'sweetalert2';
  const BookingListToolbar = ({
    handleSearch,
    handleFilter
  }) => {
    
    return (
      <Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 300 }}>
                <label>Chọn ngày</label>
                <TextField
                  fullWidth
                  type="date"
                  defaultValue={(new Date()).toJSON().split("T")[0]}
                  onChange={handleFilter}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon
                            onClick={() =>
                                handleFilter(inputSearch.current.value)
                            }
                          />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Ngày đặt"
                  variant="outlined"
                />
              </Box>
              {/* <Box sx={{ maxWidth: 200, paddingTop: 5 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  fullWidth
                  value={room?._id || ''}
                  name="foodType"
                  label="Menu"
                  onChange={(e) => {
                    handleChangeRoom(e.target.value);
                  }}
                >
                  {rooms.map((item) => (
                    <MenuItem value={item._id}>{item.roomName}</MenuItem>
                  ))}
                </Select>
              </Box> */}
            </CardContent>
          </Card>
        </Box>
      
      </Box>
    );
  };
  
  export default BookingListToolbar;
