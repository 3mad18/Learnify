import React, { useMemo, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Activity,
  BookOpen,
  Edit,
  Mail,
  Plus,
  Trash2,
  Users,
} from 'lucide-react';
import { AuthContext } from '../../context/AuthProvider';
import { navigations } from '../../utils/navigationConfig';

const sampleInstructorData = {
  overview: {
    stats: {
      totalStudents: 45,
      activeCourses: 3,
      avgGrade: 78,
      completionRate: 72,
    },
    recentActivity: [
      { user: 'Ahmed Khan', action: 'Enrolled', course: 'Web Dev', time: '2 hours ago' },
      { user: 'Fatima Ali', action: 'Completed', course: 'Python', time: 'Yesterday' },
      { user: 'Omar Hassan', action: 'Started', course: 'React', time: '2 days ago' },
    ],
  },

  courses: [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      students: 45,
      avgGrade: 85,
      completion: 90,
      lastUpdated: '2024-01-15',
      status: 'Active',
    },
    {
      id: 2,
      title: 'Python Basics',
      students: 32,
      avgGrade: 72,
      completion: 80,
      lastUpdated: '2024-01-12',
      status: 'Active',
    },
    {
      id: 3,
      title: 'React Advanced',
      students: 28,
      avgGrade: 78,
      completion: 75,
      lastUpdated: '2024-01-10',
      status: 'Active',
    },
  ],

  students: [
    {
      id: 1,
      name: 'Ahmed Khan',
      email: 'ahmed@email.com',
      enrolledCourses: 3,
      avgGrade: 85,
      completion: 90,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Fatima Ali',
      email: 'fatima@email.com',
      enrolledCourses: 2,
      avgGrade: 72,
      completion: 80,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Omar Hassan',
      email: 'omar@email.com',
      enrolledCourses: 3,
      avgGrade: 45,
      completion: 30,
      status: 'At Risk',
    },
    {
      id: 4,
      name: 'Zainab Ahmed',
      email: 'zainab@email.com',
      enrolledCourses: 1,
      avgGrade: 55,
      completion: 50,
      status: 'At Risk',
    },
  ],
};

const StatCard = ({ title, value, icon, accentClass }) => (
  <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 hover:border-cyan-600 transition">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`p-3 rounded-lg bg-gray-700 ${accentClass}`}>
        {React.createElement(icon, { className: 'w-6 h-6' })}
      </div>
    </div>
  </div>
);

const Instructor = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState(sampleInstructorData.courses);
  const [students] = useState(sampleInstructorData.students);

  const stats = sampleInstructorData.overview.stats;
  const recentActivity = sampleInstructorData.overview.recentActivity;

  const statusBadgeClass = useMemo(
    () => (status) => {
      if (status === 'Active') return 'bg-green-900/40 text-green-300 border border-green-800';
      if (status === 'At Risk') return 'bg-red-900/40 text-red-300 border border-red-800';
      return 'bg-gray-700 text-gray-200 border border-gray-600';
    },
    []
  );

  const handleEditCourse = (courseId) => {
    navigate(navigations.editCourse(courseId));
  };

  const handleDeleteCourse = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    const ok = window.confirm(`Delete course "${course?.title ?? ''}"?`);
    if (!ok) return;

    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    toast.success('Course deleted');
  };

  const handleContactStudent = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Instructor Dashboard</h1>
            <p className="text-gray-400">
              Welcome, {user?.displayName || user?.email?.split('@')[0] || 'Instructor'}
            </p>
          </div>

          <Link
            to="/add-course"
            className="btn bg-cyan-600 hover:bg-cyan-700 text-white border-none"
          >
            <Plus className="w-4 h-4" />
            Add Course
          </Link>
        </div>

        <div className="flex space-x-1 mb-8 border-b border-gray-700 overflow-x-auto">
          {['overview', 'courses', 'students'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard
                title="Total Students"
                value={stats.totalStudents}
                icon={Users}
                accentClass="text-cyan-400"
              />
              <StatCard
                title="Active Courses"
                value={stats.activeCourses}
                icon={BookOpen}
                accentClass="text-blue-400"
              />
              <StatCard
                title="Avg Grade"
                value={`${stats.avgGrade}%`}
                icon={Activity}
                accentClass="text-green-400"
              />
              <StatCard
                title="Completion Rate"
                value={`${stats.completionRate}%`}
                icon={Activity}
                accentClass="text-purple-400"
              />
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
              <h3 className="text-lg font-bold mb-4 text-white">Recent Activity</h3>
              <div className="space-y-2">
                {recentActivity.map((a, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-900/30 border border-gray-700 rounded-lg p-3"
                  >
                    <div className="text-sm">
                      <span className="text-white font-semibold">{a.user}</span>{' '}
                      <span className="text-gray-300">{a.action}</span>{' '}
                      <span className="text-cyan-300">{a.course}</span>
                    </div>
                    <span className="text-xs text-gray-400">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('courses')}
                className="btn bg-gray-700 hover:bg-gray-600 text-white border-none"
              >
                View Courses
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className="btn bg-gray-700 hover:bg-gray-600 text-white border-none"
              >
                View Students
              </button>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Courses</h2>
              <Link
                to="/add-course"
                className="btn bg-cyan-600 hover:bg-cyan-700 text-white border-none btn-sm"
              >
                <Plus className="w-4 h-4" />
                Add New
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-compact w-full text-white">
                <thead className="bg-gray-700 border-b border-gray-600">
                  <tr>
                    <th className="text-left text-gray-300">Course Title</th>
                    <th className="text-left text-gray-300">Students</th>
                    <th className="text-left text-gray-300">Avg Grade</th>
                    <th className="text-left text-gray-300">Completion</th>
                    <th className="text-left text-gray-300">Status</th>
                    <th className="text-left text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800">
                  {courses.map((course) => (
                    <tr
                      key={course.id}
                      className="border-b border-gray-700 hover:bg-gray-750"
                    >
                      <td className="font-medium">{course.title}</td>
                      <td>{course.students}</td>
                      <td>{course.avgGrade}%</td>
                      <td>{course.completion}%</td>
                      <td>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(course.status)}`}>
                          {course.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleEditCourse(course.id)}
                            className="btn bg-gray-700 hover:bg-gray-600 text-white border-none btn-sm"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="btn bg-red-600 hover:bg-red-700 text-white border-none btn-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h2 className="text-xl font-semibold mb-4">Students</h2>

            <div className="overflow-x-auto">
              <table className="table table-compact w-full text-white">
                <thead className="bg-gray-700 border-b border-gray-600">
                  <tr>
                    <th className="text-left text-gray-300">Name</th>
                    <th className="text-left text-gray-300">Email</th>
                    <th className="text-left text-gray-300">Courses</th>
                    <th className="text-left text-gray-300">Avg Grade</th>
                    <th className="text-left text-gray-300">Status</th>
                    <th className="text-left text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800">
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-gray-700 hover:bg-gray-750"
                    >
                      <td className="font-medium">{student.name}</td>
                      <td className="text-gray-300">{student.email}</td>
                      <td>{student.enrolledCourses}</td>
                      <td>{student.avgGrade}%</td>
                      <td>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(student.status)}`}>
                          {student.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => toast('Student profile page not implemented yet')}
                            className="btn bg-gray-700 hover:bg-gray-600 text-white border-none btn-sm"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleContactStudent(student.email)}
                            className="btn bg-green-600 hover:bg-green-700 text-white border-none btn-sm"
                          >
                            <Mail className="w-4 h-4" />
                            Contact
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructor;
