import React from 'react';
import numeral from 'numeral';
import { nairaLocale } from './utils/numeralLocale';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme/theme';
import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProductScreen from './screens/ProductScreen/ProductScreen';
import Footer from './components/Footer/Footer';
import CartScreen from './screens/CartScreen/CartScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import CheckoutScreen from './screens/CheckoutScreen/CheckoutScreen';
import OrderScreen from './screens/OrderScreen/OrderScreen';
import UserListScreen from './screens/UserListScreen/UserListScreen';
import ProductListScreen from './screens/ProductListScreen/ProductListScreen';
import OrderListScreen from './screens/OrderListScreen/OrderListScreen';
import ErrorBoundary from './components/ErrorBoundary';
import Message from './components/Message/Message';

const App = () => {
  const numeralConfig = nairaLocale();
  numeral.locale(numeralConfig);

  return (
    <Router>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <Header />
          <div style={{ margin: '65px 0 12px 0' }}>
            <Message collapsible>
              <strong>
                Disclaimer: Wintex is not an actual online store, the products
                are thereby not purchasable.
              </strong>
            </Message>
          </div>
          <main>
            <Container maxWidth='lg'>
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/checkout' component={CheckoutScreen} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/orders/:id' component={OrderScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/admin/userlist' component={UserListScreen} />
              <Route path='/admin/productlist' component={ProductListScreen} />
              <Route path='/admin/orderlist' component={OrderListScreen} />
              <Route path='/search/:keyword' component={HomeScreen} exact />
              <Route path='/page/:pageNumber' component={HomeScreen} />
              <Route
                path='/search/:keyword/page/:pageNumber'
                component={HomeScreen}
              />
              <Route path='/' component={HomeScreen} exact />
            </Container>
          </main>
          <Footer />
        </ThemeProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
