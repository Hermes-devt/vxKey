import React, { Component } from 'react';

import Cursor from './cursor/_index';
import Line from './line/_index';

import { removeWord } from './commands/removeWord';
import {x} from './commands/x';
import {deleteRow} from './commands/deleteRow';
import {Tab} from './commands/tab';
import {Backspace} from './commands/backspace';
import {replaceCharacter} from './commands/replaceCharacter';

import util_tag from './tags/tag';

import {listStorage} from './storage/list';
import { getFinishedTasks } from './tags/getFinishedTags';
import {sortByDoneAscending} from './util/sort';

// windows
import RowWindow from './windows/popups/rowWindow';
import Hotkey from './windows/popups/hotkeys';
import JumpBox from './jumpBox';

import {scrolling} from './util/scrolling';
import DocumentStyle from './documentStyle';
import PrintRows from './printRows';

class Todo extends Component {

  keyDowns = { shift: false, ctrl: false, alt: false, meta: false, space: false }
  commandString = "";
  history = [];
  disableCommands = false;
  jumpBox = {skipSearch: false, next: false, jumpTo: '', oldSearch: ''}
  lineCopy = 0;
        
  state = {
    cursor: { xPos: 0, yPos: 0, length: 1, savePos: 0, insertAfter: true, insertMode: false, },
    displayHotKeyWindow: false,
    displayTagWindow: false,
    //need to change the name of this function.
    displayFindWindow: false,
    list: [],
    finishedTasks: [],
  }

  listener = ()=>{
  // UNSAFE_componentWillMount = ()=>{
    document.body.addEventListener( 'keydown', e=>{

      if( e.code === 'ShiftLeft'){
        this.keyDowns.shift = true;
      }

      const key = e.key;

      if( document.activeElement.tagName === 'INPUT') return;
      if( key === 'Backspace' && document.activeElement.tagName !== 'INPUT'){ e.preventDefault(); }

      if( this.state.displayRowWindow ) return;
      e.preventDefault();


      if( this.state.displayFindWindow ) return;

      switch(key){
        case 'Shift':   this.keyDowns.shift = true; return;
        case 'Control': this.keyDowns.ctrl = true; return;
        case 'Alt':     this.keyDowns.alt = true; return;
        case 'Meta':    this.keyDowns.meta = true; return;
        default: break;
      }
      
      //prevents the user from tabbing outside and allows for tabs in the text.
      if( key === 'Tab'){ e.preventDefault(); }

      if( this.state.displayTagWindow ){
        let task = util_tag.tagEvent( this.list.get(false), e);
        if( task ){
          this.list.set(task);
        }

        const displayTagWindow = !this.state.displayTagWindow;
        this.setState({ displayTagWindow })
      }
   
      const cursor = this.cursor.get();
      if( cursor.insertMode ){
        this.insideMode(e);
        return;
      }

      if( !cursor.insertMode ){
        if( this.vimCommands(e) ) return;
        if( this.insertCommand(e) ) return;
      }

      if( this.disableCommands === true) return;

      // Tag generating functionality need to fix this part a bit better
      let list = util_tag.tagEvent( this.list.get(false), e);
      if( list ){
        this.list.set(list);
        const displayTagWindow = this.state.displayTagWindow;
        this.setState({ displayTagWindow })
        return;
      }

    });

    document.body.addEventListener('keyup', e=>{
      if( e.code === 'ShiftLeft'){
        this.keyDowns.shift = false;
      }
      if( e.code === 'Space'){
        scrolling.set = false;
      }
    });

  }

  cursor = {
    set: ( nCursor,obj=null )=> {
      let oldCursor = this.cursor.get();
      const cursor = {...oldCursor, ...nCursor};
      this.setState({cursor})
      localStorage.setItem( 'cursor', JSON.stringify(cursor));
    },

    get: ()=> { 
      return this.state.cursor 
    }
  }

  list = {
    set: (listItems, cursor=null) =>{
      let list = null;

      if( !Array.isArray(listItems) ){
        list = this.list.get();
        list[this.cursor.get().yPos] = listItems;
      }else{
        list = [...listItems]
      }
      if(!cursor)  this.setState({list});
      else         this.setState({list, cursor});
      localStorage.setItem('todolist', JSON.stringify(list));
    },

    get: (fullList=true)=>{
      return fullList ? this.state.list : this.state.list[this.cursor.get().yPos];
    }
  }

