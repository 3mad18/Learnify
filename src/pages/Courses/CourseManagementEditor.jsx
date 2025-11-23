import React, { useReducer, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Circle,
  Save,
  X,
  Clock,
  BookOpen,
  Users
} from 'lucide-react';

// ============================================
// COURSE DATA REDUCER
// ============================================

const initialCourseState = {
  id: null,
  title: 'Untitled Course',
  description: 'Add a description for your course',
  instructor: {
    name: 'Your Name',
    image: 'https://i.pravatar.cc/150?img=1'
  },
  totalStudents: 0,
  modules: []
};

const courseReducer = (state, action) => {
  switch (action.type) {
    // Update course basic info
    case 'UPDATE_COURSE_INFO':
      return {
        ...state,
        ...action.payload
      };

    // Add module
    case 'ADD_MODULE':
      return {
        ...state,
        modules: [
          ...state.modules,
          {
            id: Date.now(),
            title: 'New Module',
            description: '',
            lessons: [],
            completed: 0,
            expanded: true
          }
        ]
      };

    // Update module
    case 'UPDATE_MODULE':
      return {
        ...state,
        modules: state.modules.map(module =>
          module.id === action.payload.id
            ? { ...module, ...action.payload.data }
            : module
        )
      };

    // Delete module
    case 'DELETE_MODULE':
      return {
        ...state,
        modules: state.modules.filter(module => module.id !== action.payload)
      };

    // Toggle module expansion
    case 'TOGGLE_MODULE':
      return {
        ...state,
        modules: state.modules.map(module =>
          module.id === action.payload
            ? { ...module, expanded: !module.expanded }
            : module
        )
      };

    // Add lesson to module
    case 'ADD_LESSON':
      return {
        ...state,
        modules: state.modules.map(module =>
          module.id === action.payload.moduleId
            ? {
                ...module,
                lessons: [
                  ...module.lessons,
                  {
                    id: Date.now(),
                    title: 'New Lesson',
                    description: '',
                    duration: '10m',
                    isCompleted: false
                  }
                ]
              }
            : module
        )
      };

    // Update lesson
    case 'UPDATE_LESSON':
      return {
        ...state,
        modules: state.modules.map(module =>
          module.id === action.payload.moduleId
            ? {
                ...module,
                lessons: module.lessons.map(lesson =>
                  lesson.id === action.payload.lessonId
                    ? { ...lesson, ...action.payload.data }
                    : lesson
                )
              }
            : module
        )
      };

    // Delete lesson
    case 'DELETE_LESSON':
      return {
        ...state,
        modules: state.modules.map(module =>
          module.id === action.payload.moduleId
            ? {
                ...module,
                lessons: module.lessons.filter(
                  lesson => lesson.id !== action.payload.lessonId
                ),
                completed: module.lessons.filter(
                  lesson =>
                    lesson.id !== action.payload.lessonId && lesson.isCompleted
                ).length
              }
            : module
        )
      };

    // Toggle lesson completion
    case 'TOGGLE_LESSON_COMPLETION':
      return {
        ...state,
        modules: state.modules.map(module =>
          module.id === action.payload.moduleId
            ? {
                ...module,
                lessons: module.lessons.map(lesson =>
                  lesson.id === action.payload.lessonId
                    ? { ...lesson, isCompleted: !lesson.isCompleted }
                    : lesson
                ),
                completed: module.lessons.filter(
                  lesson =>
                    (lesson.id === action.payload.lessonId
                      ? !lesson.isCompleted
                      : lesson.isCompleted)
                ).length
              }
            : module
        )
      };

    // Reset course
    case 'RESET_COURSE':
      return initialCourseState;

    default:
      return state;
  }
};

// ============================================
// EDIT MODULE FORM COMPONENT
// ============================================

