/*
===========================================================
 Title:  Teleport Weather App Demo
 Author: Al JeMay
 Date:   6 July 2020
 email: azmanshaffie@gmail.com
===========================================================
*/
import React from 'react';
import spinner from '../../assets/spinner.gif';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="loading..."
        style={{width: '200px', margin: '40px auto', display: 'block'}}
      />
    </div>
  );
};
