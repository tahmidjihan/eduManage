import React, { useEffect } from 'react';
import HeroCarousel from '../Components/HeroCarousel';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useCourses } from '../Routes/useCourses';
import { Carousel } from 'flowbite-react';

function Home() {
  const { data, isPending, error, status } = useCourses();
  const [mostEnrolled, setMostEnrolled] = React.useState([]);
  useEffect(() => {
    if (!data) {
      return;
    }
    const newData = data.sort((a, b) => b.enrolled - a.enrolled).slice(0, 3);
    setMostEnrolled(newData);
  }, [data, isPending, error, status]);

  const animation = { duration: 10000, easing: (t) => t };
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free',
    renderMode: 'performance',
    slides: {
      perView: 5.3,
      spacing: 1,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: {
          perView: 4.2,
          spacing: 1,
        },
      },
      '(max-width: 768px) ': {
        slides: {
          perView: 3.2,
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
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
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
        <div className='py-10 relative'>
          <h1 className='text-center font-extrabold text-5xl my-5'>
            Our Partner
          </h1>
          <p className='text-center font-thin text-gray-600 max-w-md mx-auto'>
            EduManage is proud to partner with leading universities and
            educational institutions to enhance the learning experience. These
            collaborations allow us to offer cutting-edge solutions that
            streamline education management, improve communication, and support
            both teachers and students. Together, we are shaping the future of
            education and fostering a more efficient and connected academic
            community
          </p>
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
        <div className='relative py-10'>
          <div className='mx-auto text-center py-5'>
            <h1 className='text-5xl font-extrabold text-gray-900'>
              Most Enrolled Courses
            </h1>
            <p className='text-center font-thin text-gray-600 max-w-md mx-auto'>
              Explore the most popular and highly enrolled courses that are
              shaping the future of education. These programs have attracted
              thousands of learners who are eager to gain practical skills,
              advance their careers, and stay ahead in rapidly evolving
              industries. Whether you're looking to dive into web development,
              digital marketing, or data science, these courses offer expert
              instruction and hands-on experience to help you succeed.
            </p>
          </div>
          <div className='md:h-[60vh] h-screen overflow-hidden'>
            <Carousel>
              {mostEnrolled.map((course) => (
                <div key={course._id}>
                  <div className='card lg:card-side mx-auto justify-around xl:max-w-[60vw] lg:max-w-[90vh] md:max-w-[70vh] bg-base-200 shadow-xl'>
                    <figure>
                      <img
                        src={course.image}
                        className='md:w-80 rounded-lg mt-4 lg:mt-0'
                        alt='Album'
                      />
                    </figure>
                    <div className='card-body  max-w-md xl:max-w-xl'>
                      <h2 className='card-title font-extrabold text-sm '>
                        {course.title}
                      </h2>
                      <p>{course.description}</p>
                      <span className='text-md font-bold badge badge-primary'>
                        Price: $ {course.price}
                      </span>
                      <span className='text-lg font-bold'>
                        Enrolled : {course.enrolled}+
                      </span>
                      <div className='card-actions justify-end'>
                        <button className='btn btn-primary'>Enroll now</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className='relative py-10'>
          <div className='mx-auto text-center py-5'>
            <h1 className='text-5xl font-extrabold text-gray-900'>
              Testimonials and Feedbacks
            </h1>
            <p className='text-center font-thin text-gray-600 max-w-md mx-auto'></p>
          </div>
          <div className='md:h-[60vh] h-screen overflow-hidden'>
            <Carousel>
              {mostEnrolled.map((course) => (
                <div key={course._id}>
                  <div className='card lg:card-side mx-auto justify-around xl:max-w-[60vw] lg:max-w-[90vh] md:max-w-[70vh] bg-base-200 shadow-xl'>
                    <figure>
                      <img
                        src={course.image}
                        className='md:w-80 rounded-lg mt-4 lg:mt-0'
                        alt='Album'
                      />
                    </figure>
                    <div className='card-body  max-w-md xl:max-w-xl'>
                      <h2 className='card-title font-extrabold text-sm '>
                        {course.title}
                      </h2>
                      <p>{course.description}</p>
                      <span className='text-md font-bold badge badge-primary'>
                        Price: $ {course.price}
                      </span>
                      <span className='text-lg font-bold'>
                        Enrolled : {course.enrolled}+
                      </span>
                      <div className='card-actions justify-end'>
                        <button className='btn btn-primary'>Enroll now</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
