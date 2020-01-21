
// import tag from '../tags/tag';
export function setCoursorWithinBounds (list, cursor){

  if( list.length <= cursor.yPos )
    cursor.yPos = list.length - 1;

  let listItem = list[cursor.yPos];

  let {text} = listItem;
  // text = tag.cleanifyStringFromTags(text);

  if( cursor.xPos >= text.length )
    cursor.xPos = text.length - 1;
  
  if( cursor.xPos < 0)
    cursor.xPos = 0;

  return cursor;
}

export default {
  setCoursorWithinBounds,
}