import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "./App.css";
import { Button } from "@mui/material";
import Loading from "./Components/Loading";
import SingleDayForecast from "./Components/SingleDayForecast";
import ForecastByHours from "./Components/ForecastByHours";
import Search from "./Components/Search";
import { format } from "date-fns";
const API_KEY = "b1cd543fab32ccde7564f7940c3ca1c8";

export default function App() {
  const [data, setData] = useState({});
  const [daysForecast, setDaysForecast] = useState([]);
  const [lat, setLat] = useState("51.509865");
  const [lon, setLon] = useState("-0.118092");
  const [loading, setLoading] = useState(false);
  const [selectedDateForForecastByHours, setSelectedDateForForecastByHours] =
    useState("");

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const result = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        if (
          result &&
          result.status === 200 &&
          result.data &&
          result.data.list &&
          result.data.list.length
        ) {
          const daysArr = [];
          result.data.list.forEach((each3hInterval, index) => {
            if (index % 8 === 0) {
              daysArr.push(each3hInterval);
            }
          });
          setDaysForecast(daysArr);
          setData(result.data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err)
      }
    };
    fetchDataFromAPI();
  }, [lat, lon]);

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation);
    }
    setLoading(false);
  };

  const setLocation = (position) => {
    if (position) {
      setLoading(true);
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      setSelectedDateForForecastByHours("");
    }
  };

  const changeCityFromSearch = (cityObj) => {
    if (cityObj && cityObj.coords && cityObj.label) {
      setLocation(cityObj);
    }
  };

  if (!data || !Object.keys(data).length || !daysForecast.length)
    return <Loading />;
  return (
    <div className="root">
      <div className="options-container">
        <Button onClick={() => getLocation()} color="primary">
          Retreive User Data
        </Button>
        <Search setLocation={(event, value) => changeCityFromSearch(value)} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1>{`Weather in ${data.city.name}`}</h1>
          <div className="forecast-by-days-container">
            {daysForecast.map((singleDayForecastData) => {
              const formattedDate = format(
                new Date(singleDayForecastData.dt_txt),
                "dd/MM/yyyy kk:mm"
              );
              const currentElementCheck = selectedDateForForecastByHours.split(" ")[0] === singleDayForecastData.dt_txt.split(" ")[0]
              return (
                <div key={singleDayForecastData.dt}>
                  <SingleDayForecast
                    date={formattedDate}
                    dateText="Date"
                    selectedDayStyle={ currentElementCheck }
                    temperature={`${Number(
                      singleDayForecastData.main.temp
                    ).toFixed(0)}`}
                    description={singleDayForecastData.weather[0].description}
                    imgId={singleDayForecastData.weather[0].icon}
                    windSpeed={singleDayForecastData.wind.speed}
                  />
                  <Button
                    onClick={() =>
                      setSelectedDateForForecastByHours(
                        selectedDateForForecastByHours && currentElementCheck  ? '' : singleDayForecastData.dt_txt
                      )
                    }
                    className="view-more-button"
                    color="secondary"
                  >
                    View Details
                  </Button>
                </div>
              );
            })}
          </div>
        </>
      )}
      {selectedDateForForecastByHours ? 
        <ForecastByHours
        hourlyForecast={data.list.filter(
            (eachHourInterval) =>
              eachHourInterval.dt_txt.split(" ")[0] === selectedDateForForecastByHours.split(" ")[0]
          )}
          selectedDate={selectedDateForForecastByHours.split(" ")[0]}
          closeForecastByHours={() => setSelectedDateForForecastByHours("")}
        />
       : null}
    </div>
  );
}
