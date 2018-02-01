import React from 'react';
import ReactDOM from 'react-dom';

import Game from './TicTacToe';

export default () =>
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
