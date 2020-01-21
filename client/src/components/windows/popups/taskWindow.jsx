import React, {} from 'react';
import Started from './tags/started';
import Done from './tags/done';

const TaskWindow = () => {
  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Tasks</h3>

      <div style={ styles.split }>
        <div className="row" style={{marginBottom: 10}}>
          {secretKey('c')} <div style={{...tag, ...{backgroundColor: 'red'}}}>Critical</div>
        </div>

        <div className="row" style={{marginBottom: 10}}>
          {secretKey('h')} <div style={{...tag, ...{backgroundColor: 'crimson'}}}>High</div>
        </div>

        <div className="row" style={{marginBottom: 10}}>
          {secretKey('m')} <div style={{...tag, ...{backgroundColor: 'purple'}}}>Medium</div>
        </div>

        <div className="row" style={{marginBottom: 10}}>
          {secretKey('l')} <div style={{...tag, ...{backgroundColor: 'blue'}}}>Low</div>
        </div>

      </div>

      <div style={ styles.split }>
        <div className="row" style={{marginBottom: 10}}>
          {secretKey('n')} <div style={{...tag, ...{backgroundColor: 'orange', color: 'black'}}}>Today</div>
        </div>


        <div className="row" style={{marginBottom: 10}}>
          {secretKey('q')} <span>new Task</span>
        </div>

        <div className="row" style={{marginBottom: 10}}>
          {secretKey('s')} <Started data={ '@Started(2015-21-21 20:45)'}/>
        </div>

        <div className="row" style={{marginBottom: 10}}>
          {secretKey('d')} <Done data={ '@done(2015-22-23 21:46)'}/>
        </div>
      </div>

    </div>
  );
}

const secretKey = (key)=>{
  return(
    <React.Fragment>
        <div style={{width: 15}}>{key}</div>
        <div style={{ marginRight: 10 }}>-</div>
    </React.Fragment>
  )
}

const styles = {
  split: {
    display: 'inline-block',
    width: '20vw',
    verticalAlign: 'top',
  },

  container: {
    position: 'absolute',
    display: 'block',
    width: '50vw',
    paddingLeft: 50,
    paddingBottom: 30,
    top: '10vw',
    border: '1px solid black',
    borderRadius: 5,
    color: 'white',
    marginLeft: '25vw',
    backgroundColor: '#1a202c',
    boxShadow: '2px 2px 2px black',
  },

  header: {
    textAlign: 'center',
  },

  colHeader: {
    textAlign: 'center',
    color: 'purple',
  },
}

const tag = {
  display: 'inline-block',
  padding: '1px 2px',
  borderRadius: '3px',
  marginRight: '5px',
  backgroundColor: 'red',
  color: 'white',

}
 
export default TaskWindow;