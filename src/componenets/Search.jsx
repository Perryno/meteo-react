import React, { useState } from "react";

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null);

  const fetchData = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&appid=70200d1ebae81df48a605815f70456b6`)
      .then((response) => response.json())
      .then((data) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=70200d1ebae81df48a605815f70456b6`
        )
          .then((responseTwo) => responseTwo.json())
          .then((datas) => setResponseData(datas))
      );
  };
  const backgroundImg = () => {
    switch (responseData.weather[0].main) {
      case "Clouds":
        return "url(https://www.blogsicilia.it/wp-content/uploads/sites/2/2021/12/piogge-maltempo.jpg)";

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
  console.log(responseData);
  return (
    <div className="all" style={responseData && { backgroundImage: backgroundImg() }}>
      <input type="text" onKeyDown={handleKeyDown} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={fetchData}>Fetch Data</button>
      {responseData && <div>{JSON.stringify(responseData)}</div>}
    </div>
  );
}

export default Search;
