/**
 * Example Integration File
 * 
 * This file shows how to integrate the CourseContent component
 * with your existing CourseDetails component
 * 
 * File: src/pages/Courses/CourseDetailsWithContent.jsx
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Enhanced CourseDetails with link to course content
 * 
 * Add this integration to your existing CourseDetails component
 */

// Example 1: In CourseDetails Component
export const CourseDetailsIntegration = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      {/* Your existing course details JSX */}
      
      {/* Add this button to navigate to course content */}
      <button
        onClick={() => navigate(`/course-content/${id}`)}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 shadow-lg text-lg"
      >
        View Course Content
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// Example 2: In MyEnrolledCourses Component
export const MyEnrolledCoursesIntegration = () => {
  const navigate = useNavigate();

  const enrolledCourses = [
    {
      id: 1,
      title: "Advanced React.js Development",
      progress: 25,
      image: "https://images.unsplash.com/photo-1633356122544-f134ef2944f7?w=400"
    },
    // ... more courses
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {enrolledCourses.map(course => (
        <div
          key={course.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
        >
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              {course.title}
            </h3>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-semibold text-blue-600">
                  {course.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate(`/course-content/${course.id}`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Continue Learning
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Example 3: Dashboard Integration
export const DashboardCourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/course-content/${course.id}`)}
    >
      <div className="flex items-start gap-4 mb-4">
        <img
          src={course.image}
          alt={course.title}
          className="w-16 h-16 rounded object-cover"
        />
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500">
            {course.instructor}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 text-center mb-4">
        <div>
          <p className="text-2xl font-bold text-blue-600">
            {course.completedLessons}/{course.totalLessons}
          </p>
          <p className="text-xs text-gray-500">Lessons</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">
            {course.progress}%
          </p>
          <p className="text-xs text-gray-500">Complete</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-orange-600">
            {course.hoursSpent}h
          </p>
          <p className="text-xs text-gray-500">Hours</p>
        </div>
      </div>

      {/* CTA Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition">
        Continue →
      </button>
    </div>
  );
};

// Example 4: Navigation Menu Integration
export const CourseMenu = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('enrolled');

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('enrolled')}
          className={`pb-2 font-semibold transition ${
            activeTab === 'enrolled'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          My Courses
        </button>
        <button
          onClick={() => setActiveTab('browse')}
          className={`pb-2 font-semibold transition ${
            activeTab === 'browse'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Browse Courses
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'enrolled' && (
        <div className="text-gray-600">
          Click on a course to view its content →
        </div>
      )}
    </div>
  );
};

// Example 5: Breadcrumb Navigation
export const CourseBreadcrumb = ({ courseTitle, currentPage = 'Content' }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      <button
        onClick={() => navigate('/')}
        className="text-blue-600 hover:text-blue-700 font-medium"
      >
        Home
      </button>
      <span className="text-gray-400">/</span>
      
      <button
        onClick={() => navigate('/my-enrolled-courses')}
        className="text-blue-600 hover:text-blue-700 font-medium"
      >
        My Courses
      </button>
      <span className="text-gray-400">/</span>
      
      <span className="text-gray-800 font-medium">{courseTitle}</span>
      <span className="text-gray-400">/</span>
      
      <span className="text-gray-600">{currentPage}</span>
    </nav>
  );
};

// Example 6: Quick Actions Menu
export const CourseQuickActions = ({ courseId }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
      >
        ⋮ More
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg z-10 min-w-48">
          <button
            onClick={() => {
              navigate(`/course-content/${courseId}`);
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg"
          >
            📚 View Course Content
          </button>
          <button
            onClick={() => {
              // Download resources
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            ⬇️ Download Resources
          </button>
          <button
            onClick={() => {
              // Share course
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 last:rounded-b-lg"
          >
            🔗 Share Course
          </button>
        </div>
      )}
    </div>
  );
};

// Example 7: API Integration Hook
export const useCourseData = (courseId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API call
        const response = await fetch(`/api/courses/${courseId}`);
        const courseData = await response.json();
        setData(courseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchData();
    }
  }, [courseId]);

  return { data, loading, error };
};

// Example 8: Notification Integration
export const CourseProgressNotification = ({ course, isShowing, onClose }) => {
  if (!isShowing) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-lg shadow-lg p-6 max-w-sm z-50">
      <h3 className="font-bold mb-2">Great Progress! 🎉</h3>
      <p className="text-sm mb-4">
        You've completed {course.progress}% of {course.title}
      </p>
      <button
        onClick={onClose}
        className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-2 px-4 rounded transition"
      >
        Continue Learning →
      </button>
    </div>
  );
};

// Example 9: Full Page Layout with Course Content
export const CoursePageLayout = ({ courseId }) => {
  const { data: course, loading } = useCourseData(courseId);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <CourseBreadcrumb courseTitle={course?.title} />
            <h1 className="text-3xl font-bold text-gray-800">{course?.title}</h1>
          </div>
          <CourseQuickActions courseId={courseId} />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Your CourseContent component would go here */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600">Course content would be displayed here</p>
        </div>
      </main>
    </div>
  );
};

// Example 10: Mobile Navigation for Course
export const MobileCourseNav = ({ courseId, currentPage }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-4 lg:hidden z-40">
      <button
        onClick={() => navigate(`/course-content/${courseId}`)}
        className={`flex flex-col items-center gap-1 ${
          currentPage === 'content'
            ? 'text-blue-600'
            : 'text-gray-600'
        }`}
      >
        <span className="text-xl">📚</span>
        <span className="text-xs font-medium">Content</span>
      </button>

      <button
        onClick={() => navigate(`/course-details/${courseId}`)}
        className={`flex flex-col items-center gap-1 ${
          currentPage === 'details'
            ? 'text-blue-600'
            : 'text-gray-600'
        }`}
      >
        <span className="text-xl">ℹ️</span>
        <span className="text-xs font-medium">Details</span>
      </button>

      <button
        className="flex flex-col items-center gap-1 text-gray-600"
      >
        <span className="text-xl">👥</span>
        <span className="text-xs font-medium">Community</span>
      </button>
    </div>
  );
};

export default {
  CourseDetailsIntegration,
  MyEnrolledCoursesIntegration,
  DashboardCourseCard,
  CourseMenu,
  CourseBreadcrumb,
  CourseQuickActions,
  useCourseData,
  CourseProgressNotification,
  CoursePageLayout,
  MobileCourseNav
};
