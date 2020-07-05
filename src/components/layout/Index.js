/*
===========================================================
 Title:  Teleport Weather App Demo
 Author: Al JeMay
 Date:   6 July 2020
 email: azmanshaffie@gmail.com
===========================================================
*/
import React from 'react';
import Weather from '../weather/Weather';
import Search from '../weather/Search';

const Index = () => {
  return (
    <React.Fragment>
      <Search />
      <Weather />
    </React.Fragment>
  );
};

export default Index;
