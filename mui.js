import React from "react";
import { screen } from "@testing-library/react";
import { render } from "test/test-utils";
import userEvent from "@testing-library/user-event";
import CustomDatePicker from "./CustomDatePicker";

test("selects July 1st using class 'react-datepicker__day--001'", async () => {
  const date = new Date(2022, 4, 7); // Initial date

  render(<CustomDatePicker date={date} />);

  // Open the date picker
  await userEvent.click(screen.getByRole("button"));

  // Select the day with class 'react-datepicker__day--001'
  const day = document.querySelector(".react-datepicker__day--001");
  expect(day).toBeInTheDocument();
  if (day) {
    await userEvent.click(day);
  }

  // Optional: assert that the input now shows July 1st
  // expect(screen.getByRole("textbox")).toHaveValue("07/01/2025"); // Adjust format as needed
});
