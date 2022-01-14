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
        setStrokeColor( ( strokeColor === 'black') ? 'white' : 'black' )
        setLineWidth( ( lineWidth === 5) ? 8 : 5 )
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
        <button onClick={toggleColor}>Toggle Color</button>
        <button onClick={doUndo}>Undo</button>
    </div>)
}
export default Toolbar