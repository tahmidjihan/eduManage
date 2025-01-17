import React from 'react';
import { useCourse } from '../Routes/TanstackProvider';
import { useParams } from 'react-router';

function Course() {
  const { id } = useParams();
  const { data, isPending, error, refetch } = useCourse(id);
  return (
    <>
      <div className='container mx-auto'>
        <div className='my-10 flex flex-col items-center max-w-3xl mx-auto p-10 bg-base-300 '>
          <figure>
            <img src={data?.image} alt='' className='w-[688px]' />
          </figure>
          <div className='flex flex-col gap-5 max-w-3xl my-10'>
            <h1 className='font-extrabold text-5xl'>{data?.title}</h1>
            <span className='font-bold text-gray-500'>by {data?.name}</span>
            <span className='badge badge-primary'>${data?.price}</span>
            <p>{data?.description}</p>
            <span className='font-bold'>Deadline: {data?.deadline}</span>
            <span className='text-xl font-bold'>
              Enrolled {data?.enrolled}+ Already
            </span>

            <button className='btn btn-primary'>Pay to Enroll Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;
