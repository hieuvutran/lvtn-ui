import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid, Fab,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from "@material-ui/icons/Add";
import { useFormik } from 'formik';
import Loader from 'react-loader-spinner';
import { useHistory } from "react-router-dom";
import Axios from "axios"
import { TrainRounded } from '@material-ui/icons';

const FoodCreateForm = ({
  isUpdatePage,
  initialValues,
  handleSubmit,
  loading,
  onUpLoadImg
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [img, setImg] = useState()


  const history = useHistory();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true
  });
  const foodTypes = [
    {
      value: 'thức ăn',
      label: 'Thức ăn'
    },
    {
      value: 'nước uống',
      label: 'Nước uống'
    },
    {
      value: 'khác',
      label: 'Khác'
    },
  ];

  const upLoadImg = async (evt) => {
    setIsLoading(true)
    const formData = new FormData;
    formData.append("file", evt.target.files[0])
    formData.append("upload_preset", "gm33cyu3")
    await Axios.post("https://api.Cloudinary.com/v1_1/dduqolszr/image/upload", formData)
      .then(res => {
        onUpLoadImg(res.data.url)
        setImg(res.data.url)

      })
    setIsLoading(false)


  }
  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      {
        <Card>
          <CardHeader
            title={isUpdatePage ? 'Chỉnh sửa' : 'Thêm mới'}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Tên"
                  name="foodName"
                  onChange={formik.handleChange}
                  required
                  value={formik?.values?.foodName || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Loại thức ăn
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="foodType"
                    value={formik.values?.foodType || ''}
                    label="Loại thức ăn"
                    onChange={formik.handleChange}
                  >
                    {foodTypes.map((item) => (
                      <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Giá tiền"
                  name="unitPrice"
                  onChange={formik.handleChange}
                  required
                  value={formik.values?.unitPrice || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Số lượng"
                  name="quantity"
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values?.quantity || ''}
                  variant="outlined"
                />
              </Grid>
              {isUpdatePage ? '' : <Grid item md={6} xs={12} style={{ display: "none" }}>
                <TextField
                  fullWidth
                  label="menu"
                  name="menu"
                  type="hidden"
                  disabled={true}
                  onChange={formik.handleChange}
                  value={formik.values?.menu || ''}
                  variant="outlined"
                />
              </Grid>}
              <Grid item md={12} xs={12}>
                <label htmlFor="upload-photo" style={{ marginBot: '20px' }}>
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="img"
                    type="file"
                    onChange={(evt) => upLoadImg(evt)}
                  />
                  <Fab
                    color="primary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                  >
                    <AddIcon /> Thêm ảnh
                  </Fab>
                </label>
              </Grid>

              <Grid item md={6} xs={12}>
                {isLoading ? (
                  <div className="cover" >
                    <Loader  type="Puff" color="#000" />
                  </div>
                ) : (
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image= {img? img: initialValues.img}
                      alt="green iguana"
                    />
                  </Card>
                )}
              </Grid>

            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          ><Button color="secondary" variant="outlined" onClick={() => history.goBack()} style={{ marginRight: "10px" }}>
              Trở lại
            </Button>
            <Button color="primary" variant="contained" type="submit">
              {loading ? (
                <Loader height={15} type="Puff" color="#fff" />
              ) : (
                'Submit'
              )}
            </Button>
          </Box>
        </Card>
      }
    </form>
  );
};

export default FoodCreateForm;
