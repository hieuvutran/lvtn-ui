import { Box, Container } from '@material-ui/core';
import AccountListResults from '../components/account/AccountListResults';
import AccountListToolbar from '../components/account/AccountListToolbar';
import API from '../api';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await API({
          url: '/accounts',
          method: 'GET'
        });
        setAccounts(response.data);
        setIsLoading(false);
      } catch (error) {}
    })();
  }, []);
  const handleSearch = (keyword) => {
    const updatedData = [...accounts].filter(
      (item) => item.username.toLowerCase().indexOf(keyword.toLowerCase()) > -1
    );
    setData(updatedData);
  };
  useEffect(() => {
    if (accounts) {
      setData(accounts);
    }
  }, [accounts]);
  const user = useSelector((state) => state.auth.user);
  console.log(user.role)

  let acc 
  if(user.role != "admin"){
    acc = data.filter(item => item._id == user.accId)

  }


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
          <AccountListToolbar handleSearch={handleSearch} />
          <Box sx={{ pt: 3 }}>
            <AccountListResults isLoading={isLoading} accounts={user.role == "admin" ? data : acc} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AccountList;