const EditModuleForm = ({ module, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: module.title,
    description: module.description
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Module Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter module title"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Module Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Enter module description"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onSave(formData)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// EDIT LESSON FORM COMPONENT
// ============================================

const EditLessonForm = ({ lesson, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: lesson.title,
    description: lesson.description,
    duration: lesson.duration
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-green-50 p-4 rounded-lg mb-3 border-l-4 border-green-500">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Lesson Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            placeholder="Enter lesson title"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm"
            placeholder="Enter lesson description"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Duration (e.g., 30m, 1h)
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            placeholder="10m"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onSave(formData)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-lg transition text-sm"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-3 rounded-lg transition text-sm"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// LESSON ITEM COMPONENT
// ============================================

const LessonItem = ({
  lesson,
  moduleId,
  dispatch,
  onEdit,
  editingLessonId,
  onSaveEdit,
  onCancelEdit
}) => {
  if (editingLessonId === lesson.id) {
    return (
      <EditLessonForm
        lesson={lesson}
        onSave={(data) => onSaveEdit(moduleId, lesson.id, data)}
        onCancel={onCancelEdit}
      />
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          {/* Completion Toggle */}
          <button
            onClick={() =>
              dispatch({
                type: 'TOGGLE_LESSON_COMPLETION',
                payload: { moduleId, lessonId: lesson.id }
              })
            }
            className="mt-1 hover:scale-110 transition"
          >
            {lesson.isCompleted ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {/* Lesson Info */}
          <div className="flex-1">
            <h4 className={`font-semibold text-sm ${
              lesson.isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'
            }`}>
              {lesson.title}
            </h4>
            {lesson.description && (
              <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
            )}
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {lesson.duration}
              </span>
              {lesson.isCompleted && (
                <span className="text-green-600 font-semibold">✓ Completed</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(lesson.id)}
            className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition"
            title="Edit lesson"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              dispatch({
                type: 'DELETE_LESSON',
                payload: { moduleId, lessonId: lesson.id }
              })
            }
            className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition"
            title="Delete lesson"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MODULE COMPONENT
// ============================================

const ModuleItem = ({
  module,
  dispatch,
  onEditModule,
  onEditLesson,
  editingModuleId,
  editingLessonId,
  onSaveModuleEdit,
  onCancelModuleEdit,
  onSaveLessonEdit,
  onCancelLessonEdit
}) => {
  if (editingModuleId === module.id) {
    return (
      <EditModuleForm
        module={module}
        onSave={(data) => onSaveModuleEdit(module.id, data)}
        onCancel={onCancelModuleEdit}
      />
    );
  }

  const moduleProgress =
    module.lessons.length > 0
      ? Math.round((module.completed / module.lessons.length) * 100)
      : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden mb-6">
      {/* Module Header */}
      <button
        onClick={() => dispatch({ type: 'TOGGLE_MODULE', payload: module.id })}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-4 flex-1 text-left">
          {module.expanded ? (
            <ChevronUp className="w-5 h-5 text-blue-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800">{module.title}</h3>
            {module.description && (
              <p className="text-sm text-gray-600 mt-1">{module.description}</p>
            )}
          </div>
        </div>

        {/* Module Stats */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-700">
              {module.completed}/{module.lessons.length} lessons
            </p>
            <div className="w-24 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all"
                style={{ width: `${moduleProgress}%` }}
              />
            </div>
          </div>
        </div>
      </button>

      {/* Module Content */}
      {module.expanded && (
        <div className="border-t border-gray-200 px-6 py-5 bg-gray-50">
          {/* Add Lesson Button */}
          <button
            onClick={() => dispatch({ type: 'ADD_LESSON', payload: { moduleId: module.id } })}
            className="flex items-center gap-2 mb-5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Add Lesson
          </button>

          {/* Lessons List */}
          {module.lessons.length > 0 ? (
            <div>
              {module.lessons.map(lesson => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  moduleId={module.id}
                  dispatch={dispatch}
                  onEdit={onEditLesson}
                  editingLessonId={editingLessonId}
                  onSaveEdit={onSaveLessonEdit}
                  onCancelEdit={onCancelLessonEdit}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center py-8">
              No lessons yet. Add one to get started!
            </p>
          )}

          {/* Module Actions */}
          <div className="flex gap-2 mt-5 pt-5 border-t border-gray-200">
            <button
              onClick={() => onEditModule(module.id)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              <Edit2 className="w-4 h-4" />
              Edit Module
            </button>
            <button
              onClick={() => dispatch({ type: 'DELETE_MODULE', payload: module.id })}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
            >
              <Trash2 className="w-4 h-4" />
              Delete Module
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const CourseManagementEditor = () => {
  const [courseData, dispatch] = useReducer(courseReducer, initialCourseState);
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [editingCourseInfo, setEditingCourseInfo] = useState(false);
  const [courseInfoForm, setCourseInfoForm] = useState({
    title: courseData.title,
    description: courseData.description,
    instructor: courseData.instructor.name
  });

  // Calculate total progress
  const totalLessons = courseData.modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );

  const completedLessons = courseData.modules.reduce(
    (sum, module) => sum + module.completed,
    0
  );

  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Handle course info edit
  const handleEditCourseInfo = () => {
    setCourseInfoForm({
      title: courseData.title,
      description: courseData.description,
      instructor: courseData.instructor.name
    });
    setEditingCourseInfo(true);
  };

  const handleSaveCourseInfo = () => {
    dispatch({
      type: 'UPDATE_COURSE_INFO',
      payload: {
        title: courseInfoForm.title,
        description: courseInfoForm.description,
        instructor: {
          ...courseData.instructor,
          name: courseInfoForm.instructor
        }
      }
    });
    setEditingCourseInfo(false);
  };

  const handleCancelCourseInfo = () => {
    setEditingCourseInfo(false);
  };

  const handleModuleEdit = (moduleId) => {
    setEditingModuleId(moduleId);
  };

  const handleSaveModuleEdit = (moduleId, data) => {
    dispatch({
      type: 'UPDATE_MODULE',
      payload: { id: moduleId, data }
    });
    setEditingModuleId(null);
  };

  const handleCancelModuleEdit = () => {
    setEditingModuleId(null);
  };

  const handleLessonEdit = (lessonId) => {
    setEditingLessonId(lessonId);
  };

  const handleSaveLessonEdit = (moduleId, lessonId, data) => {
    dispatch({
      type: 'UPDATE_LESSON',
      payload: { moduleId, lessonId, data }
    });
    setEditingLessonId(null);
  };

  const handleCancelLessonEdit = () => {
    setEditingLessonId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {editingCourseInfo ? (
            // Edit Mode
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6">Edit Course Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Course Title</label>
                  <input
                    type="text"
                    value={courseInfoForm.title}
                    onChange={(e) =>
                      setCourseInfoForm({ ...courseInfoForm, title: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Enter course title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Course Description
                  </label>
                  <textarea
                    value={courseInfoForm.description}
                    onChange={(e) =>
                      setCourseInfoForm({ ...courseInfoForm, description: e.target.value })
                    }
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                    placeholder="Enter course description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Instructor Name</label>
                  <input
                    type="text"
                    value={courseInfoForm.instructor}
                    onChange={(e) =>
                      setCourseInfoForm({ ...courseInfoForm, instructor: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Enter instructor name"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSaveCourseInfo}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelCourseInfo}
                    className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // View Mode
            <>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold mb-3">{courseData.title}</h1>
                  <p className="text-blue-100 text-lg mb-4">{courseData.description}</p>
                  <p className="text-blue-100">
                    <span className="font-semibold">Instructor:</span> {courseData.instructor.name}
                  </p>
                </div>
                <button
                  onClick={handleEditCourseInfo}
                  className="flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 font-semibold py-2 px-6 rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Course
                </button>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-blue-100 text-sm mb-1">Total Lessons</p>
                  <p className="text-3xl font-bold">{totalLessons}</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-blue-100 text-sm mb-1">Completed</p>
                  <p className="text-3xl font-bold">
                    {completedLessons}/{totalLessons}
                  </p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-blue-100 text-sm mb-1">Overall Progress</p>
                  <p className="text-3xl font-bold">{overallProgress}%</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 py-6 px-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-700 font-semibold">Course Progress</p>
            <span className="text-2xl font-bold text-blue-600">{overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Add Module Button */}
        <button
          onClick={() => dispatch({ type: 'ADD_MODULE' })}
          className="flex items-center gap-2 mb-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition transform hover:scale-105 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add New Module
        </button>

        {/* Modules List */}
        {courseData.modules.length > 0 ? (
          <div>
            {courseData.modules.map(module => (
              <ModuleItem
                key={module.id}
                module={module}
                dispatch={dispatch}
                onEditModule={handleModuleEdit}
                onEditLesson={handleLessonEdit}
                editingModuleId={editingModuleId}
                editingLessonId={editingLessonId}
                onSaveModuleEdit={handleSaveModuleEdit}
                onCancelModuleEdit={handleCancelModuleEdit}
                onSaveLessonEdit={handleSaveLessonEdit}
                onCancelLessonEdit={handleCancelLessonEdit}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">No modules yet. Create your first module to get started!</p>
            <button
              onClick={() => dispatch({ type: 'ADD_MODULE' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              <Plus className="w-5 h-5" />
              Create First Module
            </button>
          </div>
        )}

        {/* Export Data Section */}
        {courseData.modules.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-gray-700 mb-2">Total Modules: {courseData.modules.length}</p>
                <p className="font-semibold text-gray-700 mb-2">Total Lessons: {totalLessons}</p>
                <p className="font-semibold text-gray-700 mb-2">
                  Completed Lessons: {completedLessons}/{totalLessons}
                </p>
              </div>
              <div>
                <button
                  onClick={() => {
                    const dataStr = JSON.stringify(courseData, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${courseData.title.replace(/\s+/g, '_')}_course_data.json`;
                    link.click();
                  }}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
                >
                  Export Course Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManagementEditor;
