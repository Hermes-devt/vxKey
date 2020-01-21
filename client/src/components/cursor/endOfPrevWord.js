// import tag from '../../util/tag';
// import tag from '../util/tag';

export function endOfPrevWord(list, cursor){
  cursor.savePos = -1;
  let {text} = list[cursor.yPos];

  //get the str before the coursor and reverse it
  let sub = text.substring( 0, cursor.xPos );
  sub = sub.split("").reverse().join('');

  let index = sub.indexOf(" ");

  if( index < 0 && cursor.yPos === 0) return cursor;
  if( index < 0 && cursor.yPos !== 0) cursor.yPos -= 1;

  //if no match go up one line on the last character
  if( index < 0 ){
    const lineLength = list[cursor.yPos].text.length;
    cursor.xPos = lineLength === 0 ? 0 : lineLength - 1;
    return cursor;
  }

  cursor.xPos -= (index + 2);
  return cursor;
}

export default {
  endOfPrevWord,
}