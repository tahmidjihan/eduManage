import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import { useAssignments, useCourse } from '../Routes/TanstackProvider';
import { useAuth } from '../Routes/AuthProvider';
function MyClass() {
  const { user } = useAuth();
  const { id } = useParams();

  const [assignment, setAssignment] = useState([]);
  const [course, setCourse] = useState({});
  const [rating, setRating] = useState(1);
  function ratingChanged(newRating) {
    setRating(newRating);
  }
  // console.log(id);

  const { data } = useAssignments(id);
  useEffect(() => {
    if (Array.isArray(data)) setAssignment(data);
  }, [data]);
  useEffect(() => {
    if (assignment && assignment.length) setCourse(assignment[0].course);
  }, [assignment]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();
  function onSubmit(formData) {
    formData.courseId = id;
    formData.userEmail = user.email;
    axios
      .post('http://localhost:3000/api/assignmentSubmit', formData, {
        headers: {
          authorization: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          document.getElementById('my_modal_2').close();

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successfully submitted an assignment',
            showConfirmButton: false,
            timer: 1500,
          });

          setTimeout(() => {
            navigate(`/myClass/${id}`);
          }, 1200);
        }
      });
  }
  function onSubmit2(formData) {
    const feedbackData = {
      courseId: id,
      userId: user.displayName,
      userProfile: user.photoURL,
      ...formData,
      userEmail: user.email,
      rating,
    };

    console.log(feedbackData);
    axios
      .post('http://localhost:3000/api/feedbacks', feedbackData, {
        headers: {
          authorization: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          document.getElementById('my_modal_1').close();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successfully created a feedback',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate(`/myClass/${id}`);
          }, 1200);
        }
      });
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
          <h1 className='text-xl font-bold'>{course?.data?.title}</h1>
          {/* <span>by {course?.data?.name}</span> */}
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
          <form action='' onSubmit={handleSubmit2(onSubmit2)}>
            <h3 className='font-bold text-lg'>Add Feedback</h3>

            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Feedback Des</span>
              </label>
              <input
                type='text'
                placeholder='Type here'
                name='feedback'
                {...register2('feedback', { required: 'Feedback is required' })}
                className='input input-bordered w-full max-w-xs'
              />
              {errors2.feedback && <span>{errors2.feedback.message}</span>}
            </div>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Feedback Rating</span>
              </label>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                value={rating}
                activeColor='#ffd700'
              />
            </div>
            <button className='btn btn-primary my-3' type='submit'>
              submit
            </button>
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
                <span className='label-text'>Assignment Link</span>
              </label>
              <input
                type='text'
                placeholder='Paste assignment link here'
                {...register('assignment', { required: true })}
                className='input input-bordered w-full max-w-xs'
              />
              {errors.assignment && <span>This field is required</span>}
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
