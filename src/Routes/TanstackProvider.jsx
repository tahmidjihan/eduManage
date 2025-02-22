import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useAuth } from './AuthProvider';
import axios from 'axios';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function TanstackCustomHooksProvider({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
export default TanstackCustomHooksProvider;
export function useCourses() {
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await fetch('https://edumng.vercel.app/api/courses');
      return response.json();
    },
  });

  return { data, isPending, error, status, refetch };
}
export function useCourse(id) {
  if (!id || id === '' || id === undefined)
    return { data: [], refetch: () => {} };
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const response = await fetch(
        `https://edumng.vercel.app/api/courses/${id}`,
        {
          headers: { authorization: `${localStorage.getItem('token')}` },
        }
      );
      return response.json();
    },
  });

  return { data, isPending, error, status, refetch };
}
export function useCoursesByEmail(email) {
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['courses', email],
    queryFn: async () => {
      const response = await fetch(
        `https://edumng.vercel.app/api/courses/email/${email}`,
        {
          headers: { authorization: `${localStorage.getItem('token')}` },
        }
      );
      return response.json();
    },
  });

  return { data, isPending, error, status, refetch };
}
export function useUsers(email) {
  if (!email) return;
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['users'],

    queryFn: async () => {
      const response = await fetch(
        `https://edumng.vercel.app/api/users?email=${email}`,
        {
          headers: { authorization: `${localStorage.getItem('token')}` },
        }
      );
      return response.json();
    },
  });

  return { data, isPending, error, status, refetch };
}
export function useAssignments(id) {
  if (!id || id === '' || id === undefined) {
    return { data: [], refetch: () => {} };
  }

  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['assignments'],
    queryFn: async () => {
      const response = await fetch(
        `https://edumng.vercel.app/api/assignments/course/${id}`,
        {
          headers: { authorization: `${localStorage.getItem('token')}` },
        }
      );
      // console.log('data hitted', id, response.json());
      return response.json();
    },
  });

  return { data, isPending, error, status, refetch };
}
export function useCourseStat(id) {
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['courseStat', id],
    queryFn: async () => {
      const response = await axios.get(
        `https://edumng.vercel.app/api/courses/stats/${id}`
      );
      return response.data; // Axios already parses JSON
    },
  });
  // console.log(data);
  return { stats: data, statsRefetch: refetch };
}

export function useAllUsers() {
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://edumng.vercel.app/api/users', {
        headers: { authorization: `${localStorage.getItem('token')}` },
      });
      return response.json();
    },
  });

  return { data, isPending, error, status, refetch };
}
export function useAdmin() {
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['admin'],
    queryFn: async () => {
      const response = await fetch(
        'https://edumng.vercel.app/api/users/admin',
        {
          headers: { authorization: `${localStorage.getItem('token')}` },
        }
      );
      return response.json();
    },
  });

  return { admin: data, refetchAdmin: refetch };
}
export function useTeachers() {
  const { data, refetch } = useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const response = await fetch(
        'https://edumng.vercel.app/api/users/teacher',
        {
          headers: { authorization: `${localStorage.getItem('token')}` },
        }
      );
      return response.json();
    },
  });
  // console.log(data);
  return { teachers: data, refetchTeacher: refetch };
}
export function useMyEnrolledCourses() {
  const { user } = useAuth();
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['myEnrolledCourses', user?.email],
    queryFn: async () => {
      const response = await fetch(
        `https://edumng.vercel.app/api/enrolled?email=${user?.email}`,
        {
          headers: { authorization: `${localStorage.getItem('token')}` },
        }
      );
      return response.json();
    },
  });

  return { data, isPending, error, status, refetch };
}

export function useFeedback() {
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['feedback'],
    queryFn: async () => {
      const response = await fetch('https://edumng.vercel.app/api/feedbacks');
      return response.json();
    },
  });

  return { data, isPending, error, status, refetch };
}
