import React, { Fragment } from 'react';
import Search from '../components/users/Search';
import Users from '../components/users/Users';

const HomePage = () => (
  <Fragment>
    <Search />
    <Users />
  </Fragment>
);

export default HomePage;
