import { render, screen, fireEvent } from '@testing-library/react';
import DateRangeInput from './DateRangeInput';

describe('DateRangeInput', () => {
  const setup = (value = [], applyValue = jest.fn()) => {
    render(<DateRangeInput item={{ value }} applyValue={applyValue} />);
    const inputs = screen.getAllByRole('textbox');
    return { inputs, applyValue };
  };

  it('renders two date input fields', () => {
    const { inputs } = setup();
    expect(inputs.length).toBe(2);
  });

  it('displays pre-filled values if provided', () => {
    const { inputs } = setup(['2025-07-01', '2025-07-10']);
    expect(inputs[0].value).toBe('2025-07-01');
    expect(inputs[1].value).toBe('2025-07-10');
  });

  it('calls applyValue when start date is changed', () => {
    const applyValue = jest.fn();
    const { inputs } = setup(['2025-07-01', '2025-07-10'], applyValue);
    fireEvent.change(inputs[0], { target: { value: '2025-07-05' } });
    expect(applyValue).toHaveBeenCalledWith({ value: ['2025-07-05', '2025-07-10'] });
  });

  it('calls applyValue when end date is changed', () => {
    const applyValue = jest.fn();
    const { inputs } = setup(['2025-07-01', '2025-07-10'], applyValue);
    fireEvent.change(inputs[1], { target: { value: '2025-07-15' } });
    expect(applyValue).toHaveBeenCalledWith({ value: ['2025-07-01', '2025-07-15'] });
  });

  it('handles empty initial value gracefully', () => {
    const { inputs } = setup(undefined);
    expect(inputs[0].value).toBe('');
    expect(inputs[1].value).toBe('');
  });

  it('still renders if no item prop is passed', () => {
    render(<DateRangeInput applyValue={jest.fn()} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(2);
  });
});
