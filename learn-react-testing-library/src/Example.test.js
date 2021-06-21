import { screen, render } from '@testing-library/react'

import Example from './Example'

test('There is a prop passed to example', () => {
  render(<Example title='Its a Me. Malario' />)
  screen.debug()

  const text = screen.getByText('Its a Me. Malario')
  expect(text).toBeInTheDocument()
})