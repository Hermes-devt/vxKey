
import Cursor from '../cursor/_index'
import Line from './_index';

export function getDefaultEmptyLine(left = 5){
  let row = { text: '', rowStyle: { paddingLeft: left} };
  return row;
}

export function insertNewLine(list, cursor){

  let style = list[cursor.yPos].rowStyle.paddingLeft;
  let text = list[cursor.yPos].text;

  let row = getDefaultEmptyLine(style);
  list.splice( cursor.yPos + 1, 0, row);
  cursor = Cursor.down(list, cursor)

  if( text.length > 0 && text[text.length-1] === ':'){
    list[cursor.yPos - 1].rowStyle = {...list[cursor.yPos].rowStyle, ...{backgroundColor: 'black', color: 'white'}};
    const {listItem, cursor:cursor2} = Line.shiftRight( list[cursor.yPos], cursor);
    list[cursor.yPos] = listItem; cursor = cursor2;
  }
  return { list, cursor }
}

export function insertNewLineAbove(list, cursor){
  let style = list[cursor.yPos].rowStyle.paddingLeft;
  let row = getDefaultEmptyLine(style);
  list.splice( cursor.yPos, 0, row);
  return {list, cursor} 
}

export function insertionEnter(listItems, cursor){
  listItems[cursor.yPos].rowStyle.paddingLeft = listItems[cursor.yPos].rowStyle.paddingLeft;
  let {text} = listItems[cursor.yPos];
  let sub = text.substring( !cursor.insertAfter ? cursor.xPos : cursor.xPos + 1);

  // Allows the user to split the line in 2 if it has text after the cursor
  let before = text.substring(0, cursor.xPos )
  let after = text.substring( sub.length + cursor.xPos, text.length );

  let {list, cursor:cursor1} = insertNewLine( listItems, cursor );
  cursor = cursor1;

  list[cursor.yPos].text = "" + sub;
  list[cursor.yPos - 1].text = before + after;

  return {cursor, list}
}

export default {
  insertNewLine,
  insertionEnter,
  insertNewLineAbove
}