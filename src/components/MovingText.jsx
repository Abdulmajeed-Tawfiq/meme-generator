import React, { useState } from "react";
import "../App.css";

function MovingDiv({ text }) {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  function handleMouseDown(e) {
    // Calculate the initial offset values
    setOffsetX(e.clientX - e.target.offsetLeft);
    setOffsetY(e.clientY - e.target.offsetTop);
    setIsDragging(true);
  }

  const handleMouseMove = (e, index) => {
    if (!isDragging) return;

    // Update the position based on mouse coordinates
    const div = document.getElementById(index);
    div.style.left = `${e.clientX - offsetX}px`;
    div.style.top = `${e.clientY - offsetY}px`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      {text.map((item, index) => (
        <div
          key={index} // Assign a unique key prop
          id={index}
          className="textOnImage"
          onMouseDown={handleMouseDown}
          onMouseMove={(e) => handleMouseMove(e, index)}
          onMouseUp={handleMouseUp}
        >
          {item}
          {/* Use the individual item from the array */}
        </div>
      ))}
    </>
  );
}

export default MovingDiv;
