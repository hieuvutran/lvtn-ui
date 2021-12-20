import { Box, Container } from '@material-ui/core';
import WareHouseResult from '../components/wareHouse/wareHouseResult';
import WareHouseToolbar from '../components/wareHouse/wareHouseToolbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getWarehouse, deleteWareHouse } from 'src/store/actions/warehouseAction'
const WareHouseList = () => {
  const { success,stock = [], loading } = useSelector(
    (state) => state.warehouse
  );
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getWarehouse({}));
  }, []);
  

  useEffect(() => {
    if (isFirstRender.current || success) {
      isFirstRender.current = false;
    }
  }, [success]);
  useEffect(() => {
    setData(stock);
  }, [stock]);

  const handleFilter = (evt) => {
    const key = evt.target?.value || '';
    let newData = data
     newData = [...stock].filter(
      (item) => item.name.toLowerCase().indexOf(key.toLowerCase()) > -1
      );      
      setData(newData)
    
  };
  const handleDelete = (id) => {
    console.log(id)
    dispatch(deleteWareHouse(id));
  };
  
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <WareHouseToolbar
            handleFilter={handleFilter}
            // handleSearch={handleSearch}
          />
          <Box sx={{ pt: 3 }}>
            <WareHouseResult
              isLoading={loading}
              data={data}
              handleDelete={handleDelete}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default WareHouseList;
