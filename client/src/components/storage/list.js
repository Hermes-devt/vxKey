
export function listStorage(){
  let storageObj = localStorage.getItem('todolist');

  // if no storageObj was found create a new one
  if( !storageObj ){
    const list = [ 
        { 
          text: "Create a todo", 
          rowStyle: {},
          tags: {
            severity: { str: 'none' },
            started: { timestamp: '' },
            done: { timestamp: '' },
            today: '',
            priority: '', 
            task: '',
            bugg: '',

            custom: [ 
              { text: 'BUGG', style: {color: 'black', backgroundColor: 'silver' }}
            ]
          }
        },
      ]
      return list;
    }

  let list = JSON.parse(storageObj);
  return list;
}

export default {
  listStorage,
}