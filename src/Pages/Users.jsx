import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../Routes/AuthProvider';
import { useAllUsers, useUsers } from '../Routes/TanstackProvider';
import { set } from 'react-hook-form';

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
