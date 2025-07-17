import { render, screen, within } from '@testing-library/react';
import TaskTable from './TaskTable';

test('finds "Job ID" in one of the containers', () => {
  render(<TaskTable />);

  const containers = screen.getAllByRole('presentation');

  const found = containers.some((container) =>
    within(container).queryByText('Job ID')
  );

  expect(found).toBe(true);
});
