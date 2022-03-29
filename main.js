import { renderRoom, renderPlayer, removePlayer } from './JS/Render.js'
import OPTIONS from './JS/Options.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const player = {
  x:0,
  y:0,
}

let roomSeedBuffer = ""
roomSeedBuffer += "**********"
roomSeedBuffer += "*p  *    *"
roomSeedBuffer += "*   b    *"
roomSeedBuffer += "*        *"
roomSeedBuffer += "*        *"
roomSeedBuffer += "*        *"
roomSeedBuffer += "*        *"
roomSeedBuffer += "*        *"
roomSeedBuffer += "*        *"
roomSeedBuffer += "**********"



const controls = (event) => {
  removePlayer({ canvasContext: ctx, player })



  if(event.code === "ArrowUp" && roomSeedBuffer[ OPTIONS.roomSize * ( player.y - 1 ) + player.x ] !== '*') player.y -= 1
  if(event.code === "ArrowDown" && roomSeedBuffer[ OPTIONS.roomSize * ( player.y + 1 ) + player.x ] !== '*') player.y += 1
  if(event.code === "ArrowLeft" && roomSeedBuffer[ OPTIONS.roomSize * player.y  + ( player.x - 1 )  ] !== '*') player.x -= 1
  if(event.code === "ArrowRight" && roomSeedBuffer[ OPTIONS.roomSize * player.y  + ( player.x + 1 )  ] !== '*') player.x += 1

  renderPlayer({ canvasContext: ctx ,player })
}


const draw = () => {
  ctx.canvas.height = OPTIONS.blockSize * OPTIONS.roomSize;
  ctx.canvas.width = OPTIONS.blockSize * OPTIONS.roomSize;

  renderRoom( { canvasContext: ctx, roomSeed:roomSeedBuffer, player } )
  renderPlayer({ canvasContext: ctx ,player })

  document.addEventListener('keyup', controls)
}

draw()
