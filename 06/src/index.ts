import {createRoot} from 'react-dom/client'
import {Application} from './Application'

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.querySelector('#root'))
  root.render(Application())
})
