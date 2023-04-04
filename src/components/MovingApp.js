import React, { useState, useEffect, useRef } from 'react';
import Moveable from 'react-moveable';
import style from '../style/moveable.module.css'

function MovingApp() {
  const [image, setImage] = useState('');
  const containerRef = useRef();
  const [position, setPosition] = useState({x:0, y:0})
  const [size, setSize] = useState({width:0, height: 0})
  const [rotation, setRotation] = useState(0)

  // Función para obtener la imagen utilizando fetch
  const getImage = async () => {
    const response = await fetch('https://via.placeholder.com/200x200.png?text=Move+me!');
    const imageBlob = await response.blob();
    const imageURL = URL.createObjectURL(imageBlob);
    setImage(imageURL);
  };
  
  useEffect(() => {
    getImage();
  }, []);
// Función para arrastrar con el mouse
  const onDrag = ({target, clientX, clientY }) => {

// Función para cambiar de posición
    setPosition({x: clientX, y: clientY});
     target.style.transform = `translate(${clientX}px, ${clientY}px)`;
  };

// Función para cambiar de tamaño

  const onResize = ({ target, width, height }) => {
    setSize({ width, height });
    target.style.width = `${width}px`;
    target.style.height = `${height}px`;
  };

// Función para rotar

  const onRotate = ({ target, beforeDelta }) => {
    setRotation(rotation + beforeDelta);
    target.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${rotation + beforeDelta}deg)`;
  };



  return (
   
    <div className={style.container} ref={containerRef}>
        
    <img
      src={image}
      alt="icons"
      className={style.container_image}
       
  />
   
   <Moveable
  target={containerRef.current}
  draggable={true}
  resizable={true}
  rotatable={true}
  onDrag={onDrag}
  onResize={onResize}
  onRotate={onRotate}
   
/>

  </div>
  );
}

export default MovingApp;