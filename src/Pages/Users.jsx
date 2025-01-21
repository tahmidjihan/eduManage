import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../Routes/AuthProvider';
import { useAllUsers } from '../Routes/TanstackProvider';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';

function Users() {
  const [stat, setStat] = React.useState('loading..');
  const [users, setUsers] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1); // Current page state
  const [itemsPerPage] = React.useState(10); // Items per page
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { data, refetch } = useAllUsers();

  useEffect(() => {
    if (Array.isArray(data)) {
      setUsers(data);
    }
  }, [data]);

  const admin = isAdmin();

  // Calculate the total number of pages
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Get the current page's data
  const currentUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <div className='overflow-x-auto'>
        {admin == true && (
          <>
            <table className='table'>
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Make Admin</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
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
                              `https://edumng.vercel.app/api/users/${user._id}`,
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

            <div className='flex justify-center mt-4'>
              <button
                className='btn btn-sm'
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
              <span className='mx-2'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className='btn btn-sm'
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Users;
