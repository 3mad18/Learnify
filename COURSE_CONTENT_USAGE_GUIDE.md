# Course Content Component - Usage Guide

## Quick Start

### 1. Basic Implementation
The component is already integrated into your router. To access it:

```javascript
// Navigate to the course content page
navigate('/course-content/1');

// Or use a link
<Link to="/course-content/1">View Course Content</Link>
```

### 2. Integration with CourseDetails Component
You can add a button in your `CourseDetails.jsx` to navigate to the content page:

```jsx
import { useNavigate } from 'react-router-dom';

export default function CourseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  return (
    <>
      {/* Other course details */}
      <button 
        onClick={() => navigate(`/course-content/${id}`)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
      >
        Go to Course Content
      </button>
    </>
  );
}
```

## Component Structure

### Header Section
```
┌─────────────────────────────────────────┐
│  Course Title & Description             │
│  Instructor Info | Course Image         │
│  Rating | Students | Duration           │
└─────────────────────────────────────────┘
```

### Progress Section (Sticky)
```
┌─────────────────────────────────────────┐
│  Course Progress: 8/32 lessons (25%)     │
│  ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────────────────┘
```

### Main Content Layout
```
┌──────────────────────────────────────────┐
│  Sidebar (25%)  │  Main Content (75%)    │
│                 │                        │
│  Action Buttons │  Requirements Section  │
│  Course Info    │  ────────────────────  │
│  Prerequisites  │                        │
│                 │  Modules List          │
│                 │  - Module 1 (Expanded) │
│                 │    - Lesson 1          │
│                 │    - Lesson 2          │
│                 │  - Module 2 (Collapsed)│
└──────────────────────────────────────────┘
```

## State Management Examples

### Expanding/Collapsing Modules
```javascript
// User clicks module header
onClick={() => toggleModule(module.id)}

// State updates:
expandedModules = {
  1: true,    // Module 1 is open
  2: false,   // Module 2 is closed
  3: false,   // Module 3 is closed
  4: true     // Module 4 is open
}
```

### Marking Lesson Complete
```javascript
// User clicks checkbox
onClick={() => handleMarkComplete(moduleId, lessonId)}

// Before:
lesson = { id: 1, title: "...", isCompleted: false }

// After:
lesson = { id: 1, title: "...", isCompleted: true }

// Module progress updates automatically
module.completed = 4  // Was 3, now 4
```

### Playing a Lesson
```javascript
// User clicks lesson or play button
onClick={() => setCurrentLesson(lesson)}

// Modal opens with:
// - Video player placeholder
// - Lesson description
// - Resources section
// - Mark complete button
```

## Customization Examples

### 1. Change Primary Color
Replace all `blue-*` with your color:

```jsx
// Original
className="bg-gradient-to-r from-blue-600 to-blue-800"

// Custom (e.g., Purple)
className="bg-gradient-to-r from-purple-600 to-purple-800"
```

### 2. Add Custom Lesson Types
Modify `getLessonIcon()` function:

```javascript
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
    case 'assignment':  // NEW
      return <CheckSquare className="w-4 h-4" />;
    case 'discussion':  // NEW
      return <MessageCircle className="w-4 h-4" />;
    default:
      return <Play className="w-4 h-4" />;
  }
};
```

### 3. Add Custom Badges for Lessons
Modify the badge rendering:

```jsx
// Original
<span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
  {lesson.type}
</span>

// With custom colors
const badgeColors = {
  video: 'bg-blue-100 text-blue-800',
  article: 'bg-green-100 text-green-800',
  quiz: 'bg-orange-100 text-orange-800',
  project: 'bg-purple-100 text-purple-800'
};

<span className={`inline-block px-2 py-1 text-xs font-medium rounded-full capitalize ${badgeColors[lesson.type]}`}>
  {lesson.type}
</span>
```

## Connecting to Backend API

### 1. Fetch Course Data
```javascript
import { useEffect } from 'react';

function CourseContent() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosSecure.get(`/api/courses/${id}`);
        setCourseData(response.data);
      } catch (error) {
        console.error('Failed to fetch course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!courseData) return <ErrorPage />;

  return (/* component JSX */);
}
```

### 2. Update Lesson Completion
```javascript
const handleMarkComplete = async (moduleId, lessonId) => {
  try {
    // Call backend API
    await axiosSecure.post(
      `/api/courses/${id}/lessons/${lessonId}/complete`,
      { isCompleted: !isCompleted }
    );

    // Update local state
    setCourseData(/* updated data */);
  } catch (error) {
    toast.error('Failed to update lesson status');
  }
};
```

### 3. Track Progress Automatically
```javascript
useEffect(() => {
  const totalLessons = courseData.modules.reduce(
    (sum, module) => sum + module.lessons,
    0
  );
  
  const completedLessons = courseData.modules.reduce(
    (sum, module) => sum + module.completed,
    0
  );

  const progress = Math.round((completedLessons / totalLessons) * 100);

  // Save to backend
  axiosSecure.put(`/api/courses/${id}/progress`, { progress });
}, [courseData, id]);
```

