import React, { useEffect } from 'react';
import { Sidebar } from 'flowbite-react';
import {
  HiBookOpen,
  HiChartPie,
  HiIdentification,
  HiPencilAlt,
  HiPlusCircle,
  HiUser,
  HiUsers,
} from 'react-icons/hi';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../Routes/AuthProvider';
import Teacher from './../Pages/Teacher';

function SideNav() {
  const navigate = useNavigate();
  const { user, isAdmin, isTeachers } = useAuth();
  // console.log(isAdmin());
  const admin = isAdmin();
  const teacher = isTeachers();

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user]);

  function AdminMenu() {
    return (
      <>
        <h3 className='text-white text-xl my-2 font-bold'>Admin</h3>
        <Sidebar.Item
          onClick={() => {
            navigate('/users');
          }}
          href='#'
          icon={HiUsers}>
          Users
        </Sidebar.Item>
        <Sidebar.Item
          onClick={() => {
            navigate('/teachers');
          }}
          href='#'
          icon={HiIdentification}>
          Teacher
        </Sidebar.Item>
      </>
    );
  }
  function StudentMenu() {
    return (
      <>
        <Sidebar.Item
          onClick={() => {
            navigate('/myEnrolledClasses');
          }}
          icon={HiBookOpen}>
          My Enroll Classes
        </Sidebar.Item>
        <Sidebar.Item
          onClick={() => {
            navigate('/appliedTeacher');
          }}
          icon={HiPencilAlt}>
          My Apply Teacher
        </Sidebar.Item>
      </>
    );
  }
  function TeacherMenu() {
    // console.log(teacher);
    if (!teacher) {
      return;
    }
    return (
      <>
        <h3 className='text-white text-xl my-2 font-bold'>Teacher</h3>

        <Sidebar.Item
          onClick={() => {
            navigate('/myClasses');
          }}
          icon={HiBookOpen}>
          My Classes
        </Sidebar.Item>
        <Sidebar.Item
          onClick={() => {
            navigate('/createClass');
          }}
          icon={HiPlusCircle}>
          Add Class
        </Sidebar.Item>
      </>
    );
  }

  return (
    <Sidebar
      aria-label='Default sidebar example'
      className='w-screen md:w-64 md:h-screen'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            onClick={() => {
              navigate('/dashboard');
            }}
            href='#'
            icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          {!isTeachers ? <StudentMenu /> : ''}
          {isTeachers ? <TeacherMenu /> : ''}
          <Sidebar.Item
            onClick={() => {
              navigate('/profile');
            }}
            icon={HiUser}>
            Profile
          </Sidebar.Item>

          {admin == true ? <AdminMenu /> : ''}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideNav;
