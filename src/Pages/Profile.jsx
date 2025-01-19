import React, { useEffect } from 'react';
import { useAuth } from './../Routes/AuthProvider';
import { useUsers } from '../Routes/TanstackProvider';

function Profile() {
  const { user, logout } = useAuth();
  // const [data, setData] = React.useState([]);
  // const data = [];
  const { data, isPending, error, refetch } = useUsers(user?.email, {
    enabled: !!user?.email,
  });
  useEffect(() => {
    refetch();
  }, [user?.email]);
  return (
    <>
      <div className='container mx-auto'>
        <div className='my-10 flex flex-col items-center max-w-xl mx-auto p-10 bg-base-300 '>
          <figure className='mask mask-squircle w-80 h-80'>
            <img src={data?.image} alt='' className='w-[688px]' />
          </figure>
          <div className='flex flex-col gap-5 max-w-3xl my-10'>
            <h1 className='font-extrabold text-5xl'>{data?.name}</h1>
            <span className='font-bold text-gray-500'>
              Email: {data?.email}
            </span>
            <span className='badge badge-primary'>Role {data?.role}</span>
            <p>{data?.description}</p>
            <span className='font-bold'>Phone: {data?.phone || 'N/A'}</span>
            <button className='btn btn-error' onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
