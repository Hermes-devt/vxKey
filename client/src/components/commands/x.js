
// import tag from '../tags/tag';

//Deletes the listItem currently under the cursor
export function x(listItem, cursor){
  let {text} = listItem;
  // let itemScrubbed = tag.cleanifyStringFromTags(text);
  let itemScrubbed = text;

  //if the string doesn't contain anything return;
  if (itemScrubbed.length === 0 )
    return {listItem, cursor};

  // if value is within text string then remove the character
  if( cursor.xPos < itemScrubbed.length ){
    listItem.text = itemScrubbed.substring(0, cursor.xPos) + text.substring( cursor.xPos + 1);
  }

  //if the x position has moved itself out of bound set it again within boundaries
  if( cursor.xPos >= itemScrubbed.length - 1){
    cursor.xPos = itemScrubbed.length - 2;
  }

  return {listItem, cursor}
}
export default x;