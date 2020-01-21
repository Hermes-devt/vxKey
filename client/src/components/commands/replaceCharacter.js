

export function replaceCharacter(listItem, cursor, char){

  let item = {...listItem};
  if (listItem.text.length === 0 )
    return listItem;

  item.text = item.text.substr(0, cursor.xPos) + char + item.text.substr( cursor.xPos + 1);
  return item;
}


export default {
  replaceCharacter
}