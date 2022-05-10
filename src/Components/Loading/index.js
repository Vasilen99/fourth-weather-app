import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import './index.css'
export default function Loading () {
  return (
    <div className='loading-container'>
      <CircularProgress />
      <div className="text">Loading. Please wait ... </div>
    </div>
  );
}