  componentDidMount = () =>{
    const list = listStorage();
    this.list.set(list);

    const cursor = Cursor.storage();
    this.cursor.set(cursor);

    this.listener();
  }

  insideMode = (e)=> {
    if( this.disableCommands ){ return; }
    const key = e.key;

    switch( e.code ){ 
      case 'Shift': case 'Control': case 'Meta': return; default:
    }

    switch(key){
      case 'ArrowUp': this.moveCursor('up'); return;
      case 'ArrowDown': this.moveCursor('down'); return;
      default:
    }

    let list = this.list.get();
    let cursor = this.cursor.get();

    if( key === 'Enter'){
      const { cursor: cursor2, list: list2 } = Line.enter( list, cursor);
      this.list.set(list2, cursor2);
      return;
    }

    if( key === 'Escape'){
      cursor = Cursor.withinBounds( list, cursor );
      cursor.insertMode = false;
      this.cursor.set(cursor);
      return;
    }

    if( key === 'Tab' ){
      const {listItem, cursor:cursor2} =  Tab( this.list.get(false), cursor);
      this.list.set(listItem, cursor2);
      return;
    }

    if( key === 'Backspace'){
      const {list, cursor: cursor2} = Backspace( this.list.get(), cursor)
      this.list.set(list, cursor2);
      return;
    }

    let currentItem = this.list.get(false);
    let text = currentItem.text;

    let row = text;

    if( key === 'ArrowLeft'){ 
      if( this.cursor.get().xPos === 0){
        cursor.insertAfter = false;
        this.cursor.set(cursor);
        return;
      }
      this.moveCursor('left'); 
      return;
    }
    if( key === 'ArrowRight'){
      if( this.cursor.get().xPos === row.length -1 ){
        cursor.insertAfter = true;
        this.cursor.set(cursor);
        return;
      }
      this.moveCursor('right'); return; 
    }

    if( !cursor.insertAfter){
      text = text.slice(0, this.cursor.get().xPos ) + e.key + text.slice(this.cursor.get().xPos );
    } else{
      text = text.slice(0, this.cursor.get().xPos + 1 ) + e.key + text.slice(this.cursor.get().xPos + 1);
    }

    currentItem.text = text;
    const cursor2 = Cursor.moveRight( currentItem, cursor);
    this.list.set(currentItem, cursor2);
  }

  moveCursor = (command)=>{ 
    let cursor = this.cursor.get();
    const list = this.list.get();
    const listItem = list[cursor.yPos];
    
    switch( command ){
      case 'up':            cursor = Cursor.moveUp( list, cursor );break;
      case 'left':          cursor = Cursor.moveLeft(cursor);break;
      case 'right':         cursor = Cursor.moveRight( listItem, cursor);break;
      case 'down':          cursor = Cursor.moveDown(list, cursor); break;
      case 'begOfNextWord': cursor = Cursor.begOfNextWord( list, cursor ); break;
      case 'begOfPrevWord': cursor = Cursor.begOfPrevWord( list, cursor ); break;
      case 'endOfNextWord': cursor = Cursor.endOfNextWord( list, cursor); break;
      case 'endOfPrevWord': cursor = Cursor.endOfPrevWord( list, cursor); break;
      default:
    }
    this.cursor.set(cursor);
  }

  saveHistory = (listArr, cursorobj) =>{
    const list = [...listArr];
    const cursor = {...cursorobj};
    this.history.push( {list, cursor});
  }

