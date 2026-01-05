import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBook } from 'react-icons/fi';
import EnrolledCourseCard from '../../components/common/EnrolledCourseCard';
import { navigations } from '../../utils/navigationConfig';

const sampleEnrolledCourses = [
  {
    id: '1',
    title: 'Web Development Fundamentals',
    image: 'https://via.placeholder.com/300x200?text=Web+Dev',
    progress: 42,
    lessonsCompleted: 5,
    totalLessons: 12,
    lastAccessed: '2 hours ago',
  },
  {
    id: '2',
    title: 'Python for Data Science',
    image: 'https://via.placeholder.com/300x200?text=Python+Data',
    progress: 75,
    lessonsCompleted: 9,
    totalLessons: 12,
    lastAccessed: '1 day ago',
  },
  {
    id: '3',
    title: 'React Native Mobile Development',
    image: 'https://via.placeholder.com/300x200?text=React+Native',
    progress: 15,
    lessonsCompleted: 3,
    totalLessons: 20,
    lastAccessed: '3 days ago',
  },
];

const MyEnrolledCourses = () => {
  const navigate = useNavigate();
  const [enrolledCourses] = useState(sampleEnrolledCourses);

  const handleContinue = (courseId) => {
    navigate(navigations.continueCourse(courseId));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="btn bg-gray-700 hover:bg-gray-600 text-white border-none btn-sm mb-8"
        >
          <FiArrowLeft className="mr-2" /> Back
        </button>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            My Enrolled Courses
          </h1>
          <div className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 flex items-center space-x-2 text-sm font-semibold">
            <FiBook className="text-cyan-400" />
            <span>{enrolledCourses.length} Enrolled</span>
          </div>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <EnrolledCourseCard
                key={course.id}
                course={course}
                onContinue={handleContinue}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
            <div className="max-w-md mx-auto">
              <FiBook className="text-7xl text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Your Learning Journey is Empty
              </h3>
              <p className="text-gray-400 mb-6">
                Enroll in a course to start learning.
              </p>
              <button
                onClick={() => navigate('/courses')}
                className="btn bg-cyan-600 hover:bg-cyan-700 text-white border-none"
              >
                Explore All Courses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEnrolledCourses;
