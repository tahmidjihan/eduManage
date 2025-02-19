import React, { useEffect, useState } from 'react';
import HeroCarousel from '../Components/HeroCarousel';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useCourses, useFeedback } from '../Routes/TanstackProvider';
import { Carousel } from 'flowbite-react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router';

function Home() {
  const { data: courseData, isPending: courseIsPending } = useCourses();
  const { data: feedbackData, isPending: feedbackIsPending } = useFeedback();

  const [mostEnrolled, setMostEnrolled] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    if (!courseData) {
      return;
    }
    const newData = courseData
      .sort((a, b) => b.enrolled - a.enrolled)
      .slice(0, 3);
    setMostEnrolled(newData);
  }, [courseData, courseIsPending]);
  useEffect(() => {
    if (!feedbackData) {
      return;
    }
    setFeedback(feedbackData);
  });
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
            Our Partners
          </h1>
          <p className='text-center font-thin text-gray-500 max-w-md mx-auto'>
            EduManage is proud to partner with leading universities and
            educational institutions to enhance the learning experience.
          </p>
          <div
            ref={sliderRef}
            className='keen-slider py-8 my-2 mt-4 bg-gray-300'
            data-theme='light'>
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
        <section>
          <div className='sm:flex items-center max-w-screen-xl container mx-auto'>
            <div className='sm:w-1/2 p-10'>
              <div className='image object-center text-center'>
                <img src='https://i.imgur.com/WbQnbas.png' />
              </div>
            </div>
            <div className='sm:w-1/2 p-5'>
              <div className='text'>
                <span className=' border-b-2 border-primary uppercase'>
                  About us
                </span>
                <h2 className='my-4 font-bold text-3xl  sm:text-4xl '>
                  About <span className='text-primary'>Our Company</span>
                </h2>
                <p className='text-gray-500'>
                  Welcome to EduManage, your one-stop destination for
                  exceptional educational resources. Our platform connects
                  learners with a wide range of courses, tutorials, and
                  educational materials. Whether you're a student, a teacher, or
                  an educator, EduManage has got you covered. Our user-friendly
                  interface ensures a smooth learning experience, while our
                  expert instructors provide personalized guidance to help you
                  achieve your educational goals. Join our community of learners
                  and take your learning to the next level.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className='relative py-10'>
          <div className='mx-auto text-center py-5'>
            <h1 className='text-5xl font-extrabold'>Most Enrolled Courses</h1>
            <p className='text-center font-thin text-gray-500 max-w-md mx-auto'>
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
                        className='md:w-96 rounded-lg mx-3 mt-5 xl:mt-0'
                        alt='Album'
                      />
                    </figure>
                    <div className='card-body  max-w-md xl:max-w-xl mx-auto'>
                      <h2 className='card-title font-extrabold text-sm '>
                        {course.title}
                      </h2>
                      <p className='text-sm'>{course.description}</p>
                      <span className='text-sm font-md badge badge-primary'>
                        Price: $ {course.price}
                      </span>
                      <span className='font-bold'>
                        Enrolled : {course.enrolled}+
                      </span>
                      <div className='card-actions justify-end'>
                        <button className='btn btn-primary btn-sm'>
                          Enroll now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <section className='bg-white dark:bg-gray-900'>
          <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
            <div className='mx-auto max-w-screen-md sm:text-center'>
              <h2 className='mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white'>
                Sign up for our newsletter
              </h2>
              <p className='mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400'>
                Stay up to date with the roadmap progress, announcements and
                exclusive discounts feel free to sign up with your email.
              </p>
              <form action='#'>
                <div className='items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0'>
                  <div className='relative w-full'>
                    <label
                      htmlFor='email'
                      className='hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      Email address
                    </label>
                    <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                      <svg
                        className='w-5 h-5 text-gray-500 dark:text-gray-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                        <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                      </svg>
                    </div>
                    <input
                      className='block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Enter your email'
                      type='email'
                      id='email'
                      required=''
                    />
                  </div>
                  <div>
                    <button
                      type='submit'
                      className='py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                      Subscribe
                    </button>
                  </div>
                </div>
                <div className='mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300'>
                  We care about the protection of your data.{' '}
                  <a
                    href='#'
                    className='font-medium text-primary-600 dark:text-primary-500 hover:underline'>
                    Read our Privacy Policy
                  </a>
                  .
                </div>
              </form>
            </div>
          </div>
        </section>
        <div>
          <div className='hero bg-base-200 min-h-screen'>
            <div className='hero-content flex-col lg:flex-row'>
              <img
                src='/assets/teacher.png'
                className='max-w-sm rounded-full shadow-2xl'
              />
              <div>
                <h1 className='text-5xl font-bold'>
                  Be a teacher In EduManages!
                </h1>
                <p className='py-6'>
                  Join EduManages and elevate your teaching! Manage your
                  courses, track student progress, and streamline class
                  schedules with ease. With powerful tools at your fingertips,
                  you can create a more organized and impactful learning
                  experience. Start teaching with EduManages today!
                </p>
                <Link to='/beTeacher' className='btn btn-primary'>
                  Be a Teacher
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='relative py-10'>
          <div className='mx-auto text-center py-5'>
            <h1 className='text-5xl font-extrabold pr-10'>
              Testimonials and Feedbacks
            </h1>
          </div>
          <div className='md:h-[60vh] h-screen overflow-hidden'>
            <Carousel>
              {feedback.map((item) => (
                <div key={item._id}>
                  <div className='card bg-base-100 h-[500px] w-80 shadow-xl mx-auto border-t-[16px] border-primary relative my-2'>
                    <figure className='px-10 pt-10'>
                      <img
                        src={item.userProfile}
                        alt='Shoes'
                        className='rounded-xl'
                      />
                    </figure>
                    <div className='card-body items-center text-center'>
                      <h2 className='card-title font-extrabold text-xl'>
                        {item.userId}
                      </h2>
                      <h2 className='card-title font-thin text-lg'>
                        {item.feedback}
                      </h2>
                      <div className='flex justify-center'>
                        <ReactStars
                          count={5}
                          value={parseInt(item.rating)}
                          size={24}
                          activeColor='#ffd700'
                          edit={false}
                        />
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
