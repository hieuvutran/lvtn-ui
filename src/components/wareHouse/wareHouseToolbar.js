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
import { getWarehouse } from 'src/store/actions/warehouseAction';

const WareHouseToolbar = ({
  handleSearch,
  handleFilter
}) => {
  const dispatch = useDispatch();
  const [openImport, setOpenImport] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleScan = async (data) => {
    if (data) {
      let dataAsJson;
      if (typeof (data) == 'string' && (dataAsJson = JSON.parse(data))) {
        let res;
        console.log(dataAsJson)
        if (openImport) {
          res = await API({
            url: `/warehouse/${dataAsJson.furId}`,
            method: 'put',
            data: { isImport: true }
          });
        }
        if (openExport) {
          res = await API({
            url: `/warehouse/${dataAsJson.furId}`,
            method: 'put',
            data: { isExport: true }
          });
        }
        setOpenExport(false)
        setOpenImport(false)
        if (res.code == 200) {
          swal
            .fire({
              title: 'thành công',
              text: 'thành công',
              icon: 'success',
              showCancelButton: false,
            }).then(result => {
              dispatch(getWarehouse({}))
            })
        } else {
          swal.fire({
            title: 'Thất bại',
            text: res.message,
            icon: 'error'
          });
        }

      } else {
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
        <Button onClick={() => setOpenExport(true)} sx={{ mx: 1 }} color="primary" variant="contained">
          Xuất kho
        </Button>
        <Button onClick={() => setOpenImport(true)} sx={{ mx: 1 }} color="primary" variant="contained">
          Thêm vào kho
        </Button>
        <NavLink to={{
          pathname: RoutesString.WareHouseCreate,
          state: { title: 'addnewInv' }
        }}>
          <Button color="primary" variant="contained">
            Tạo qr code
          </Button>
        </NavLink>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                onChange={handleFilter}
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
                placeholder="Tìm kiếm"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <ModalScanQR open={openImport} handleClose={handleClose} handleScan={handleScan} handleError={handleError} />
      <ModalScanQR open={openExport} handleClose={() => setOpenExport(false)} handleScan={handleScan} handleError={handleError} isExport={true} />
    </Box>
  );
};
export default WareHouseToolbar;
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
function ModalScanQR({ open, handleClose, handleError, handleScan, isExport = false }) {

  return (
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
          <QrReader
            delay={1000}
            onError={handleError}
            onScan={(data) => handleScan(data, isExport)}
            style={{ width: '100%' }}
          />
          <Button color="primary" variant="contained" onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  )
}