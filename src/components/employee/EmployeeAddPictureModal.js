import { useState } from 'react';
import swal from 'sweetalert2';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography, Fab,
  Modal,
  Drawer,
  Grid
} from '@material-ui/core';
import Button from '@mui/material/Button';
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImageEmployee,deleteImageEmployee } from '../../store/actions/employeeAction';
import "./style.css"

const EmployeeAddPictureModal = ({
  handleClose,
  employee,
  open,
}) => {
  const dispatch = useDispatch();

  const onUploadFile = async (evt, empId) => {
    const data = new FormData()
    data.append('image', evt.target.files[0])

    await dispatch(uploadImageEmployee({ _id: empId, data }))
    handleClose();
  }

  const onDelete = async (empImg) =>{
    const data = {empImg}
    await dispatch(deleteImageEmployee({_id: employee._id, data }))
    handleClose();
  }
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

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} >
          <label htmlFor="upload-photo" style={{ marginBot: '20px' }}>
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="image"
              type="file"
              onChange={(evt) => onUploadFile(evt, employee._id)}
            />
            <Fab
              color="secondary"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
            >
              <AddIcon /> Thêm ảnh
            </Fab>
          </label>
        </Typography>
        <Grid container spacing={4} style={{ marginTop: '20px' }} >

          {employee.image.map((empImg, index) =>
            <Grid item xs={3} sm={2} xs={1} >
              <Card >
                <CardMedia
                  component="img"
                  height="150"
                  weight="200"
                  image={empImg}
                  alt="Paella dish"
                />
                <CardActions>
                  <Button 
                    size="small" 
                    style={{color:"red", margin:"auto"}}
                    onClick={() => onDelete(empImg)}

                    >
                      Xóa ảnh
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
          }

        </Grid>
      </Box>
    </Modal>
 
  );
};


export default EmployeeAddPictureModal;

