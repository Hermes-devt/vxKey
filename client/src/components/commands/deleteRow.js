import Cursor from '../cursor/_index';

export function deleteRow(list, cursor){

  //if the active item is the last item in the list
  if( cursor.yPos >= list.length - 1){
    if( list.length > 1){
      cursor = Cursor.up( list, cursor);
      list.pop();
      return {list, cursor};
    }
  }

  if( cursor.yPos === 0 && list.length > 1){
    list.splice(cursor.yPos, 1);
    return {list, cursor};
  }

  // if the active item is the first item of the list
  // if the list is only has one element
  if( cursor.yPos === 0 && list.length <= 1){
    list[0].text = "";
    return { list, cursor };
  }

  // if the user are somewhere in the middle of the list no edge case
  list.splice( cursor.yPos, 1);
  return { list, cursor };
}

export default {
  deleteRow,
}