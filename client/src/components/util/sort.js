

export function sortByDoneAscending(list){
  list = list.sort( function(a, b){
    let index1 = a.tags.done.timestamp;
    let index2 = b.tags.done.timestamp;
    if( index1 > index2 ) return -1;
    if( index1 < index2) return 1;
    return 0;
  })
  return list;
}

export function sortByDoneDescending(list){
  list = list.sort( function(a, b){
    let index1 = a.tags.done.timestamp;
    let index2 = b.tags.done.timestamp;

    if( index1 < index2 ) return -1;
    if( index1 > index2) return 1;
    return 0;
  })
  return list;
}


export default {
  sortByDoneAscending,
  sortByDoneDescending,
}