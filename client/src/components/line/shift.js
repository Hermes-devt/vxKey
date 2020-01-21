import Cursor from '../cursor/_index';

export function shiftLineLeft( listItem, cursor){
  if( listItem.rowStyle.hasOwnProperty( 'paddingLeft')){
    listItem.rowStyle.paddingLeft -= 15;
    if(listItem.rowStyle.paddingLeft <= 5)
      listItem.rowStyle.paddingLeft = 5;

    return {listItem, cursor}
  }
  listItem.rowStyle ={ ...listItem.rowStyle, ...{paddingLeft: '0px'}}
  return {listItem, cursor}
};

export function shiftLineRight(listItem, cursor){
  if( listItem.rowStyle.hasOwnProperty( 'paddingLeft')){
    listItem.rowStyle.paddingLeft += 15;
    return { listItem, cursor }
  }
  listItem.rowStyle = { ...listItem.rowStyle, ...{paddingLeft: 15}}
  return { listItem, cursor }
}

export function moveLineDown(list, cursor){
  if( cursor.yPos >= list.length - 1)
    return {list, cursor};

  const item1 = list[cursor.yPos];
  const item2 = list[cursor.yPos + 1];

  list[cursor.yPos]         = item2;
  list[cursor.yPos + 1]     = item1;

  cursor = Cursor.moveDown(list, cursor);
  return {list, cursor};
}

export function moveLineUp(list, cursor){
    if( cursor.yPos <= 0 ) return { list, cursor};

    const item1 = list[cursor.yPos];
    const item2 = list[cursor.yPos - 1];

    list[cursor.yPos] = item2;
    list[cursor.yPos - 1] = item1;

    cursor = Cursor.moveUp(list, cursor);
    return {list, cursor}
}


export default {
  left: shiftLineLeft,
  right: shiftLineRight,
  down: moveLineDown,
  up: moveLineUp,
}