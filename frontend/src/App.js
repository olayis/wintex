import React from 'react';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProductScreen from './screens/ProductScreen/ProductScreen';
import Footer from './components/Footer/Footer';
import CartScreen from './screens/CartScreen/CartScreen';
import theme from './muiTheme';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <main>
          <Container maxWidth='lg'>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
          </Container>
        </main>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
