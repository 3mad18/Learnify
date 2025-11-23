# Course Content Component - Architecture & Visual Guides

## 🏗️ Component Architecture

```
CourseContent (Main Component)
│
├── Header Section
│   ├── Course Title & Description
│   ├── Instructor Card
│   │   ├── Avatar
│   │   ├── Name
│   │   └── Bio
│   ├── Course Stats
│   │   ├── Rating
│   │   ├── Students Count
│   │   └── Duration
│   └── Course Image
│
├── Progress Header (Sticky)
│   ├── Progress Label
│   ├── Lesson Count (X/Y)
│   └── Progress Bar
│       └── Fill Animation
│
├── Main Content Grid (4 columns)
│   │
│   ├── Sidebar (1 column)
│   │   ├── Action Buttons
│   │   │   ├── Start Course
│   │   │   ├── Resume Lesson
│   │   │   └── Mark Complete
│   │   ├── Course Info Card
│   │   └── Prerequisites Card
│   │
│   └── Main Content (3 columns)
│       ├── Requirements Section
│       │   └── Requirements Grid
│       ├── Curriculum Section
│       │   └── Modules List
│       │       ├── Module 1 (Expandable)
│       │       │   ├── Module Header
│       │       │   │   ├── Title
│       │       │   │   ├── Progress
│       │       │   │   └── Duration
│       │       │   └── Lessons List (if expanded)
│       │       │       ├── Lesson 1
│       │       │       │   ├── Checkbox
│       │       │       │   ├── Icon
│       │       │       │   ├── Title
│       │       │       │   ├── Badge
│       │       │       │   ├── Duration
│       │       │       │   └── Play Button
│       │       │       ├── Lesson 2
│       │       │       └── ...
│       │       ├── Module 2
│       │       ├── Module 3
│       │       └── Module 4
│       └── Completion Info Section
│
└── Current Lesson Modal (z-50)
    ├── Header
    │   ├── Title
    │   ├── Duration
    │   └── Close Button
    ├── Video Placeholder
    ├── About Section
    ├── Resources Section
    └── Action Buttons
        ├── Mark as Complete
        └── Close
```

---

## 🔄 State Management Flow

```
User Interaction
    │
    ├─→ Click Module Header
    │   └─→ toggleModule(id)
    │       └─→ expandedModules[id] = !expandedModules[id]
    │           └─→ Re-render module lessons
    │
    ├─→ Click Lesson Checkbox
    │   └─→ handleMarkComplete(moduleId, lessonId)
    │       └─→ Update lesson.isCompleted
    │           └─→ Update module.completed
    │               └─→ Recalculate courseData.progress
    │                   └─→ Update progress bar
    │
    ├─→ Click Lesson or Play Button
    │   └─→ setCurrentLesson(lesson)
    │       └─→ Render Modal
    │           └─→ Show lesson content
    │
    ├─→ Click Start Course
    │   └─→ handleStartCourse()
    │       └─→ setCurrentLesson(firstLesson)
    │           └─→ Open modal with first lesson
    │
    └─→ Click Resume Lesson
        └─→ handleResumeLesson()
            └─→ Find next incomplete lesson
                └─→ setCurrentLesson(nextLesson)
                    └─→ Open modal with next lesson
```

---

## 📊 Data Structure Visualization

```javascript
courseData = {
  // Basic Info
  id: 1,
  title: "Advanced React.js Development",
  description: "Master advanced React concepts...",
  
  // Instructor Info
  instructor: {
    name: "Ahmed Hassan",
    image: "https://...",
    bio: "Senior Frontend Engineer with 8+ years experience"
  },
  
  // Course Metadata
  rating: 4.8,
  students: 12500,
  duration: "24 hours",
  level: "Advanced",
  image: "https://...",
  
  // Prerequisites & Requirements
  prerequisites: [
    "Basic JavaScript knowledge",
    "Understanding of HTML & CSS",
    ...
  ],
  requirements: [
    "A code editor (VS Code recommended)",
    ...
  ],
  
  // Progress Tracking
  totalLessons: 32,
  completedLessons: 8,
  progress: 25,
  
  // Course Curriculum
  modules: [
    {
      id: 1,
      title: "Getting Started with Hooks",
      duration: "3h 45m",
      lessons: 6,
      completed: 3,  // Auto-calculated from lessons_detail
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
        ...
      ]
    },
    // More modules...
  ]
}
```

