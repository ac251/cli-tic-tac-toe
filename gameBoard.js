exports.makeBoard = () => {
  const makeRow = () => {
    return [0, 0, 0];
  }
  return [makeRow(), makeRow(), makeRow()];
};

exports.move = (playerChar, row, col, board) => {
  if (board[row][col] !== 0) {
    throw new Error('that space is already taken!')
  } else {
    board[row][col] = playerChar;
  }
};

exports.possibleMove = (board) => {
  return board.some(row => row.some(spot => spot === 0));
}

exports.detectWin = (playerChar, board) => {
  for (let i = 0; i < 3; i += 1) {
    if (board[i].every(item => item === playerChar)) {
      return true;
    }
    if (board.every(row => row[i] ===  playerChar)) {
      return true;
    }
  }
  let oneDiag = true;
  let otherDiag = true;
  let i;
  let j;
  for (i = 0, j = 2; i < 3, j >= 0; i += 1, j -= 1) {
    oneDiag = board[i][i] === playerChar && oneDiag;
    otherDiag = board[i][j] === playerChar && otherDiag;
  }
  return oneDiag || otherDiag;
};
