import React from "react";
import { useQuery, gql } from "@apollo/client";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./WeatherWidget.css";
const weather = gql`
  query weather {
    getWeather {
      current {
        temp
      }
      daily {
        sunrise
        sunset
        temp {
          min
          max
        }
        pop
      }
      hourly {
        wind_speed
        pop
      }
    }
  }
`;
function getTime(date) {
  let time = new Date(date * 1000);
  time = time.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
  });
  return time;
}
function WeatherWidget() {
  const { error, loading, data } = useQuery(weather);

  if (loading) return <LinearProgress />;
  if (error) return "yo thabet requete";
  return (
    <div className="wrapper">
      <img src="/svgs/sunnyweather.svg" alt="rain" className="bg" />
      <div className="cardWrapper">
        <div className="avrgtemp">{data?.getWeather?.current?.temp}°C</div>
        <div className="temp">
          Min. {data?.getWeather?.daily?.temp?.min}° Max.{" "}
          {data?.getWeather?.daily?.temp?.max}°
        </div>
        <div>
          <span className="location">static location</span>
        </div>
        <div className="locHotel">Hotel Tataris</div>
        <div className="w-2/3 -mt-4 mb-4 grid grid-cols-4 gap-x-8 md:gap-8 items-center justify-between">
          <img src="/svgs/card/rain.svg" alt="rain" />
          <div className="indicator">{data?.getWeather?.hourly?.pop}%</div>
          <img src="/svgs/card/wind.svg" alt="wind" />
          <div className="indicator">
            {data?.getWeather?.hourly?.wind_speed}k/h
          </div>
          <img src="/svgs/card/sun.svg" alt="sundawn" />
          <div className="indicator">
            {getTime(data?.getWeather?.daily?.sunrise)}
          </div>
          <img src="/svgs/card/sun.svg" alt="sunset" />
          <div className="indicator">
            {getTime(data?.getWeather?.daily?.sunset)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;
