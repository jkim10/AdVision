
// eslint-disable-file
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import Lobby from './Lobby'
import NavBar from './shared/Navbar'
test('Renders App and Page', () => {
  render(<App />)
  const linkElement = screen.getByText(/1. Choose Temporary Username/i)
  expect(linkElement).toBeInTheDocument()
})

test('Test Lobby Component', () => {
  render(<Lobby username='fakeUsername' room_code='1234' />)

  const linkElement = screen.getByText(/Suggestions/i)
  expect(linkElement).toBeInTheDocument()
})

test('Test Navbar Component', () => {
  render(<NavBar />)

  const linkElement = screen.getByText(/Let's Decide/i)
  expect(linkElement).toBeInTheDocument()
})

test('Test Room Creation', () => {
  render(<App />)
  const usernameForm = screen.getByTestId('username')
  fireEvent.change(usernameForm, { target: { value: 'test' } })
  const createButton = screen.getByTestId('create')
  fireEvent.click(createButton)
  expect(screen.getByText(/Users/i)).toBeInTheDocument()
})

test('Test Room Creation', () => {
  render(<App />)
  const usernameForm = screen.getByTestId('username')
  fireEvent.change(usernameForm, { target: { value: 'test' } })
  const roomCodeForm = screen.getByTestId('room_code')
  fireEvent.change(roomCodeForm, { target: { value: 'test' } })
  fireEvent.submit(screen.getByTestId('form'))
  expect(screen.getByText(/Users/i)).toBeInTheDocument()
})
