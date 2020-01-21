
export function begOfNextWord(list, cursor){
  cursor.savePos = -1;
  let {text} = list[cursor.yPos];
 
  let sub = text.substring( cursor.xPos );
  let index = sub.indexOf(' ');
  
  if( index < 0 && cursor.yPos >= list.length - 1)
    return cursor;

  if( index < 0){
    cursor.yPos++;
    cursor.xPos = 0;
    return cursor;
  }

  cursor.xPos += index + 1;
  return cursor;
}


export default {
  begOfNextWord,
}