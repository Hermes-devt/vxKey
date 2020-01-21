

export function getFinishedTasks(list){
  let nList = [];
  let rest = [];

  for( let i=0; i<list.length; i++){
    if( list[i] && list[i].tags && list[i].tags.done && list[i].tags.done.timestamp.length > 0 ){
      nList.push(list[i]);
    }else{
      rest.push(list[i]);
    }
  }
  return {nList, rest};
}


export default {
  getFinishedTasks,
}