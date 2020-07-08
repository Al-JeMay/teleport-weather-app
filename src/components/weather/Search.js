/*
===========================================================
 Title:  Teleport Weather App Demo
 Author: Al JeMay
 Date:   6 July 2020
 email: azmanshaffie@gmail.com
===========================================================
*/
import React, {useState} from 'react';
import {Consumer} from '../../context';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Spinner from '../layout/Spinner';

const Search = props => {
  ////Store the selected address
  const [address, setAddress] = useState ('');
  ////Store the selected lat & long
  const [coordinates, setCordinates] = useState ({
    lat: null,
    lng: null,
  });
  ////Store the response address & coords got from the API
  const handleSelect = async value => {
    const results = await geocodeByAddress (value);
    const latlng = await getLatLng (results[0]);
    setAddress (value);
    setCordinates (latlng);
  };
  ////Handle any error comes from the API
  const handleError = async value => {
    console.log ('error::::', value);
  };

  ////Handle for dispatch current result from the response API to update the root context
  const findWeather = (setCoord, setHeading, e) => {
    e.preventDefault ();
    if (coordinates && address) {
      setCoord (coordinates);
      setHeading (address);
      setAddress ('');
    }
  };

  return (
    <Consumer>
      {value => {
        const {setCurrentCoord, setHeading} = value;
        return (
          <div className="search">
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
              onError={handleError}
              clearItemsOnError={true}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div className="card card-body mb-3 p-3">
                  <h1 className="h2 text-center">
                    <i className="fa fa-map-marker" /> Search for place
                  </h1>
                  <p className="lead text-center">
                    Get the weather of your selected place
                  </p>
                  <form
                    onSubmit={findWeather.bind (
                      this,
                      setCurrentCoord,
                      setHeading
                    )}
                  >
                    <div className="form-group">
                      <input
                        {...getInputProps ({
                          type: 'text',
                          className: 'form-control form-control-md',
                          placeholder: 'Type Address...',
                        })}
                      />
                    </div>
                    <div className="mb-2">
                      {loading ? <Spinner /> : null}
                      {suggestions.map (suggestion => {
                        return (
                          <ul
                            className="list-group mb-1"
                            {...getSuggestionItemProps (suggestion)}
                          >
                            <li className="list-group-item list-group-item-action">
                              <small>{suggestion.description}</small>
                            </li>
                          </ul>
                        );
                      })}
                    </div>
                    <button
                      className="btn btn-info btn-md btn-block mb-2 bg-dark"
                      type="submit"
                    >
                      Get the weather
                    </button>
                  </form>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        );
      }}
    </Consumer>
  );
};

export default Search;
