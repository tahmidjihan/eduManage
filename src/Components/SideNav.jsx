import React, { useEffect } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiBookOpen, HiChartPie, HiUser, HiUsers } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router';
import { useUsers } from '../Routes/TanstackProvider';
import { useAuth } from '../Routes/AuthProvider';
import { set } from 'react-hook-form';
function SideNav() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  // console.log(isAdmin());

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user]);
  function AdminMenu() {
    return (
      <>
        <Sidebar.Item
          onClick={() => {
            navigate('/users');
          }}
          href='#'
          icon={HiUsers}>
          Users
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

          <Sidebar.Item
            onClick={() => {
              navigate('/profile');
            }}
            icon={HiUser}>
            Profile
          </Sidebar.Item>
          <Sidebar.Item
            onClick={() => {
              navigate('/myEnrolledClasses');
            }}
            icon={HiBookOpen}>
            My Enroll Classes
          </Sidebar.Item>
          {isAdmin && <AdminMenu />}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideNav;
