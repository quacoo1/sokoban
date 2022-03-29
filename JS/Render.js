import OPTIONS from './Options.js'
export const renderRoom = ( { canvasContext, roomSeed, player } ) =>{

  let indexShift = 0;
  let j = 0;

    for(let i = 0; i < roomSeed.length; i++){
      if ( (i - indexShift) >= OPTIONS.roomSize ) {
        indexShift = i
        j++
      }
      switch(roomSeed[i]){
        case '*':{
          canvasContext.fillStyle = 'green';
          canvasContext.fillRect( (i - indexShift) * OPTIONS.blockSize, j * OPTIONS.blockSize, OPTIONS.blockSize, OPTIONS.blockSize);
        }
        break;
        case 'p': {
          player.x = (i - indexShift);
          player.y = j;
        }
        break;
      }
    }
}



export const renderPlayer =  ( { canvasContext, player } ) => {
  canvasContext.fillStyle = 'blue';
  canvasContext.fillRect( player.x * OPTIONS.blockSize, player.y * OPTIONS.blockSize, OPTIONS.blockSize, OPTIONS.blockSize);
}

export const removePlayer =  ( { canvasContext, player } ) => {
  canvasContext.clearRect(player.x * OPTIONS.blockSize, player.y * OPTIONS.blockSize, OPTIONS.blockSize, OPTIONS.blockSize);
}
