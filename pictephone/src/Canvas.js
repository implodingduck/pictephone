import React, { useState } from 'react'
import UseCanvas from './UseCanvas'
import Toolbar from './Toolbar'



const Canvas = props => {

    const _predraw = (context) => {
        const canvas = canvasRef.current;
        const imageData = context.getImageData(0,0,canvas.width,canvas.height);
        const tempCanvasState = canvasState
        tempCanvasState.push(imageData)
        setCanvasState(tempCanvasState)
     }

    const _postdraw = () => {  }

    const _undo = (context) => {
        if (canvasState.length > 0){
            const imageData = canvasState.pop()
            context.putImageData(imageData, 0, 0)
            setCanvasState(canvasState)
        }
    }

    const { draw, predraw=_predraw, postdraw=_postdraw, ...rest } = props
    const [canvasState, setCanvasState] = useState([])

    
    
    

    const canvasRef = UseCanvas(draw, {predraw, postdraw})
    
    

    return (<div>
        <h1>Pictephone</h1>
        <Toolbar canvasRef={canvasRef} undo={_undo} ></Toolbar>
        <canvas ref={canvasRef} {...rest} />
    </div>)
}

export default Canvas