const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const OPTIONS = {
  blockSize: 30,
  roomSize: 10,
}

const player = {
  x:0,
  y:0,
}

let roomSeedBuffer =
`**********
*p       *
*        *
*        *
*        *
*        *
*        *
*        *
*        *
**********`

const renderRoom = ( { canvasContext, roomSeed } ) =>{

  let indexShift = 0;
  let j = 0;

    for(let i = 0; i < roomSeed.length; i++){
      switch(roomSeed[i]){
        case '*':{
          ctx.fillStyle = 'green';
          canvasContext.fillRect( (i - indexShift) * OPTIONS.blockSize, j * OPTIONS.blockSize, OPTIONS.blockSize, OPTIONS.blockSize);
        }
        break;
        case 'p': {
          player.x = (i - indexShift);
          player.y = j;
        }
        break;
        case '\n': {
          j++;
          indexShift = i + 1;
        }
        break;
      }
    }
}

const renderPlayer =  ( { canvasContext, player } ) => {
  ctx.fillStyle = 'blue';
  canvasContext.fillRect( player.x * OPTIONS.blockSize, player.y * OPTIONS.blockSize, OPTIONS.blockSize, OPTIONS.blockSize);
}

const removePlayer =  ( { canvasContext, player } ) => {
  canvasContext.clearRect(player.x * OPTIONS.blockSize, player.y * OPTIONS.blockSize, OPTIONS.blockSize, OPTIONS.blockSize);
}



const controls = (event) => {
  removePlayer({ canvasContext: ctx, player })

  if(event.code === "ArrowUp") player.y -= 1
  if(event.code === "ArrowDown") player.y += 1
  if(event.code === "ArrowLeft") player.x -= 1
  if(event.code === "ArrowRight") player.x += 1

  renderPlayer({ canvasContext: ctx, player })
}


const draw = () => {
  ctx.canvas.height = OPTIONS.blockSize * OPTIONS.roomSize;
  ctx.canvas.width = OPTIONS.blockSize * OPTIONS.roomSize;

  renderRoom( { canvasContext: ctx, roomSeed:roomSeedBuffer } )
  renderPlayer({ canvasContext: ctx, player })
  document.addEventListener('keyup', controls)
}

draw()
