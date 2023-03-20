import React from 'react'
import { createRoot } from 'react-dom/client'
import WorldView from './views/comp'
import './index.less'

let root = createRoot(document.getElementById('root'));

const App = () => {
  return (
    <React.Fragment>
      <WorldView />
    </React.Fragment>
  )
}

root.render(<App />)