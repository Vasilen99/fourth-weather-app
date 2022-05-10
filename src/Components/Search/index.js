import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Search({ setLocation = () => {} }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={topCities}
      onChange={setLocation}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Choose City" />}
    />
  );
}

const topCities = [
  { coords: { latitude: "30.033333", longitude: "31.233334" },label: "Cairo" },
  { coords: { latitude: "40.730610", longitude: "-73.935242" }, label: "New York" },
  { coords: { latitude: "19.380002", longitude: "-99.134007" }, label: "Mexico City" },
  { coords: { latitude: "48.864716", longitude: "2.349014" }, label: "Paris" },
  { coords: { latitude: "55.751244", longitude: "37.618423" }, label: "Moscow" }
];
