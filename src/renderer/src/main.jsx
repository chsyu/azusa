import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.css'
import './assets/Form.css'
import './assets/Nav.css'
import './assets/Table.css'
import './assets/CoachDetail.css'
import './assets/StudentDetail.css'
import App from './App'
import './stylesheets/all.scss'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* 使用 Provider 包裹根组件，并传递 Redux Store */}
      <App />
    </Provider>
  </React.StrictMode>
);
