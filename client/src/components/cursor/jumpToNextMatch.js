
export function jumpToNextMatch(list, match, cursor){
  cursor.savePos = -1;
  match = match.substring(1);
  let oldCursor = {...cursor};

  //find if match on the current row behind in front of the cursor.
  let currentRow = list[cursor.yPos].text;
  let afterCursor = currentRow.substring(cursor.xPos, currentRow.length - 1 );
  let find = afterCursor.indexOf( match );
  
  if( find > 0 ){
    cursor.xPos = find + currentRow.substring(0, cursor.xPos).length;
    return cursor;
  }

  for( let listIndex=cursor.yPos + 1; listIndex < list.length; listIndex++){
    let text = list[listIndex].text.toLowerCase();
    let find = text.indexOf( match );
    if( find >= 0 ){
      cursor.xPos = find;
      cursor.yPos = listIndex;
      return cursor;
    }
  }
  return oldCursor;
}

export default {
  jumpToNextMatch
}
