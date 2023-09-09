'use client'

import Image from 'next/image';
import { useState } from 'react';

function ZoomImage({ src }: any) {
    const [zoomStyle, setZoomStyle] = useState({
        transform: 'scale(1) translate(0, 0)',
    });

    function handleMouseMove(e: any) {
        const img = e.currentTarget;
        const boundingBox = img.getBoundingClientRect();
        const offsetX = e.clientX - boundingBox.left;
        const offsetY = e.clientY - boundingBox.top;

        const scaleX = 2; // Ajusta el nivel de zoom
        const scaleY = 2; // Ajusta el nivel de zoom

        const transform = `scale(${scaleX}, ${scaleY}) translate(${-offsetX}px, ${-offsetY}px)`;

        setZoomStyle({ transform });
    }

    function handleMouseOut() {
        setZoomStyle({ transform: 'scale(1) translate(0, 0)' });
    }

    return (
        <div
            className="zoom-image"
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
        >
            <Image className='block' src={src} alt="Imagen" style={zoomStyle} role='img' width={500} height={300} />
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