  commandIterations = 1;
  vimCommands = (e) => {
    const key = e.key;
    if( this.disableCommands ){
      if( this.advancedVimCommands(e)){
        setTimeout( ()=>{
          this.disableCommands = false;
          this.commandString = '';
        }, 50);
      }
      return;
    }
    e.preventDefault();

    if( !isNaN( e.key)){
      let nr = parseInt(e.key);
      if( nr > 0 && nr < 9){
        this.commandIterations = parseInt(e.key);
        return;
      }
    }

    if( e.code === 'Space' ){ 
      scrolling.init( this.keyDowns);
      return;
    }

    let iterations = this.commandIterations;
    this.commandIterations = 1;

    let cursor = this.cursor.get();
    let list = this.list.get();

    
    for( let i = 0; i < iterations ; i++){
      let lastIteration = (i === iterations - 1) ? true : false;
      let firstIteration = (i === 0) ? true : false;

      switch( key ){
        case 'w': this.moveCursor('begOfNextWord'); continue;
        case 'W': this.moveCursor('begOfPrevWord'); continue;
        case 'E': this.moveCursor('endOfPrevWord'); continue;
        case 'e': this.moveCursor('endOfNextWord'); continue;
        case 'ArrowUp':    window.scrollBy({ top: -110, left: 0, behavior: 'smooth'}); return;
        case 'ArrowDown':  window.scrollBy({ top: 110, left: 0, behavior: 'smooth'}); return;
        case 'k':          e.preventDefault(); this.moveCursor('up'); continue; 
        case 'j':          e.preventDefault(); this.moveCursor('down'); continue; 
        case 'h': case 'ArrowLeft': this.moveCursor('left'); continue; 
        case 'l': case 'ArrowRight': this.moveCursor('right'); continue;
        default: ;
      }

      if( key === 'n' || key === 'm'){
          this.jumpBox.skipSearch = true;
          this.jumpBox.next = (key === 'n') ? true : false;
          const displayFindWindow = true;
          this.setState({displayFindWindow})
          return;
      }

      if( key === 'Z'){
        let displayHotKeyWindow = this.state.displayHotKeyWindow;
        if( !displayHotKeyWindow){
          displayHotKeyWindow = !displayHotKeyWindow;
          this.setState({displayHotKeyWindow});
        }
        return;
      }

      //allows you to use multiply character commands with the character d and c 
      if( key === 'd' || key === 'c' || key === 'r'){
        this.disableCommands = true;
        this.advancedVimCommands(e);
      }

      if( key === '9'){
        cursor = Cursor.endOfTheLine( this.list.get(false), cursor );
        this.cursor.set(cursor);
        return true;
      }

      if( key === 'X'){
        if( firstIteration ) this.saveHistory(list, cursor);
        const {list: list2, cursor:cursor2 } = deleteRow( list, cursor);
        this.list.set(list2, cursor2);
        if( lastIteration ) return true;
        continue;
      }
      
      if( key === 'U'){
        if( this.history.length === 0 ) return;
        let history = this.history.pop();
        this.list.set(history.list, history.cursor);
        return true;
      }

      if( key === 'p'){
        if( this.lineCopy === 0) return;
        list.splice( cursor.yPos, 0, this.lineCopy);
        this.lineCopy = JSON.parse(JSON.stringify(this.lineCopy));
        this.list.set(list);
        if( lastIteration ) return true;
        continue;
      }

      if( key === 'x' ){
        const {listItem, cursor: cursor2} = x( this.list.get(false), cursor);
        this.list.set(listItem, cursor2);
        return true;
      }

      if( key === '0'){
        cursor = Cursor.begOfTheLine(cursor);
        this.cursor.set(cursor);
        return true;
      }

      if( key === '>'){
        if( firstIteration ) this.saveHistory(list, cursor);
        const { listItem, cursor: cursor2 } = Line.shiftRight( this.list.get(false), cursor);
        this.list.set(listItem, cursor2);
        if( lastIteration ) return true;
        continue;
      }

      if( key === '<'){
        if( firstIteration ) this.saveHistory(list, cursor);
        const { listItem, cursor: cursor2} = Line.shiftLeft( this.list.get(false), cursor );
        this.list.set(listItem, cursor2);
        if( lastIteration ) return true;
        continue;
      }

      if( key === 'O' ){
        if( firstIteration ) this.saveHistory(list, cursor);
        if( cursor.insertMode ) return;
        const {list:list2} = Line.above( this.list.get(), cursor );
        this.list.set(list2);

        if( lastIteration ){
          cursor.insertAfter = true;
          cursor.insertMode = true;
          this.cursor.set(cursor);
          return true;
        }
        if( lastIteration ) return true;
        continue;
      }

      if( key === 'o'){
        if( firstIteration ) this.saveHistory(list, cursor);
        // if( this.state.insertMode ) return;
        if( cursor.insertMode ) return;
        const {list: list2, cursor:cursor2} = Line.below( list, cursor);
        this.list.set(list2, cursor2);
        
        if( lastIteration ){
          cursor.insertAfter = true;
          cursor.insertMode = true;
          this.cursor.set(cursor);
        }
        if( lastIteration ) return true;
        continue;
      }

      // if( key === 't'){ const displayTagWindow = !this.state.displayTagWindow; this.setState({ displayTagWindow }) return; }

      if( key === 'Enter'){
        if( firstIteration ) this.saveHistory(list, cursor);
        const {list: list2, cursor:cursor2} = Line.below( list, cursor);
        this.list.set(list2, cursor2);
        if( lastIteration ) return true;
        continue;
      }

      
      // Move line and focus up 1 row.
      if( key === '˚' || (key === 'ArrowUp' && this.keyDowns.alt === true)){
        const { list:list2, cursor:cursor2 } = Line.shiftUp( list, cursor);
        this.list.set(list2, cursor2);
        if( lastIteration ) return true;
        continue;
      }

      // Move line and focus down 1 row.
      if( key === '∆' || (key === 'ArrowDown' && this.keyDowns.alt === true)){
        const { list:list2, cursor:cursor2 } = Line.shiftDown( list, cursor);
        this.list.set(list2, cursor2);
        if( lastIteration ) return true;
        continue;
      }

      if( key === '/' || key === '?'){
        const displayFindWindow = !this.state.displayFindWindow;
        this.jumpBox.skipSearch = false;
        this.jumpBox.next = (key === '/') ? true : false;
        this.setState({displayFindWindow});
        return true;
      }

      if( key === '§'){}

      if( key === '1'){
        const list = JSON.parse( localStorage.getItem('backup_list') );
        this.setState({list});
        return true;
        // if( lastIteration ) return true;
      }

      if( key === 'q'){
        const {nList, rest }= getFinishedTasks(list);
        this.list.set(rest);

        let finishedTasks = localStorage.getItem('finishedTasks')
        if( finishedTasks ) finishedTasks = JSON.parse(finishedTasks);
        else                finishedTasks = [];

        finishedTasks = [...nList, ...finishedTasks ];

        finishedTasks = sortByDoneAscending( finishedTasks );
        localStorage.setItem('finishedTasks', JSON.stringify(finishedTasks));

        cursor = Cursor.withinBounds(rest, cursor);
        this.cursor.set(cursor);
        window.location.reload(true);
      }

      if( key === 'd'){
        let item = this.list.get(false);
        if( item.rowStyle.hasOwnProperty('textDecoration')) delete item.rowStyle.textDecoration;
        else                                                item.rowStyle = {...item.rowStyle, ...{textDecoration: 'line-through'}}
        this.list.set(item);
      }
      
      if( key === 'g'){
        const displayRowWindow = !this.state.displayRowWindow;
        this.setState({displayRowWindow});
      }

    }//end of the loop
    return false;

  }

