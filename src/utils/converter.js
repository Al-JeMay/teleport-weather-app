/*
===========================================================
 Title:  Teleport Weather App Demo
 Author: Al JeMay
 Date:   6 July 2020
 email: azmanshaffie@gmail.com
===========================================================
*/
//// To convert the given temp status to format celcius
export const convertKelvinToCelsius = kelvin => {
  if (kelvin < 0) {
    return 'below absolute zero (0 K)';
  } else {
    return Math.round (kelvin - 273.15);
  }
};

//// To give the correct background image & icon based on weather status
export const whichPicId = (id, dayNight) => {
  if (id >= 200 && id <= 299) {
    return 200;
  } else if (id >= 300 && id <= 399) {
    return 300;
  } else if (id >= 500 && id <= 599) {
    return 500;
  } else if (id >= 600 && id <= 699) {
    return 600;
  } else if (id >= 700 && id <= 799) {
    return 700;
  } else if (id >= 801 && id <= 899) {
    return dayNight === 'd' ? 801 : 'cloudy-night';
  } else {
    return dayNight === 'd' ? id : 'night';
  }
};