---

## 🎨 Component Layout Breakdown

### Desktop View (> 1024px)

```
┌────────────────────────────────────────────────┐
│                  HEADER                        │
│  Title | Description | Instructor | Image     │
│  Rating | Students | Duration                  │
└────────────────────────────────────────────────┘
┌────────────────────────────────────────────────┐
│   PROGRESS BAR (Sticky)                        │
│   ███████░░░░░░░░░░░░░░░░░░░░░░ 25%          │
└────────────────────────────────────────────────┘
┌──────────────────┬───────────────────────────┐
│   SIDEBAR        │   MAIN CONTENT            │
│  (25%)           │   (75%)                   │
│                  │                           │
│ [Start Course]   │ Requirements Section      │
│ [Resume Lesson]  │ ─────────────────────     │
│ [Mark Complete]  │ Curriculum Section       │
│                  │ ┌─────────────────────┐  │
│ Course Info      │ │ Module 1 (Expanded) │  │
│ ├─ Level         │ ├─ Lesson 1 ✓        │  │
│ ├─ Duration      │ ├─ Lesson 2 ✓        │  │
│ └─ Lessons       │ ├─ Lesson 3          │  │
│                  │ └─ ...               │  │
│ Prerequisites    │                       │  │
│ ├─ JS basics     │ ┌─────────────────────┐  │
│ ├─ HTML & CSS    │ │ Module 2 (Collapsed)│  │
│ ├─ ES6+          │ └─────────────────────┘  │
│ └─ Node.js       │                       │  │
│                  │ Completion Info          │
└──────────────────┴───────────────────────────┘
```

### Tablet View (640px - 1024px)

```
┌──────────────────────────────┐
│         HEADER               │
│  Title | Description | Image │
│  Rating | Students           │
└──────────────────────────────┘
┌──────────────────────────────┐
│   PROGRESS BAR (Sticky)      │
│   ███████░░░░░░░░░░░░ 25%   │
└──────────────────────────────┘
┌──────────────────────────────┐
│      MAIN CONTENT            │
│                              │
│ [Start] [Resume] [Complete]  │
│                              │
│ Course Info                  │
│ Prerequisites                │
│                              │
│ Requirements Section         │
│                              │
│ Modules List                 │
│ ┌──────────────────────────┐ │
│ │ Module 1                 │ │
│ ├──────────────────────────┤ │
│ │ Lesson 1 ✓               │ │
│ │ Lesson 2 ✓               │ │
│ │ Lesson 3                 │ │
│ └──────────────────────────┘ │
│                              │
│ Completion Info              │
└──────────────────────────────┘
```

### Mobile View (< 640px)

```
┌──────────────────┐
│     HEADER       │
│  Title           │
│  Description     │
│  [Image]         │
│  Rating | Stud   │
└──────────────────┘
┌──────────────────┐
│  PROGRESS BAR    │
│  ███░░░░░░ 25%   │
└──────────────────┘
┌──────────────────┐
│  MAIN CONTENT    │
│                  │
│ [Start Course]   │
│ [Resume Lesson]  │
│ [Mark Complete]  │
│                  │
│ Course Info      │
│ Prerequisites    │
│                  │
│ Requirements     │
│                  │
│ Modules List     │
│ ┌──────────────┐ │
│ │Module 1      │ │
│ │Lesson 1 ✓    │ │
│ │Lesson 2 ✓    │ │
│ │Lesson 3      │ │
│ └──────────────┘ │
│                  │
│ Completion Info  │
└──────────────────┘
```

---

