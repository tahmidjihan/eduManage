import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../Routes/AuthProvider';
import { useTeachers } from '../Routes/TanstackProvider';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import axios from 'axios';

function Teacher() {
  const [stat, setStat] = React.useState('loading..');
  const [teacher, setTeacher] = React.useState([]);

  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const { teachers, refetchTeachers } = useTeachers();
  // console.log(teachers);
  useEffect(() => {
    if (Array.isArray(teachers)) {
      setTeacher(teachers);
    }
  }, [teachers]);
  const admin = isAdmin();

  return (
    <>
      <div className='overflow-x-auto'>
        {admin == true && (
          <table className='table'>
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody key={teacher}>
              {teacher?.map((user) => (
                <tr key={user?._id}>
                  <td>
                    <figure className='avatar mask mask-squircle w-16 h-16'>
                      <img src={user.image} alt='' />
                    </figure>
                  </td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>{user?.status}</td>
                  <td>
                    <span
                      className='btn btn-primary btn-xs'
                      onClick={() => {
                        // console.log(user?._id + ' clicked to approve');
                        if (
                          user.status == 'accepted' ||
                          user.status == 'rejected'
                        )
                          return;

                        const newUser = {
                          role: 'teacher',
                          status: 'accepted',
                        };

                        axios
                          .patch(
                            `https://edumng.vercel.app/api/users/${user._id}`,
                            newUser,
                            {
                              headers: {
                                'Content-Type': 'application/json',
                                'authorization': `${localStorage.getItem(
                                  'token'
                                )}`,
                              },
                            }
                          )
                          .then((res) => {
                            console.log(res);
                            refetchTeachers();
                            Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: `Successfully approved ${user.name}`,
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}>
                      {user.status == 'pending' ? 'Approve' : user.status}
                    </span>
                    <span
                      onClick={() => {
                        // console.log(user._id + ' clicked to reject');
                        const newUser = {
                          role: 'teacher',
                          status: 'rejected',
                        };

                        axios
                          .patch(
                            `https://edumng.vercel.app/api/users/${user._id}`,
                            newUser,
                            {
                              headers: {
                                'Content-Type': 'application/json',
                                'authorization': `${localStorage.getItem(
                                  'token'
                                )}`,
                              },
                            }
                          )
                          .then((res) => {
                            console.log(res);
                            refetchTeachers();
                            Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: `Successfully rejected ${user.name}`,
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                      className={`btn btn-error btn-xs ml-1 ${
                        user.status == 'pending' ? 'visible' : 'hidden'
                      }`}>
                      Reject
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Teacher;
