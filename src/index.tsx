import { store } from './redux/store'
import { Provider } from 'react-redux'

import './App.css'
import App from './App'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(

  <Provider store={store}>
    <App />
  </Provider>

)
