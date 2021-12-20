import axios from 'axios';
import { stringify, parse } from 'query-string';
import store from '../store';
// import './interceptor';
const API = async ({
  url,
  params = '',
  method = 'get',
  headers = {},
  data = {},
  cancelTokenSource,
  ...props
}) => {
  const newParams = parse(stringify(params, { arrayFormat: 'comma' }));
  try {
    console.log('store');
    let updatedHeaders = { ...headers };
    // updatedHeaders['Authorization'] = '61334b72d4fa9c1c943bf096';
    if (store?.getState()?.auth?.user) {
      updatedHeaders['Authorization'] = store?.getState()?.auth?.user?.accId || '';
      updatedHeaders['hotelid'] = updatedHeaders['hotelid'] ? updatedHeaders['hotelid'] : store?.getState()?.auth?.user?.hotelManage?._id || '';
      if(!updatedHeaders['hotelid']){
        let hotelIdLocal = localStorage.getItem('hotelId');
        updatedHeaders['hotelid'] = hotelIdLocal || ''
      }
    }
    const response = await axios({
      method,
      url: `http://localhost:5000${url}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...updatedHeaders
      },
      ...props,
      params: newParams,
      data,
      cancelToken: cancelTokenSource?.token
    });

    return response && response.data;
  } catch (error) {
    throw error;
  }
};

export default API;
