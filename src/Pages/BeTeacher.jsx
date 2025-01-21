import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Routes/AuthProvider';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { useNavigate } from 'react-router';
import axios from 'axios';
import { useUsers } from '../Routes/TanstackProvider';

function BeTeacher() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { data, refetch } = useUsers(user?.email, {
    enabled: !!user?.email,
  });
  useEffect(() => {
    refetch();
  }, [user?.email]);
  function onSubmit(formData) {
    if (data) {
      const newData = {
        ...data,
        ...formData,
        role: 'teacher',
        status: 'pending',
      }; // Merge newData
      delete newData._id;
      // console.log(newData);
      axios
        .patch(`https://edumng.vercel.app/api/users/${data._id}`, newData, {
          headers: { authorization: `${localStorage.getItem('token')}` },
        })
        .then((res) => {
          // console.log(res);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successfully applied to be a teacher',
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
          setTimeout(() => {
            navigate('/');
          }, 1200);
        });
    }
  }

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [user]);
  return (
    <div className='hero bg-base-300 min-h-screen'>
      <div className='hero-content flex-col '>
        <div className='text-center max-w-md'>
          <h1 className='text-5xl font-bold'>Be a Teacher</h1>
          <p className='py-6'>
            Teach smarter with EduManages. Easily manage courses, track
            progress, and organize classes—all in one place. Join us today!
          </p>
        </div>
        <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
          <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                name='email'
                defaultValue={user?.email}
                placeholder='email'
                readOnly
                className='input input-bordered'
              />
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input
                type='text'
                name='name'
                defaultValue={user?.displayName}
                {...register('name', { required: true })}
                placeholder='Name'
                className='input input-bordered'
              />
            </div>
            {errors.name && (
              <span className='text-red-600 text-sm py-2'>
                This field is required
              </span>
            )}

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Profile Image</span>
              </label>
              <input
                type='text'
                name='image'
                defaultValue={user?.photoURL}
                {...register('image', { required: true })}
                placeholder='image'
                className='input input-bordered'
              />
            </div>
            {errors.image && (
              <span className='text-red-600 text-sm py-2'>
                This field is required
              </span>
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Category</span>
                </label>
                <select
                  {...register('category', { required: true })}
                  className='select select-bordered w-full max-w-xs'>
                  <option>Web Development</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>Languages</option>
                  <option>Computer Science</option>
                  <option>Business and Marketing</option>
                  <option>Arts and Design</option>
                  <option>Social Studies</option>
                  <option>Music and Performing Arts</option>
                  <option>Health and Physical Education</option>{' '}
                </select>
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Profile Image</span>
                </label>
                <select
                  {...register('level', { required: true })}
                  className='select select-bordered w-full max-w-xs'>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
            <div className='form-control mt-6'>
              <button className='btn btn-primary'>Submit for Review</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BeTeacher;
