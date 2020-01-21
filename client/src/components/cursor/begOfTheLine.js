

// Sets the cursor at the beginning of the string

export function begOfTheLine(cursor){
  cursor.savePos = -1;
  cursor.xPos = 0;
  return cursor;
}

export default {
  begOfTheLine,
}