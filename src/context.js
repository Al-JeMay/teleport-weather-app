/*
===========================================================
 Title:  Teleport Weather App Demo
 Author: Al JeMay
 Date:   6 July 2020
 email: azmanshaffie@gmail.com
===========================================================
*/
import React, {useState} from 'react';
import Spinner from './components/layout/Spinner';
import DatatFetCher, {isEmptyObj} from './utils/DatFetcher';
import {owmap} from './components/constants/Uri';

const Context = React.createContext ();
////Main Context for storing data that got from the /openweathermap.org/ API
////Store as global to share within any child's components
export const Provider = props => {
  ////Store/update the selected coords provide by user input
  const [currentCoord, setCurrentCoord] = useState ({
    lat: '3.140352', //// Initial value for Kuala Lumpur's latitutude & longitude
    lng: '101.692017',
  });

  //// Store/update the main heading props
  const [heading, setHeading] = useState ('Kuala Lumpur');
  //// Store/update the main raw weather data got from the request/response API
  const {data: weather, isLoading, error} = DatatFetCher (
    `${owmap}weather?lat=${currentCoord.lat}&lon=${currentCoord.lng}&appid=${process.env.REACT_APP_WH_KEY}`
  );
  ////If response API data is error response then show the error alert to user
  if (error) {
    return (
      <div className="alert alert-danger alert-dismissible fade show">
        <strong>Error from server!</strong>
        {' '}
        {error.message}
        <button type="button" className="close" data-dismiss="alert">
          &times;
        </button>
      </div>
    );
  }
  ////Let user see the loading spinner while waiting the response API completed
  if (isLoading) {
    return <Spinner />;
  }
  ////If response API data is undefined response then show the error alert to user
  if (weather === undefined) {
    return (
      <div className="alert alert-warning alert-dismissible fade show">
        <strong>Warning!</strong>
        {' '}
        Something wrong with the fetching weather's detail.
        <button type="button" className="close" data-dismiss="alert">
          &times;
        </button>
      </div>
    );
  }
  ////Check to see if the response API data is empty object
  if (weather && isEmptyObj (weather)) {
    return <p>weather info is EMPTY!</p>;
  }
  ////Finaly, pass the success response to the children as a props
  return (
    ////Use the context library to manage the state
    ////To be shared the raw data between its children
    ////this library is good to manupulate state of data
    ////alternative library from Redux@Reducer
    (
      <Context.Provider
        value={
          weather && {
            weather,
            heading,
            setHeading,
            currentCoord,
            setCurrentCoord,
          }
        }
      >
        {props.children}
      </Context.Provider>
    )
  );
};

export const Consumer = Context.Consumer;
