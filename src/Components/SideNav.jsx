import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiUser } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router';
function SideNav() {
  const navigate = useNavigate();
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
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideNav;
