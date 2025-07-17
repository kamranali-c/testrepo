import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DateRangeInput from "./DateRangeInput";

it("should output dates in yyyy-mm-dd", async () => {
  const applyValue = jest.fn();
  const item = [];

  render(<DateRangeInput item={item} applyValue={applyValue} />);

  const user = userEvent.setup();

  const startDay = document.querySelector(".react-datepicker__day--001");
  expect(startDay).toBeInTheDocument();
  if (startDay) await user.click(startDay);

  const endDay = document.querySelector(".react-datepicker__day--002");
  expect(endDay).toBeInTheDocument();
  if (endDay) await user.click(endDay);

  await waitFor(() => {
    expect(applyValue).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "2025-07-02:2025-07-03",
      })
    );
  });
});
