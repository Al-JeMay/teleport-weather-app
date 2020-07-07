/*
===========================================================
 Title:  Teleport Weather App Demo
 Author: Al JeMay
 Date:   6 July 2020
 email: azmanshaffie@gmail.com
===========================================================
*/
import React from 'react';
import {Consumer} from '../../context';
import Moment from 'react-moment';
import '../../App.css';
import {convertKelvinToCelsius, whichPicId} from '../../utils/converter';

const {getName} = require ('country-list');

const Weather = props => {
  return (
    <Consumer>
      {value => {
        ////Store the current weather's data got from the main contexts
        const {weather, heading} = value;
        const {weather: detailWeather, main, name, sys, dt} = weather;
        const currentWeather = detailWeather[0];
        ////Filter the type of daytime (is a Day of Night)
        const getDayOrNight = currentWeather.icon.substr (
          currentWeather.icon.length - 1
        );
        ////Defined the background based on Weather status:
        ////either, Clear/Thunderstorm/Cloud/etc
        const whichBgClass = `weather i${whichPicId (currentWeather.id, getDayOrNight)}`;
        ////Defined the icons on Weather status
        const img = require (`../../assets/${currentWeather.icon}.png`);
        ////Convert the temprature status to celcius format
        const celcius = convertKelvinToCelsius (main.temp);
        ////Check to see is name of city is exist
        const city = name === '' ? heading : name;
        if (weather) {
          return (
            <React.Fragment>

              <div className="card">
                <h5 className="card-header text-center">{heading}</h5>
                <div className="card-body m-0 p-0">
                  <div className={whichBgClass}>
                    <main>
                      <div className="location-box">
                        <div className="location">
                          {city}
                          {name === ''
                            ? ''
                            : `, ${getName (sys.country.toUpperCase ())}`}
                        </div>
                        <div className="date">
                          <Moment unix format="dddd, D MMMM, YYYY">
                            {dt}
                          </Moment>
                        </div>
                      </div>
                      <div className="weather-box text-center">
                        <div className="temp">
                          {celcius}° c
                        </div>
                        <div className="current-weather">
                          {currentWeather.main}
                        </div>
                        {img &&
                          <div className="text-center">
                            <img src={img} className="rounded" alt="..." />
                          </div>}
                        <p className="lead text-white mt-5">
                          {`${getDayOrNight === 'd' ? 'Today' : 'Tonight'} weather in ${heading} is ${currentWeather.description}, ${celcius} degrees celsius`}
                        </p>
                      </div>
                    </main>
                  </div>
                </div>
              </div>

            </React.Fragment>
          );
        } else {
          return <div>Nothing to show!</div>;
        }
      }}
    </Consumer>
  );
};

export default Weather;
