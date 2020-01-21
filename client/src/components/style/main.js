
  export const styles = {
    container: {
      backgroundColor: 'white',
    },

    cursor: {
      display: 'inline-block',
      width: 2,
      height: 13,
      backgroundColor: 'red',
      position: 'relative',
      top: 3,
    },

    rowStyle: {
      paddingLeft: '5px',
      display: 'inline-block',
    },
    
    documentStyle: {
      fontSize: 12,
      backgroundColor: 'black', color: 'white',
      paddingBottom: 15,
    },

    text: {
      marginLeft: 0,
      paddingLeft: '5px',
    },

    commandMarkerEmptyRow: {
      display: 'inline-block',
      width: '0px',
      backgroundColor: 'red',
      position: 'relative',
      top: '3px',
      height: 13,
    },

    commandMarker: {
      backgroundColor: 'green',
      color: '',
    },

    insertMarker: {
      display: 'inline-block',
      width: 1,
      height: '13px',
      backgroundColor: "black",
      borderRadius: 3,
      position: 'relative',
      top: 2
    },

    checkbox: {
      display: 'inline-block',
      color: 'green',
    },

    lineStyle: {
      padding: "3px 5px",
      borderBottom: '1px solid silver',
      display: 'block',
      whiteSpace: 'pre',
      oveflow: 'visible',
    },

    activeLine: {
      backgroundColor: 'silver',
      // fontSize: 13,
    },

    rowTask: {
      display: 'inline-block',
      width: 13,
      height: 13,
      border: '1px solid black',
      position: 'relative',
      top: 3,
      marginRight: 5,
      borderRadius: 3,
    },

    nr: {
      display: 'inline-block',
      verticalAlign: 'top',
      marginRight: 10,
    },

    item: {
      display: 'inline-block',
      width: "90%",
      paddingLeft: 0,
      marginLeft: 0,
    },

    done: {
      display: 'inline-block',
      padding: '0px 8px',
      textAlign: 'center',
      backgroundColor: 'Green',
      borderRadius: 5,
      marginLeft: 5,
      cursor: 'pointer',
    },

    delete: {
      display: 'inline-block',
      padding: '0px 8px',
      textAlign: 'center',
      backgroundColor: 'red',
      borderRadius: 5,
      marginLeft: 5,
      cursor: 'pointer',
    },

    hiddenInput: {
      position: 'fixed',
      top: "50vh",
      right: '-10%',
    },

  }

  export default {
    styles,
  }