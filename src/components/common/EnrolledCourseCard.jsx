import React from 'react';

const EnrolledCourseCard = ({ course, onContinue }) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-cyan-600 transition">
      <div className="relative h-48 bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>

        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>
              {course.lessonsCompleted}/{course.totalLessons} lessons
            </span>
            <span className="text-cyan-400 font-semibold">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-cyan-600 h-2 rounded-full"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-4">Last accessed: {course.lastAccessed}</p>

        <button
          onClick={() => onContinue(course.id)}
          className="w-full btn bg-cyan-600 hover:bg-cyan-700 text-white border-none"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
