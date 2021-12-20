import { Dialog, DialogContent } from '@material-ui/core';
import { Box } from '@material-ui/system';
import React from 'react';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from 'src/store/actions/modalAction';

export default function ModalQR() {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(
      openModal({
        isOpen: false
      })
    );
  };
  return (
    <Dialog open={modal.isOpen} onClose={handleClose}>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 5,
          px: 5
        }}
      >
        {/* <QRCode value={modal.value || 'abc'} /> */}
        <img src={modal.value} alt="abc" />
      </Box>
    </Dialog>
  );
}
