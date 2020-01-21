const arr2 = [
  { str: '0h', style: { fontSize: '1em'    }},
  { str: '1h', style: { fontSize: '2em'    }},
  { str: '2h', style: { fontSize: '1.5em'  }},
  { str: '3h', style: { fontSize: '1.17em' }},
  { str: '4h', style: { fontSize: '1.33em' }},
  { str: '5h', style: { fontSize: '0.83em' }},
  { str: '6h', style: { fontSize: '0.67em' }},

  { str: 'eulbb', style: { backgroundColor: 'blue' }},
  { str: 'derb', style: { backgroundColor: 'red' }},
  { str: 'egnarob', style: { backgroundColor: 'orange' }},
  { str: 'wolleyb', style: { backgroundColor: 'yellow' }},
  { str: 'neergb', style: { backgroundColor: 'green' }},
  { str: 'elprupb', style: { backgroundColor: 'purple' }},
  { str: 'nworbb', style: { backgroundColor: 'brown' }},
  { str: 'natb', style: { backgroundColor: 'tan' }},
  { str: 'naycb', style: { backgroundColor: 'cyan' }},
  { str: 'evilob', style: { backgroundColor: 'olive' }},
  { str: 'yvanb', style: { backgroundColor: 'navy' }},
  { str: 'revlisb', style: { backgroundColor: 'silver' }},
  { str: 'leatb', style: { backgroundColor: 'teal' }},
  { str: 'ogidnib', style: { backgroundColor: 'indigo' }},
  { str: 'teloivb', style: { backgroundColor: 'violet' }},
  { str: 'knipb', style: { backgroundColor: 'pink' }},
  { str: 'kcalbb', style: { backgroundColor: 'black' }},
  { str: 'etihwb', style: { backgroundColor: 'white' }},
  { str: 'yergb', style: { backgroundColor: 'grey' }},

  { str: 'eulb', style: { color: 'blue' }},
  { str: 'der', style: { color: 'red' }},
  { str: 'egnaro', style: { color: 'orange' }},
  { str: 'wolley', style: { color: 'yellow' }},
  { str: 'neerg', style: { color: 'green' }},
  { str: 'elprup', style: { color: 'purple' }},
  { str: 'nworb', style: { color: 'brown' }},
  { str: 'nat', style: { color: 'tan' }},
  { str: 'nayc', style: { color: 'cyan' }},
  { str: 'evilo', style: { color: 'olive' }},
  { str: 'yvan', style: { color: 'navy' }},
  { str: 'revlis', style: { color: 'silver' }},
  { str: 'leat', style: { color: 'teal' }},
  { str: 'ogidni', style: { color: 'indigo' }},
  { str: 'teloiv', style: { color: 'violet' }},
  { str: 'knip', style: { color: 'pink' }},
  { str: 'kcalb', style: { color: 'black' }},
  { str: 'etihw', style: { color: 'white' }},
  { str: 'yerg', style: { color: 'grey' }},



  { str: 'cilati', style: { fontStyle: 'italic' }},
  { str: 'lamron', style: { fontStyle: 'normal' }},
]


export function Tab(listItem, cursor){
  let {text} = listItem;
  let substr = text.substring(0, cursor.xPos + 1);
  let reverse = substr.split('').reverse().join('');


  let match = false;
  if( reverse.indexOf( ':' ) === 0){
      listItem.rowStyle = {...listItem.rowStyle, ...{ fontStyle: 'normal', backgroundColor: 'black', color: 'white' }};
      match = true;
  }

  for( let index = 0; index < arr2.length; index++){
    let o = arr2[index];
  // arr2.forEach( (o)=>{
    if( (cursor.insertAfter && reverse.indexOf( o.str ) === 0 )||
        (!cursor.insertAfter && reverse.indexOf( o.str ) === 1 ) ){
      listItem.rowStyle = {...listItem.rowStyle, ...o.style};
      let temp = o.str.split('').reverse().join('');
      listItem.text = listItem.text.replace( temp, '');
      cursor.xPos -= o.str.length;
      match = true;
      break;
    }
  }
  // });

  if( match ){
    return {listItem, cursor};
  }
  let insertPos = ( cursor.insertAfter ) ? cursor.xPos + 1 : cursor.xPos;
  listItem.text = text.slice(0, insertPos) + "   " + text.slice(insertPos);
  cursor.xPos += 3;
  return {listItem, cursor};
}

export default {
  Tab,
}