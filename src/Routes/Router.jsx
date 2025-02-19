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
import Users from '../Pages/Users';
import Teacher from '../Pages/Teacher';
import MyApplyTeacher from './../Pages/MyApplyTeacher';
import UpdateClass from '../Pages/UpdateClass';
import MyClasses from '../Pages/MyClasses';
import Classes from '../Pages/classes';
// import MyClass from '../Pages/myClassTeacher';
import MyClassTeacher from '../Pages/myClassTeacher';
import MyClass from './../Pages/myClass';
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
            <div className='flex gap-4 md:flex-row flex-col'>
              <SideNav />
              <Dashboard />
            </div>
          }></Route>
        <Route
          path='/profile'
          element={
            <div className='flex gap-4 md:flex-row flex-col'>
              <SideNav />
              <Profile />
            </div>
          }></Route>
        <Route
          path='/appliedTeacher'
          element={
            <div className='flex gap-4 md:flex-row flex-col'>
              <SideNav />
              <MyApplyTeacher />
            </div>
          }></Route>
        <Route
          path='/myEnrolledClasses'
          element={
            <div className='flex gap-4 md:flex-row flex-col'>
              <SideNav />
              <MyEnrollClasses />
            </div>
          }></Route>
        <Route
          path='/users'
          element={
            <div className='flex gap-4 md:flex-row flex-col'>
              <SideNav />
              <Users />
            </div>
          }></Route>
        <Route
          path='/teachers'
          element={
            <div className='flex gap-4 md:flex-row flex-col'>
              <SideNav />
              <Teacher />
            </div>
          }></Route>
        <Route
          path='/allClasses'
          element={
            <div className='flex gap-4 md:flex-row flex-col'>
              <SideNav />
              <Classes />
            </div>
          }></Route>
        <Route
          path='/createClass'
          element={
            <div className='flex gap-4 md:flex-row flex-col'>
              <SideNav />
              <UpdateClass />
            </div>
          }></Route>
        <Route
          path='/updateClass/:id'
          element={
            <div className='flex gap-4 md:flex-row flex-col'>
              <SideNav />
              <UpdateClass isUpdate />
            </div>
          }></Route>
        <Route
          path='/myClass/:id'
          element={
            <div className='flex gap-4 md:flex-row flex-col'>
              <SideNav />
              <MyClass />
            </div>
          }></Route>
        <Route
          path='/myClassTeacher/:id'
          element={
            <div className='flex gap-4 md:flex-row flex-col'>
              <SideNav />
              <MyClassTeacher />
            </div>
          }></Route>
        <Route
          path='/myClasses'
          element={
            <div className='flex gap-4 md:flex-row flex-col'>
              <SideNav />
              <MyClasses />
            </div>
          }></Route>
      </Routes>
    </>
  );
}

export default Router;
