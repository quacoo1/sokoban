import { renderRoom, renderPlayer,renderBox, removePlayer, removeBox } from './JS/Render.js'
import OPTIONS from './JS/Options.js'

const canvas = document.getElementById('canvas')
const canvasContext = canvas.getContext('2d')

let roomSeedBuffer = ""
roomSeedBuffer += "**********"
roomSeedBuffer += "*p  *    *"
roomSeedBuffer += "*   bb   *"
roomSeedBuffer += "*        *"
roomSeedBuffer += "*    b   *"
roomSeedBuffer += "*        *"
roomSeedBuffer += "*        *"
roomSeedBuffer += "*        *"
roomSeedBuffer += "*        *"
roomSeedBuffer += "**********"

const boxes = Array(roomSeedBuffer.length).fill(0)

boxes.render = function(){
  for(let index = 0; index < this.length; index++){
    if (this[index]) renderBox({ canvasContext , index});
  }
}

boxes.move = function({ index, axis, direction }){
  
  const indexOfRow = Math.floor( index / OPTIONS.roomSize)
  const indexOfColumn = index % OPTIONS.roomSize

  let directionX = (axis === 'x') ? direction : 0
  let directionY = (axis === 'y') ? direction : 0


  let posX = indexOfColumn + directionX
  let posY = (indexOfRow + directionY) 
  
  let nextIndex = posX + ( posY * OPTIONS.roomSize)

  let movable = true
  

  // allow movement of multiple boxes next to each other
  // if( this[ nextIndex ] ) movable = this.move({ index: nextIndex, axis, direction })
  // else if(roomSeedBuffer[nextIndex] === '*' ) movable = false

  // allow movement of only one box at a time
  if (roomSeedBuffer[nextIndex] === '*' || this[ nextIndex ]) movable = false

  if ( movable ){
  

    this[ index ] = 0
    removeBox({ canvasContext , index })
    this[ nextIndex ] = 1
    renderBox({ canvasContext , index: nextIndex});

    return true

  } else return false

}

const player = {
  x:0,
  y:0,
}

player.move = function( { axis , direction } ){
  /*
    axis can either be x or y
    direction -1 or 1
  */

  let directionX = (axis === 'x') ? direction : 0
  let directionY = (axis === 'y') ? direction : 0


  let posY = OPTIONS.roomSize * ( this.y + directionY )
  let posX = this.x + directionX
  let nextIndex = posY + posX
  let movable = true

  if (boxes[nextIndex]) {
    movable = boxes.move({index: nextIndex, axis, direction})
  }
  else if(roomSeedBuffer[ posY + posX ] === '*') movable = false

  if(movable){
    removePlayer({ canvasContext, player: this })
    this[axis] += direction
    renderPlayer({ canvasContext, player: this })
  }

}



const controls = (event) => {
  if(event.code === "ArrowUp") player.move({axis:'y', direction: -1})
  if(event.code === "ArrowDown") player.move({axis:'y', direction: 1})
  if(event.code === "ArrowLeft") player.move({axis:'x', direction: -1})
  if(event.code === "ArrowRight") player.move({axis:'x', direction: 1})
}

const draw = () => {
  canvasContext.canvas.height = OPTIONS.blockSize * OPTIONS.roomSize;
  canvasContext.canvas.width = OPTIONS.blockSize * OPTIONS.roomSize;

  renderRoom( { canvasContext, roomSeed:roomSeedBuffer, player, boxes } )
  renderPlayer({ canvasContext ,player })
  boxes.render()

  document.addEventListener('keyup', controls)
}

draw()