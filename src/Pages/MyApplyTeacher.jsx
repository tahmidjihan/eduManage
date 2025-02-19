import React, { useEffect } from 'react';
import { useAuth } from '../Routes/AuthProvider';
import { useUsers } from '../Routes/TanstackProvider';
import { useNavigate } from 'react-router';

function MyApplyTeacher() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, refetch } = useUsers(user?.email, {
    enabled: !!user?.email,
  });

  useEffect(() => {
    refetch(user?.email);
  }, [user?.email]);

  return (
    <div className='container mx-auto'>
      <div className='overflow-x-auto mx-auto'>
        <h1 className='text-5xl font-extrabold text-center my-10'>
          My Application for Teacher
        </h1>
        <table className='table'>
          {/* Table Head */}
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              <tr>
                <td>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle h-12 w-12'>
                        <img src={data.image} alt='User Avatar' />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>{data.name}</div>
                    </div>
                  </div>
                </td>
                <td>{data.name}</td>
                <td>{data.category}</td>
                <td>{data.level}</td>
                <td>{data.status}</td>
                <td>
                  {data.status === 'rejected' && (
                    <button
                      className='btn btn-primary btn-xs'
                      onClick={() => navigate('/beTeacher')}>
                      Retry
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan='6' className='text-center'>
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyApplyTeacher;
