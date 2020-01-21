export function jumpToPreviousMatch(list, match, cursor){
  cursor.savePos = -1;
  match = match.substring(1);
  let oldCursor = {...cursor};

  // Try to find a matching string on the current row before the cursor
  let currentRow = list[cursor.yPos].text;
  let beforeCursor = currentRow.substring(0, cursor.xPos + 1);
  let find = beforeCursor.lastIndexOf( match );
  if( find >= 0 ){
    cursor.xPos = find;
    return cursor;
  }

  //iterates through all rows before the current row.
  for( let listIndex=cursor.yPos - 1; listIndex >=  0; listIndex--){
    let text = list[listIndex].text.toLowerCase();
    let find = text.lastIndexOf( match );
    if( find >= 0 ){
      cursor.xPos = find;
      cursor.yPos = listIndex;
      return cursor;
    }
  }
  return oldCursor;
}

export default {
  jumpToPreviousMatch
}
