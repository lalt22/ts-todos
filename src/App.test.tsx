import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-test-renderer';

import App from './App';
import 'vitest';
import { expect } from 'vitest';
// import { describe, it } from 'vitest';

// const task1 = {
//   id: 1,
//   description: 'hello',
//   completed: false,
//   createdDate: new Date('2024-03-08T01:16:30.000Z'),
//   dueDate: new Date('2024-03-08T01:16:30.000Z'),
// };

// const task2 = {
//   id: 2,
//   description: 'there',
//   completed: false,
//   createdDate: new Date('2024-03-08T01:17:30.000Z'),
//   dueDate: new Date('2024-03-09T01:16:30.000Z'),
// };

describe('Setup Tests', () => {
  it('tests true', () => {
    expect(true).toBe(true);
  });
});

describe('New Task Form Rendering', () => {
  it("Should render the form if 'Add New' clicked and unrender it when 'Cancel' is clicked", async () => {
    // await act(async () => render(<App />));
    render(<App />);
    const user = userEvent.setup();
    const formButton = await screen.findByTestId('new_form_btn');
    expect(formButton).toBeInTheDocument();
    expect(formButton.innerHTML).toBe('Add New');
    await act(async () => user.click(formButton));
    expect(formButton.innerHTML).toBe('Cancel');
    const form = await screen.findByTestId('add_form');
    expect(form).toBeInTheDocument();
    await act(async () => user.click(formButton));
    expect(formButton.innerHTML).toBe('Add New');
    expect(form).not.toBeInTheDocument();
  });
});

describe('Searching', () => {
  it('Should display the tasks that contain the search term', async () => {
    render(<App />);
    const user = userEvent.setup();
    const searchbar = await screen.findByPlaceholderText(
      'Search By Description',
    );
    expect(searchbar).toBeInTheDocument();
    await act(async () => user.type(searchbar, 'he'));
    const matchingTasks = await screen.findAllByTestId(/he/i);
    console.log(matchingTasks);
  });
});
