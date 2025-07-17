import { render, screen, within } from '@testing-library/react';
import TaskTable from './TaskTable';

test('finds multiple column headers in containers', () => {
  render(<TaskTable />);

  const containers = screen.getAllByRole('presentation');

  const expectedTexts = ['Job ID', 'Status', 'Submitted Time'];

  expectedTexts.forEach((text) => {
    const found = containers.some((container) =>
      within(container).queryByText((content) => content.includes(text))
    );
    expect(found).toBe(true);
  });
});
