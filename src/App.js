import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './App.css';
import Sam1 from './assets/sam1.jpg';
import Sam2 from './assets/sam2.jpg';
import Sam3 from './assets/sam3.jpg';
import Sam4 from './assets/sam4.jpg';
import Sam5 from './assets/sam5.jpg';
import Sam6 from './assets/sam6.webp';

const images = [
  Sam1,
  Sam2,
  Sam3,
  Sam4,
  Sam5,
  Sam6
  // Add more photo paths here
];

function App() {
  return (
    <div className="app">
      <div className="carousel">
        <Swiper spaceBetween={50} slidesPerView={1}>
          {images.map((src, idx) => (
            <SwiperSlide key={idx}>
              <img src={src} alt={`Slide ${idx}`} className="slide-img" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    
  );
}

export default App;
