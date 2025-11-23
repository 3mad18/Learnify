/**
 * Course Management Editor - Integration Examples & Patterns
 * 
 * This file provides 10+ integration examples and patterns
 * for using the CourseManagementEditor component
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CourseProvider,
  useCourse,
  courseActions,
  courseUtils
} from '../../context/CourseContext';
import axiosSecure from '../../api/axiosSecure';

// ============================================
// EXAMPLE 1: Basic Component Wrapper
// ============================================
export const CourseManagementPage = () => {
  return (
    <CourseProvider>
      <div>
        <CourseManagementWithContext />
      </div>
    </CourseProvider>
  );
};

// ============================================
// EXAMPLE 2: Component Using Context Hooks
// ============================================
export const CourseManagementWithContext = () => {
  const { courseData, dispatch } = useCourse();

  const handleAddModule = () => {
    dispatch(courseActions.addModule());
  };

  return (
    <div className="p-6">
      <h1>{courseData.title}</h1>
      <button onClick={handleAddModule}>Add Module</button>
    </div>
  );
};

// ============================================
// EXAMPLE 3: Backend Integration Hook
// ============================================
export const useCourseAPI = (courseId) => {
  const { dispatch } = useCourse();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch course from backend
  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(`/api/courses/${courseId}`);
      dispatch(courseActions.loadCourse(response.data));
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch course:', err);
    } finally {
      setLoading(false);
    }
  };

  // Save course to backend
  const saveCourse = async (courseData) => {
    try {
      setLoading(true);
      const response = await axiosSecure.post(
        `/api/courses/${courseId}/save`,
        courseData
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Failed to save course:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Save module
  const saveModule = async (moduleId, moduleData) => {
    try {
      const response = await axiosSecure.post(
        `/api/courses/${courseId}/modules/${moduleId}`,
        moduleData
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete module
  const deleteModule = async (moduleId) => {
    try {
      await axiosSecure.delete(
        `/api/courses/${courseId}/modules/${moduleId}`
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Save lesson
  const saveLesson = async (moduleId, lessonId, lessonData) => {
    try {
      const response = await axiosSecure.post(
        `/api/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
        lessonData
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    fetchCourse,
    saveCourse,
    saveModule,
    deleteModule,
    saveLesson,
    loading,
    error
  };
};

// ============================================
// EXAMPLE 4: Component with Auto-Save
// ============================================
export const CourseManagementWithAutoSave = ({ courseId }) => {
  const { courseData, dispatch } = useCourse();
  const { saveCourse } = useCourseAPI(courseId);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-save after 3 seconds of inactivity
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (courseData.modules.length > 0) {
        setIsSaving(true);
        try {
          await saveCourse(courseData);
          console.log('Course auto-saved');
        } catch (err) {
          console.error('Auto-save failed:', err);
        } finally {
          setIsSaving(false);
        }
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [courseData, saveCourse]);

  return (
    <div>
      {isSaving && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
          Saving...
        </div>
      )}
      {/* Render course management UI */}
    </div>
  );
};

// ============================================
// EXAMPLE 5: Publish Course with Validation
// ============================================
export const CoursePublishButton = () => {
  const { courseData } = useCourse();
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState(null);

  const handlePublish = async () => {
    // Validate course data
    const validation = courseUtils.validateCourseData(courseData);
    
    if (!validation.isValid) {
      setError(`Validation failed:\n${validation.errors.join('\n')}`);
      return;
    }

    try {
      setPublishing(true);
      const response = await axiosSecure.post(
        `/api/courses/publish`,
        courseData
      );
      console.log('Course published:', response.data);
      alert('Course published successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <button
        onClick={handlePublish}
        disabled={publishing}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {publishing ? 'Publishing...' : 'Publish Course'}
      </button>
    </div>
  );
};

// ============================================
// EXAMPLE 6: Linked Component - Course List
// ============================================
export const CourseListWithManagement = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get('/api/courses/my-courses');
        setCourses(response.data);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <div
          key={course.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4">{course.description}</p>
          
          <div className="mb-4">
            <p className="text-sm text-gray-700">
              Modules: {course.modules?.length || 0}
            </p>
            <p className="text-sm text-gray-700">
              Lessons: {course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0}
            </p>
          </div>

          <button
            onClick={() => navigate(`/course-management/${course.id}`)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
          >
            Edit Course
          </button>
        </div>
      ))}
    </div>
  );
};

