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
// import NotFoundScreen from './screens/NotFoundScreen/NotFoundScreen';

const App = () => {
  const numeralConfig = nairaLocale();
  numeral.locale(numeralConfig);

  return (
    <Router>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <Header />
          <Message collapsible>
            Disclaimer: The products you see in this application are not real
            and not purchasable, feel free to explore and use the app. Thank
            you.
          </Message>
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
              {/* <Route component={NotFoundScreen} /> */}
            </Container>
          </main>
          <Footer />
        </ThemeProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
