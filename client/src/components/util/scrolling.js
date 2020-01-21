
export const scrolling = {
  set: false,
  init(keyDowns){
    if( this.set ) return;
    this.set = true;
    const scroll = (keyDowns.shift) ? -8 : 8;
    const scrollIt = ()=>{
      window.scrollBy({top: scroll, left: 0});
      if( this.set ) 
        setTimeout( ()=> requestAnimationFrame( scrollIt ), 10);
    }
    scrollIt();
  }
}

export default {
  scrolling
}