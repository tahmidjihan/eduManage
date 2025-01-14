import React from 'react';
import { Carousel } from 'flowbite-react';

function HeroCarousel() {
  const slides = [
    {
      id: 'slide1',
      image: './assets/c1.jpg',
      title: 'Simplify Education Management',
      description:
        'Managing teachers, students, and institutions can be challenging, but EduManage makes it simple. Our platform streamlines everyday tasks, from tracking assignments to scheduling tuition, helping you focus on delivering quality education without the hassle.',
    },
    {
      id: 'slide2',
      image: './assets/c2.webp',
      title: 'Effortless Assignment Management',
      description:
        'Say goodbye to complicated assignment handling. EduManage makes it easy to assign, track, and review tasks with a few clicks. Teachers can monitor progress, and students stay on top of deadlines, creating a smoother academic process for everyone.',
    },
    {
      id: 'slide3',
      image: './assets/c3.webp',
      title: 'Connect Teachers and Institutes',
      description:
        'EduManage strengthens collaboration between teachers and institutes. Share materials, organize meetings, and provide feedback seamlessly with tools designed to keep everyone connected and informed for a more efficient workflow.',
    },
    {
      id: 'slide4',
      image: './assets/c4.webp',
      title: 'Boost Productivity for Tutors and Students',
      description:
        'With EduManage, tutors and students can achieve more. Manage schedules, assignments, and communication in one place, allowing educators to teach effectively and students to focus on learning without distractions.',
    },
  ];

  return (
    <div className=' lg:h-[90vh] '>
      <Carousel>
        {slides.map((slide) => (
          <div key={slide.id} className='min-h-screen relative '>
            <img
              src={slide.image}
              alt={slide.title}
              className='w-full h-full min-h-screen object-cover'
            />
            <div className='absolute inset-0 bg-black bg-opacity-55'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
              <h1 className='text-5xl font-extrabold text-white mb-4'>
                {slide.title}
              </h1>
              <p className='text-lg text-white mb-8'>{slide.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
