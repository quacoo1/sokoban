import OPTIONS from './Options.js'

export const renderRoom = ( { canvasContext, room, player, boxes } ) =>{

  let indexShift = 0;
  let j = 0;

    for(let i = 0; i < room.seed.length; i++){
      if ( (i - indexShift) >= OPTIONS.roomSize ) {
        indexShift = i
        j++
      }
      switch(room.seed[i]){
        case '*':{
          canvasContext.fillStyle = 'green';
          canvasContext.fillRect( (i - indexShift) * OPTIONS.blockSize, j * OPTIONS.blockSize, OPTIONS.blockSize, OPTIONS.blockSize);
        }
        break
        case 'o':{
          canvasContext.fillStyle = 'red';
          canvasContext.fillRect( (i - indexShift) * OPTIONS.blockSize, j * OPTIONS.blockSize, OPTIONS.blockSize, OPTIONS.blockSize)
          room.holes += 1;
  
        }
        break
        case 'p': {
          player.x = (i - indexShift);
          player.y = j;
        }
        break
        case 'b': {
          boxes[i] = 1
        }
        break
        default:{
          canvasContext.clearRect( (i - indexShift) * OPTIONS.blockSize, j * OPTIONS.blockSize, OPTIONS.blockSize, OPTIONS.blockSize);
        }
      }
    }
}



export const renderPlayer =  ( { canvasContext, player } ) => {
  canvasContext.fillStyle = 'blue';
  canvasContext.fillRect( player.x * OPTIONS.blockSize, player.y * OPTIONS.blockSize, OPTIONS.blockSize, OPTIONS.blockSize);
}

export const renderSquare = ({ color, position, canvasContext }) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect( position.x * OPTIONS.blockSize, position.y * OPTIONS.blockSize, OPTIONS.blockSize, OPTIONS.blockSize);
}

export const removeSquare = ({ canvasContext, position }) => {
  canvasContext.clearRect(  position.x * OPTIONS.blockSize, position.y * OPTIONS.blockSize, OPTIONS.blockSize, OPTIONS.blockSize);
}

export const removePlayer =  ( { canvasContext, player } ) => {
  canvasContext.clearRect(player.x * OPTIONS.blockSize, player.y * OPTIONS.blockSize, OPTIONS.blockSize, OPTIONS.blockSize);
}
