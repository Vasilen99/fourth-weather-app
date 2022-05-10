import React, { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = 'b1cd543fab32ccde7564f7940c3ca1c8'

export default function App() {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [lat, setLat] = useState("51.509865");
  const [lon, setLon] = useState("-0.118092");

  useEffect(() => { 
    const fetchDataFromAPI = async () => {
      try {
        const result = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        if ( result && result.status === 200 && result.data &&  result.data.list &&  result.data.list.length ) {
          setData(result.data);
        }
      } catch (err) {
        setError(err);
      }
    };
    fetchDataFromAPI();
  },[])
  if(!data || !Object.keys(data)) return null;
  return (
    <div className="root">
      <h1>{`Weather in ${data.city.name}`}</h1>
    </div>
  );
}
