import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import "./App.css";
import Loading from "./Components/Loading";
const API_KEY = "b1cd543fab32ccde7564f7940c3ca1c8";

export default function App() {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [lat, setLat] = useState("51.509865");
  const [lon, setLon] = useState("-0.118092");
  const [loading, setLoading] = useState(false);

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
          setData(result.data);
          setLoading(false);
        }
      } catch (err) {
        setError(err);
      }
    };
    fetchDataFromAPI();
  }, [lat && lon]);

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
    }
  };

  if (!data || !Object.keys(data) || !Object.keys(data).length)
    return <Loading />;
  return (
    <div className="root">
      <div className="options-container">
        <Button onClick={() => getLocation()} color="primary">
          Retreive User Data
        </Button>
      </div>
      {loading ? <Loading /> : <h1>{`Weather in ${data.city.name}`}</h1>}
    </div>
  );
}
