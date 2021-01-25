import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import WatchlistPage from './pages/WatchlistPage';
import MarketPage from './pages/MarketPage';
import SignupPage from './pages/SignupPage';
import StockappNavbar from './components/StockappNavbar';
import ExchangeComp from './components/ExchangeView';

class App extends React.Component{
   
  constructor(props) {
    super(props);
    this.state = {
       activeUser: null,
      // activeUser: { 
      //   fname: 'Sara',
      //   lname: 'Doe',
      //   id: 2
      // },
    };
  };
  handleLogin = (userObj) => {
    this.setState({activeUser: userObj})
  };
  handleLogout = () => {
    this.setState({activeUser: null})
  };
  render() {return (
    <HashRouter>
      <Route exact path={['/', '/watchlist', '/market']}>
      <StockappNavbar handleLogout={this.handleLogout} activeUser={this.state.activeUser}/>
      </Route>
      <Container>
        <Switch>
          <Route exact path="/">
            <HomePage activeUser={this.state.activeUser}/>
          </Route>
          <Route path="/market/:symbol">
            <ExchangeComp handleLogin={this.handleLogin}/>
          </Route>
          <Route exact path="/market">
            <MarketPage handleLogin={this.handleLogin}/>
          </Route>
          <Route exact path="/watchlist">
            <WatchlistPage activeUser={this.state.activeUser}/>
          </Route>
          <Route exact path="/login">
            <LoginPage handleLogin={this.handleLogin}/>
          </Route>
          <Route exact path="/signup">
            <SignupPage />
          </Route>

        </Switch> 
    </Container>
    </HashRouter>
  );
}
}

export default App;
