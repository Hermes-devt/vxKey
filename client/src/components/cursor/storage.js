

export function cursorStorage(){

  //inititate cursor Oject and get the cursor storageItem
  let cursor = { xPos: 0, yPos: 0, length: 1};
  let storageObj = localStorage.getItem('cursor');

  // if no storage object exist return the initiated cursor object
  if( !storageObj ){
    localStorage.setItem( 'cursor', JSON.stringify(cursor));
    return cursor;
  }

  // if storage obj exists check the cursor positions and make sure they are within bounds.
  cursor = JSON.parse( storageObj );
  if( cursor.xPos < 0 )
    cursor.xPos = 0;
    
  if( cursor.yPos < 0 )
    cursor.yPos = 0;

  return cursor;
}

export default {
  cursorStorage,
}