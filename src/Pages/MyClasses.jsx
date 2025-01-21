import React, { useEffect, useState } from 'react';
import { useCoursesByEmail } from '../Routes/TanstackProvider';
import { useAuth } from '../Routes/AuthProvider';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';

function MyClasses() {
  const { user } = useAuth();
  const [classData, setClassData] = useState([]);
  const navigate = useNavigate();
  const { data, refetch } = useCoursesByEmail(user?.email);
  useEffect(() => {
    if (Array.isArray(data)) {
      setClassData(data);
    }
  }, [data]);
  console.log(data);
  return (
    <>
      <div className='container mx-auto'>
        <div className='my-10 flex flex-col items-center'>
          <div className='text-center mx-auto my-5'>
            <h1 className='font-extrabold text-5xl'>Courses</h1>
          </div>
          <div className='cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {classData?.map((course) => (
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
                  <div className='card-actions justify-end flex'>
                    <span
                      onClick={() => navigate(`/myClassTeacher/${course._id}`)}
                      className=' btn btn-primary'>
                      view
                    </span>
                    <span
                      onClick={() => navigate(`/updateClass/${course._id}`)}
                      className=' btn btn-primary'>
                      edit
                    </span>
                    <span
                      onClick={() => {
                        axios
                          .delete(
                            `https://edumng.vercel.app/api/courses/${course._id}`,
                            {
                              headers: {
                                authorization: `${localStorage.getItem(
                                  'token'
                                )}`,
                              },
                            }
                          )
                          .then((res) => {
                            if (res.data.deletedCount > 0) {
                              refetch();
                              Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Deleted Successfully',
                                showConfirmButton: false,
                                timer: 1500,
                              });
                            } else {
                              Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Something went wrong',
                                showConfirmButton: false,
                                timer: 1500,
                              });
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                      className=' btn btn-primary'>
                      delete
                    </span>
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

export default MyClasses;
