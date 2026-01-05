export const navigations = {
  continueCourse: (courseId) => `/course/${courseId}/learn`,
  editCourse: (courseId) => `/edit-course/${courseId}`,
  courseAssessment: (courseId) => `/course/${courseId}/assessment`,
  courseDetails: (courseId) => `/course/${courseId}`,
  achievements: () => `/achievements`,
  studentDashboard: () => `/student`,
  instructorDashboard: () => `/instructor`,
  adminDashboard: () => `/admin`,
};
