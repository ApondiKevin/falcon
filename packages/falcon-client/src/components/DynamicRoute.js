import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Query from './Query';
import { GET_URL } from './../graphql/url.gql';
import NotFoundRoute from './NotFoundRoute';

const DynamicRoute = ({ components, location, loaderComponent, errorComponent }) => {
  const { pathname } = location;
  const path = pathname.startsWith('/') ? pathname.substring(1) : pathname;

  return (
    <Query query={GET_URL} variables={{ path }} loaderComponent={loaderComponent} errorComponent={errorComponent}>
      {({ data }) => {
        if (!data || data.url === null) {
          return <NotFoundRoute />;
        }

        const { url } = data;
        if (url.redirect) {
          return <Redirect to={`/${url.path}`} />;
        }

        const Component = components[url.type];
        if (!Component) {
          return <p>{`Please register component for '${url.type}' content type!`}</p>;
        }

        return <Component id={url.id} path={url.path} location={location} />;
      }}
    </Query>
  );
};
DynamicRoute.propTypes = {
  components: PropTypes.shape({}),
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default DynamicRoute;
