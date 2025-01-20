import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useAuth } from './AuthProvider';
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
      const response = await fetch('http://localhost:3000/api/courses');
      return response.json();
    },
  });

  return { data, isPending, error, status, refetch };
}
export function useCourse(id) {
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/courses/${id}`, {
        headers: { authorization: `${localStorage.getItem('token')}` },
      });
      return response.json();
    },
  });

  return { data, isPending, error, status, refetch };
}
export function useUsers(email) {
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['users'],

    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/users?email=${email}`,
        {
          headers: { authorization: `${localStorage.getItem('token')}` },
        }
      );
      return response.json();
    },
  });

  return { data, isPending, error, status, refetch };
}
export function useAllUsers() {
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/users', {
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
      const response = await fetch('http://localhost:3000/api/users/admin', {
        headers: { authorization: `${localStorage.getItem('token')}` },
      });
      return response.json();
    },
  });

  return { admin: data, refetchAdmin: refetch };
}
export function useTeachers() {
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/users/teacher', {
        headers: { authorization: `${localStorage.getItem('token')}` },
      });
      return response.json();
    },
  });

  return { data, isPending, error, status, refetch };
}
export function useMyEnrolledCourses() {
  const { user } = useAuth();
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['myEnrolledCourses', user?.email],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/enrolled?email=${user?.email}`,
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
      const response = await fetch('http://localhost:3000/api/feedbacks');
      return response.json();
    },
  });

  return { data, isPending, error, status, refetch };
}
