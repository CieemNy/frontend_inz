import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({component: Component, auth: {isAuthenticated}, ...rest}) => {
  <Route
    {...rest}
    render={props => !isAuthenticated ? (<Navigate to='/'/>) : (<Component {...props} />)}
  />
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);