import React, { useEffect, useState } from 'react';
import { useCourses } from '../Routes/TanstackProvider';
import { Link } from 'react-router';

function Courses() {
  const { data } = useCourses();
  const [courses, setCourses] = useState(data);
  useEffect(() => {
    setCourses(data);
  }, [data]);
  return (
    <>
      <div className='container mx-auto'>
        <div className='my-10 flex flex-col items-center'>
          <div className='text-center mx-auto my-5'>
            <h1 className='font-extrabold text-5xl'>Courses</h1>
          </div>
          <div className='my-5 mx-auto flex gap-3'>
            <div
              className='btn btn-primary'
              onClick={() => {
                const sorted = [...courses].sort((a, b) => a.price - b.price);
                setCourses(sorted);
              }}>
              Ascending
            </div>
            <div
              className='btn btn-primary'
              onClick={() => {
                const sorted = [...courses].sort((a, b) => b.price - a.price);
                setCourses(sorted);
              }}>
              Descending
            </div>
          </div>
          <div className='cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {courses?.map((course) => (
              <div
                key={course._id}
                className='card bg-base-100 w-80 shadow-xl mx-auto'>
                <figure>
                  <img src={course.image} alt='Shoes' />
                </figure>
                <div className='card-body'>
                  <h2 className='card-title font-extrabold'>{course.title}</h2>
                  <span className='font-bold text-gray-400'>
                    by {course.name}
                  </span>
                  <span className='badge badge-primary'>${course.price}</span>
                  <p>{course.description}</p>
                  <span className='text-xl font-bold'>
                    Enrolled {course.enrolled}+ Already
                  </span>
                  <div className='card-actions justify-end'>
                    <Link
                      to={`/class/${course._id}`}
                      className='btn btn-primary'>
                      Enroll
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Courses;
