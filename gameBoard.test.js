const gameBoard = require('./gameBoard.js');

it('generates a 3 by 3 board', () => {
  const board = gameBoard.makeBoard();
  expect(board.length).toBe(3);
  expect(board.every(row => row.length ===3)).toBe(true);
});

it('makes moves', () => {
  const board = gameBoard.makeBoard();
  gameBoard.move('X', 0, 0, board);
  expect(board[0][0]).toBe('X');
  expect(board[0][1]).not.toBe('X');
});

it('detects horizontal wins', () => {
  const board = [['X','X','X'],[0,0,0],[0,0,0]];
  expect(gameBoard.detectWin('X', board)).toBe(true);
  expect(gameBoard.detectWin('Y', board)).toBe(false);
  const board2 = [[0,0,0],['Y','Y','Y'],[0,0,0]];
  expect(gameBoard.detectWin('Y', board2)).toBe(true);
  expect(gameBoard.detectWin('X', board2)).toBe(false);
});

it('detects vertical wins', () => {
  const board = [[0,'X',0],[0,'X',0],[0,'X',0]];
  expect(gameBoard.detectWin('X', board)).toBe(true);
  expect(gameBoard.detectWin('Y', board)).toBe(false);
});

it('detects diagonal wins', () => {
  const board = [['Y','X','Y'],['X','Y','X'],['Y',0,0]];
  expect(gameBoard.detectWin('Y', board)).toBe(true);
  expect(gameBoard.detectWin('X', board)).toBe(false);
});

