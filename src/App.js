import React from 'react';
import './App.css';
import Logo from './logo.png';
import Form from "./components/form.jsx";
import Weather from "./components/weather.jsx";
import Cloud from './videos/cloud.mp4';
import Drizzle from './videos/drizzle.mp4';
import Thunderstorm from './videos/thunderstorm.mp4';
import Default from './videos/default1.mp4';
import Rain from './videos/rain.mp4';
import Snow from './videos/snow.mp4';
import Atmosphere from './videos/atmosphere.mp4';
import Clear from './videos/clear.mp4';


const Api_Key = "db763e02f35c9cdf47b0e425f292b9ef";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      video: Default,
      iconUrl: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false
    };
    
  }
  change_video(rangeId){
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ video: Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ video: Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ video: Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ video: Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ video: Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ video: Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ video: Cloud });
        break;
      default:
        this.setState({ video: Default });
    }
  }
  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getWeather = async e => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );

      const response = await api_call.json();

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        iconUrl: "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png",
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });
      console.log(response);
      this.change_video(response.weather[0].id);
    } else {
      this.setState({
        error: true
      });
    }
  };

  render() {
    return (
      <div className="App">
        <img className={this.state.city === undefined ? `logo2` : `logo`} src={Logo} alt="logo"/>
        <video className="video" autoPlay={true} muted={true} loop={true} src={this.state.video}/> 
        <Form loadweather={this.getWeather} error={this.state.error} />
        {this.state.city === undefined ? null: <Weather
          cityname={this.state.city}
          weatherIcon={this.state.iconUrl}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
        />}
      </div>
    );
  }
}

export default App;
