import React from "react";
import App from "../App";
import { render, screen } from "@testing-library/react";
import mockAxios from "jest-mock-axios";
const API_KEY = "b1cd543fab32ccde7564f7940c3ca1c8";
beforeEach(() => {
  mockAxios.reset();
});
afterEach(() => {
  mockAxios.reset();
});

test("Call API", async () => {
  render(<App />);
  expect(mockAxios.get).toHaveBeenCalledWith(
    `http://api.openweathermap.org/data/2.5/forecast?lat=51.509865&lon=-0.118092&units=metric&appid=${API_KEY}`
  );
});

test("Render App Component Loading State", async () => {
  render(<App />);
  const loadingElement = screen.getByText("Loading", { exact: false });
  expect(loadingElement).toBeInTheDocument();
});
