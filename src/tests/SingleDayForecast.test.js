import React from "react";
import SingleDayForecast from "../Components/SingleDayForecast";
import { mockDataSingleDay } from '../__mocks__/mockData';
import { render, screen } from "@testing-library/react";

test('render Single Day Component With Data', () => { 
    render(<SingleDayForecast {...mockDataSingleDay} />)
    const element = screen.getByText('Date', { exact: false })
    expect(element).toBeInTheDocument();
})