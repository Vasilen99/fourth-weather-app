import React from "react";
import { format } from "date-fns";
import "./index.css";
import AirIcon from "@mui/icons-material/Air";

export default function SingleDayForecast({
  date = format(new Date(), "dd/MM/yyyy kk:mm"),
  dateText = "Date",
  temperature = "20",
  imgId = "10d",
  description = "sunny",
  windSpeed = "3",
}) {
  return (
    <div className={`single-day-container`}>
      <div className="date-container">{`${dateText} : ${date}`}</div>
      <div className="temperature-container">
        <img
          src={`http://openweathermap.org/img/w/${imgId}.png`}
          width="45px"
          height="45px"
          alt="weather-description-icon"
        />
        <div>{`${temperature}°C / ${description}`}</div>
      </div>
      <div className="wind-container">
        <AirIcon />
        <div>{`${windSpeed} m/s`}</div>
      </div>
    </div>
  );
}
