import { useState, useEffect } from "react";

const App = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pauseAutoSlide, setPauseAutoSlide] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [size, setSize] = useState(getImageSize());

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (pauseAutoSlide) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images, pauseAutoSlide]);

  useEffect(() => {
    const handleResize = () => setSize(getImageSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const img = new Image();
      img.src = images[currentIndex];
      img.onload = () => setImageDimensions({ width: img.width, height: img.height });
    }
  }, [currentIndex, images]);

  async function fetchImages() {
    try {
      const response = await fetch("./imageReferences.json");
      console.log("response", response);
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json();
      console.log("data", data);
  
      // Add '/images/' when setting the paths
      const pathsWithImages = data.map(fileName => `./images/${fileName}`);
  
      if (pathsWithImages.length > 0) {
        // ✅ Show the first image immediately
        setImages([pathsWithImages[0]]);
  
        // ✅ Preload remaining images in the background
        await preloadImages(pathsWithImages.slice(1));
  
        // ✅ After preloading, update state with all images
        setImages(pathsWithImages);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }
  
  // ✅ Function to preload images asynchronously
  async function preloadImages(imagePaths) {
    return Promise.allSettled(
      imagePaths.map(
        (src) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          })
      )
    );
  }
  
  function getImageSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return width > height ? Math.min(width * 0.5, height * 0.8) : Math.min(width * 0.8, height * 0.6);
  }

  function handleClick() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setPauseAutoSlide(true);
    setTimeout(() => setPauseAutoSlide(false), 3000);
  }

  function getScaleClass() {
    const isViewportLandscape = window.innerWidth > window.innerHeight;
    const isImageLandscape = imageDimensions.width > imageDimensions.height;
    return isViewportLandscape === isImageLandscape ? "scale-120" : "scale-100";
  }

  return (
    <div className="relative h-screen w-screen bg-white text-gray-900 flex flex-col justify-center items-center overflow-clip">
      <div className="absolute top-0 left-4 z-10 p-4 bg-white">
        <h1 className="text-3xl lg:text-3xl md:text-base sm:text-xs">hugo veuillet</h1>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div
          style={{ width: size, height: size }}
          onClick={handleClick}
          className="cursor-pointer"
        >
          {images.length > 0 && (
            <img
              src={images[currentIndex]}
              className={`w-full h-full object-contain   ${getScaleClass()}`}
              alt={`Photo ${currentIndex + 1}`}
            />
          )}
        </div>
      </div>

      <div className="absolute bottom-0 right-4 z-10 p-4 bg-white">
        <div className="flex flex-row gap-2">
          <a href="mailto:veuillet.h@gmail.com" className="text-2xl sm:text-xs md:text-base lg:text-2xl hover:underline italic">contact</a>
          <a href="https://instagram.com/hugoveuillet" className="text-2xl sm:text-xs md:text-base lg:text-2xl hover:underline italic" target="_blank">instagram</a>
        </div>
      </div>
    </div>
  );
};

export default App;
