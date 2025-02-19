import React, { useEffect, useState } from 'react';
import { useCourses } from '../Routes/TanstackProvider';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

function EnrollmentTrend() {
  const { data } = useCourses();
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const formattedData = data.map((item) => ({
        title: item.title,
        enrolled: item.enrolled, // Ensure "enrolled" exists in the API response
      }));
      setNewData(formattedData);
    }
  }, [data]);

  return (
    <div className='card flex-col-reverse bg-base-100 shadow-xl min-w-[70vw]'>
      <figure className='w-full h-full'>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={newData}>
            <XAxis dataKey='title' />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
            <Line
              type='monotone'
              dataKey='enrolled' // Fixed: Match with formatted state
              stroke='#8884d8'
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>Most Enrolled Courses</h2>
        <p>Courses with the highest number of enrollments.</p>
      </div>
    </div>
  );
}

export default EnrollmentTrend;
