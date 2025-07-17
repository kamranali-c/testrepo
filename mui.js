import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateRangeInput from './dateRangeInput';

describe('DateRangeInput', () => {
  it('renders without crashing', () => {
    render(<DateRangeInput item={[null, null]} applyValue={jest.fn()} />);
    expect(screen.getByTestId('date-range-picker')).toBeInTheDocument();
  });

  it('calls applyValue after selecting start and end dates', async () => {
    const user = userEvent.setup();
    const mockApplyValue = jest.fn();

    render(<DateRangeInput item={[null, null]} applyValue={mockApplyValue} />);

    // Click two selectable days
    const dayButtons = await screen.findAllByRole('option');
    await user.click(dayButtons[0]);
    await user.click(dayButtons[1]);

    expect(mockApplyValue).toHaveBeenCalled();
  });
});
