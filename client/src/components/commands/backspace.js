
import Line from '../line/_index';
import {deleteRow} from '../commands/deleteRow';

function insertAfterMode(list, cursor){
  let {text} = list[cursor.yPos];
  let listItem = list[cursor.yPos];


  if( text.length <= 0){
    if( listItem.rowStyle.paddingLeft <= 5 && cursor.yPos > 0){
        let {list: list2, cursor: cursor2} = deleteRow(list, cursor);
        cursor = cursor2;
        list = list2;
        if( !(list.length-1 === cursor.yPos))
          cursor.yPos -= 1;
        cursor.xPos = list[cursor.yPos].text.length - 1;
    }else{
      let {listItem:listItem2, cursor:cursor2} = Line.shiftLeft( listItem, cursor);
      list[cursor.yPos] = listItem2;
      cursor = cursor2;
      cursor.insertAfter = true;
    }
    return {list, cursor}
  }

  if( cursor.xPos === 0 && text.length - 1 === 0){
    list[cursor.yPos].text = text.slice(0, cursor.xPos) + text.slice(cursor.xPos + 1 );
    cursor.xPos = 0;
    cursor.insertAfter = true;
    return {list, cursor}
  }

  if( cursor.xPos === 0 ){
    list[cursor.yPos] = text.substring(1);
    cursor.insertAfter = false;
    return {list, cursor}
  }

  list[cursor.yPos].text = text.slice(0, cursor.xPos) + text.slice(cursor.xPos + 1 );
  cursor.xPos -= 1;
  return {list, cursor};
}

function insertBeforeMode(list, cursor){
  let {text} = list[cursor.yPos];
  let listItem = list[cursor.yPos];

  if( cursor.xPos === 0 ){
    let {listItem:listItem2, cursor:cursor2} = Line.shiftLeft(listItem, cursor);
    list[cursor.yPos] = listItem2;
    cursor = cursor2;
    cursor.insertAfter = false;
    return {list, cursor}
  }

  if( cursor.xPos === text.length -1 ){
    list[cursor.yPos].text = text.slice(0, cursor.xPos -1 ) + text.slice(cursor.xPos);
    cursor.xPos -= 1;
    return {list, cursor}
  }

  list[cursor.yPos].text = text.slice(0, cursor.xPos - 1) + text.slice(cursor.xPos );
  cursor.xPos -= 1;
  return {list, cursor};
}

export function Backspace(list, cursor,){
  if( cursor.insertAfter) return insertAfterMode(list, cursor);
  else                    return insertBeforeMode(list, cursor);
}

export default {
  Backspace,
}