import React, { useEffect } from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Routes/AuthProvider';
import { useNavigate, useParams } from 'react-router';
import { useCourse } from '../Routes/TanstackProvider';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';

function Enroll() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const param = useParams();
  // console.log(param);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { data, refetch } = useCourse(param.id);

  // console.log(data);
  function onSubmit() {
    const enrollClass = {
      name: user.displayName,
      email: user.email,
      courseId: param.id,
      courseTitle: data.title,
      courseBy: data.name,
      courseImage: data.image,
    };
    delete data._id;
    const newCourse = {
      ...data,
      enrolled: parseInt(data.enrolled) + 1,
    };
    // console.log(newCourse);
    axios
      .post('https://edumng.vercel.app/api/enrolled', enrollClass, {
        headers: { authorization: `${localStorage.getItem('token')}` },
      })
      .then((res) => {
        axios.patch(
          `https://edumng.vercel.app/api/courses/${param.id}`,
          newCourse,
          {
            headers: { authorization: `${localStorage.getItem('token')}` },
          }
        );
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
  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [user]);
  return (
    <>
      {/* component */}

      <div className='min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700'
          style={{ maxWidth: 600 }}>
          <div className='w-full pt-1 pb-5'>
            <div className='bg-indigo-500 text-white overflow-hidden rounded-full text-2xl w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center'>
              <FaCreditCard />
            </div>
          </div>
          <div className='mb-10'>
            <h1 className='text-center font-bold text-xl uppercase'>
              Secure payment info
            </h1>
          </div>
          <div className='mb-3 flex -mx-2'>
            <div className='px-2'>
              <label
                htmlFor='type1'
                className='flex items-center cursor-pointer'>
                <img
                  src='https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png'
                  className='h-8 ml-3'
                />
              </label>
            </div>
          </div>
          <div className='mb-3'>
            <label className='font-bold text-sm mb-2 ml-1'>Name on card</label>
            <div>
              <input
                className='w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                placeholder='John Smith'
                {...register('name', { required: true })}
                type='text'
              />
            </div>
            {errors.name && (
              <span className='text-red-600 text-sm py-2'>
                This field is required
              </span>
            )}
          </div>
          <div className='mb-3'>
            <label className='font-bold text-sm mb-2 ml-1'>Card number</label>
            <div>
              <input
                className='w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                placeholder='0000 0000 0000 0000'
                {...register('number', { required: true })}
                type='text'
              />
            </div>
            {errors.number && (
              <span className='text-red-600 text-sm py-2'>
                This field is required
              </span>
            )}
          </div>
          <div className='mb-3 -mx-2 flex items-end'>
            <div className='px-2 w-1/2'>
              <label className='font-bold text-sm mb-2 ml-1'>
                Expiration date
              </label>
              <div>
                <select
                  name='name'
                  {...register('month', { required: true })}
                  className='form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer'>
                  <option value={'01'}>01 - January</option>
                  <option value={'02'}>02 - February</option>
                  <option value={'03'}>03 - March</option>
                  <option value={'04'}>04 - April</option>
                  <option value={'05'}>05 - May</option>
                  <option value={'06'}>06 - June</option>
                  <option value={'07'}>07 - July</option>
                  <option value={'08'}>08 - August</option>
                  <option value={'09'}>09 - September</option>
                  <option value={'10'}>10 - October</option>
                  <option value={'11'}>11 - November</option>
                  <option value={'12'}>12 - December</option>
                </select>
              </div>
            </div>
            <div className='px-2 w-1/2'>
              <select
                name='year'
                {...register('year', { required: true })}
                className='form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer'>
                <option value={2025}>2025</option>
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
                <option value={2028}>2028</option>
                <option value={2029}>2029</option>
                <option value={2030}>2030</option>
                <option value={2031}>2031</option>
                <option value={2032}>2032</option>
                <option value={2034}>2034</option>
                <option value={2035}>2035</option>
              </select>
            </div>
          </div>
          <div className='mb-10'>
            <label className='font-bold text-sm mb-2 ml-1'>Security code</label>
            <div>
              <input
                className='w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                placeholder={'000'}
                {...register('cvc', { required: true })}
                onChange={(e) => {
                  if (e.target.value.length > 3) {
                    e.target.value = e.target.value.slice(0, 3);
                  }
                }}
                type='text'
              />
            </div>
            {errors.cvc && (
              <span className='text-red-600 text-sm py-2'>
                This field is required
              </span>
            )}
          </div>
          <div>
            <button className='btn btn-primary w-full font-bold'>
              PAY NOW
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Enroll;
