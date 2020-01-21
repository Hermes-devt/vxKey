
export function removeWord(listItem, cursor){
  let {text} = listItem;

  let after = text.substring( cursor.xPos);
  let before = text.substring(0, cursor.xPos);

  let afterCut = after.indexOf(' ');
  if( afterCut >= 0) 
    after = after.substring( afterCut );
  else
    after = after.substring( cursor.xPos );

  let beforeCut = before.lastIndexOf(' ');
  if( beforeCut >= 0){
    before = before.substring(0, beforeCut );
  } else{
    before = "";
    beforeCut = 0;
  } 

  listItem.text = before + after;
  cursor.xPos = beforeCut;
  return {listItem, cursor}
}

export default removeWord;