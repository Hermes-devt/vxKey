
function getDateString(){
    const d = new Date();
    let year  = d.getFullYear();
    let month = d.getMonth() + 1 + "";
    let day   = d.getDate() + "";
    let hours = d.getHours();
    let minutes = d.getMinutes();

    month = ( month.length === 1) ? "0" + month : month;
    day   = ( day.length === 1) ? "0" + day : day;
    hours = ( hours < 10 ) ? ("0" + hours) : hours;
    minutes = ( minutes < 10 ) ? ("0" + minutes) : minutes;
    const str = "(" + year + '-' + month + '-' + day + " " + hours + ':' + minutes + ")";
    return str;
}

function setTags (listItem, key, lowercase=false){
  if( listItem && !listItem.hasOwnProperty('tags') ){
    listItem.tags = {};
    listItem.tags.severity = { str: 'none' };
    listItem.tags.genre    = { str: 'none' };
    listItem.tags.started = { timestamp: '' };
    listItem.tags.done    = { timestamp: '' };
    listItem.tags.today = { timestamp: '' };
  }

  if( !listItem.tags.hasOwnProperty('started')){ listItem.tags.started = { timestamp: '' }; }
  if( !listItem.tags.hasOwnProperty('done')){ listItem.tags.done = { timestamp: '' }; }
  if( !listItem.tags.hasOwnProperty('today')){ listItem.tags.today = { timestamp: '' }; }
  if( !listItem.tags.hasOwnProperty('genre')){ listItem.tags.genre = { str: 'none' }; }
  if( !listItem.tags.hasOwnProperty('prio')){ listItem.tags.prio   = { str: 'none' }; }

  if( listItem && listItem.tags ){
    const severity = (listItem.tags.severity.str ) ? listItem.tags.severity.str : null;
    // const  genre   = (listItem.tags.genre.str)     ? listItem.tags.genre.str : null;

    switch( key ){
      case 'c': listItem.tags.severity.str = (severity === 'critical') ? 'none'     :    'critical'; break;
      case 'h': listItem.tags.severity.str = (severity === 'high')     ? 'none'     :    'high';   break;
      case 'm': listItem.tags.severity.str = (severity === 'medium')   ? 'none'     :    'medium'; break;
      case 'l': listItem.tags.severity.str = (severity === 'low')      ? 'none'     :    'low';    break;
      case 'b': listItem.tags.bugg         = (listItem.tags.bugg)      ?  false : true;    break;
      case 'f': listItem.tags.feature      = (listItem.tags.feature)   ?  false : true;    break;
      case 'g': listItem.tags.style        = (listItem.tags.style )   ?  false : true;    break;
      case 'p': 
        switch(listItem.tags.prio.str){
          case 'none': listItem.tags.prio.str   = 'Prio 1'; break;
          case 'Prio 1': listItem.tags.prio.str = 'Prio 2'; break;
          case 'Prio 2': listItem.tags.prio.str = 'Prio 3'; break;
          case 'Prio 3': listItem.tags.prio.str = 'none';   break;
          default: break;
        }
        break;
      case 't': 
        if(lowercase){ listItem.tags.task = ( listItem.tags.task === true ) ? false : true;
        }else         { listItem.tags.today.timestamp = (!listItem.tags.today.timestamp)  ?  getDateString() : ''; }
        break;
      case 's': listItem.tags.started.timestamp = (!listItem.tags.started.timestamp ) ? getDateString() : ''; break;
      case 'd': listItem.tags.done.timestamp = (!listItem.tags.done.timestamp ) ? getDateString() : ''; break;
      case 'n': listItem.tags.task = ( listItem.tags.task === true ) ? false : true; break;
      default: 
    }
  }
  return listItem;

}

export function tagEvent(listItem, e){
  let lowerCaseKey = e.key.toLowerCase();
  if( e.key === e.key.toUpperCase() ){
    return listItem = setTags( listItem, lowerCaseKey);
  }else{
    switch( e.key ){
       case 't': 
       return listItem =setTags( listItem, lowerCaseKey, true);
      default:
    }
  }
}

export default {
  tagEvent,
}