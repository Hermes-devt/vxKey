// import tag from '../tags/tag';

export function endOfNextWord(list, cursor){
  cursor.savePos = -1;
  let {text} = list[cursor.yPos];
  let oldCursor = {...cursor};
  
  //clean up the row from all the unnecessary tags.
  // text = tag.cleanifyStringFromTags(text);

  //if at the end of the string.
  if( cursor.xPos >= text.length - 1){

    //if on the last row.
    if( cursor.yPos >= list.length - 1){
      return cursor; }

    //increment and check again if it's on the last row if so decrement again.
    cursor.yPos += 1;
    if( cursor.yPos >= list.length - 1){
      cursor.yPos = list.length - 1;
    }
    // text = tag.cleanifyStringFromTags(list[cursor.yPos])
  }

  //Removes all unnecessary text before the cursor
  // the +1 is so it doesnt get stuck if it is at the end of a word.
  let sub = text.substring( cursor.xPos + 1 );

  // Jump to the end of the next word.
  var regex2 = /[w.!?][s]/;
  // var regex2 = /[\w\.!?][\s]/;
  let index = sub.search( regex2 ) + 1;
  cursor.xPos = index + text.substring(0, cursor.xPos ).length

  // if the cursor doesn't jump any further go the last character of the row
  if( oldCursor.xPos >= cursor.xPos && oldCursor.yPos === cursor.yPos ){
    cursor.xPos = text.length - 1;
    return cursor;
  }

  return cursor
}



export default {
  endOfNextWord,
}