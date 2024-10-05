import React, { useEffect, useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  //useEffect to initialise the canvas when loads
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - canvas.offsetTop;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'white';
      }
    }
  }, []);
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvas) {
      canvas.style.background = 'black';
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
      }
    }
  };
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    //wee will only draw when isDrawing is true on MouseDown
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = 'white';
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); //follows the mouse path
        ctx.stroke(); // to draw
      }
    }
  };
  return (
    <canvas
      ref={canvasRef}
      id='canvas'
      className='absolute top-0 left-0 w-full h-full'
      onMouseDown={startDrawing}
      onMouseOut={stopDrawing}
      onMouseMove={draw} //calling draw whenevr mouse moves
    />
  );
}
