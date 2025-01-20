import React, { useEffect } from 'react';
import { useAuth } from '../Routes/AuthProvider';
import { useUsers } from '../Routes/TanstackProvider';
import { useNavigate } from 'react-router';

function MyApplyTeacher() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  //   const [apply, setApply] = React.useState([]);
  const { data, isPending, error, refetch } = useUsers(user?.email, {
    enabled: !!user?.email,
  });
  useEffect(() => {
    refetch(user?.email);
  }, [user?.email]);
  useEffect(() => {
    if (
      !data?.role == 'teacher' &&
      !data?.status == ('rejected' || 'pending')
    ) {
      return <p>you are not a teacher</p>;
    }
  });

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
          {data ? (
            <tr>
              <th>
                <figure className='avatar mask mask-squircle w-24 h-24'>
                  <img src={data.image} alt='' />
                </figure>
              </th>
              <td>{data.name}</td>
              <td>{data.category}</td>
              <td>{data.level}</td>
              <td>{data.status}</td>
              {data.status == 'rejected' && (
                <td>
                  <span
                    className='btn btn-primary'
                    onClick={() => navigate('/beTeacher')}>
                    retry for another
                  </span>
                </td>
              )}
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  );
}

export default MyApplyTeacher;
