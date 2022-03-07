import { useEffect, useState } from 'react'

const Toolbar = props => {

    const [strokeColor, setStrokeColor] = useState('black');
    const [lineWidth, setLineWidth] = useState(5);

    useEffect(() => {
        const canvas = props.canvasRef.current
        if (canvas){
            const context = canvas.getContext('2d');
            context.strokeStyle = strokeColor;
            context.lineJoin = 'round';
            context.lineWidth = lineWidth;
        }

    }, [ props.canvasRef, strokeColor, lineWidth])

    const toggleColor = () => {
        setStrokeColor( ( strokeColor === 'black') ? 'blue' : 'black' )
        setLineWidth( 5 )
    }
    const toggleEraser = () => {
        setStrokeColor( 'white' )
        setLineWidth( 10 )
    }

    const clearAll = () => {
        const canvas = props.canvasRef.current
        if (canvas){
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    const doUndo = () => {
        const canvas = props.canvasRef.current
        if (canvas){
            const context = canvas.getContext('2d');
            props.undo(context)
        }
    }

    return (<div>
        <button onClick={clearAll}>Clear</button>
        <button onClick={toggleColor}>Toggle Color <div style={ { width: '1em', height: '1em', backgroundColor: strokeColor, float: 'right', marginLeft: '.2em'  }}></div></button>
        <button onClick={toggleEraser}>Eraser</button>
        <button onClick={doUndo}>Undo</button>
    </div>)
}
export default Toolbar