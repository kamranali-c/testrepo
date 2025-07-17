<DatePicker
  selectsRange
  startDate={startDate}
  endDate={endDate}
  onChange={([start, end]) => {
    setStartDate(start);
    setEndDate(end);
  }}
  inline
  calendarClassName="date-range-picker"
  wrapperClassName="date-range-picker-wrapper"
  data-testid="date-range-picker"
/>

    //

import { render, screen, fireEvent } from '@testing-library/react';
import DateRangeInput from '../utils/dateRangeInput';

describe('DateRangeInput', () => {
  const setup = (value = [], applyValue = jest.fn()) => {
    render(<DateRangeInput item={{ value }} applyValue={applyValue} />);
    return { applyValue };
  };

  it('renders without crashing', () => {
    setup();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('displays pre-filled dates if provided', () => {
    const start = new Date('2025-07-01');
    const end = new Date('2025-07-10');
    setup([start, end]);

    // The inline calendar should show both dates as selected
    expect(document.querySelector('.react-datepicker__day--selected')).toBeInTheDocument();
  });

  it('calls applyValue once both dates are selected', () => {
    const applyValue = jest.fn();
    setup([], applyValue);

    const startBtn = screen.getByText('15');
    const endBtn = screen.getByText('20');

    fireEvent.click(startBtn);
    fireEvent.click(endBtn);

    expect(applyValue).toHaveBeenCalledTimes(1);
    expect(applyValue).toHaveBeenCalledWith({
      value: expect.arrayContaining([
        expect.stringMatching(/^2025-07-15/),
        expect.stringMatching(/^2025-07-20/),
      ]),
    });
  });

  it('does not call applyValue if only one date is selected', () => {
    const applyValue = jest.fn();
    setup([], applyValue);

    const startBtn = screen.getByText('10');
    fireEvent.click(startBtn);

    expect(applyValue).not.toHaveBeenCalled();
  });

  it('handles missing item.value without crashing', () => {
    render(<DateRangeInput item={{}} applyValue={jest.fn()} />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
});
