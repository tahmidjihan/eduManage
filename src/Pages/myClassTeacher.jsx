import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { set, useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';
import { useAssignments, useCourseStat } from '../Routes/TanstackProvider';
function MyClassTeacher() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState([]);
  const [courseStat, setCourseStat] = useState([]);
  const { data } = useAssignments(id);
  const { stats, statsRefetch } = useCourseStat(id);
  useEffect(() => {
    if (Array.isArray(data)) setAssignment(data);
  }, [data]);
  useEffect(() => {
    // statsRefetch();
    if (typeof stats === 'object' && !Array.isArray(stats) && stats !== null) {
      setCourseStat(stats);
    }
  }, [stats]);
  console.log(courseStat);
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
    axios
      .post('http://localhost:3000/api/assignments', formData, {
        headers: { authorization: `${localStorage.getItem('token')}` },
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successfully created a class',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate(`/myClassTeacher/${id}`);
          }, 1200);
        }
      });
  }
  return (
    <>
      <div className='container mx-auto my-10'>
        <nav className='flex justify-between w-3/4 mx-auto'>
          <h1 className='text-5xl font-bold'>My Class - Teacher</h1>
          <button
            className='btn btn-primary'
            onClick={() => document.getElementById('my_modal_1').showModal()}>
            Add Assignment
          </button>
        </nav>
        <div className='flex justify-between w-3/4 mx-auto'>
          <div className='my-10 mx-auto w-full'>
            {courseStat ? (
              <div className='stats stats-vertical lg:stats-horizontal shadow'>
                <div className='stat'>
                  <div className='stat-title'>Enrolls</div>
                  <div className='stat-value'>{courseStat.enrolled}</div>
                </div>

                <div className='stat'>
                  <div className='stat-title'>total Assignments</div>
                  <div className='stat-value'>{courseStat.totalAssignment}</div>
                </div>

                <div className='stat'>
                  <div className='stat-title'> Assignment Submitted</div>
                  <div className='stat-value'>
                    {courseStat.assignmentSubmitted}
                  </div>
                </div>
              </div>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
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
                        onClick={() => {
                          navigate(`/assignment/${assignment._id}`);
                        }}>
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
                <span className='label-text'>Assignment Name</span>
              </label>
              <input
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full max-w-xs'
                {...register('name', { required: true })}
              />
              {errors.name && <span>This field is required</span>}
            </div>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Assignment Des</span>
              </label>
              <input
                type='text'
                placeholder='Type here'
                {...register('des', { required: true })}
                className='input input-bordered w-full max-w-xs'
              />
              {errors.des && <span>This field is required</span>}
            </div>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Assignment Deadline</span>
              </label>
              <input
                type='text'
                placeholder='Type here'
                {...register('deadline', { required: true })}
                className='input input-bordered w-full max-w-xs'
              />
              {errors.deadline && <span>This field is required</span>}
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

export default MyClassTeacher;
