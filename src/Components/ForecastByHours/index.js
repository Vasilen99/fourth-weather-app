import React from "react";
import SingleDayForecast from "../SingleDayForecast";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import './index.css'

export default function ForecastByHours({
  hourlyForecast = [],
  selectedDate = format(new Date(), "dd/MM/yyyy"),
  closeForecastByHours = () => {},
}) {
  return (
    <>
      <div className="header-container">
        <h2>{`Weather Forecast By Hours For ${format(new Date(selectedDate), 'dd/MM/yyyy')}.`}</h2>
        <CloseIcon onClick={closeForecastByHours} />
      </div>
      <div className="forecast-by-hours-container">
        {hourlyForecast.map((singleDayForecastData) => (
            <div key={singleDayForecastData.dt}>
              <SingleDayForecast
                date={format(new Date(singleDayForecastData.dt_txt), "kk:mm")}
                dateText="Hour"
                temperature={`${Number(singleDayForecastData.main.temp).toFixed(
                  0
                )}`}
                description={singleDayForecastData.weather[0].description}
                imgId={singleDayForecastData.weather[0].icon}
                windSpeed={singleDayForecastData.wind.speed}
              />
            </div>
          ))}
      </div>
    </>
  );
}
