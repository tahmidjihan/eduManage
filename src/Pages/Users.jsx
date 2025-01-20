import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../Routes/AuthProvider';
import { useAllUsers, useUsers } from '../Routes/TanstackProvider';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';

function Users() {
  const [stat, setStat] = React.useState('loading..');
  const [users, setUsers] = React.useState([]);
  // const [adminState, setAdminState] = React.useState();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  //   console.log(isAdmin());
  const { data, refetch } = useAllUsers();
  useEffect(() => {
    if (Array.isArray(data)) {
      //   console.log(data);
      setUsers(data);
    }
  }, [data]);
  const admin = isAdmin();

  return (
    <>
      <div className='overflow-x-auto'>
        {admin == true && (
          <table className='table'>
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>make admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <th>
                    <figure className='avatar mask mask-squircle w-24 h-24'>
                      <img src={user.image} alt='' />
                    </figure>
                  </th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className='btn btn-primary btn-xs'
                      onClick={() => {
                        if (user.role === 'admin') {
                          return;
                        }
                        axios
                          .patch(
                            `http://localhost:3000/api/users/${user._id}`,
                            {
                              role: 'admin',
                              status: 'accepted',
                            },
                            {
                              headers: {
                                authorization: `${localStorage.getItem(
                                  'token'
                                )}`,
                              },
                            }
                          )
                          .then((res) => {
                            refetch();
                            Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: `Successfully made ${user.name} an admin`,
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          });
                      }}>
                      {user.role === 'admin' ? 'already admin' : 'make admin'}
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

export default Users;