## 🎭 Modal Component Structure

```
┌────────────────────────────────┐
│  Header (Blue Gradient)        │ (Sticky)
│  ┌─────────────────────────────│
│  │ Title: useState Hook        │
│  │ Duration: 28m               │
│  │ Close: ✕                    │
└────────────────────────────────┘
│
├─ Video Placeholder
│  ┌────────────────────────────┐
│  │  [▶] Video Player Area     │
│  │  (Ready for integration)   │
│  └────────────────────────────┘
│
├─ About This Lesson
│  │ Learn key concepts and
│  │ practical implementation...
│  └
│
├─ Resources
│  │ ├─ 📄 Lesson Notes (PDF)
│  │ ├─ 📄 Code Examples
│  │ └─ 📄 Transcript
│  └
│
└─ Actions
   ├─ [✓ Mark as Complete]
   └─ [Close]
```

---

## 🔀 Lesson Status Lifecycle

```
Lesson Created
    │
    ├─→ isCompleted: false
    │   │
    │   └─→ User clicks checkbox
    │       │
    │       ├─→ isCompleted: true
    │       ├─→ Icon changes to ✓
    │       ├─→ Title becomes strikethrough
    │       ├─→ module.completed increments
    │       └─→ progress % updates
    │
    └─→ User clicks again
        │
        ├─→ isCompleted: false
        ├─→ Icon changes back to ○
        ├─→ Title normal formatting
        ├─→ module.completed decrements
        └─→ progress % updates
```

---

## 🎯 Module Expansion Logic

```
Initial State:
  expandedModules = {
    1: false,  // Module 1 collapsed
    2: false,  // Module 2 collapsed
    3: false,  // Module 3 collapsed
    4: false   // Module 4 collapsed
  }

User clicks Module 1 Header:
  ├─→ toggleModule(1)
  ├─→ expandedModules[1] = !expandedModules[1]
  ├─→ expandedModules[1] = true
  ├─→ Lessons become visible
  └─→ ChevronDown changes to ChevronUp

User clicks Module 2 Header:
  ├─→ toggleModule(2)
  ├─→ expandedModules[2] = !expandedModules[2]
  ├─→ expandedModules[2] = true
  ├─→ Lessons become visible
  └─→ Both Module 1 and 2 are now expanded

Current State:
  expandedModules = {
    1: true,   // ✓ Expanded
    2: true,   // ✓ Expanded
    3: false,  // Collapsed
    4: false   // Collapsed
  }
```

---

## 📈 Progress Calculation Flowchart

```
Start
  │
  └─→ Iterate through all modules
      │
      ├─→ For each module, count lessons_detail
      │   │
      │   └─→ Count isCompleted: true
      │       │
      │       └─→ Update module.completed
      │
      └─→ Sum all completed lessons
          │
          └─→ completedLessons = total
              │
              └─→ progress = (completedLessons / totalLessons) * 100
                  │
                  └─→ Update progress bar width
                      │
                      └─→ Update % display
                          │
                          └─→ End
```

---

## 🎨 Color State Matrix

```
Element              Default    Hover      Active     Completed
────────────────────────────────────────────────────────────────
Module Header        white      gray-50    gray-100   N/A
Module Title         gray-800   gray-800   gray-900   gray-800
Module Progress      gray-200   gray-300   blue-600   blue-600

Lesson Container     gray-100   blue-50    blue-100   gray-100
Lesson Title         gray-800   gray-800   blue-800   gray-600
Lesson Checkbox      gray-300   blue-400   green-500  green-500
Lesson Badge         blue-100   blue-200   blue-300   gray-100

Button Primary       blue-600   blue-700   blue-800   N/A
Button Secondary     white      blue-50    blue-100   N/A
Button Success       green-600  green-700  green-800  N/A

Text Primary         gray-900   gray-900   gray-900   gray-900
Text Secondary       gray-600   gray-700   gray-800   gray-600
Text Tertiary        gray-500   gray-600   gray-700   gray-500
```

