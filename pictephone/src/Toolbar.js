import { useEffect, useState } from 'react'

const Toolbar = props => {

    const [strokeColor, setStrokeColor] = useState('black');

    useEffect(() => {
        const canvas = props.canvasRef.current
        if (canvas){
            const context = canvas.getContext('2d');
            context.strokeStyle = strokeColor;
            context.lineJoin = 'round';
            context.lineWidth = 5;
        }

    }, [ props.canvasRef, strokeColor])

    const toggleColor = () => {
        setStrokeColor( ( strokeColor === 'black') ? 'white' : 'black' )
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