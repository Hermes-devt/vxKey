
import {moveUp, moveLeft, moveDown, moveRight} from './basicMovement.js';

import {begOfPrevWord} from './begOfPrevWord';
import {endOfPrevWord} from './endOfPrevWord';
import {begOfNextWord} from './begOfNextWord';

import {endOfNextWord} from './endOfNextWord';
import {begOfTheLine} from './begOfTheLine';
import {endOfTheLine} from './endOfTheLine';
import {jumpToNextMatch} from './jumpToNextMatch';
import {jumpToPreviousMatch} from './jumpToPreviousMatch';
import {cursorStorage} from './storage';
import {setCoursorWithinBounds} from './setCoursorWithinBounds';
// import {commandL} from './commandL';


export const Cursor = {
    begOfPrevWord,
    begOfNextWord,
    endOfNextWord,
    endOfPrevWord,
    begOfTheLine,
    endOfTheLine,
    jumpToNextMatch,
    jumpToPreviousMatch,

    moveLeft,
    moveUp,
    moveDown,
    moveRight,

    left: moveLeft,
    right: moveRight,
    up: moveUp,
    down: moveDown,
    // commandL,
    withinBounds: setCoursorWithinBounds,
    storage: cursorStorage,
}

export default Cursor;