import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../Routes/AuthProvider';
import { useAllUsers, useUsers } from '../Routes/TanstackProvider';
import { set } from 'react-hook-form';

function Users() {
  const [stat, setStat] = React.useState('loading..');
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  //   console.log(isAdmin());
  const { data, isPending, error, refetch } = useAllUsers();
  useEffect(() => {
    if (Array.isArray(data)) {
      //   console.log(data);
      setUsers(data);
    }
  }, [data]);
  const admin = isAdmin();

  useEffect(() => {
    if (admin === false) {
      return;
    }
  });
  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
