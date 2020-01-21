
import shift from './shift';
import {insertionEnter, insertNewLineAbove, insertNewLine } from './newRow';

export const Line = {
  above: insertNewLineAbove,
  below: insertNewLine,
  enter: insertionEnter,

  shiftLeft: shift.left,
  shiftRight: shift.right, 
  shiftUp:  shift.up,
  shiftDown: shift.down,
  
  createAbove: insertNewLine,
  createBelow: insertNewLine,
}

export default Line;