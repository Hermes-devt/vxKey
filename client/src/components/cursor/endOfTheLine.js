
export function endOfTheLine(listItem, cursor){
  cursor.savePos = -1;
  let {text} = listItem;
  cursor.xPos = (text.length <= 0 ) ? 0 : text.length - 1;
  return cursor;
}