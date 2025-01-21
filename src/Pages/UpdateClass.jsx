import React, { useEffect } from 'react';
import { useAuth } from '../Routes/AuthProvider';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useCourse } from '../Routes/TanstackProvider';

function UpdateClass({ isUpdate }) {
  const param = useParams();
  const { user } = useAuth();
  const [classData, setClassData] = React.useState([]);
  const [submitNow, setSubmitNow] = React.useState(false);
  const { data, refetch } = useCourse(param?.id, {
    enabled: !!param?.id,
  });
  // console.log(data);
  useEffect(() => {
    setClassData(data);
    refetch();
  }, [param?.id]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(formData) {
    formData.status = 'pending';
    formData.enrolled = 0;
    console.log(formData);
    if (!isUpdate) {
      axios
        .post('https://edumng.vercel.app/api/courses', formData, {
          headers: { authorization: `${localStorage.getItem('token')}` },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Successfully created a class',
              showConfirmButton: false,
              timer: 1500,
            });
            setSubmitNow(true);
            setTimeout(() => {
              window.location.reload();
            }, 1200);
          }
        });
    } else {
      axios
        .patch(`https://edumng.vercel.app/api/courses/${param?.id}`, formData, {
          headers: { authorization: `${localStorage.getItem('token')}` },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Successfully updated a class',
              showConfirmButton: false,
              timer: 1500,
            });
            setSubmitNow(true);
            setTimeout(() => {
              window.location.reload();
            }, 1200);
          }
        });
    }
  }
  return (
    <>
      <div className='hero bg-base-200 min-h-screen'>
        <div className='flex-col '>
          <div className='card bg-base-100 sm:min-w-[500px] shadow-2xl'>
            <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
              <div className='font-bold text-4xl'>
                {isUpdate ? 'Update' : 'Create'} Class
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input
                  type='text'
                  placeholder='Title'
                  defaultValue={classData?.title || ''}
                  {...register('title', { required: true })}
                  className='input input-bordered'
                />
                {errors.title && (
                  <span className='text-red-600'>This field is required</span>
                )}
              </div>
              <div className='form-control'>
                <div className='flex sm:flex-row flex-col gap-5 '>
                  <div className='flex flex-col'>
                    <label className='label'>
                      <span className='label-text'> Name</span>
                    </label>
                    <input
                      type='text'
                      placeholder='Name'
                      defaultValue={user?.displayName}
                      readOnly
                      className='input input-bordered'
                      {...register('name')}
                    />
                    {errors.name && (
                      <span className='text-red-600'>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <label className='label'>
                      <span className='label-text'>Deadline</span>
                    </label>
                    <input
                      type='text'
                      placeholder='deadline'
                      defaultValue={classData?.deadline || ''}
                      className='input input-bordered'
                      {...register('deadline', { required: true })}
                    />
                    {errors.price && (
                      <span className='text-red-600'>
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  defaultValue={user?.email}
                  readOnly
                  {...register('email')}
                  placeholder='email'
                  className='input input-bordered'
                />
                {errors.email && (
                  <span className='text-red-600'>This field is required</span>
                )}
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Description</span>
                </label>
                <input
                  type='text'
                  placeholder='description'
                  defaultValue={classData?.description || ''}
                  {...register('description', { required: true })}
                  className='input input-bordered'
                />
              </div>
              <div className='form-control'>
                <div className='flex sm:flex-row flex-col gap-5 '>
                  <div className='flex flex-col'>
                    <label className='label'>
                      <span className='label-text'>image URL</span>
                    </label>
                    <input
                      type='text'
                      placeholder='image URL'
                      className='input input-bordered'
                      defaultValue={classData?.image || ''}
                      {...register('image', { required: true })}
                    />
                    {errors.image && (
                      <span className='text-red-600'>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <label className='label'>
                      <span className='label-text'>Price</span>
                    </label>
                    <input
                      type='text'
                      placeholder='Price'
                      defaultValue={classData?.price || ''}
                      className='input input-bordered'
                      {...register('price', { required: true })}
                    />
                    {errors.price && (
                      <span className='text-red-600'>
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className='form-control mt-6'>
                <button className='btn btn-primary'>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateClass;
