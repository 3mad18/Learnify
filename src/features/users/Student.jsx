// src/Users/Student/Student.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthProvider";
import toast from 'react-hot-toast';
import { 
  BookOpen, 
  Award,
  Clock,
  TrendingUp,
  Calendar,
  DollarSign,
  Play,
  CheckCircle,
  Star,
  BarChart3,
  Users,
  Target
} from 'lucide-react';

import { Leaderboard, Badges, RecommendedCourses } from '../../components/common';
import recommendationService from '../../services/recommendationService';

const Student = () => {
  const { user } = React.useContext(AuthContext);
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    certificates: 0,
    averageGrade: 0,
    inProgress: 0
  });
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      
      // Fetch student statistics
      const statsResponse = await fetch(`https://course-management-system-server-woad.vercel.app/api/student/stats?email=${user.email}`);
      const statsData = await statsResponse.json();
      setStats(statsData);

      // Fetch enrolled courses
      const enrolledResponse = await fetch(`https://course-management-system-server-woad.vercel.app/api/student/enrolled-courses?email=${user.email}`);
      const enrolledData = await enrolledResponse.json();
      setEnrolledCourses(enrolledData);

      // Fetch completed courses
      const completedResponse = await fetch(`https://course-management-system-server-woad.vercel.app/api/student/completed-courses?email=${user.email}`);
      const completedData = await completedResponse.json();
      setCompletedCourses(completedData);

      // Fetch certificates
      const certificatesResponse = await fetch(`https://course-management-system-server-woad.vercel.app/api/student/certificates?email=${user.email}`);
      const certificatesData = await certificatesResponse.json();
      setCertificates(certificatesData);

    } catch (error) {
      console.error('Error fetching student data:', error);
      toast.error('Failed to load student data');
    } finally {
      setLoading(false);
    }
  };

  const handleCourseAction = async (courseId, action) => {
    try {
      const response = await fetch(`https://course-management-system-server-woad.vercel.app/api/student/courses/${courseId}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email })
      });

      if (response.ok) {
        toast.success(`Course ${action} successfully`);
        fetchStudentData();
      } else {
        throw new Error('Failed to perform action');
      }
    } catch {
      toast.error(`Failed to ${action} course`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Student Dashboard</h1>
          <p className="text-gray-400">Track your learning progress and achievements</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 border-b border-gray-700">
          {['overview', 'courses', 'progress', 'certificates'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Enrolled Courses</p>
                        <p className="text-3xl font-bold">{stats.enrolledCourses}</p>
                      </div>
                      <BookOpen className="w-8 h-8 text-blue-400" />
                    </div>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Completed Courses</p>
                        <p className="text-3xl font-bold">{stats.completedCourses}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Learning Hours</p>
                        <p className="text-3xl font-bold">{stats.totalHours}</p>
                      </div>
                      <Clock className="w-8 h-8 text-yellow-400" />
                    </div>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Certificates</p>
                        <p className="text-3xl font-bold">{stats.certificates}</p>
                      </div>
                      <Award className="w-8 h-8 text-purple-400" />
                    </div>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Average Grade</p>
                        <p className="text-3xl font-bold">{stats.averageGrade.toFixed(1)}%</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-teal-400" />
                    </div>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">In Progress</p>
                        <p className="text-3xl font-bold">{stats.inProgress}</p>
                      </div>
                      <Target className="w-8 h-8 text-orange-400" />
                    </div>
                  </div>
                </div>
                {/* Badges Section */}
                <Badges userEmail={user.email} />
                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Continue Learning */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700">
                    <div className="p-6 border-b border-gray-700">
                      <h2 className="text-xl font-semibold">Continue Learning</h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {enrolledCourses.filter(course => course.progress < 100).slice(0, 3).map((course) => (
                          <div key={course._id} className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-medium">{course.title}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="w-24 bg-gray-700 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full" 
                                    style={{ width: `${course.progress || 0}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-400">{course.progress || 0}%</span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleCourseAction(course._id, 'continue')}
                              className="p-2 text-blue-400 hover:bg-blue-900 rounded"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Recent Achievements */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700">
                    <div className="p-6 border-b border-gray-700">
                      <h2 className="text-xl font-semibold">Recent Achievements</h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {completedCourses.slice(0, 3).map((course) => (
                          <div key={course._id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              </div>
                              <div>
                                <p className="font-medium">{course.title}</p>
                                <p className="text-sm text-gray-400">Completed on {new Date(course.completedDate).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="text-sm text-gray-400">
                              Grade: {course.grade || 'N/A'}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recommended For You Section */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 mt-8">
                  <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">Recommended For You</h2>
                      <p className="text-sm text-gray-400 mt-1">Personalized based on your learning progress</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {recommendationService.getSampleRecommendations('mixed').recommendations.slice(0, 4).map(({ course, reason }) => (
                        <Link 
                          key={course.id} 
                          to={`/course/${course.id}`}
                          className="bg-gray-700 rounded-lg p-4 flex flex-col hover:bg-gray-600 transition-colors border border-gray-600 hover:border-cyan-500 group"
                        >
                          <div className="flex-shrink-0 mb-3">
                            <img 
                              src={course.image} 
                              alt={course.title}
                              className="w-full h-32 object-cover rounded group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <span className="text-xs font-medium text-purple-400 uppercase tracking-wide mb-1">
                            {course.category}
                          </span>
                          <h3 className="font-semibold text-white mb-2 line-clamp-2">{course.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-blue-900/50 text-blue-300 text-xs rounded-full">
                              {course.level}
                            </span>
                            <span className="text-xs text-gray-400">{course.rating} ★</span>
                          </div>
                          <p className="text-xs text-cyan-300 mt-auto">
                            {reason}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              // ...existing code for courses tab...
              <div className="bg-gray-800 rounded-lg border border-gray-700">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-xl font-semibold">My Courses</h2>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4">Course</th>
                          <th className="text-left py-3 px-4">Instructor</th>
                          <th className="text-left py-3 px-4">Progress</th>
                          <th className="text-left py-3 px-4">Grade</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enrolledCourses.map((course) => (
                          <tr key={course._id} className="border-b border-gray-700">
                            <td className="py-3 px-4">{course.title}</td>
                            <td className="py-3 px-4">{course.instructor}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-gray-700 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full" 
                                    style={{ width: `${course.progress || 0}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm">{course.progress || 0}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{course.grade || 'N/A'}%</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded text-xs ${
                                course.progress === 100 ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                              }`}>
                                {course.progress === 100 ? 'Completed' : 'In Progress'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button className="p-1 text-blue-400 hover:bg-blue-900 rounded">
                                  <Play className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:bg-gray-700 rounded">
                                  <BookOpen className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {/* Progress Tab */}
            {activeTab === 'progress' && (
              // ...existing code for progress tab...
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h2 className="text-xl font-semibold mb-6">Learning Progress</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-700 p-4 rounded">
                    <h3 className="text-lg font-medium mb-4">Weekly Activity</h3>
                    <div className="h-48 flex items-center justify-center text-gray-400">
                      Progress chart would go here
                    </div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded">
                    <h3 className="text-lg font-medium mb-4">Course Completion Rate</h3>
                    <div className="h-48 flex items-center justify-center text-gray-400">
                      Completion chart would go here
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              // ...existing code for certificates tab...
              <div className="bg-gray-800 rounded-lg border border-gray-700">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-xl font-semibold">My Certificates</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((certificate) => (
                      <div key={certificate._id} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                        <div className="flex items-center justify-center mb-4">
                          <Award className="w-16 h-16 text-yellow-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-center mb-2">{certificate.courseTitle}</h3>
                        <p className="text-gray-400 text-sm text-center mb-4">
                          Issued on {new Date(certificate.issuedDate).toLocaleDateString()}
                        </p>
                        <div className="flex space-x-2">
                          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                            View
                          </button>
                          <button className="flex-1 px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
