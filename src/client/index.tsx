import React from 'react';
import ReactDOM from 'react-dom';

import App from '@client/App';

ReactDOM.hydrate(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);