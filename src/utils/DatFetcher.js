/*
===========================================================
 Title:  Teleport Weather App Demo
 Author: Al JeMay
 Date:   6 July 2020
 email: azmanshaffie@gmail.com
===========================================================
*/
import {useState, useEffect} from 'react';

////Check the given object is Empty or Not Empty object
export const isEmptyObj = obj => {
  for (var prop in obj) {
    if (obj.hasOwnProperty (prop)) return false;
  }
  return true;
};
////Fetch the request and response from the API
/////openweathermap.org
const DatatFetCher = uri => {
  const [data, setData] = useState ([]);
  const [isLoading, setIsLoading] = useState (false);
  const [error, setError] = useState (null);

  useEffect (
    () => {
      setIsLoading (true);
      fetch (uri)
        .then (res => {
          if (res.ok) {
            return res.json ();
          } else {
            throw Error (
              `We are unable to process your request. Please try again later.`
            );
          }
        })
        .then (result => {
          setData (result);
          setIsLoading (false);
        })
        .catch (error => {
          setIsLoading (false);
          setError (error);
        });
    },
    [uri]
  );

  return {data, isLoading, error};
};

export default DatatFetCher;
