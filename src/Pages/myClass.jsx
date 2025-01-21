import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';
import { useAssignments } from '../Routes/TanstackProvider';
import { useAuth } from '../Routes/AuthProvider';
function MyClass() {
  const { user } = useAuth();
  const { id } = useParams();
  const [assignment, setAssignment] = useState([]);
  // console.log(id);
  const { data } = useAssignments(id);

  useEffect(() => {
    if (Array.isArray(data)) setAssignment(data);
  }, [data]);
  console.log(data);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  function onSubmit(formData) {
    formData.courseId = id;
    // console.log(formData);
  }
  return (
    <>
      <div className='container mx-auto my-10'>
        <nav className='flex justify-between w-3/4 mx-auto'>
          <h1 className='text-5xl font-bold'>My Class</h1>
          <button
            className='btn btn-primary'
            onClick={() => document.getElementById('my_modal_1').showModal()}>
            Feedback
          </button>
        </nav>
        <div className='flex justify-between w-3/4 mx-auto'>
          <h1 className='text-xl font-bold'>Feedback</h1>
        </div>
        <div>
          <div className='overflow-x-auto'>
            <table className='table'>
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Des</th>
                  <th>deadline</th>
                  <th>submit</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {assignment.map((assignment, i) => (
                  <tr key={assignment._id}>
                    <th>{i + 1}</th>
                    <th>{assignment.name}</th>
                    <td>{assignment.des}</td>
                    <td>{assignment.deadline}</td>
                    <td>
                      <button
                        className='btn btn-primary'
                        onClick={() =>
                          document.getElementById('my_modal_2').showModal()
                        }>
                        Submit
                      </button>
                    </td>
                  </tr>
                ))}
                {/* row 2 */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box'>
          <form action='' onSubmit={handleSubmit(onSubmit)}>
            <h3 className='font-bold text-lg'>Add Assignment</h3>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full max-w-xs'
                defaultValue={user?.name}
                {...register('name')}
              />
              {/* {errors.name && <span>This field is required</span>} */}
            </div>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Feedback Des</span>
              </label>
              <input
                type='text'
                placeholder='Type here'
                {...register('des', { required: true })}
                className='input input-bordered w-full max-w-xs'
              />
              {errors.des && <span>This field is required</span>}
            </div>

            <button className='btn btn-primary my-3'>submit</button>
          </form>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id='my_modal_2' className='modal'>
        <div className='modal-box'>
          <form action='' onSubmit={handleSubmit(onSubmit)}>
            <h3 className='font-bold text-lg'>Submit Assignment</h3>

            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Feedback Des</span>
              </label>
              <input
                type='text'
                placeholder='Type your assignment link here'
                {...register('des', { required: true })}
                className='input input-bordered w-full max-w-xs'
              />
              {errors.des && <span>This field is required</span>}
            </div>

            <button className='btn btn-primary my-3'>submit</button>
          </form>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default MyClass;
