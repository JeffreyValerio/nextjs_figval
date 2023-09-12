'use client'

import Image from 'next/image';
import { useState } from 'react';

function ZoomImage({ src }: any) {
  const [zoomStyle, setZoomStyle] = useState({
    transform: 'scale(1) translate(0, 0)',
    transformOrigin: '0 0', // Agregamos transformOrigin aquí
  });

  function handleMouseMove(e: any) {
    const img = e.currentTarget;
    const boundingBox = img.getBoundingClientRect();
    const offsetX = e.clientX - boundingBox.left;
    const offsetY = e.clientY - boundingBox.top;

    const scaleX = 2; // Ajusta el nivel de zoom
    const scaleY = 2; // Ajusta el nivel de zoom

    // Calculamos el punto de transformación en función de la posición del mouse
    const transformOriginX = (offsetX / img.offsetWidth) * 100 + '%';
    const transformOriginY = (offsetY / img.offsetHeight) * 100 + '%';

    const transform = `scale(${scaleX}, ${scaleY}) translate(${-offsetX}px, ${-offsetY}px)`;
    
    setZoomStyle({
      transform,
      transformOrigin: `${transformOriginX} ${transformOriginY}`, // Establecemos el nuevo punto de transformación
    });
  }

  function handleMouseOut() {
    setZoomStyle({
      transform: 'scale(1) translate(0, 0)',
      transformOrigin: '0 0', // Restauramos el punto de transformación
    });
  }

  return (
    <div
      className="zoom-image"
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    >
      <Image
        className='block'
        src={src}
        alt="Imagen"
        style={zoomStyle}
        role='img'
        width={500}
        height={300}
      />
      <style jsx>{`
        .zoom-image {
          position: relative;
          width: 100%; /* Ajusta el ancho y alto según tus necesidades */
          height: auto;
          overflow: hidden;
          background: #f2f2f2;
          cursor: pointer;
        }

        .zoom-image img {
          width: 100%;
          height: auto;
          transition: transform 0.1s ease;
          transform-origin: 0 0;
        }
      `}</style>
    </div>
  );
}

export default ZoomImage;
