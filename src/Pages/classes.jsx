import React, { useEffect } from 'react';
import { useCourses } from '../Routes/TanstackProvider';
import { useAuth } from '../Routes/AuthProvider';
import { useNavigate } from 'react-router';

function Classes() {
  const { isAdmin } = useAuth();
  const { data } = useCourses();
  const navigate = useNavigate();

  const admin = isAdmin();
  useEffect(() => {
    if (admin == false) {
      navigate('/login');
    }
  }, [admin]);
  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.map((cls) => (
              <tr key={cls._id}>
                <td>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle h-12 w-12'>
                        <img
                          src={cls.image}
                          alt='Avatar Tailwind CSS Component'
                        />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>{cls.title}</div>
                    </div>
                  </div>
                </td>
                <td>by {cls.name}</td>

                <th>
                  <button
                    onClick={() => {
                      if (cls.status == 'pending') {
                        cls.status = 'approved';
                      }
                    }}
                    className='btn btn-info btn-xs'>
                    {cls.status == 'pending' ? 'approve' : 'approved'}
                  </button>
                  {cls.status == 'pending' && (
                    <button
                      onClick={() => {
                        if (cls.status == 'pending') {
                          cls.status = 'reject';
                        }
                      }}
                      className='btn btn-error btn-xs'>
                      reject
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Classes;
