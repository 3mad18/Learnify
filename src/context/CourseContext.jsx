import React, { createContext, useContext, useReducer } from 'react';

/**
 * Course Management Context
 * 
 * Manages global course data state for instructor course management
 * Can be used across multiple components
 * 
 * Usage:
 * <CourseProvider>
 *   <YourComponent />
 * </CourseProvider>
 */

// Create Context
const CourseContext = createContext();
const CourseDispatchContext = createContext();

// Initial State
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

// Reducer Function
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
            id: action.payload?.id || Date.now(),
            title: action.payload?.title || 'New Module',
            description: action.payload?.description || '',
            lessons: action.payload?.lessons || [],
            completed: action.payload?.completed || 0,
            expanded: action.payload?.expanded !== false
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
                    id: action.payload.id || Date.now(),
                    title: action.payload.title || 'New Lesson',
                    description: action.payload.description || '',
                    duration: action.payload.duration || '10m',
                    isCompleted: action.payload.isCompleted || false
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

    // Load course from backend
    case 'LOAD_COURSE':
      return action.payload;

    // Reset course
    case 'RESET_COURSE':
      return initialCourseState;

    // Batch update
    case 'BATCH_UPDATE':
      return {
        ...state,
        modules: action.payload
      };

    default:
      return state;
  }
};

// Provider Component
export const CourseProvider = ({ children, initialData = null }) => {
  const [courseData, dispatch] = useReducer(
    courseReducer,
    initialData || initialCourseState
  );

  return (
    <CourseContext.Provider value={courseData}>
      <CourseDispatchContext.Provider value={dispatch}>
        {children}
      </CourseDispatchContext.Provider>
    </CourseContext.Provider>
  );
};

// Custom Hooks for accessing context
export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within CourseProvider');
  }
  return context;
};

export const useCourseDispatch = () => {
  const context = useContext(CourseDispatchContext);
  if (!context) {
    throw new Error('useCourseDispatch must be used within CourseProvider');
  }
  return context;
};

// Combined hook for convenience
export const useCourse = () => {
  return {
    courseData: useCourseContext(),
    dispatch: useCourseDispatch()
  };
};

// Helper Actions (for cleaner code)
export const courseActions = {
  updateCourseInfo: (payload) => ({
    type: 'UPDATE_COURSE_INFO',
    payload
  }),

  addModule: (moduleData) => ({
    type: 'ADD_MODULE',
    payload: moduleData
  }),

  updateModule: (id, data) => ({
    type: 'UPDATE_MODULE',
    payload: { id, data }
  }),

  deleteModule: (id) => ({
    type: 'DELETE_MODULE',
    payload: id
  }),

  toggleModule: (id) => ({
    type: 'TOGGLE_MODULE',
    payload: id
  }),

  addLesson: (moduleId, lessonData) => ({
    type: 'ADD_LESSON',
    payload: { moduleId, ...lessonData }
  }),

  updateLesson: (moduleId, lessonId, data) => ({
    type: 'UPDATE_LESSON',
    payload: { moduleId, lessonId, data }
  }),

  deleteLesson: (moduleId, lessonId) => ({
    type: 'DELETE_LESSON',
    payload: { moduleId, lessonId }
  }),

  toggleLessonCompletion: (moduleId, lessonId) => ({
    type: 'TOGGLE_LESSON_COMPLETION',
    payload: { moduleId, lessonId }
  }),

  loadCourse: (courseData) => ({
    type: 'LOAD_COURSE',
    payload: courseData
  }),

  resetCourse: () => ({
    type: 'RESET_COURSE'
  }),

  batchUpdateModules: (modules) => ({
    type: 'BATCH_UPDATE',
    payload: modules
  })
};

// Utility Functions
export const courseUtils = {
  // Calculate course progress
  calculateProgress: (courseData) => {
    const totalLessons = courseData.modules.reduce(
      (sum, module) => sum + module.lessons.length,
      0
    );
    const completedLessons = courseData.modules.reduce(
      (sum, module) => sum + module.completed,
      0
    );
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  },

  // Calculate module progress
  calculateModuleProgress: (module) => {
    return module.lessons.length > 0
      ? Math.round((module.completed / module.lessons.length) * 100)
      : 0;
  },

  // Get course statistics
  getCourseStats: (courseData) => {
    const totalLessons = courseData.modules.reduce(
      (sum, module) => sum + module.lessons.length,
      0
    );
    const completedLessons = courseData.modules.reduce(
      (sum, module) => sum + module.completed,
      0
    );
    const totalDuration = courseData.modules.reduce((sum, module) => {
      const moduleDuration = module.lessons.reduce((lessonSum, lesson) => {
        // Parse duration (e.g., "30m" -> 30, "1h" -> 60)
        const match = lesson.duration.match(/(\d+)(m|h)/);
        if (match) {
          const value = parseInt(match[1]);
          return lessonSum + (match[2] === 'h' ? value * 60 : value);
        }
        return lessonSum;
      }, 0);
      return sum + moduleDuration;
    }, 0);

    return {
      totalModules: courseData.modules.length,
      totalLessons,
      completedLessons,
      totalDuration, // in minutes
      progress: courseUtils.calculateProgress(courseData)
    };
  },

  // Export course data
  exportCourseData: (courseData) => {
    return JSON.stringify(courseData, null, 2);
  },

  // Import course data
  importCourseData: (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Failed to parse course data:', error);
      return null;
    }
  },

  // Validate course data
  validateCourseData: (courseData) => {
    const errors = [];

    if (!courseData.title || courseData.title.trim() === '') {
      errors.push('Course title is required');
    }

    if (!courseData.instructor?.name || courseData.instructor.name.trim() === '') {
      errors.push('Instructor name is required');
    }

    if (courseData.modules.length === 0) {
      errors.push('At least one module is required');
    }

    courseData.modules.forEach((module, idx) => {
      if (!module.title || module.title.trim() === '') {
        errors.push(`Module ${idx + 1}: Title is required`);
      }

      if (module.lessons.length === 0) {
        errors.push(`Module "${module.title}": At least one lesson is required`);
      }

      module.lessons.forEach((lesson, lessonIdx) => {
        if (!lesson.title || lesson.title.trim() === '') {
          errors.push(
            `Module "${module.title}", Lesson ${lessonIdx + 1}: Title is required`
          );
        }

        if (!lesson.duration || lesson.duration.trim() === '') {
          errors.push(
            `Module "${module.title}", Lesson "${lesson.title}": Duration is required`
          );
        }
      });
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Find module by ID
  findModuleById: (courseData, moduleId) => {
    return courseData.modules.find(module => module.id === moduleId);
  },

  // Find lesson by ID
  findLessonById: (courseData, moduleId, lessonId) => {
    const module = courseUtils.findModuleById(courseData, moduleId);
    return module ? module.lessons.find(lesson => lesson.id === lessonId) : null;
  }
};

export default CourseContext;
