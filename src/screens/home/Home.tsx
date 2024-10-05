import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ColorSwatch, Group } from '@mantine/core';
import { SWATCHES } from '@/lib/constants';

interface Response {
  expr: string;
  result: string;
  assign: boolean;
}

interface GeneratedResult {
  expr: string;
  answer: string;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false); //drawing state
  const [color, setColor] = useState('rgb(255,255,255'); //to set pen colour
  const [reset, setReset] = useState(false); //to reset the canvas
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [dict, setDict] = useState({});

  //runs everytime the reset state changes
  useEffect(() => {
    if (reset) {
      resetCanvas();
      setReset(false);
    }
  }, [reset]);

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
        ctx.strokeStyle = 'rgb(255,255,255';
      }
    }
  }, []);

  const sendData = async () => {};

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgb(255,255,255';
      }
    }
  };
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
        ctx.strokeStyle = 'rgb(255,255,255';
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); //follows the mouse path
        ctx.stroke(); // to draw
      }
    }
  };
  return (
    <>
      <div className='grid grid-cols-3 gap-2'>
        <Button
          onClick={() => setReset(true)}
          className='z-20 text-white bg-black'
          variant='default'
          color='black'
        >
          Reset
        </Button>
        <Group className='z-20'>
          {SWATCHES.map((swatch) => (
            <ColorSwatch
              key={swatch}
              color={swatch}
              onClick={() => setColor(swatch)}
            />
          ))}
        </Group>
        <Button
          // onClick={runRoute}
          className='z-20 text-white bg-black'
          variant='default'
          color='white'
        >
          Run
        </Button>
      </div>
      <canvas
        ref={canvasRef}
        id='canvas'
        className='absolute top-0 left-0 w-full h-full'
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={draw} //calling draw whenevr mouse moves
      />
    </>
  );
}
