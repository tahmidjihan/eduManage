import React from 'react';
import HeroCarousel from '../Components/HeroCarousel';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

function Home() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free',
    slides: {
      perView: 4.3,
      spacing: 1,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: {
          perView: 3.2,
          spacing: 1,
        },
      },
      '(max-width: 768px) ': {
        slides: {
          perView: 2.2,
          spacing: 1,
        },
      },
      '(max-width: 480px)': {
        slides: {
          perView: 2,
          spacing: 1,
        },
      },
    },
  });
  const images = [
    {
      id: 'slide1',
      image: './assets/u1.png',
    },
    {
      id: 'slide2',
      image: './assets/u2.png',
    },
    {
      id: 'slide3',
      image: './assets/u3.png',
    },
    {
      id: 'slide4',
      image: './assets/u4.png',
    },
    {
      id: 'slide5',
      image: './assets/u5.png',
    },
    {
      id: 'slide6',
      image: './assets/u6.png',
    },
    {
      id: 'slide7',
      image: './assets/u7.png',
    },
    {
      id: 'slide8',
      image: './assets/u8.png',
    },
  ];
  return (
    <>
      <div>
        <HeroCarousel></HeroCarousel>
        <div className='max-h-80'>
          <h1 className='text-center font-extrabold text-5xl my-5'>
            Our Partner
          </h1>
          <div ref={sliderRef} className='keen-slider my-10'>
            {images.map((image) => (
              <div key={image.id} className='keen-slider__slide'>
                <img
                  src={image.image}
                  alt={image.id}
                  className='h-36 grayscale hover:grayscale-0 hover:scale-90 transition duration-300 ease-in-out'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
