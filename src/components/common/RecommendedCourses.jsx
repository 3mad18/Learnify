import React, { useEffect, useState } from 'react';

const RecommendedCourses = ({ userEmail }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userEmail) return;
    // Replace with your actual API endpoint
    fetch(`https://course-management-system-server-woad.vercel.app/api/student/recommended-courses?email=${userEmail}`)
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userEmail]);

  if (loading) return <div className="text-gray-400">Loading recommendations...</div>;
  if (!courses.length) return <div className="text-gray-400">No recommendations at this time.</div>;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mt-8">
      <h2 className="text-lg font-semibold mb-4 text-green-400">Recommended Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course._id} className="bg-gray-700 rounded p-3 flex flex-col">
            <span className="font-medium text-white mb-1">{course.title}</span>
            <span className="text-xs text-gray-400 mb-2">{course.instructor}</span>
            <a href={`/courses/${course._id}`} className="text-blue-400 hover:underline text-sm">View Course</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;
