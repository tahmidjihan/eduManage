import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Routes/AuthProvider';

function BeTeacher() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  }
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
                <input
                  type='text'
                  name='category'
                  placeholder='e. g. web development'
                  className='input input-bordered'
                  {...register('category', { required: true })}
                />
                {errors.category && (
                  <span className='text-red-600 text-sm py-2'>
                    This field is required
                  </span>
                )}
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Profile Image</span>
                </label>
                <select className='select select-bordered w-full max-w-xs'>
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
