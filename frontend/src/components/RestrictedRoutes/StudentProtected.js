import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const StudentProtected = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem('cdc_LoggedIn') === 'true' &&
          localStorage.getItem('cdc_loginType') === 'Student' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/student-login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default StudentProtected;
