import React, { useState } from "react";
import { BsArrowDownCircle, BsFillSunriseFill, BsFillSunsetFill, BsFillSunFill } from "react-icons/bs";

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [forecastDays, setForecastDays] = useState([]);

  const fetchData = () => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&appid=7fe66ff279f740600ab948b1a675c7fe`)
      .then((response) => response.json())
      .then((data) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=7fe66ff279f740600ab948b1a675c7fe`
        )
          .then((responseTwo) => responseTwo.json())
          .then((datas) => setResponseData(datas));

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=7fe66ff279f740600ab948b1a675c7fe`
        )
          .then((newResponse) => newResponse.json())
          .then((forecastObject) => setForecastDays(forecastObject.list));
      });
  };

  const backgroundImg = () => {
    switch (responseData.weather[0].main) {
      case "Clouds":
        return "url(https://images.hdqwalls.com/wallpapers/cloud-sky-anime-w1.jpg)";

      case "Rain":
        return "url(https://c4.wallpaperflare.com/wallpaper/685/445/196/anime-landscape-rainbow-raining-cityscape-wallpaper-preview.jpg)";
      case "Clear":
        return "url(https://www.wallpaperflare.com/static/369/332/935/anime-girls-clear-blue-sky-wallpaper.jpg)";
      case "Snow":
        return "url(https://wallpapers.com/images/featured/mvehfqz6w2ges2dj.jpg)";

      default:
        return console.log("default");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  const orario = (milliseconds) => {
    const dateObject = new Date(milliseconds);
    const hours = dateObject.getHours();

    const minutes = dateObject.getMinutes();

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };
  function prossimi5Giorni() {
    const giorniSettimana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const oggi = new Date().getDay();
    const prossimiGiorni = [];
    for (let i = 1; i <= 5; i++) {
      const giorno = (oggi + i) % 7;
      prossimiGiorni.push(giorniSettimana[giorno]);
    }
    return prossimiGiorni;
  }

  console.log(prossimi5Giorni());
  console.log(responseData);
  return (
    <div className="all" style={responseData && { backgroundImage: backgroundImg() }}>
      <input
        className="search"
        type="text"
        onKeyDown={handleKeyDown}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {responseData && forecastDays && (
        <div>
          <div className="top">
            <div className="city d-flex justify-content-center">{responseData.name}</div>
            <div className="degree d-flex justify-content-center">{Math.round(responseData.main.temp)}&deg;</div>
            <div className="d-flex justify-content-center gap-3">
              <div>min {Math.round(responseData.main.temp_min)}&deg;</div>
              <div>max {Math.round(responseData.main.temp_max)}&deg;</div>
            </div>
          </div>
          <div className="main">
            <div className="box">
              <div className="boxName">Wind</div>
              <div className="d-flex justify-content-center flex-column ">
                <div className="boxStyle">wind's speed: {responseData.wind.speed} km/h</div>
                <div>
                  <BsArrowDownCircle className="freccia" style={{ rotate: `${responseData.wind.deg}deg` }} />
                </div>
              </div>
            </div>
            <div className="box">
              <div className="boxName">Sun</div>
              <div className="d-flex justify-content-center flex-column">
                <div className="boxStyle">
                  <BsFillSunriseFill /> &nbsp; sunrise: {orario(responseData.sys.sunrise)}
                </div>
                <div className="boxStyle">
                  <BsFillSunsetFill />
                  &nbsp; sunset: {orario(responseData.sys.sunset)}
                </div>
              </div>
            </div>
            <div className="box">
              <div className="boxName">Params</div>
              <div className="d-flex justify-content-center flex-column">
                <div className="boxStyle">Sky: {responseData.weather[0].description} </div>
                <div className="boxStyle">Humidity: {responseData.main.humidity}%</div>
                <div className="boxStyle">Pressure: {responseData.main.pressure.toLocaleString()} hPa</div>
                <div className="boxStyle">Visibility: {responseData.visibility / 1000} km</div>
              </div>
            </div>
          </div>

          <div className="bottom m-5">
            <div className="box daysBox">
              <div className="boxName ">Next 5 days</div>
              <div className="days d-flex justify-content-center gap-3">
                <div className="d-flex flex-column">
                  <div>{prossimi5Giorni()[0]}</div>
                  <div>
                    <BsFillSunFill />
                  </div>
                  {forecastDays[8].weather[0].main} {forecastDays[8].main.temp}&deg;
                </div>
                <div className="d-flex flex-column">
                  <div>{prossimi5Giorni()[1]}</div>
                  <div>
                    <BsFillSunFill />
                  </div>
                  {forecastDays[16].weather[0].main} {forecastDays[16].main.temp}&deg;
                </div>
                <div className="d-flex flex-column">
                  <div>{prossimi5Giorni()[2]}</div>
                  <div>
                    <BsFillSunFill />
                  </div>
                  {forecastDays[24].weather[0].main} {forecastDays[24].main.temp}&deg;
                </div>
                <div className="d-flex flex-column">
                  <div>{prossimi5Giorni()[3]}</div>
                  <div>
                    <BsFillSunFill />
                  </div>
                  {forecastDays[32].weather[0].main} {forecastDays[32].main.temp}&deg;
                </div>
                <div className="d-flex flex-column">
                  <div>{prossimi5Giorni()[4]}</div>
                  <div>
                    <BsFillSunFill />
                  </div>
                  {forecastDays[39].weather[0].main} {forecastDays[39].main.temp}&deg;
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
