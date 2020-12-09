import { render, screen,fireEvent } from '@testing-library/react';
import App from './App';

test('Renders App and Page', () => {
  render(<App />);
  const linkElement = screen.getByText(/1. Choose Temporary Username/i);
  expect(linkElement).toBeInTheDocument();
});

// test('Fill Form and Submit without username', () => {
//   render(<App />);
  
//   fireEvent.click(screen.getByTestId(/create/i))
//   expect(screen.getByText(/1. Choose Temporary Username/i)).toBeInTheDocument();
// });
