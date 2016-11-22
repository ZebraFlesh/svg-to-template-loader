/* globals document: false */
import ReactDom from 'react-dom';
import App from './App.jsx';

import './main.css';

const rootId = 'react-root';
let container = document.getElementById(rootId);
if (!container) {
  container = document.createElement('div');
  container.id = rootId;
  document.body.appendChild(container);
}

ReactDom.render(<App />, container);
