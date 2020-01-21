
// gets max xPos of the string that is above the current one
function get_xPos(list, cursor){
  cursor.yPos -= 1;
  if( cursor.yPos < 0 ){
    cursor.yPos = 0;
    return cursor;
  }

  let {text} = list[cursor.yPos];
  cursor.xPos = text.length - 1;
  return cursor
}

export function begOfPrevWord(list, cursor){
  cursor.savePos = -1;
  const oldCursor = {...cursor};
  let {text} = list[cursor.yPos];

  //get the str before the coursor and reverse it
  let reversedStr = text.substring( 0, cursor.xPos );
  reversedStr = reversedStr.split("").reverse().join('');

  if( cursor.xPos <= 0){
    if( cursor.yPos === 0){
      cursor.xPos = 0; return cursor; } 


    cursor.yPos -= 1;
    text = list[cursor.yPos].text;
    if( !text.length ) 
      cursor.xPos = 0;
    let index = text.split("").reverse().join('').indexOf(" ");
    cursor.xPos = (index >= 0) ? text.length - index : 0;
    return cursor;
  }

  // try to match a character and space after each other then set the position on the character
  let regex = /\w[\s]/;
  let index = reversedStr.search( regex );
  cursor.xPos = cursor.xPos - index - 1;
  
  // if no change that indicates that we are on the first word of the line
  if( oldCursor.xPos === cursor.xPos ){
    if( oldCursor.xPos === 0){
      return get_xPos(list, cursor);
    }
    cursor.xPos = 0;
  }
  return cursor;
}

export default {
  begOfPrevWord,
}