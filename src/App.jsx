import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const images = [
  "./images/1.jpg",
  "./images/2.jpg",
  "./images/3.jpg",
  "./images/4.jpg",
  "./images/5.jpg",
  "./images/6.jpg",
  "./images/7.jpg",
  "./images/8.jpg",
  "./images/9.jpg",
  "./images/10.jpg",
  "./images/11.jpg",
  "./images/12.jpg",
  "./images/13.jpg",
];

const App = () => {
  return (
    // <div className="h-screen w-full bg-white text-gray-900 flex flex-col justify-center items-center overflow-hidden p-4">
         <div className="h-screen w-full bg-white text-gray-900 flex flex-col justify-center items-center overflow-hidden p-4">
      <div className="absolute top-0 left-0 z-10 p-4 bg-white">
        <h1 className="text-2xl md:text-3xl lg:text-3xl">hugo veuillet</h1>
      </div>
      {/* <div className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] min-w-[300px] min-h-[300px] lg:w-[80vh] lg:h-[80vh] md:w-[50vh] md:h-[50vh] flex items-center justify-center"> */}
      {/* Centered Square Gallery */}
      <div className="flex-grow flex items-center justify-center">
       <div className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] min-w-[100px] min-h-[100px] lg:w-[80vh] lg:h-[80vh] md:w-[50vh] md:h-[50vh] sm:w-[50vh] sm:h-[50vh]">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            // navigation
            pagination={{ clickable: true }}
            grabCursor
            touchRatio={1}
            className="h-full w-full"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center">
                <img
                  src={src}
                  className="w-full h-full object-contain "
                  alt={`Photo ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 md:right-0 z-10 p-4 bg-white ">
        <div className="mt-4 flex flex-row gap-2">
          <a
            href="mailto:veuillet.h@gmail.com"
            className="text-lg md:text-2xl lg:text-2xl hover:underline"
          >
            email
          </a>
          <a
            href="https://instagram.com/hugoveuillet"
            className="text-lg md:text-2xl lg:text-2xl hover:underline"
            target="_blank"
          >
            instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;