# 🔌 Course Management Editor - API Reference

## Complete API Documentation

This guide provides detailed information about all functions, hooks, actions, and utilities available in the Course Management System.

---

## Table of Contents

1. [Hooks API](#hooks-api)
2. [Actions API](#actions-api)
3. [Utilities API](#utilities-api)
4. [Component Props](#component-props)
5. [Type Definitions](#type-definitions)
6. [Backend Integration](#backend-integration)

---

## Hooks API

### useCourseContext()

Access the current course data from context.

**Syntax**
```javascript
const courseData = useCourseContext();
```

**Returns**
```typescript
{
  id: number | null,
  title: string,
  description: string,
  instructor: {
    name: string,
    image: string
  },
  totalStudents: number,
  modules: Module[]
}
```

**Example**
```jsx
import { useCourseContext } from '../context/CourseContext';

function MyComponent() {
  const course = useCourseContext();
  return <h1>{course.title}</h1>;
}
```

**Error Handling**
```javascript
try {
  const course = useCourseContext();
  if (!course) {
    console.error('Course context not available. Ensure component is wrapped with CourseProvider.');
  }
} catch (error) {
  console.error('Error accessing course context:', error);
}
```

---

### useCourseDispatch()

Access the dispatch function to update course state.

**Syntax**
```javascript
const dispatch = useCourseDispatch();
```

**Returns**
```typescript
(action: CourseAction) => void
```

**Example**
```jsx
import { useCourseDispatch } from '../context/CourseContext';

function MyComponent() {
  const dispatch = useCourseDispatch();
  
  const handleAddModule = () => {
    dispatch({
      type: 'ADD_MODULE',
      payload: {
        title: 'New Module',
        description: 'Module description'
      }
    });
  };
  
  return <button onClick={handleAddModule}>Add Module</button>;
}
```

**Action Types**
- `UPDATE_COURSE_INFO`
- `ADD_MODULE`
- `UPDATE_MODULE`
- `DELETE_MODULE`
- `TOGGLE_MODULE`
- `ADD_LESSON`
- `UPDATE_LESSON`
- `DELETE_LESSON`
- `TOGGLE_LESSON_COMPLETION`
- `LOAD_COURSE`
- `RESET_COURSE`
- `BATCH_UPDATE_MODULES`

---

### useCourse()

Combined hook to access both course data and dispatch function.

**Syntax**
```javascript
const { courseData, dispatch } = useCourse();
```

**Returns**
```typescript
{
  courseData: CourseData,
  dispatch: (action: CourseAction) => void
}
```

**Example**
```jsx
import { useCourse } from '../context/CourseContext';

function CourseEditor() {
  const { courseData, dispatch } = useCourse();
  
  return (
    <div>
      <h1>{courseData.title}</h1>
      <button onClick={() => dispatch(courseActions.addModule())}>
        Add Module
      </button>
    </div>
  );
}
```

---

## Actions API

### courseActions Object

Pre-built action creators for common operations.

#### courseActions.updateCourseInfo(data)

Update course title, description, or instructor info.

**Parameters**
```typescript
{
  title?: string,
  description?: string,
  instructor?: {
    name?: string,
    image?: string
  },
  totalStudents?: number
}
```

**Example**
```javascript
dispatch(courseActions.updateCourseInfo({
  title: 'Advanced React',
  description: 'Master React patterns'
}));
```

---

#### courseActions.addModule(data?)

Add a new module to the course.

**Parameters**
```typescript
{
  title?: string,      // Default: 'New Module'
  description?: string // Default: ''
}
```

**Returns**
```javascript
{
  id: number,
  title: string,
  description: string,
  lessons: [],
  completed: 0,
  expanded: false
}
```

**Example**
```javascript
dispatch(courseActions.addModule({
  title: 'Module 1: Introduction',
  description: 'Get started with basics'
}));

// or with defaults
dispatch(courseActions.addModule());
```

---

#### courseActions.updateModule(moduleId, data)

Update module title or description.

**Parameters**
```typescript
moduleId: number
data: {
  title?: string,
  description?: string
}
```

**Example**
```javascript
dispatch(courseActions.updateModule(1, {
  title: 'Updated Module Title'
}));
```

---

#### courseActions.deleteModule(moduleId)

Remove a module and all its lessons.

**Parameters**
```typescript
moduleId: number
```

**Warning**: This action is permanent and cannot be undone unless you have undo/redo implemented.

**Example**
```javascript
dispatch(courseActions.deleteModule(1));
```

---

#### courseActions.toggleModule(moduleId)

Expand or collapse a module.

**Parameters**
```typescript
moduleId: number
```

**Example**
```javascript
dispatch(courseActions.toggleModule(1));
```

---

#### courseActions.addLesson(moduleId, data?)

Add a lesson to a module.

**Parameters**
```typescript
moduleId: number
data?: {
  title?: string,      // Default: 'New Lesson'
  description?: string,// Default: ''
  duration?: string    // Default: '10 min'
}
```

**Example**
```javascript
dispatch(courseActions.addLesson(1, {
  title: 'Lesson 1: Setup',
  description: 'Setting up your environment',
  duration: '15 min'
}));
```

---

#### courseActions.updateLesson(moduleId, lessonId, data)

Update lesson details.

**Parameters**
```typescript
moduleId: number
lessonId: number
data: {
  title?: string,
  description?: string,
  duration?: string
}
```

**Example**
```javascript
dispatch(courseActions.updateLesson(1, 5, {
  title: 'Updated Lesson Title',
  duration: '20 min'
}));
```

---

#### courseActions.deleteLesson(moduleId, lessonId)

Remove a lesson from a module.

**Parameters**
```typescript
moduleId: number
lessonId: number
```

**Example**
```javascript
dispatch(courseActions.deleteLesson(1, 5));
```

---

#### courseActions.toggleLessonCompletion(moduleId, lessonId)

Mark a lesson as complete or incomplete.

**Parameters**
```typescript
moduleId: number
lessonId: number
```

**Example**
```javascript
dispatch(courseActions.toggleLessonCompletion(1, 5));
```

---

#### courseActions.loadCourse(courseData)

Load an entire course from API or storage.

**Parameters**
```typescript
courseData: CourseData
```

**Example**
```javascript
const apiData = await fetch('/api/courses/1');
dispatch(courseActions.loadCourse(apiData));
```

---

#### courseActions.resetCourse()

Reset course to initial empty state.

**Example**
```javascript
dispatch(courseActions.resetCourse());
```

---

#### courseActions.batchUpdateModules(modules)

Update multiple modules at once.

**Parameters**
```typescript
modules: Module[]
```

**Example**
```javascript
dispatch(courseActions.batchUpdateModules([
  { id: 1, title: 'New Title 1' },
  { id: 2, title: 'New Title 2' }
]));
```

---

## Utilities API

### courseUtils Object

Helper functions for common operations.

#### courseUtils.calculateProgress(courseData)

Calculate overall course completion percentage.

**Parameters**
```typescript
courseData: CourseData
```

**Returns**
```typescript
{
  percentage: number,    // 0-100
  completed: number,     // total completed lessons
  total: number          // total lessons
}
```

**Example**
```javascript
const { courseData } = useCourse();
const progress = courseUtils.calculateProgress(courseData);
console.log(`${progress.percentage}% complete`);
```

---

#### courseUtils.calculateModuleProgress(module)

Calculate module completion percentage.

**Parameters**
```typescript
module: Module
```

**Returns**
```typescript
{
  percentage: number,
  completed: number,
  total: number
}
```

**Example**
```javascript
const module = courseData.modules[0];
const moduleProgress = courseUtils.calculateModuleProgress(module);
```

---

#### courseUtils.getCourseStats(courseData)

Get comprehensive course statistics.

**Parameters**
```typescript
courseData: CourseData
```

**Returns**
```typescript
{
  totalModules: number,
  totalLessons: number,
  completedLessons: number,
  completionPercentage: number,
  averageModuleSize: number,
  estimatedHours: number
}
```

**Example**
```javascript
const stats = courseUtils.getCourseStats(courseData);
console.log(`Total lessons: ${stats.totalLessons}`);
console.log(`Est. hours: ${stats.estimatedHours}`);
```

---

#### courseUtils.exportCourseData(courseData)

Export course as JSON string.

**Parameters**
```typescript
courseData: CourseData
```

**Returns**
```typescript
string // JSON stringified course data
```

**Example**
```javascript
const json = courseUtils.exportCourseData(courseData);
localStorage.setItem('course_backup', json);

// Download as file
const element = document.createElement('a');
element.setAttribute('href', 'data:text/json;charset=utf-8,' + json);
element.setAttribute('download', 'course.json');
element.click();
```

---

#### courseUtils.importCourseData(jsonString)

Import course from JSON string.

**Parameters**
```typescript
jsonString: string
```

**Returns**
```typescript
CourseData // parsed course data
```

**Throws**
```javascript
Error if JSON is invalid
```

**Example**
```javascript
try {
  const courseData = courseUtils.importCourseData(jsonString);
  dispatch(courseActions.loadCourse(courseData));
} catch (error) {
  console.error('Invalid course data:', error);
}
```

---

#### courseUtils.validateCourseData(courseData)

Validate course data structure.

**Parameters**
```typescript
courseData: CourseData
```

**Returns**
```typescript
{
  isValid: boolean,
  errors: string[]
}
```

**Example**
```javascript
const validation = courseUtils.validateCourseData(courseData);
if (!validation.isValid) {
  validation.errors.forEach(error => console.log(error));
}
```

**Validation Rules**
- Course must have a title (required, non-empty)
- Course must have a description
- At least one module required
- Each module must have a title
- Each lesson must have a title

---

#### courseUtils.findModuleById(courseData, moduleId)

Find a module by ID.

**Parameters**
```typescript
courseData: CourseData,
moduleId: number
```

**Returns**
```typescript
Module | undefined
```

**Example**
```javascript
const module = courseUtils.findModuleById(courseData, 5);
if (module) {
  console.log(module.title);
}
```

---

#### courseUtils.findLessonById(courseData, moduleId, lessonId)

Find a lesson within a module.

**Parameters**
```typescript
courseData: CourseData,
moduleId: number,
lessonId: number
```

**Returns**
```typescript
Lesson | undefined
```

**Example**
```javascript
const lesson = courseUtils.findLessonById(courseData, 5, 10);
if (lesson) {
  console.log(lesson.title);
}
```

---

## Component Props

### CourseManagementEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialCourse` | CourseData | `null` | Initial course data to load |
| `onSave` | Function | `() => {}` | Callback when saving |
| `onError` | Function | `() => {}` | Callback for errors |
| `readOnly` | Boolean | `false` | Disable editing |
| `showExport` | Boolean | `true` | Show export button |

**Example**
```jsx
<CourseManagementEditor
  initialCourse={courseData}
  onSave={(data) => saveToDB(data)}
  onError={(error) => showError(error)}
  readOnly={false}
/>
```

---

## Type Definitions

### CourseData

```typescript
interface CourseData {
  id: number | null;
  title: string;
  description: string;
  instructor: {
    name: string;
    image: string;
  };
  totalStudents: number;
  modules: Module[];
}
```

### Module

```typescript
interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  completed: number;
  expanded: boolean;
}
```

### Lesson

```typescript
interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  isCompleted: boolean;
}
```

### CourseAction

```typescript
interface CourseAction {
  type: 'UPDATE_COURSE_INFO' | 
        'ADD_MODULE' | 
        'UPDATE_MODULE' | 
        'DELETE_MODULE' | 
        'TOGGLE_MODULE' | 
        'ADD_LESSON' | 
        'UPDATE_LESSON' | 
        'DELETE_LESSON' | 
        'TOGGLE_LESSON_COMPLETION' | 
        'LOAD_COURSE' | 
        'RESET_COURSE' | 
        'BATCH_UPDATE_MODULES';
  payload?: any;
}
```

---

## Backend Integration

### API Endpoints Required

```
POST   /api/courses
GET    /api/courses/:id
PUT    /api/courses/:id
DELETE /api/courses/:id

POST   /api/courses/:id/modules
PUT    /api/courses/:id/modules/:moduleId
DELETE /api/courses/:id/modules/:moduleId

POST   /api/courses/:id/modules/:moduleId/lessons
PUT    /api/courses/:id/modules/:moduleId/lessons/:lessonId
DELETE /api/courses/:id/modules/:moduleId/lessons/:lessonId

POST   /api/courses/publish
POST   /api/courses/export-pdf
```

### Fetch Course Example

```javascript
import axiosSecure from '../api/axiosSecure';

async function fetchCourse(courseId) {
  try {
    const response = await axiosSecure.get(`/api/courses/${courseId}`);
    const { courseData, dispatch } = useCourse();
    dispatch(courseActions.loadCourse(response.data));
  } catch (error) {
    console.error('Failed to fetch course:', error);
  }
}
```

### Save Course Example

```javascript
async function saveCourse(courseData) {
  try {
    const response = await axiosSecure.put(
      `/api/courses/${courseData.id}`,
      courseData
    );
    return response.data;
  } catch (error) {
    console.error('Failed to save course:', error);
    throw error;
  }
}
```

### Expected Response Format

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Course Title",
    "description": "Course description",
    "instructor": {
      "name": "John Doe",
      "image": "url"
    },
    "modules": [
      {
        "id": 1,
        "title": "Module 1",
        "description": "Module description",
        "lessons": [
          {
            "id": 1,
            "title": "Lesson 1",
            "description": "Lesson description",
            "duration": "10 min",
            "isCompleted": false
          }
        ],
        "completed": 0,
        "expanded": false
      }
    ],
    "totalStudents": 100
  }
}
```

### Error Response Format

```json
{
  "success": false,
  "error": "Validation error",
  "errors": [
    "Course title is required",
    "At least one module required"
  ]
}
```

---

## Error Handling

### Try-Catch Pattern

```javascript
try {
  dispatch(courseActions.addModule({
    title: 'New Module'
  }));
} catch (error) {
  console.error('Failed to add module:', error);
  // Show user-friendly error message
}
```

### Validation Pattern

```javascript
const validation = courseUtils.validateCourseData(courseData);
if (!validation.isValid) {
  validation.errors.forEach(error => {
    console.error(error);
  });
}
```

### API Error Handling

```javascript
async function saveCourse(courseData) {
  try {
    const response = await axiosSecure.put(
      `/api/courses/${courseData.id}`,
      courseData
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 400) {
      console.error('Validation error:', error.response.data.errors);
    } else if (error.response?.status === 401) {
      console.error('Unauthorized');
    } else if (error.response?.status === 404) {
      console.error('Course not found');
    } else {
      console.error('Server error:', error.message);
    }
    throw error;
  }
}
```

---

## Performance Tips

1. **Use useCourse() instead of separate hooks**
   - Avoids multiple context subscriptions

2. **Implement debounced saves**
   - Don't save on every change, use debounce

3. **Lazy load course content**
   - Use React.lazy() for CourseManagementEditor

4. **Memoize expensive computations**
   - Use React.useMemo() for stats calculations

5. **Virtual scroll for large courses**
   - If course has 100+ lessons, implement virtualization

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Nov 23, 2025 | Initial release |

---

**Status**: ✅ Complete
**Last Updated**: November 23, 2025
