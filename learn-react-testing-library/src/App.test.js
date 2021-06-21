import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

test('Is there sekar in App', () => {
  render(<App />)
  const sekarText = screen.getByText('Sekardayu Hana Pradiani')
  expect(sekarText).toBeInTheDocument()
})

test('There is me when the button is clicked', () => {
  render(<App />)
  const button = screen.getByText('Click Me!')
  
  userEvent.click(button)

  const itsAMe = screen.getByText('Agus Richard Lubis')
  expect(itsAMe).toBeInTheDocument()
})