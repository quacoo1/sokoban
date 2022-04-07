import { renderRoom, renderPlayer, renderBox , renderHole, removePlayer, removeBox } from './JS/Render.js'
import OPTIONS from './JS/Options.js'

const canvas = document.getElementById('canvas')
const canvasContext = canvas.getContext('2d')
const room = {
  holes:0,
  filledHoles:0,
  seed:''
}

room.seed = ""
room.seed += "**********"
room.seed += "*p  *    *"
room.seed += "*   bb   *"
room.seed += "*        *"
room.seed += "*    b   *"
room.seed += "*        *"
room.seed += "*       o*"
room.seed += "*       o*"
room.seed += "*       o*"
room.seed += "**********"

let roomFilledHoles = 0

const boxes = Array(room.seed.length).fill(0)

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
  // else if(room.seed[nextIndex] === '*' ) movable = false

  // allow movement of only one box at a time
  if (room.seed[nextIndex] === '*' || this[ nextIndex ]) movable = false

  if ( movable ){

    
    this[ index ] = 0
    if(room.seed[index] === 'o') room.filledHoles -= 1
    removeBox({ canvasContext , index })

    this[ nextIndex ] = 1
    if(room.seed[nextIndex] === 'o') room.filledHoles += 1
    renderBox({ canvasContext , index: nextIndex})

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

  let index =  OPTIONS.roomSize * this.y + this.x 
  let nextIndex = index + ( OPTIONS.roomSize * directionY ) + directionX

  let movable = true

  if (boxes[nextIndex]) {
    movable = boxes.move({index: nextIndex, axis, direction})
  }
  else if(room.seed[ nextIndex ] === '*') movable = false

  if(movable){
    removePlayer({ canvasContext, player: this })
    if(room.seed[ index ] === 'o') renderHole({ canvasContext , index })
    this[axis] += direction
    renderPlayer({ canvasContext, player: this })
  }

}



const controls = (event) => {
  
  if(event.code === "ArrowUp") player.move({axis:'y', direction: -1})
  if(event.code === "ArrowDown") player.move({axis:'y', direction: 1})
  if(event.code === "ArrowLeft") player.move({axis:'x', direction: -1})
  if(event.code === "ArrowRight") player.move({axis:'x', direction: 1})

  // check whether room has been solved
  if(room.holes > 0 && room.filledHoles === room.holes){
    alert('solved')
  } 
}

const draw = () => {
  canvasContext.canvas.height = OPTIONS.blockSize * OPTIONS.roomSize;
  canvasContext.canvas.width = OPTIONS.blockSize * OPTIONS.roomSize;

  renderRoom( { canvasContext, room, player, boxes } )
  renderPlayer({ canvasContext ,player })
  boxes.render()

  document.addEventListener('keydown', controls)
}

draw()