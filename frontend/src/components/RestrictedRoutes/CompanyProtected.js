import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const CompanyProtected = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem('cdc_LoggedIn') === 'true' &&
          localStorage.getItem('cdc_loginType') === 'Recruiter' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/recruiter-login',
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

export default CompanyProtected;
