// src/utils/constants.js
export const API_BASE_URL = 'https://course-management-system-server-woad.vercel.app/api';

export const USER_ROLES = {
  ADMIN: 'admin',
  INSTRUCTOR: 'instructor',
  STUDENT: 'student'
};

export const COURSE_CATEGORIES = [
  'Programming',
  'Design',
  'Business',
  'Marketing',
  'Data Science',
  'Photography',
  'Music',
  'Health & Fitness'
];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/Auth/login',
  REGISTER: '/Auth/register',
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  ADD_COURSE: '/add-course',
  EDIT_COURSE: '/edit-course/:id',
  COURSE_DETAILS: '/course/:id',
  MY_ENROLLED_COURSES: '/my-enrolled-courses',
  MANAGE_COURSES: '/manage-courses',
  ADMIN: '/admin',
  INSTRUCTOR: '/instructor',
  STUDENT: '/student'
};
