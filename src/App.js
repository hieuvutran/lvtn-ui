import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import Routes from './routes/Routes';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './styles/index.scss';
import { Provider } from 'react-redux';
import store, { history } from './store';
import 'sweetalert2/src/sweetalert2.scss';
import { ConnectedRouter } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import ModalQR from './components/modalQR/ModalQR';
let persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Routes />
            <ModalQR />
          </ThemeProvider>
      </PersistGate>
    </ConnectedRouter>
  </Provider>
);

export default App;
