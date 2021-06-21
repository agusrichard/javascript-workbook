import { useState } from 'react'

import Example from './Example'

function App() {
  const [showMe, setShowMe] = useState(false)

  return (
    <div className="App">
      <div>Sekardayu Hana Pradiani</div>
      <button onClick={() => setShowMe(!showMe)}>Click Me!</button>
      { showMe && <div>Agus Richard Lubis</div> }
      <Example title='Its a Me. Malario' />
    </div>
  )
}

export default App
