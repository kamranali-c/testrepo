import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DateRangeInput from "./DateRangeInput"; // Adjust path as needed

test("calls applyValue with adjusted start and end dates", async () => {
  const applyValue = jest.fn();
  const item = [];

  render(<DateRangeInput item={item} applyValue={applyValue} />);

  // Open the date picker
  await userEvent.click(screen.getByRole("button"));

  // Select July 1st
  const startDay = document.querySelector(".react-datepicker__day--001");
  expect(startDay).toBeInTheDocument();
  if (startDay) {
    await userEvent.click(startDay);
  }

  // Select July 2nd
  const endDay = document.querySelector(".react-datepicker__day--002");
  expect(endDay).toBeInTheDocument();
  if (endDay) {
    await userEvent.click(endDay);
  }

  // Wait for applyValue to be called
  await waitFor(() => {
    expect(applyValue).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "2025-07-02:2025-07-03", // Adjusted by +1 day in useEffect
      })
    );
  });
});
