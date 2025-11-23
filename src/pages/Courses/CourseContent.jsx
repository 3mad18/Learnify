import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, CheckCircle, Circle, Book, Users, Clock, Award, FileText } from 'lucide-react';
import { useParams } from 'react-router-dom';

// Mock Data for Course Content
const mockCourseData = {
  id: 1,
  title: "Advanced React.js Development",
  description: "Master advanced React concepts including hooks, context API, state management, and performance optimization. Learn to build scalable, production-ready applications.",
  instructor: {
    name: "Ahmed Hassan",
    image: "https://i.pravatar.cc/150?img=1",
    bio: "Senior Frontend Engineer with 8+ years experience"
  },
  rating: 4.8,
  students: 12500,
  duration: "24 hours",
  level: "Advanced",
  prerequisites: [
    "Basic JavaScript knowledge",
    "Understanding of HTML & CSS",
    "Familiarity with ES6+ syntax",
    "Node.js and npm installation"
  ],
  requirements: [
    "A code editor (VS Code recommended)",
    "Latest version of Node.js",
    "Git installed for version control",
    "Basic command line knowledge"
  ],
  image: "https://images.unsplash.com/photo-1633356122544-f134ef2944f7?w=800",
  totalLessons: 32,
  completedLessons: 8,
  progress: 25,
  modules: [
    {
      id: 1,
      title: "Getting Started with Hooks",
      duration: "3h 45m",
      lessons: 6,
      completed: 3,
      collapsed: false,
      lessons_detail: [
        {
          id: 1,
          title: "Introduction to React Hooks",
          duration: "12m",
          isCompleted: true,
          type: "video"
        },
        {
          id: 2,
          title: "useState Hook Explained",
          duration: "28m",
          isCompleted: true,
          type: "video"
        },
        {
          id: 3,
          title: "useEffect Hook Deep Dive",
          duration: "32m",
          isCompleted: true,
          type: "video"
        },
        {
          id: 4,
          title: "Custom Hooks Creation",
          duration: "25m",
          isCompleted: false,
          type: "video"
        },
        {
          id: 5,
          title: "Hooks Best Practices",
          duration: "18m",
          isCompleted: false,
          type: "article"
        },
        {
          id: 6,
          title: "Quiz: Hooks Fundamentals",
          duration: "15m",
          isCompleted: false,
          type: "quiz"
        }
      ]
    },
    {
      id: 2,
      title: "Context API & State Management",
      duration: "5h 20m",
      lessons: 8,
      completed: 2,
      collapsed: true,
      lessons_detail: [
        {
          id: 1,
          title: "Understanding React Context",
          duration: "22m",
          isCompleted: true,
          type: "video"
        },
        {
          id: 2,
          title: "Creating Context Providers",
          duration: "28m",
          isCompleted: true,
          type: "video"
        },
        {
          id: 3,
          title: "useContext Hook",
          duration: "20m",
          isCompleted: false,
          type: "video"
        },
        {
          id: 4,
          title: "Avoiding Context Pitfalls",
          duration: "25m",
          isCompleted: false,
          type: "video"
        },
        {
          id: 5,
          title: "Intro to Redux",
          duration: "30m",
          isCompleted: false,
          type: "video"
        },
        {
          id: 6,
          title: "Redux with Hooks",
          duration: "28m",
          isCompleted: false,
          type: "video"
        },
        {
          id: 7,
          title: "State Management Patterns",
          duration: "24m",
          isCompleted: false,
          type: "article"
        },
        {
          id: 8,
          title: "Project: Build a Todo App with Context",
          duration: "45m",
          isCompleted: false,
          type: "project"
        }
      ]
    },
    {
      id: 3,
      title: "Performance Optimization",
      duration: "4h 15m",
      lessons: 7,
      completed: 2,
      collapsed: true,
      lessons_detail: [
        {
          id: 1,
          title: "React Performance Metrics",
          duration: "20m",
          isCompleted: true,
          type: "video"
        },
        {
          id: 2,
          title: "Memoization with useMemo & useCallback",
          duration: "32m",
          isCompleted: true,
          type: "video"
        },
        {
          id: 3,
          title: "Code Splitting & Lazy Loading",
          duration: "28m",
          isCompleted: false,
          type: "video"
        },
        {
          id: 4,
          title: "Virtual Scrolling",
          duration: "22m",
          isCompleted: false,
          type: "video"
        },
        {
          id: 5,
          title: "Bundle Size Optimization",
          duration: "25m",
          isCompleted: false,
          type: "article"
        },
        {
          id: 6,
          title: "DevTools & Profiling",
          duration: "20m",
          isCompleted: false,
          type: "video"
        },
        {
          id: 7,
          title: "Project: Optimize a Real App",
          duration: "48m",
          isCompleted: false,
          type: "project"
        }
      ]
    },
    {
      id: 4,
      title: "Advanced Patterns & Best Practices",
      duration: "6h 30m",
      lessons: 11,
      completed: 1,
      collapsed: true,
      lessons_detail: [
        {
          id: 1,
          title: "Render Props Pattern",
          duration: "24m",
          isCompleted: true,
          type: "video"
        },
        {
          id: 2,
          title: "Higher Order Components (HOC)",
          duration: "28m",
          isCompleted: false,
          type: "video"
        },
        {
          id: 3,
          title: "Compound Components",
          duration: "26m",
          isCompleted: false,
          type: "video"
        },
        {
          id: 4,
          title: "Error Boundaries",
          duration: "20m",
          isCompleted: false,
          type: "video"
        },
        {
          id: 5,
          title: "Suspense & Concurrent Features",
          duration: "30m",
          isCompleted: false,
          type: "video"
        },
        {
          id: 6,
          title: "Testing React Components",
          duration: "35m",
          isCompleted: false,
          type: "video"
        },
        {
          id: 7,
          title: "TypeScript with React",
          duration: "32m",
          isCompleted: false,
          type: "video"
        },
        {
          id: 8,
          title: "Documentation Best Practices",
          duration: "18m",
          isCompleted: false,
          type: "article"
        },
        {
          id: 9,
          title: "Code Review Guidelines",
          duration: "22m",
          isCompleted: false,
          type: "article"
        },
        {
          id: 10,
          title: "Capstone Project Part 1",
          duration: "60m",
          isCompleted: false,
          type: "project"
        },
        {
          id: 11,
          title: "Capstone Project Part 2",
          duration: "60m",
          isCompleted: false,
          type: "project"
        }
      ]
    }
  ]
};

