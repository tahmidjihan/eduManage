import React from 'react';
import { Route, Routes } from 'react-router';
import App from '../App';
import Home from '../Pages/HomePage';
import Layout from './Layout';
import Authentication from '../Pages/Authentication';
import Courses from '../Pages/Courses';
import Course from '../Pages/Course';
import Enroll from '../Pages/Enroll';
import BeTeacher from '../Pages/BeTeacher';
import Profile from '../Pages/Profile';
import Dashboard from '../Pages/Dashboard';
import SideNav from '../Components/SideNav';
import MyEnrollClasses from './../Pages/MyEnrollClasses';
function Router() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout children={<Home />} />}></Route>
        <Route
          path='/classes'
          element={<Layout children={<Courses />} />}></Route>

        <Route
          path='/beTeacher'
          element={<Layout children={<BeTeacher />} />}></Route>
        <Route
          path='/class/:id'
          element={<Layout children={<Course />} />}></Route>
        <Route
          path='/enroll/:id'
          element={<Layout children={<Enroll />} />}></Route>
        <Route
          path='/login'
          element={
            <Layout children={<Authentication isLogin={true} />} />
          }></Route>
        <Route
          path='/signup'
          element={
            <Layout children={<Authentication isLogin={false} />} />
          }></Route>
        <Route
          path='/dashboard'
          element={
            <Layout>
              <div className='flex gap-4 md:flex-row flex-col'>
                <SideNav />
                <Dashboard />
              </div>
            </Layout>
          }></Route>
        <Route
          path='/profile'
          element={
            <Layout>
              <div className='flex gap-4 md:flex-row flex-col'>
                <SideNav />
                <Profile />
              </div>
            </Layout>
          }></Route>
        <Route
          path='/myEnrolledClasses'
          element={
            <Layout>
              <div className='flex gap-4 md:flex-row flex-col'>
                <SideNav />
                <MyEnrollClasses />
              </div>
            </Layout>
          }></Route>
      </Routes>
    </>
  );
}

export default Router;
