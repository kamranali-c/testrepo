import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateRangeInput from './dateRangeInput';

describe('DateRangeInput', () => {
  it('renders the calendar when user interacts', async () => {
    render(<DateRangeInput item={[null, null]} applyValue={jest.fn()} />);

    // Open the calendar by clicking the input
    const input = screen.getByRole('textbox');
    await userEvent.click(input);

    // Now we should see the calendar popup by its label
    const calendar = screen.getByLabelText('Choose Date');
    expect(calendar).toBeInTheDocument();
  });

  it('calls applyValue after selecting a range', async () => {
    const mockApplyValue = jest.fn();
    const user = userEvent.setup();

    render(<DateRangeInput item={[null, null]} applyValue={mockApplyValue} />);

    const input = screen.getByRole('textbox');
    await user.click(input);

    const days = await screen.findAllByRole('option');
    await user.click(days[0]);
    await user.click(days[1]);

    expect(mockApplyValue).toHaveBeenCalled();
  });
});
