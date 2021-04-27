import React from "react";
import "./form.css";

const Form = props => {
  return (
    <div className="">
      <form className="forms" onSubmit={props.loadweather}>
        <div>{props.error ? error() : ""}</div>
        <div className="">
          <div className="">
            <input
              type="text"
              className="f-control"
              placeholder="City"
              name="city"
              autoComplete="off"
            />
          </div>
          <div className="">
            <input
              type="text"
              className="f-control"
              placeholder="Country"
              name="country"
              autoComplete="off"
            />
          </div>
          <div className="button">
            <button className="btn btn-warning">Get Weather Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const error = props => {
  return (
    <div className="alert" role="alert">
      Please Enter City and Country name!!
    </div>
  );
};

export default Form;