// ============================================
// EXAMPLE 7: Batch Import Lessons
// ============================================
export const ImportLessonsFeature = () => {
  const { courseData, dispatch } = useCourse();

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result);
        
        if (data.modules && Array.isArray(data.modules)) {
          dispatch(courseActions.batchUpdateModules(data.modules));
          alert('Lessons imported successfully!');
        } else {
          alert('Invalid format. Expected modules array.');
        }
      } catch (err) {
        alert('Failed to parse JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Import Lessons from JSON</h3>
      <input
        type="file"
        accept=".json"
        onChange={handleImportJSON}
        className="px-4 py-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
};

// ============================================
// EXAMPLE 8: Duplicate Module
// ============================================
export const DuplicateModuleButton = ({ moduleId }) => {
  const { courseData, dispatch } = useCourse();

  const handleDuplicate = () => {
    const module = courseUtils.findModuleById(courseData, moduleId);
    if (!module) return;

    const newModule = {
      ...module,
      id: Date.now(),
      title: `${module.title} (Copy)`,
      lessons: module.lessons.map(lesson => ({
        ...lesson,
        id: Date.now() + Math.random()
      }))
    };

    dispatch(courseActions.addModule(newModule));
  };

  return (
    <button
      onClick={handleDuplicate}
      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
    >
      Duplicate Module
    </button>
  );
};

// ============================================
// EXAMPLE 9: Course Statistics Dashboard
// ============================================
export const CourseStatsDashboard = () => {
  const { courseData } = useCourse();
  const stats = courseUtils.getCourseStats(courseData);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-gray-600 text-sm">Modules</p>
        <p className="text-3xl font-bold text-blue-600">
          {stats.totalModules}
        </p>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-gray-600 text-sm">Total Lessons</p>
        <p className="text-3xl font-bold text-green-600">
          {stats.totalLessons}
        </p>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <p className="text-gray-600 text-sm">Completed</p>
        <p className="text-3xl font-bold text-purple-600">
          {stats.completedLessons}
        </p>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg">
        <p className="text-gray-600 text-sm">Duration</p>
        <p className="text-3xl font-bold text-orange-600">
          {Math.round(stats.totalDuration / 60)}h
        </p>
      </div>
    </div>
  );
};

// ============================================
// EXAMPLE 10: Keyboard Shortcuts
// ============================================
export const useKeyboardShortcuts = (dispatch) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+M: Add Module
      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        dispatch(courseActions.addModule());
      }

      // Ctrl+L: Add Lesson (to first module)
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        // Would need more context to know which module
        console.log('Add lesson shortcut');
      }

      // Ctrl+S: Save (would trigger save)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        console.log('Save shortcut');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);
};

// ============================================
// EXAMPLE 11: Undo/Redo Functionality
// ============================================
export const useUndoRedo = () => {
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = (state) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(state);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      return history[historyIndex - 1];
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      return history[historyIndex + 1];
    }
  };

  return { addToHistory, undo, redo, canUndo: historyIndex > 0, canRedo: historyIndex < history.length - 1 };
};

// ============================================
// EXAMPLE 12: Real-time Collaboration (Placeholder)
// ============================================
export const useRealtimeSync = (courseId, dispatch) => {
  useEffect(() => {
    // This would connect to WebSocket or real-time service
    // Example with Socket.io:
    /*
    const socket = io(process.env.REACT_APP_API_URL);
    
    socket.on('course-updated', (data) => {
      dispatch(courseActions.loadCourse(data));
    });

    return () => socket.disconnect();
    */
  }, [courseId, dispatch]);
};

// ============================================
// EXAMPLE 13: Export to PDF
// ============================================
export const ExportToPDFButton = () => {
  const { courseData } = useCourse();

  const handleExportPDF = async () => {
    try {
      // This would use a library like jsPDF or React-PDF
      const response = await axiosSecure.post(
        '/api/courses/export-pdf',
        courseData,
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${courseData.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);
    } catch (err) {
      console.error('Failed to export PDF:', err);
      alert('Failed to export PDF');
    }
  };

  return (
    <button
      onClick={handleExportPDF}
      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg"
    >
      Export as PDF
    </button>
  );
};

// ============================================
// EXAMPLE 14: Drag & Drop Reordering
// ============================================
export const useDragAndDrop = (dispatch, courseData) => {
  const [draggedModule, setDraggedModule] = useState(null);

  const handleDragStart = (moduleId) => {
    setDraggedModule(moduleId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetModuleId) => {
    if (!draggedModule || draggedModule === targetModuleId) return;

    const modules = [...courseData.modules];
    const draggedIndex = modules.findIndex(m => m.id === draggedModule);
    const targetIndex = modules.findIndex(m => m.id === targetModuleId);

    [modules[draggedIndex], modules[targetIndex]] = [
      modules[targetIndex],
      modules[draggedIndex]
    ];

    dispatch(courseActions.batchUpdateModules(modules));
    setDraggedModule(null);
  };

  return { handleDragStart, handleDragOver, handleDrop, draggedModule };
};

export default {
  CourseManagementPage,
  CourseManagementWithContext,
  useCourseAPI,
  CourseManagementWithAutoSave,
  CoursePublishButton,
  CourseListWithManagement,
  ImportLessonsFeature,
  DuplicateModuleButton,
  CourseStatsDashboard,
  useKeyboardShortcuts,
  useUndoRedo,
  useRealtimeSync,
  ExportToPDFButton,
  useDragAndDrop
};
