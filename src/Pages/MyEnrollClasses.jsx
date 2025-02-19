import React, { useEffect } from 'react';
import { useMyEnrolledCourses } from '../Routes/TanstackProvider';
import { Link } from 'react-router';

function MyEnrollClasses() {
  const [classes, setClasses] = React.useState([]);
  const { data, refetch } = useMyEnrolledCourses();
  console.log(data);
  useEffect(() => {
    if (data) {
      setClasses(data);
    }
  }, [data]);
  return (
    <>
      <div className='container mx-auto'>
        <h1 className='text-5xl font-extrabold text-center my-10'>
          My Enroll Classes
        </h1>
        <div className='overflow-x-auto mx-auto'>
          <table className='table'>
            {/* head */}
            <thead>
              <tr>
                <th>Title</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls._id}>
                  <td>
                    <div className='flex items-center gap-3'>
                      <div className='avatar'>
                        <div className='mask mask-squircle h-12 w-12'>
                          <img
                            src={cls.courseImage}
                            alt='Avatar Tailwind CSS Component'
                          />
                        </div>
                      </div>
                      <div>
                        <div className='font-bold'>{cls.courseTitle}</div>
                      </div>
                    </div>
                  </td>
                  <td> by {cls.courseTitle}</td>
                  <th>
                    <Link
                      to={`/myClass/${cls.courseId}`}
                      className='btn btn-primary btn-xs'>
                      Continue
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MyEnrollClasses;