---

## 🔄 Component Lifecycle

```
MOUNT
  │
  ├─→ useState hooks initialize
  │   ├─ courseData = mockCourseData
  │   ├─ expandedModules = {}
  │   └─ currentLesson = null
  │
  ├─→ Component renders
  │   ├─ Header section
  │   ├─ Progress bar
  │   ├─ Main content grid
  │   └─ (Modal if currentLesson set)
  │
  └─→ Ready for interaction

INTERACTION
  │
  ├─→ User clicks element
  ├─→ Event handler fires
  ├─→ State updates
  ├─→ Component re-renders
  └─→ UI reflects changes

UNMOUNT
  │
  └─→ Component cleanup
      └─→ State preserved in parent
```

---

## 📱 Responsive Grid Layout

```javascript
/* Mobile (< 640px) */
grid-cols-1

/* Tablet (640px - 1024px) */
md:grid-cols-1 (still 1 for sidebar + content)

/* Desktop (> 1024px) */
lg:grid-cols-4
  └─→ Sidebar: col-span-1 (25%)
  └─→ Content: col-span-3 (75%)

/* Extra Large (> 1280px) */
Same as desktop, max-width constraint applied
```

---

## 🎬 Modal Animation Flow

```
Lesson clicked
    │
    ├─→ setCurrentLesson(lesson)
    ├─→ Modal overlay renders (z-50)
    │   │
    │   ├─→ Fade in animation
    │   ├─→ Background blur
    │   └─→ Lock body scroll
    │
    ├─→ Modal content slides in
    └─→ Ready for interaction

Close button clicked
    │
    ├─→ setCurrentLesson(null)
    ├─→ Modal fades out
    ├─→ Background blur removed
    └─→ Body scroll unlocked
```

---

## 🌳 Component Tree

```
<CourseContent>
  ├─ <div> Header Container
  │  ├─ <h1> Course Title
  │  ├─ <p> Description
  │  └─ Instructor Info
  │
  ├─ <div> Progress Header (Sticky)
  │  ├─ <p> Label
  │  └─ Progress Bar
  │
  ├─ <div> Main Grid
  │  ├─ <div> Sidebar
  │  │  ├─ Buttons
  │  │  ├─ Course Info Card
  │  │  └─ Prerequisites Card
  │  │
  │  └─ <div> Main Content
  │     ├─ Requirements Section
  │     ├─ Curriculum Section
  │     │  └─ {modules.map(module => 
  │     │     <div> Module
  │     │      └─ {expandedModules[id] && lessons.map(lesson => ...)}
  │     │     )}
  │     └─ Completion Info
  │
  └─ {currentLesson && (
     <div> Modal
       ├─ Header
       ├─ Video Placeholder
       ├─ Lesson Content
       ├─ Resources
       └─ Actions
     )
   }
```

---

## 📊 State Update Sequence Diagram

```
User Action: Mark Lesson Complete
═════════════════════════════════════════════════════════

1. User clicks checkbox
   └─→ onClick event fires
       └─→ handleMarkComplete(moduleId, lessonId)

2. Function called
   └─→ setCourseData(prevState => ({
       ...prevState,
       modules: prevState.modules.map(module =>
         module.id === moduleId ? {
           ...module,
           lessons_detail: module.lessons_detail.map(lesson =>
             lesson.id === lessonId ? 
             { ...lesson, isCompleted: !lesson.isCompleted } : 
             lesson
           ),
           completed: newCount // Recalculated
         } : module
       )
     }))

3. State updates
   └─→ Component re-renders
       └─→ Progress recalculated
           └─→ Progress bar updates
               └─→ Checkbox icon changes
                   └─→ Title styling changes
                       └─→ Module count updates
                           └─→ Progress percentage updates

4. Visual updates
   └─→ Smooth transitions applied
       └─→ User sees changes
           └─→ Ready for next interaction
```

---

This architecture provides a clear understanding of how the component is structured, flows, and manages state!
