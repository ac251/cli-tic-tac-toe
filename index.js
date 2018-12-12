const prompts = require('prompts');
const gameBoard = require('./gameBoard.js');


const initialPrompt = async () => {
  const response = await prompts({
    type: 'confirm',
    name: 'newGame',
    message: 'start a new game?',
    initial: true,
  }); 
  if (response.newGame) {
    newGame();
  } else {
    process.exit(0);
  }
}

const newGame = async () => {
  const board = gameBoard.makeBoard();
  const move = 0;
  const players = ['X', 'Y'];
  play(board, move, players);
};

const play = async (board, moveNum, players) => {
  const currentPlayer = players[moveNum % 2];
  console.log(renderBoard(board));
  console.log(`player ${currentPlayer}, your turn`);
  const move = await prompts({
    type: 'list',
    name: 'coordinates',
    message: 'enter <row>, <col> between 1 and 3',
    initial: '',
  });
  const { coordinates } = move;
  for (let i = 0; i < 2; i += 1) {
    const coordinate = coordinates[i];
     if (!(coordinate > 0) || !(coordinate < 4)) {
      console.log('please enter coordinates from 1 to 3');
      return play(board, moveNum, players);
    }
  }
  try {
    gameBoard.move(currentPlayer, coordinates[0] - 1, coordinates[1] - 1, board);
    if (gameBoard.detectWin(currentPlayer, board)) {
      console.log(renderBoard(board));
      console.log(`player ${currentPlayer} wins`);
      return initialPrompt();
    } else if (!gameBoard.possibleMove(board)) {
      console.log('it\'s a tie');
      return initialPrompt();
    } else {
      play(board, moveNum + 1, players);
    }
  }
  catch(err) {
    console.log(err.message);
    return play(board, moveNum, players);
  }
}

const renderBoard = board => {
  const rows = board.map(row => row.map(item => item === 0 ? ' ' : item).join('|'));
  return rows.join('\n–––––\n');
};

initialPrompt().catch(() => process.exit(1));

