
export function moveUp( list, cursor){
  // let oldPos = cursor.savePos;
  cursor.yPos -= 1;
  if( cursor.yPos <= 0 ) cursor.yPos = 0;
  let row = list[cursor.yPos].text;


  if( cursor.savePos >= 0){
    cursor.xPos =  cursor.savePos;
  }

  if( cursor.xPos > row.length - 1) cursor.xPos = row.length - 1;
  if( cursor.xPos < 0 )             cursor.xPos = 0;
  return cursor;
}

export function moveLeft( cursor){
  cursor.xPos = cursor.xPos -1;
  if( cursor.xPos < 0 ) cursor.xPos = 0;
  cursor.savePos = cursor.xPos;
  return cursor;
}

export function moveDown(list, cursor){
  cursor.yPos += 1;

  //Check so it's not outside y-bound
  if( cursor.yPos >= list.length - 1) cursor.yPos = list.length - 1;

  if( cursor.savePos >= 0){
    cursor.xPos =  cursor.savePos;
  }
  
  //check so it's not outside x-bound
  let text = list[cursor.yPos].text;
  if( cursor.xPos >= text.length - 1)  cursor.xPos = text.length - 1;
  if( cursor.xPos <= 0 )               cursor.xPos = 0;

  return cursor;
}

export function moveRight(listItem, cursor){
  let {text} = listItem;
  cursor.xPos += 1;
  cursor.savePos = cursor.xPos;
  if( cursor.xPos >= text.length) 
    cursor.xPos = text.length - 1;
  return cursor;
}

export default{
  moveUp,
  moveLeft,
  moveDown,
  moveRight,
}
