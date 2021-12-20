import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import {openModal} from '../store/actions/modalAction'
import QrReader from 'react-qr-reader'
import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
    Alert
  } from '@material-ui/core';
import API from '../api/index';
const CustomerCheckIn = (props) => {
    const [code, setCode] = useState([]);
    const [booking, setBooking] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [fileSelected, setFileSelected] = useState(null);
    const dispatch = useDispatch();

    // const handleScan = async (data) => {
    //     if (data) {
    //         const {bookingId = ''} = JSON.parse(data);
    //         if(!bookingId) return;
    //         setCode(bookingId);
    //         console.log(bookingId)
    //         const res = await API({
    //             url: `/booking/${bookingId}`,
    //             method: 'get'
    //         });
    //         console.log(res.data)
    //         if(res.code == 200){
    //             setBooking(res.data);
    //             setIsSuccess(true)
    //         }
    //     }
    // }
    // const handleError = err => {
    //     setIsSuccess(false)
    //     console.error(err)
    // }

    const onSelectedFile = (evt) => {
        if(evt.target.files.length <= 0) {setIsSuccess(false); return};
        setFileSelected(evt.target.files[0])
    }
    const onUploadFile = async () => {
        if(!fileSelected) {setIsSuccess(false); return};
        const data = new FormData() 
        data.append('image', fileSelected)
        const res = await API({
          url: `/customers/check-in`,
          method: 'post',
          data: data
        });
        const isSuccess = res.code === 200;
      if (isSuccess) {
        swal
          .fire({
            title: 'Check in thành công',
            text: 'Check in thành công, bạn có muốn xem mã QR code để sử dụng các dịch vụ trong khách sạn không?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
          })
          .then((result) => {
            if (result.value) {
              dispatch(
                openModal({
                  isOpen: true,
                  value: res.data.qrCode
                })
              );
            }
          });
      }
        if(res.code != 200) {setIsSuccess(false); setError(res.message); return;};
        console.log(res.data);
        setBooking(res.data);
        setIsSuccess(true)
      }
    return (
        <div style={{display:"flex", margin: "10px 0 0 0 "}}>
            <Container maxWidth="sm">
                <Typography color="textPrimary" variant="h2">
                    Check-in thông tin khách hàng
                  </Typography>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                >
                    {isSuccess ? "" : "Upload CMND để check-in"}
                </Typography>
            {isSuccess ? <BookingDetail booking={booking}/> : (<div >
                <Grid container spacing={3} marginTop="10px">
                <Grid md={12} xs={12}>
                    <TextField
                    fullWidth
                    // label="Identity Card"
                    name="identityCard"
                    // variant="outlined"
                    type="file"
                    onChange={(evt) => onSelectedFile(evt)}
                    />
                </Grid>
                {error ? <Alert severity="error" style={{marginTop:"10px"}}>{error}</Alert> : ''}
                <Grid md={3} xs={12} marginTop="10px">
                    <Button color="primary" variant="contained" onClick={() => onUploadFile()}>
                    Check-In</Button>
                
                </Grid>
                {/* <Grid md={6} xs={12}> */}
                {/* </Grid> */}
                </Grid>
            </div>)}
            </Container>
        </div>
    )
}

function BookingDetail ({booking}) {
    return(
        <div >
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                >
                   <b> Họ tên:</b> <span>{booking.cusId?.cusName || ''}</span>
                </Typography>

                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                >
                    <b>CMND:</b> {booking.cusId?.identityCard || '999999999'}
                </Typography>

                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                >
                    <b>SĐT:</b> {booking.phoneNumber || '0000000000'}
                </Typography>

                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                >
                    <b>Ngày nhận:</b> {booking.startDate.split('T')[0]}
                </Typography>

                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                >
                    <b>Ngày trả:</b> {booking.endDate.split('T')[0]}
                </Typography>

                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                >
                    <b>Khách sạn:</b> {booking.roomId.hotelId.hotelName}
                </Typography>

                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                >
                    <b>Địa chỉ:</b> {booking.roomId.hotelId.address}
                </Typography>

                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                >
                    <b>Phòng:</b> {booking.roomId.roomName}
                </Typography>
        </div>
    )
}

const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

export default CustomerCheckIn ;