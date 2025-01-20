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
  // console.log(data);
  return (
    <>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {classData.map((dat) => (
            <tr key={dat._id} className='max-h-10'>
              <th></th>
              <td>{dat.title}</td>
              <td>{dat.name}</td>
              <td>{dat.description}</td>
              <td>
                <span
                  onClick={() => navigate(`/class/${dat._id}`)}
                  className=' btn btn-xs btn-primary'>
                  view
                </span>
              </td>
              <td>
                <span
                  onClick={() => navigate(`/updateClass/${dat._id}`)}
                  className=' btn btn-xs btn-primary'>
                  edit
                </span>
              </td>
              <td>
                <span
                  onClick={() => {
                    axios
                      .delete(`http://localhost:3000/api/courses/${dat._id}`, {
                        headers: {
                          authorization: `${localStorage.getItem('token')}`,
                        },
                      })
                      .then((res) => {
                        Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'Successfully deleted',
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        refetch();
                      });
                  }}
                  className=' btn btn-xs btn-primary'>
                  delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default MyClasses;