const CourseContent = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(mockCourseData);
  const [expandedModules, setExpandedModules] = useState({});
  const [currentLesson, setCurrentLesson] = useState(null);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleStartCourse = () => {
    if (courseData.modules[0].lessons_detail[0]) {
      setCurrentLesson(courseData.modules[0].lessons_detail[0]);
    }
  };

  const handleResumeLesson = () => {
    // Find the next incomplete lesson
    for (let module of courseData.modules) {
      for (let lesson of module.lessons_detail) {
        if (!lesson.isCompleted) {
          setCurrentLesson(lesson);
          return;
        }
      }
    }
  };

  const handleMarkComplete = (moduleId, lessonId) => {
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? {
              ...module,
              lessons_detail: module.lessons_detail.map(lesson =>
                lesson.id === lessonId
                  ? { ...lesson, isCompleted: !lesson.isCompleted }
                  : lesson
              ),
              completed: module.lessons_detail.filter(l => 
                (l.id === lessonId ? !l.isCompleted : l.isCompleted)
              ).length
            }
          : module
      )
    }));
  };

  const getLessonIcon = (type) => {
    switch(type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'article':
        return <FileText className="w-4 h-4" />;
      case 'quiz':
        return <Award className="w-4 h-4" />;
      case 'project':
        return <Book className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{courseData.title}</h1>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                {courseData.description}
              </p>
              
              {/* Instructor Info */}
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={courseData.instructor.image} 
                  alt={courseData.instructor.name}
                  className="w-16 h-16 rounded-full border-2 border-blue-200"
                />
                <div>
                  <p className="font-semibold text-lg">{courseData.instructor.name}</p>
                  <p className="text-blue-100 text-sm">{courseData.instructor.bio}</p>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  <span className="font-semibold">{courseData.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">{courseData.students.toLocaleString()} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">{courseData.duration}</span>
                </div>
              </div>
            </div>

            {/* Course Image */}
            <div className="md:col-span-1">
              <img 
                src={courseData.image} 
                alt={courseData.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white border-b border-gray-200 py-6 px-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-gray-700 font-semibold">Course Progress</p>
              <p className="text-sm text-gray-500">{courseData.completedLessons} of {courseData.totalLessons} lessons completed</p>
            </div>
            <span className="text-2xl font-bold text-blue-600">{courseData.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${courseData.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Course Navigation */}
          <div className="lg:col-span-1">
            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleStartCourse}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
              >
                <Play className="w-5 h-5" />
                Start Course
              </button>
              
              <button
                onClick={handleResumeLesson}
                className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                <ChevronDown className="w-5 h-5" />
                Resume Lesson
              </button>

              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Mark Complete
              </button>
            </div>

            {/* Course Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Course Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">Level</p>
                  <p className="font-semibold text-gray-800">{courseData.level}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">Duration</p>
                  <p className="font-semibold text-gray-800">{courseData.duration}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">Lessons</p>
                  <p className="font-semibold text-gray-800">{courseData.totalLessons}</p>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Prerequisites</h3>
              <ul className="space-y-2">
                {courseData.prerequisites.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content - Modules List */}
          <div className="lg:col-span-3">
            {/* Requirements Section */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Requirements</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courseData.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modules Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {courseData.modules.map((module, moduleIdx) => (
                  <div key={module.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                    {/* Module Header */}
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-4 flex-1 text-left">
                        <div className="flex-shrink-0">
                          {expandedModules[module.id] ? (
                            <ChevronUp className="w-6 h-6 text-blue-600" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800 text-left">
                            {moduleIdx + 1}. {module.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {module.completed} of {module.lessons} lessons completed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        {/* Module Progress Bar */}
                        <div className="hidden sm:block w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full transition-all"
                            style={{ width: `${(module.completed / module.lessons) * 100}%` }}
                          />
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-700">{module.duration}</p>
                          <p className="text-xs text-gray-500">{module.lessons} lessons</p>
                        </div>
                      </div>
                    </button>

                    {/* Module Content - Lessons */}
                    {expandedModules[module.id] && (
                      <div className="border-t border-gray-200">
                        {module.lessons_detail.map((lesson, lessonIdx) => (
                          <div
                            key={lesson.id}
                            className="px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition cursor-pointer group"
                            onClick={() => setCurrentLesson(lesson)}
                          >
                            <div className="flex items-start gap-4">
                              {/* Lesson Icon & Checkbox */}
                              <div className="flex items-center gap-3 flex-shrink-0 mt-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMarkComplete(module.id, lesson.id);
                                  }}
                                  className="hover:scale-110 transition"
                                >
                                  {lesson.isCompleted ? (
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                  ) : (
                                    <Circle className="w-6 h-6 text-gray-300 group-hover:text-blue-400" />
                                  )}
                                </button>
                                <div className="text-blue-600 group-hover:text-blue-800">
                                  {getLessonIcon(lesson.type)}
                                </div>
                              </div>

                              {/* Lesson Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`font-semibold ${lesson.isCompleted ? 'text-gray-600 line-through' : 'text-gray-800'}`}>
                                    {lessonIdx + 1}. {lesson.title}
                                  </span>
                                  <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                                    {lesson.type}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Clock className="w-4 h-4" />
                                  <span>{lesson.duration}</span>
                                  {lesson.isCompleted && (
                                    <span className="ml-auto text-green-600 font-medium">Completed</span>
                                  )}
                                </div>
                              </div>

                              {/* Action Button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentLesson(lesson);
                                }}
                                className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition transform hover:scale-110"
                                title="Play lesson"
                              >
                                <Play className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Completion Info */}
            <div className="mt-8 bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg text-green-800 mb-2">Completion Benefits</h3>
                  <p className="text-green-700 text-sm">
                    Upon completing this course, you'll receive a certificate of completion and gain access to exclusive resources and community forums. You'll also be eligible for job opportunities with our partner companies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Lesson Modal/Panel */}
      {currentLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{currentLesson.title}</h3>
                <p className="text-blue-100 mt-2">Duration: {currentLesson.duration}</p>
              </div>
              <button
                onClick={() => setCurrentLesson(null)}
                className="text-white hover:bg-blue-700 p-2 rounded-lg transition"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              {/* Video Placeholder */}
              <div className="bg-gray-800 aspect-video rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-white mx-auto mb-4 opacity-50" />
                  <p className="text-white text-lg">Video Player</p>
                  <p className="text-gray-400 text-sm mt-2">(Ready for integration with video service)</p>
                </div>
              </div>

              {/* Lesson Description */}
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-800 mb-3">About this lesson</h4>
                <p className="text-gray-700 leading-relaxed">
                  In this {currentLesson.type}, you'll learn key concepts and practical implementation details. 
                  Pay close attention to the examples and feel free to pause and practice along the way.
                </p>
              </div>

              {/* Lesson Resources */}
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-800 mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                    <FileText className="w-5 h-5" />
                    <span>Lesson Notes (PDF)</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                    <FileText className="w-5 h-5" />
                    <span>Code Examples</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                    <FileText className="w-5 h-5" />
                    <span>Transcript</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    handleMarkComplete(
                      courseData.modules.find(m => 
                        m.lessons_detail.some(l => l.id === currentLesson.id)
                      ).id,
                      currentLesson.id
                    );
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Mark as Complete
                </button>
                <button
                  onClick={() => setCurrentLesson(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Star Icon Component (since it's not in lucide-react with fill)
const Star = ({ className, ...props }) => (
  <svg className={className} {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default CourseContent;
