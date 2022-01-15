import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storeConfig from './store/storeConfig'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const store = storeConfig()

ReactDOM.render(
  <Provider store={store.storeConfig}>
    <PersistGate loading={null} persistor={store.persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
  ,
  document.querySelector('#root'),
);

// Biblioteca do Ant Design está retornando alguns erros de findDOM
// https://github.com/ant-design/ant-design/issues/26136
// Essa é a motivaçao das linhas abaixo, para suprimir

const backup = console.error;

console.error = function filterWarnings(msg) {
  const supressedWarnings = ['findDOM', 'Warning'];

  if (!supressedWarnings.some(entry => msg.includes(entry))) {
    backup.apply(console, arguments);
  }
}