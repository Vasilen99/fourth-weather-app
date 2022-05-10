import React from "react";
import ForecastByHours from "../Components/ForecastByHours";
import userEvent from "@testing-library/user-event";
import { mockDataResponse } from "../__mocks__/mockData";
import { render, screen } from "@testing-library/react";
//issue with removing the component. Probably missing function "closeForecastByHours".
test("render ForecastByHours Component With Data", () => {
  const date = "2022-05-11";
  const hourlyForecast = mockDataResponse.list.filter(
    (eachHourInterval) => eachHourInterval.dt_txt.split(" ")[0] === date
  );
  render( <ForecastByHours hourlyForecast={hourlyForecast} selectedDate={date} /> );
  const element = screen.getByText("Weather Forecast By Hours", { exact: false });
  expect(element).toBeInTheDocument();
  const imgElement = screen.getByTestId('CloseIcon');
  userEvent.click(imgElement); 
  expect(element).not.toBeInTheDocument();
});
