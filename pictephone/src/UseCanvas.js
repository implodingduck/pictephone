import { useRef, useEffect, useState, useCallback } from 'react'


const UseCanvas = (draw, options={}) => {
  
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState(undefined);

  const canvasRef = useRef(null)

  const getCoordinates = (event) => {
    if (!canvasRef.current) {
        return;
    }

    const canvas = canvasRef.current;
    return { x: (event.pageX - canvas.offsetLeft), y: (event.pageY - canvas.offsetTop) };
  };

  const startPaint = useCallback((event) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        options.predraw(context)
        setIsPainting(true);
        setMousePosition(coordinates);
    }
  }, [options]);

  const paint = useCallback((event) => {
    if (isPainting) {
      const newMousePosition = getCoordinates(event);
      if (mousePosition && newMousePosition) {
        drawLine(mousePosition, newMousePosition);
        setMousePosition(newMousePosition);
      }
    }
  },
  [isPainting, mousePosition]);

  const exitPaint = useCallback(() => {
    options.postdraw()
    setIsPainting(false);
  }, [options]);

  useEffect(() => {
    if (!canvasRef.current) {
        return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', startPaint);
    return () => {
        canvas.removeEventListener('mousedown', startPaint);
    };
  }, [startPaint]);


  useEffect(() => {
    if (!canvasRef.current) {
        return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () => {
        canvas.removeEventListener('mousemove', paint);
    };
  }, [paint]);

  useEffect(() => {
    if (!canvasRef.current) {
        return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);
    return () => {
        canvas.removeEventListener('mouseup', exitPaint);
        canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);
  
  const drawLine = (originalMousePosition, newMousePosition) => {
    if (!canvasRef.current) {
        return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
        

        context.beginPath();
        context.moveTo(originalMousePosition.x, originalMousePosition.y);
        context.lineTo(newMousePosition.x, newMousePosition.y);
        context.closePath();

        context.stroke();
    }
  };
  
//   useEffect(() => {
    
//     const canvas = canvasRef.current
//     const context = canvas.getContext('2d')
//     let frameCount = 0
//     let animationFrameId
    
//     const render = () => {
//       frameCount++
//       draw(context, frameCount)
//       animationFrameId = window.requestAnimationFrame(render)
//     }
//     render()
    
//     return () => {
//       window.cancelAnimationFrame(animationFrameId)
//     }
//   }, [draw])
  
  return canvasRef
}

export default UseCanvas