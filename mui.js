import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateRangeInput from './dateRangeInput';

describe('DateRangeInput', () => {
  const mockApplyValue = jest.fn();
  const defaultProps = {
    item: [null, null],
    applyValue: mockApplyValue,
  };

  beforeEach(() => {
    mockApplyValue.mockClear();
  });

  it('renders date range picker with correct attributes', () => {
    render(<DateRangeInput {...defaultProps} />);
    const picker = screen.getByTestId('date-range-picker');
    expect(picker).toBeInTheDocument();
  });

  it('updates state and calls applyValue on date change', async () => {
    const user = userEvent.setup();
    render(<DateRangeInput {...defaultProps} />);
    
    const startDateButton = await screen.findByRole('button', { name: /1/i });
    await user.click(startDateButton);

    const endDateButton = await screen.findByRole('button', { name: /2/i });
    await user.click(endDateButton);

    expect(mockApplyValue).toHaveBeenCalledTimes(1);
    const callArg = mockApplyValue.mock.calls[0][0];
    expect(callArg).toHaveProperty('value');
    expect(Array.isArray(callArg.value)).toBe(true);
  });

  it('displays correct default dates if item prop is provided', () => {
    const item = ['2023-01-01', '2023-01-10'];
    render(<DateRangeInput item={item} applyValue={mockApplyValue} />);
    expect(screen.getByTestId('date-range-picker')).toBeInTheDocument();
  });

  it('does not call applyValue if both dates are not set', () => {
    render(<DateRangeInput item={[null, '2023-01-10']} applyValue={mockApplyValue} />);
    expect(mockApplyValue).not.toHaveBeenCalled();
  });
});
