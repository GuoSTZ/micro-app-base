import React from 'react'
import { createRoot } from 'react-dom/client'
import View from './views'
import './index.less'

let root = createRoot(document.getElementById('root'));

const App = () => {
  return (
    <div>
      <View />
    </div>
  )
}

root.render(<App />)