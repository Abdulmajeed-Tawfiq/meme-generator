import { useState, useEffect, useRef } from "react";
import MovingText from "./MovingText";
import html2canvas from "html2canvas";

function Meme() {
  const captureRef = useRef(null);

  const handleCapture = async () => {
    const elementToCapture = captureRef.current;

    if (!elementToCapture) {
      console.error("Element to capture is null.");
      return;
    }

    try {
      const canvas = await html2canvas(elementToCapture, { useCORS: true });
      const screenshot = canvas.toDataURL("image/png");

      // Create a temporary link element to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = screenshot;
      downloadLink.download = "screenshot.png";
      downloadLink.click();
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  };

  const [meme, setMeme] = useState({
    text: [""],
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [isElementVisible, setIsElementVisible] = useState(false);
  const [allMemes, setAllMemes] = useState([]);
  const [movedText, setMovedText] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  const handleButtonClick = () => {
    // Toggle the visibility of the element
    setIsElementVisible(true);
    setMovedText((prev) => [...prev, meme.text]);
  };

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevState) => ({
      ...prevState,
      randomImage: url,
    }));
    console.log(movedText);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <div className="text">
          <input
            className="form--input"
            type="text"
            placeholder="text"
            name="text"
            value={meme.text}
            onChange={handleChange}
          />
          <button className="add-text" onClick={handleButtonClick}>
            Add text
          </button>
          <button className="delete" onClick={() => setMovedText([])}>
            delete all texts
          </button>
        </div>
        <button className="form--button" onClick={getMemeImage}>
          Get a random meme image 🖼
        </button>
      </div>
      <div className="meme">
        <div className="meme-body" ref={captureRef}>
          {isElementVisible && <MovingText text={movedText} />}
          <img
            src={meme.randomImage}
            className="meme--image"
            name="randomImage"
          />
        </div>
      </div>
      <button className="screenshot" onClick={handleCapture}>
        Download Meme
      </button>
    </main>
  );
}

export default Meme;