  advancedVimCommands= (e) =>{
    if( e.key.length > 1){
      this.disableCommands = false; 
      this.commandString = ''; 
      return true;
    }

    this.commandString += e.key;

    let cursor = this.cursor.get();
    let list = this.list.get();
    let listItem = this.list.get(false);
    let {text} = listItem;


    if( this.commandString.startsWith('r') && this.commandString.length > 1 ){
      let item = replaceCharacter( listItem, cursor, this.commandString[1])
      this.list.set(item);
      return true;
    }

    if( this.commandString === 'caw' || this.commandString === 'dw'){
      const {listItem: list, cursor: cursor2 } = removeWord( listItem, cursor );
      const insertMode = true;
      // this.setState({insertMode});
      cursor2.insertMode = insertMode;
      this.list.set(list, cursor2);
      return true;
    }

    if( this.commandString === 'dd'){
      let listItem = this.list.get(false);
      this.lineCopy = JSON.parse(JSON.stringify(listItem));
      const {list:list2, cursor:cursor2 } = deleteRow( list, cursor );
      this.list.set(list2, cursor2);
      return true;
    }

    if( this.commandString === 'dt'){
      listItem.text = '';
      cursor.xPos = 0;
      this.list.set(listItem, cursor);
      return true;
    }
    
    if( this.commandString === 'dE'){
      text = text.substring(0, cursor.xPos);
      listItem.text = text;
      this.list.set(listItem, cursor);
      return true;
    }

    if( this.commandString === 'dB'){
      text = text.substring(cursor.xPos);
      listItem.text = text;
      cursor.xPos = 0;
      this.list.set(listItem, cursor);
      return true;
    }

    if( this.commandString === 'de'){
      let text1 = text.substring(cursor.xPos);
      let spacePos = text1.indexOf(' ') + text.substring(0, cursor.xPos).length;
      let newtext = text.substring(0, cursor.xPos) + text.substring(spacePos);
      listItem.text = newtext;
      this.list.set(listItem, cursor);
      return true;
    }

    if( this.commandString === 'db'){
      let text1 = text.substring(0, cursor.xPos);
      let pos = text1.lastIndexOf(' ');
      let newtext = text.substring(0, pos + 1) + text.substring(cursor.xPos);
      const diff = text.length - newtext.length;
      cursor.xPos -= diff;
      listItem.text = newtext;
      this.list.set(listItem, cursor);
      return true;
    }

    if( this.commandString === 'cc'){
      this.lineCopy = JSON.parse(JSON.stringify(listItem));
      return true;
    }

    let match = false;
    ['cc', 'db', 'de', 'dB', 'dE', 'dd', 'caw', 'dw'].forEach( (command)=>{ 
      if( command.startsWith(this.commandString)) match = true; 
    });

    if( !match) return true;
    return false;
  }