## Advanced Features

### 1. Auto-save Lesson Progress
```javascript
// Debounce API calls when marking complete
import { useCallback } from 'react';

const debouncedUpdate = useCallback(
  debounce((moduleId, lessonId) => {
    axiosSecure.post(`/api/lessons/${lessonId}/status`, { completed: true });
  }, 1000),
  []
);

const handleMarkComplete = (moduleId, lessonId) => {
  // Update UI immediately
  updateLocalState();
  
  // Debounce API call
  debouncedUpdate(moduleId, lessonId);
};
```

### 2. Add Notifications
```javascript
import toast from 'react-hot-toast';

const handleMarkComplete = (moduleId, lessonId) => {
  updateState();
  toast.success('Lesson marked as complete! 🎉');
};

const handleStartCourse = () => {
  setCurrentLesson(firstLesson);
  toast('Let\'s get started! 🚀', { icon: '🚀' });
};
```

### 3. Add Keyboard Navigation
```javascript
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      setCurrentLesson(null);
    }
    if (e.key === 'Enter' && currentLesson) {
      handleMarkComplete(currentModuleId, currentLesson.id);
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [currentLesson, currentModuleId]);
```

## Responsive Design Breakpoints

The component uses Tailwind's responsive prefixes:

```jsx
// Grid layout changes at different screen sizes
<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
  {/* 1 column on mobile, 4 columns on lg screens */}
</div>

// Hidden on mobile, visible on larger screens
<div className="hidden sm:block">
  {/* Module progress bar - hidden on mobile */}
</div>

// Different padding on different sizes
<div className="px-4 sm:px-6 lg:px-8">
  {/* Responsive padding */}
</div>
```

## Styling with DaisyUI (if available)

You can combine Tailwind with DaisyUI components:

```jsx
<button className="btn btn-primary">
  Start Course
</button>

<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{moduleTitle}</h2>
  </div>
</div>
```

## Performance Optimization Tips

### 1. Memoize Components
```javascript
const LessonItem = React.memo(({ lesson, onToggle }) => (
  // Lesson rendering
));
```

### 2. Lazy Load Module Details
```javascript
const [expandedModules, setExpandedModules] = useState({});

// Only render lessons when module is expanded
{expandedModules[module.id] && (
  <div>
    {module.lessons_detail.map(/* ... */)}
  </div>
)}
```

### 3. Virtualize Long Lists
```javascript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={allLessons.length}
  itemSize={80}
>
  {({ index, style }) => (
    <div style={style}>
      <LessonItem lesson={allLessons[index]} />
    </div>
  )}
</FixedSizeList>
```

## Testing Examples

### Test Module Toggle
```javascript
import { render, screen, fireEvent } from '@testing-library/react';

test('Module expands and collapses', () => {
  render(<CourseContent />);
  
  const moduleButton = screen.getByText(/Getting Started with Hooks/);
  fireEvent.click(moduleButton);
  
  expect(screen.getByText(/Introduction to React Hooks/)).toBeInTheDocument();
});
```

### Test Lesson Completion
```javascript
test('Marks lesson as complete', () => {
  render(<CourseContent />);
  
  const checkbox = screen.getByRole('button', { name: /mark complete/i });
  fireEvent.click(checkbox);
  
  expect(screen.getByText(/completed/i)).toBeInTheDocument();
});
```

## Common Issues & Solutions

### Issue: Progress bar not updating
```javascript
// Wrong: Direct mutation
courseData.progress = 50;

// Correct: Create new object
setCourseData({
  ...courseData,
  progress: 50
});
```

### Issue: Module doesn't expand
```javascript
// Check that expandedModules state is being updated correctly
console.log('expandedModules:', expandedModules);
console.log('module.id:', module.id);

// Verify the button is actually calling toggleModule
onClick={() => {
  console.log('Toggling module:', module.id);
  toggleModule(module.id);
}}
```

### Issue: Modal not closing
```javascript
// Make sure onClick handlers have proper event handling
onClick={(e) => {
  e.stopPropagation(); // Prevent bubbling
  setCurrentLesson(null);
}}
```

## Future Enhancement Checklist

- [ ] Video player integration
- [ ] Live chat during lessons
- [ ] Exercise/code editor integration
- [ ] Peer review system
- [ ] Certificate generation
- [ ] Downloadable resources
- [ ] Lesson recommendations
- [ ] Study reminders/notifications
- [ ] Collaborative learning groups
- [ ] Achievement badges

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Lucide React Icons](https://lucide.dev)
- [React Hooks Documentation](https://react.dev/reference/react)
- [React Router Documentation](https://reactrouter.com)
