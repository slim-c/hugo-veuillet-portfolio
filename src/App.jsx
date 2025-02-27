import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const images = [
  "./images/photo1.PNG",
  "./images/photo2.PNG",
  "./images/photo3.PNG",
  "./images/photo4.PNG",
  "./images/photo5.PNG",
  "./images/photo6.PNG",
];

const App = () => {
  return (
    <div className="relative h-screen w-full bg-white text-gray-900 flex flex-col items-center justify-center px-4">
      {/* Photographer's Name (Top Left) */}
      <div className="absolute top-4 left-4 md:left-10 z-10 p-0 bg-white">
        <h1 className="text-3xl md:text-3xl lg:text-3xl">hugo veuillet</h1>
      </div>


      {/* Responsive Gallery with Scroll & Swipe */}
      <div className="w-full max-w-[600px] h-[400px] md:h-[500px] lg:h-[600px]">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }} 
          loop={true} 
          navigation={false}
          pagination={{ clickable: true }} 
          grabCursor={true} 
          touchRatio={1} 
          className="h-full w-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
              <img
                src={src}
                className="w-full h-full object-cover shadow-lg rounded-lg"
                alt={`Photo ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


      {/* Contact Links (Bottom Right) */}
      <div className="absolute bottom-4 right-4 md:right-10 z-10 p-0 bg-white">
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