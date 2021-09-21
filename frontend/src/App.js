import React from 'react';
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
// import NotFoundScreen from './screens/NotFoundScreen/NotFoundScreen';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
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
            <Route path='/search/:keyword' component={HomeScreen} />
            <Route path='/' component={HomeScreen} exact />
            {/* <Route component={NotFoundScreen} /> */}
          </Container>
        </main>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
