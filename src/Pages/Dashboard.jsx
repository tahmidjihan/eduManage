import React from 'react';
import EnrollmentTrend from './../Components/enrollmentTrend';
import { useAuth } from '../Routes/AuthProvider';
import { Link } from 'react-router';
import { useMyEnrolledCourses } from '../Routes/TanstackProvider';

function Dashboard() {
  const { user } = useAuth();
  const enrollCoursesRaw = useMyEnrolledCourses();
  const [enrollCourses, setEnrollCourses] = React.useState([]);

  React.useEffect(() => {
    if (enrollCoursesRaw.data) {
      setEnrollCourses(enrollCoursesRaw.data);
    }
  }, [enrollCoursesRaw.data]);
  // console.log(enrollCourses.length);
  return (
    <>
      <div className=' flex flex-col items-center'>
        <h1 className='text-5xl font-extrabold text-center my-10'>
          Welcome to EduManage Dashboard
        </h1>
        <div>
          <EnrollmentTrend />
        </div>
        <div className='flex flex-col items-center md:flex-row '>
          <div className='card lg:card-side bg-base-100 shadow-xl my-5 mx-auto md:mx-5'>
            <figure>
              <img
                src={user?.photoURL}
                className='p-8 rounded-full'
                alt='Album'
              />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>{user?.displayName}</h2>
              <p>{user?.email}</p>
              <div className='card-actions justify-end'>
                <Link to='/profile' className='btn btn-primary'>
                  Profile
                </Link>
              </div>
            </div>
          </div>
          <div className='card lg:card-side bg-base-100 shadow-xl my-5'>
            <div className='card-body'>
              <h2 className='card-title'>My enrolled classes</h2>
              <p>You currently enrolled {enrollCourses.length} classes</p>
              <div className='card-actions justify-end'>
                <Link to='/myEnrollClasses' className='btn btn-primary'>
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
