import React from "react";
import "./weather.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Weather = props => {
  return (
    <div className="container text-light">
        <h1 className="cityname text-white py-3">{props.cityname}</h1>
          <img className= "icon wi display-1" alt="logo" src={props.weatherIcon}/>

        {/* Get Celsius */}
        {props.temp_celsius ? (
          <h1 className="py-2">{props.temp_celsius}&deg;</h1>
        ) : null}

        {/* show max and min temp */}
        {maxminTemp(props.temp_min, props.temp_max)}

        {/* Weather description */}
        <h4 className="py-3">
          {props.description.charAt(0).toUpperCase() +
            props.description.slice(1)}
        </h4>
    </div>
  );
};

export default Weather;

function maxminTemp(min, max) {
  if (max && min) {
    return (
      <h3>
        Max:<span className="px-4">{min}&deg;</span>
        Min:<span className="px-4">{max}&deg;</span>
      </h3>
    );
  }
}
