import React from 'react'
import './App.css';
import Canvas from './Canvas'

function App() {
  const draw = (ctx, frameCount) => {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    // ctx.fillStyle = '#000000'
    // ctx.beginPath()
    // ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    // ctx.fill()
  }

  return (
    <Canvas draw={draw} width={window.innerWidth - 50 + 'px'} height={window.innerHeight - 50 + 'px'} style={ { border: '1px solid #ff00ff', margin: '10px'}} />
  );
}

export default App;
