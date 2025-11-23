# 📋 Course Management Editor - Quick Reference

## Command Cheatsheet

### Access Data

```javascript
// Get course data
const course = useCourseContext();
console.log(course.title);

// Get dispatch function  
const dispatch = useCourseDispatch();

// Combined
const { courseData, dispatch } = useCourse();
```

---

## Common Actions

### Course Management

```javascript
// Update course info
dispatch(courseActions.updateCourseInfo({
  title: 'Advanced React',
  description: 'Learn React patterns'
}));

// Load course from API
dispatch(courseActions.loadCourse(apiData));

// Reset to empty
dispatch(courseActions.resetCourse());
```

### Module Operations

```javascript
// Add module
dispatch(courseActions.addModule({
  title: 'Module 1',
  description: 'Introduction'
}));

// Update module
dispatch(courseActions.updateModule(moduleId, {
  title: 'Updated Title'
}));

// Delete module
dispatch(courseActions.deleteModule(moduleId));

// Toggle expand/collapse
dispatch(courseActions.toggleModule(moduleId));
```

### Lesson Operations

```javascript
// Add lesson
dispatch(courseActions.addLesson(moduleId, {
  title: 'Lesson 1',
  description: 'Getting started',
  duration: '15 min'
}));

// Update lesson
dispatch(courseActions.updateLesson(moduleId, lessonId, {
  title: 'Updated Title',
  duration: '20 min'
}));

// Delete lesson
dispatch(courseActions.deleteLesson(moduleId, lessonId));

// Mark complete
dispatch(courseActions.toggleLessonCompletion(moduleId, lessonId));
```

---

## Utility Functions

```javascript
// Calculate progress
const progress = courseUtils.calculateProgress(courseData);
// Returns: { percentage: 50, completed: 5, total: 10 }

// Get statistics
const stats = courseUtils.getCourseStats(courseData);
// Returns: { totalModules, totalLessons, completedLessons, etc }

// Validate data
const valid = courseUtils.validateCourseData(courseData);
// Returns: { isValid, errors: [...] }

// Export to JSON
const json = courseUtils.exportCourseData(courseData);

// Import from JSON
const data = courseUtils.importCourseData(jsonString);

// Find items
const module = courseUtils.findModuleById(courseData, 1);
const lesson = courseUtils.findLessonById(courseData, 1, 5);
```

---

## Styling Classes

### Layout
```
bg-gray-50            // Light background
rounded-lg           // Rounded corners
shadow-md            // Drop shadow
p-4, p-6, p-8        // Padding
m-4, m-6, m-8        // Margin
flex, grid           // Layout
```

### Colors
```
text-blue-600        // Blue text
bg-blue-100          // Light blue background
border-blue-200      // Blue border
hover:bg-blue-50     // Hover state
```

### Responsive
```
sm:p-4               // Small screens
md:p-6               // Medium screens  
lg:p-8               // Large screens
xl:p-10              // Extra large screens
```

### States
```
disabled:opacity-50      // Disabled
hover:bg-gray-100        // Hover
active:bg-gray-200       // Active
focus:outline-blue-500   // Focus
```

---

## File Locations

```
CourseManagementEditor ............ src/pages/Courses/CourseManagementEditor.jsx
CourseContext ..................... src/context/CourseContext.jsx
Integration Examples .............. src/pages/Courses/CourseManagementIntegration.jsx
Router ............................ src/routes/Router.jsx
API Client ........................ src/api/axiosSecure.js
Auth Hook ......................... src/hooks/useAuth.js
```

---

## Data Flow

```
User Action
    ↓
Component Handler
    ↓
dispatch(action)
    ↓
Reducer
    ↓
Update State
    ↓
Component Re-render
    ↓
UI Updated
```

---

## Key Prop Types

```typescript
// Course
{
  id: number | null,
  title: string,
  description: string,
  instructor: { name: string, image: string },
  totalStudents: number,
  modules: Module[]
}

// Module
{
  id: number,
  title: string,
  description: string,
  lessons: Lesson[],
  completed: number,
  expanded: boolean
}

// Lesson
{
  id: number,
  title: string,
  description: string,
  duration: string,
  isCompleted: boolean
}
```

---

## Component Hierarchy

