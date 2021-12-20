import {
    Box,
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
  const WorkingListToolbar = ({
    handleFilter,
    handleChangeEmpId,
    employee,
    listEmp
  }) => {
    
    return (
      <Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent style={{display: "flex", gap: "10px"}}>
              <Box sx={{ maxWidth: 300 }}>
                <InputLabel>Ngày</InputLabel>
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
                  placeholder="Ngày"
                  variant="outlined"
                />
              </Box>

              <Box sx={{ maxWidth: 500 }}>
                <InputLabel>Họ tên</InputLabel>
                <Select
                  style={{width: "100px"}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="empId"
                  value={employee}
                  label="Nhân viên"
                  onChange={evt => handleChangeEmpId(evt?.target?.value || '')}
                >
                  {listEmp.map((item) => (
                    <MenuItem value={item._id}>{item.empName}</MenuItem>
                  ))}
                </Select>
              </Box>
            </CardContent>
          </Card>
        </Box>
      
      </Box>
    );
  };
  
  export default WorkingListToolbar;
