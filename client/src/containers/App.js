import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';
import { withRouter } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import FetchFromDatabase from '../actions/FetchFromDatabase';
import FetchProducts from '../actions/FetchProducts';
import FetchUser from '../actions/FetchUser';
import Checkout from '../components/Checkout';
import MainPageContainer from '../containers/MainPageContainer';
import ProfileContainer from '../containers/ProfileContainer';

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    //console.log('App constructor isLoggedIn', this.props.isLoggedIn);
    //console.log('App constructor loading', this.state.loading);
  }

  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchUser();
    setTimeout(() => {
      this.setState({ loading: false })
    }, 100);
  }

  componentDidUpdate() {
    //console.log('App componentDidUpdate isLoggedIn', this.props.isLoggedIn);
    if (this.props.isLoggedIn) {
      this.props.fetchFromDatabase();
    }
  }

  redirect = () => {
    if (process.env.NODE_ENV === 'development') {
      window.location.href = 'http://localhost:8080/auth/login';
    } else {
      window.location.href = 'https://shoplah.herokuapp.com/auth/login';
    }

    return null;
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <Router history={history}>
        <Switch> 
          <Route exact path='/cart' render={() => this.props.isLoggedIn ? 
            <Checkout /> : this.redirect()
          } />
          <Route exact path='/user/profile' render={() => this.props.isLoggedIn ? 
            <ProfileContainer /> : this.redirect()
          } />
          <Route exact path='/' render={() => <MainPageContainer />} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  fetchFromDatabase: () => dispatch(FetchFromDatabase()),
  fetchProducts: () => dispatch(FetchProducts()),
  fetchUser: () => dispatch(FetchUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));