```
CourseProvider
  └── CourseManagementEditor
      ├── Course Header Editor
      ├── Progress Bar
      ├── Module List
      │   ├── ModuleItem
      │   │   ├── Module Header
      │   │   ├── Lesson List
      │   │   │   ├── LessonItem
      │   │   │   ├── EditLessonForm
      │   ├── EditModuleForm
      ├── Course Summary
      └── Export Button
```

---

## Route Navigation

```javascript
// Navigate to editor
navigate('/course-management/1');

// With search params
navigate(`/course-management/${courseId}?tab=modules`);

// Back button
navigate(-1);
```

---

## Common Patterns

### Auto-Save
```javascript
const timeoutRef = useRef(null);

useEffect(() => {
  clearTimeout(timeoutRef.current);
  timeoutRef.current = setTimeout(
    () => saveCourse(courseData),
    2000
  );
}, [courseData]);
```

### Validation
```javascript
if (!courseData.title.trim()) {
  setError('Course title required');
  return;
}
```

### Error Handling
```javascript
try {
  await axiosSecure.post('/api/courses', courseData);
} catch (error) {
  setError(error.response?.data?.message || 'Failed to save');
}
```

### Loading States
```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleSave = async () => {
  setLoading(true);
  try {
    await saveCourse();
    setError(null);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

## Debugging Tips

```javascript
// Log state changes
useEffect(() => {
  console.log('Course data updated:', courseData);
}, [courseData]);

// Check dispatch
const customDispatch = (action) => {
  console.log('Action:', action);
  dispatch(action);
};

// Validate before save
const validation = courseUtils.validateCourseData(courseData);
console.log('Valid:', validation.isValid, 'Errors:', validation.errors);

// Monitor progress
const progress = courseUtils.calculateProgress(courseData);
console.log(`Progress: ${progress.percentage}%`);
```

---

## Performance Checklist

- [ ] Using React.memo for child components
- [ ] Debouncing save operations
- [ ] Lazy loading the component
- [ ] Memoizing expensive calculations
- [ ] Virtual scrolling for large lists
- [ ] Proper key props on lists
- [ ] Avoiding inline function definitions
- [ ] Using useCallback for callbacks
- [ ] Minimizing re-renders with Context

---

## Keyboard Shortcuts (if implemented)

```
Ctrl + M    = Add Module
Ctrl + L    = Add Lesson
Ctrl + S    = Save Course
Ctrl + Z    = Undo
Ctrl + Y    = Redo
Ctrl + E    = Export
Escape      = Close modal
Enter       = Save form
```

---

## API Responses

### Success
```json
{
  "success": true,
  "data": { /* course data */ },
  "message": "Operation successful"
}
```

### Error
```json
{
  "success": false,
  "error": "Error message",
  "errors": ["Field error 1", "Field error 2"]
}
```

---

## Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Learnify
VITE_ENV=development
```

---

## Dependencies

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^7.6.2",
  "tailwindcss": "^4.1.7",
  "lucide-react": "^0.511.0",
  "axios": "^1.x"
}
```

---

## Icon List (Lucide React)

```javascript
Plus              // Add
Trash2            // Delete
Edit2             // Edit
ChevronDown       // Expand
ChevronUp         // Collapse
Check             // Complete
Clock             // Duration
Download          // Export
X                 // Close
Save              // Save
Settings          // Settings
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Validation Error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## Quick Links

- **Main Component**: `src/pages/Courses/CourseManagementEditor.jsx`
- **Context Provider**: `src/context/CourseContext.jsx`
- **Integration Examples**: `src/pages/Courses/CourseManagementIntegration.jsx`
- **Routing**: `src/routes/Router.jsx`
- **Documentation**: `COURSE_MANAGEMENT_DOCUMENTATION.md`
- **API Reference**: `COURSE_MANAGEMENT_API_REFERENCE.md`

---

## 30-Second Setup

```javascript
// 1. Import provider in main.jsx
import { CourseProvider } from './context/CourseContext';

// 2. Wrap app
<CourseProvider>
  <App />
</CourseProvider>

// 3. Use component
import CourseManagementEditor from './pages/Courses/CourseManagementEditor';
<CourseManagementEditor />

// 4. Navigate
navigate('/course-management/1');
```

---

**Status**: ✅ Complete
**Version**: 1.0.0
**Last Updated**: November 23, 2025
