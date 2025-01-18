import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
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
export function useIsUser(email) {
  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ['isUser'],

    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/isUser/${email}`,
        { headers: { authorization: `${localStorage.getItem('token')}` } }
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
