import { renderRoom, renderPlayer, renderSquare, removeSquare , removePlayer, } from './JS/Render.js'
import rooms from './JS/Rooms.js'
import OPTIONS from './JS/Options.js'


const canvas = document.getElementById('canvas')
const canvasContext = canvas.getContext('2d')

const room = {
  holes:0,
  index:0,
  filledHoles:0,
  seed:rooms[0],
}

room.load = function(){
  this.holes = 0
  this.filledHoles = 0
  if(this.index < rooms.length){
    
    this.seed =  rooms[this.index]

  }
}
const indexToPosition = ( index ) => {
  return {
    y: Math.floor( index / OPTIONS.roomSize),
    x: index % OPTIONS.roomSize,
  }
}  

const positionToIndex = ( { x, y } ) => {
  return OPTIONS.roomSize * y + x 
}



const createBoxes = function(length){
  const boxes = Array(length).fill(0)

  boxes.render = function(){
    for(let index = 0; index < this.length; index++){

      if (this[index]) renderSquare({ 
        canvasContext , 
        position: indexToPosition(index), 
        color: "yellow" 
      })

    }
  }

  boxes.move = function({ index, axis, direction }){
    const position = indexToPosition(index)
    position[axis] += direction
    
    const nextIndex = positionToIndex( position )
  
    let movable = true
    
    // allow movement of multiple boxes next to each other
    // if( this[ nextIndex ] ) movable = this.move({ index: nextIndex, axis, direction })
    // else if(room.seed[nextIndex] === '*' ) movable = false
  
    // allow movement of only one box at a time
    if ( room.seed[nextIndex] === '*' || this[ nextIndex ] ) movable = false
  
    if ( movable ){
  
      this[ index ] = 0
      if( room.seed[index] === 'o') room.filledHoles -= 1
      removeSquare({ canvasContext , position })
  
      this[ nextIndex ] = 1
      if(room.seed[nextIndex] === 'o') room.filledHoles += 1
      renderSquare({ canvasContext, position, color: "yellow" })
  
      return true
  
    } else return false
  
  }

  return boxes
}

let boxes = createBoxes(room.seed.length)


const player = {
  x:0,
  y:0,
}

player.move = function( { axis , direction } ){
  /*
    axis can either be x or y
    direction -1 or 1
  */
  const nextPosition = { x: this.x, y: this.y }
  nextPosition[ axis ] += direction

  let index =  positionToIndex( { x: this.x, y: this.y } )
  let nextIndex = positionToIndex( nextPosition )

  let movable = true

  if (boxes[nextIndex]) {
    movable = boxes.move( { index: nextIndex, axis, direction } )
  }
  else if(room.seed[ nextIndex ] === '*') movable = false

  if(movable){
    removePlayer({ canvasContext, player: this })
    if(room.seed[ index ] === 'o') renderSquare({ canvasContext , position: this, color: 'red' })
    this[ axis ] += direction
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
    room.index += 1
    room.load()
    boxes = createBoxes(room.seed.length)
    renderRoom( { canvasContext, room, player, boxes } )
    renderPlayer({ canvasContext ,player })
    boxes.render()
  } 
}



const draw = () => {
  canvasContext.canvas.height = OPTIONS.blockSize * OPTIONS.roomSize;
  canvasContext.canvas.width = OPTIONS.blockSize * OPTIONS.roomSize;

  renderRoom( { canvasContext, room, player, boxes } )
  renderPlayer({ canvasContext , player })
  boxes.render()

  document.addEventListener('keydown', controls)
}

draw()