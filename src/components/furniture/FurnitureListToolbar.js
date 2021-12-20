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
import { useDispatch, useSelector } from 'react-redux';

const FurnitureListToolbar = ({
  handleChangeRoom,
  room,
  rooms,
  handleSearch,
  handleAddFurniture
}) => {
  const dispatch = useDispatch();
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  
  const handleScan = async (data) => {
    if (data) {
      let dataAsJson;
      if(typeof(data) == 'string' && (dataAsJson = JSON.parse(data))  && dataAsJson.furId){
        const res = await API({
          url: `/rooms/${room._id}/furniture/${dataAsJson.furId}`,
          method: 'put',
        });
        if(res.code == 200){
          setOpen(false)
          swal
        .fire({
          title: 'thành công',
          text: 'thành công',
          icon: 'success',
          showCancelButton: false,
        }).then(result => {
          dispatch(getRooms())
        })
        }
      }else{
        console.log(data);
      }
    }
}
const handleError = err => {
    console.error(err)
}
  
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button onClick={handleOpen}>Thêm nội thất vào phòng</Button>
        <NavLink to={RoutesString.FurnitureTypeCreate} style={{marginRight: "10px"}}>
          <Button color="primary" variant="contained">
            Thêm mới loại nội thất
          </Button>
        </NavLink>
        <NavLink to={RoutesString.FurnitureCreate}>
          <Button color="primary" variant="contained">
            Thêm nội thất
          </Button>
        </NavLink>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon
                          onClick={() =>
                            handleSearch(inputSearch.current.value)
                          }
                        />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Tìm tên nội thất"
                variant="outlined"
              />
            </Box>
            <Box sx={{ maxWidth: 200, paddingTop: 5 }}>
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
            </Box>
          </CardContent>
        </Card>
      </Box>
    
    <ModalScanQR roomName={room?.roomName || ''} open={open} handleClose={handleClose} handleScan={handleScan} handleError={handleError}/>
    </Box>
  );
};

export default FurnitureListToolbar;


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
import QrReader from 'react-qr-reader'
import { getRooms } from 'src/store/actions/roomsAction';
function ModalScanQR({roomName = '', open, handleClose, handleError, handleScan}) {
  
  return(
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 700 }}>
          <h2 id="child-modal-title">QR-Code</h2>
          <p id="child-modal-title">room: {roomName}</p>
          <QrReader
                delay={1000}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
              />
          <Button color="primary" variant="contained" onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  )
}