  insertCommand = (e) => {
    if( this.disableCommands ){ return; }
    const key = e.key;
    e.preventDefault();
    const list = this.list.get();
    let cursor = this.cursor.get();
    const listItem = list[cursor.yPos];

    if( key === 'I' ){
      this.saveHistory(list, cursor);
      cursor = Cursor.begOfTheLine( cursor );
      cursor.insertAfter = (listItem.text.length > 0) ? false: true;
      cursor.insertMode = true;
      this.cursor.set(cursor);
      return true;
    }

    if( key === 'i' ){
      this.saveHistory(list, cursor);
      cursor.insertAfter = (listItem.text.length > 0) ? false : true;
      cursor.insertMode = true;
      this.cursor.set(cursor);
      return true;
    }

    if( key === 'A' ){
      cursor = Cursor.endOfTheLine( listItem, cursor );
      cursor.insertAfter = true; cursor.insertMode = true;
      this.cursor.set(cursor);

      this.saveHistory(list, cursor);
      return true
    }

    if( key === 'a' ){
      this.saveHistory(list, cursor);
      cursor.insertAfter = true; cursor.insertMode = true;
      this.cursor.set(cursor);
      return true;
    }
    return false;
  }

  render() {
    return (
        <React.Fragment>
          <DocumentStyle>
              <PrintRows 
                onClick={ (cursor)=> this.cursor.set(cursor)}
                data={{ list: this.list.get(), cursor: this.cursor.get(), insertMode: this.state.insertMode }} />
          </DocumentStyle>

          {this.state.displayFindWindow && <JumpBox 
            onSubmit={ (cursor, displayFindWindow, jumpBox)=>{ this.setState({cursor}); this.setState({displayFindWindow}); this.jumpBox = jumpBox;   }} 
            data={{ cursor: this.cursor.get(), list: this.list.get(), jumpBox: this.jumpBox }}
            /> }

          {this.state.displayRowWindow && <RowWindow 
            onClose={ (listItem, displayRowWindow)=>{ this.list.set(listItem); this.setState({displayRowWindow}) }} 
            data={ this.list.get(false)} />
          }

          {this.state.displayHotKeyWindow && <Hotkey 
            onClose={ ()=>{ const displayHotKeyWindow = false; this.setState({displayHotKeyWindow}); }} />}
        </React.Fragment>
    );
  }
}
 
export default Todo;