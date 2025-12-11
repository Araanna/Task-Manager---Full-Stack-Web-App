import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./services/api', () => ({
  getTasks: jest.fn(() => Promise.resolve([])),
}));

test('renders task manager header', async () => {
  render(<App />);
  const linkElement = await screen.findByText(/Task Manager/i);
  expect(linkElement).toBeInTheDocument();
});
