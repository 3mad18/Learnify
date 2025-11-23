# 🎨 Course Management Editor - Visual Guide

## Component Visual Structure

### Main Component Layout

```
┌────────────────────────────────────────────────────────────┐
│                    COURSE HEADER                           │
│  [ Edit: Course Title ] | [Edit: Description]             │
│  Instructor: John Doe                                      │
│  Students: 150                                             │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  PROGRESS BAR (Sticky)                                     │
│  [■■■■■░░░░░] 50% Complete (15/30 lessons)               │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  [ + Add New Module ] Button                               │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ ▼ MODULE 1: Introduction                                   │
│   Progress: [■■■■░░░░] 40% (2/5)                          │
│   Description: Getting started with basics                │
│   [ + Add Lesson ] [Edit] [Delete]                        │
│   ├─ ☑ Lesson 1: Welcome (10 min)                         │
│   │  [Edit] [Delete]                                      │
│   ├─ ☐ Lesson 2: Installation (15 min)                    │
│   │  [Edit] [Delete]                                      │
│   ├─ ☐ Lesson 3: Setup (10 min)                           │
│   │  [Edit] [Delete]                                      │
│   └─ [─ Edit Module Form ─]                               │
│      Title: [ Module 1: Introduction ]                    │
│      Description: [ Getting started... ]                  │
│      [Save] [Cancel]                                      │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ ▶ MODULE 2: Advanced Concepts                              │
│   Progress: [■■■■■■■░░] 70% (7/10)                        │
│   Description: Dive deeper into concepts                  │
│   [ + Add Lesson ] [Edit] [Delete]                        │
│   (Collapsed - click to expand)                           │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ ▼ MODULE 3: Projects                                       │
│   Progress: [░░░░░░░░░░] 0% (0/3)                         │
│   Description: Real-world projects                        │
│   [ + Add Lesson ] [Edit] [Delete]                        │
│   ├─ ☐ Lesson 1: Project Setup                            │
│   └─ ☐ Lesson 2: Build it                                 │
│      [─ Editing Lesson... ─]                              │
│      Title: [ Lesson 2: Build it ]                        │
│      Description: [ Complete the project ]                │
│      Duration: [ 30 min ]                                 │
│      [Save] [Cancel]                                      │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                    COURSE SUMMARY                          │
│  Total Modules: 3                                          │
│  Total Lessons: 18                                         │
│  Completed: 9                                              │
│  Overall Progress: 50%                                     │
│                                                            │
│  [ Export Course as JSON ] [ Publish Course ]             │
└────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
User Action (Click Button)
    │
    ▼
Event Handler
    │
    ├─ Validate input
    │
    ▼
dispatch(action)
    │
    ├─ Type: ADD_MODULE
    ├─ Payload: { title, description }
    │
    ▼
courseReducer
    │
    ├─ Check action type
    ├─ Create new state
    ├─ Return updated state
    │
    ▼
Update Context State
    │
    ▼
Notify all subscribers
    │
    ▼
Re-render Components
    │
    ├─ CourseManagementEditor
    ├─ ModuleItem
    ├─ Progress Bar
    │
    ▼
UI Updated on Screen
    │
    ▼
Optional: API Call (save to backend)
    │
    ├─ axiosSecure.put()
    ├─ Server saves data
    │
    ▼
Success or Error
    │
    ▼
User sees result
```

---

## Component Hierarchy Tree

```
<CourseProvider>
  │
  └─ <CourseManagementEditor>
     │
     ├─ <CourseHeader>
     │  ├─ Title input (inline edit)
     │  └─ Description input (inline edit)
     │
     ├─ <ProgressHeader> [STICKY]
     │  ├─ Progress bar
     │  └─ Stats (X/Y lessons)
     │
     ├─ <Button>
     │  └─ + Add New Module
     │
     ├─ <ModulesList>
     │  │
     │  ├─ <ModuleItem>
     │  │  │
     │  │  ├─ <ModuleHeader>
     │  │  │  ├─ Expand/Collapse toggle
     │  │  │  ├─ Module title
     │  │  │  └─ Module progress bar
     │  │  │
     │  │  ├─ <LessonsList>
     │  │  │  │
     │  │  │  ├─ <LessonItem>
     │  │  │  │  ├─ Checkbox (complete toggle)
     │  │  │  │  ├─ Lesson title & description
     │  │  │  │  ├─ Duration
     │  │  │  │  ├─ Edit button
     │  │  │  │  └─ Delete button
     │  │  │  │
     │  │  │  ├─ <LessonItem>...
     │  │  │  │
     │  │  │  └─ <EditLessonForm>
     │  │  │     ├─ Title input
     │  │  │     ├─ Description textarea
     │  │  │     ├─ Duration input
     │  │  │     ├─ Save button
     │  │  │     └─ Cancel button
     │  │  │
     │  │  ├─ <Button>
     │  │  │  └─ + Add Lesson
     │  │  │
     │  │  ├─ <Button>
     │  │  │  └─ Edit Module
     │  │  │
     │  │  ├─ <Button>
     │  │  │  └─ Delete Module
     │  │  │
     │  │  └─ <EditModuleForm>
     │  │     ├─ Title input
     │  │     ├─ Description textarea
     │  │     ├─ Save button
     │  │     └─ Cancel button
     │  │
     │  ├─ <ModuleItem>...
     │
     ├─ <CourseSummary>
     │  ├─ Stats display
     │  ├─ Module count
     │  ├─ Lesson count
     │  └─ Progress percentage
     │
     └─ <Button>
        └─ Export Course as JSON
```

---

## State Structure Visualization

```
Course Data State:
{
  id: null
  title: "My Course" ◄── User can edit
  │
  description: "Learn..." ◄── User can edit
  │
  instructor: {
    name: "John" ◄── User can edit
    image: "url" ◄── User can edit
  }
  │
  totalStudents: 150 ◄── User can edit
  │
  modules: [ ◄── User can add/edit/delete
    {
      id: 1
      title: "Module 1" ◄── Editable
      │
      description: "..." ◄── Editable
      │
      lessons: [ ◄── User can add/edit/delete
        {
          id: 1
          title: "Lesson 1" ◄── Editable
          description: "..." ◄── Editable
          duration: "10 min" ◄── Editable
          isCompleted: false ◄── User can toggle
        }
      ]
      │
      completed: 1 ◄── Auto-calculated
      expanded: true ◄── UI state (user toggles)
    }
  ]
}
```

---

## Reducer Action Flow

```
Action: ADD_MODULE
├─ Payload: { title: "Module 1", description: "..." }
│
▼ Reducer processes
├─ Generate unique ID: Date.now()
├─ Create new module object
├─ Add to state.modules array
├─ Return new state (immutable)
│
▼ Context updates
├─ All subscribers notified
│
▼ Components re-render
├─ ModulesList updates
├─ Progress bar updates
├─ Module count updates
│
Result: New module appears on screen


Action: UPDATE_LESSON
├─ Payload: {
│    moduleId: 1,
│    lessonId: 5,
│    data: { title: "Updated", duration: "20 min" }
│  }
│
▼ Reducer processes
├─ Find module by ID
├─ Find lesson within module
├─ Update lesson properties
├─ Recalculate module progress
├─ Return new state
│
▼ Context updates
│
▼ Components re-render
├─ LessonItem updates
├─ Module progress updates
├─ Overall progress updates
│
Result: Lesson updated on screen
```

---

## Hook Usage Pattern

```
Hook: useCourse()
├─ Returns: { courseData, dispatch }
│  ├─ courseData: {
│  │   id, title, description,
│  │   instructor, modules, ...
│  │ }
│  │
│  └─ dispatch: (action) => void
│
Usage in Component:
│
const MyComponent = () => {
  const { courseData, dispatch } = useCourse();
  │
  ├─ Read: courseData.title
  ├─ Dispatch: dispatch(courseActions.addModule())
  │
  return <div>{courseData.title}</div>;
};
```

---

## API Call Flow

```
User clicks "Save"
│
▼
Component calls:
  axiosSecure.put(
    `/api/courses/${courseId}`,
    courseData
  )
│
▼
Request sent to backend:
  PUT /api/courses/1
  Headers: Authorization: Bearer {token}
  Body: { title, description, modules, ... }
│
▼
Backend processes:
  ├─ Authenticate user
  ├─ Validate data
  ├─ Check user is owner
  ├─ Save to database
  └─ Return updated data
│
▼
Frontend receives response:
  {
    success: true,
    data: { updated course data }
  }
│
▼
Update local state:
  dispatch(courseActions.loadCourse(response.data))
│
▼
UI updates automatically
│
Result: Saved successfully
```

---

## Module Expand/Collapse Visualization

```
Before Click:
┌──────────────────────────┐
│ ▶ MODULE 2 (Collapsed)   │
│  No lessons visible      │
└──────────────────────────┘

User clicks expand arrow (▶)

Action sent: dispatch(courseActions.toggleModule(moduleId))

Reducer processes: module.expanded = !module.expanded

After Click:
┌──────────────────────────┐
│ ▼ MODULE 2 (Expanded)    │
│  ├─ ☐ Lesson 1          │
│  ├─ ☐ Lesson 2          │
│  └─ ☐ Lesson 3          │
└──────────────────────────┘

User clicks collapse arrow (▼)
... repeats above
```

---

## Progress Calculation Visualization

```
Module Progress:
  Lessons: [
    { isCompleted: true },  ✓ 1
    { isCompleted: false }, 
    { isCompleted: true },  ✓ 2
    { isCompleted: false },
    { isCompleted: true }   ✓ 3
  ]
  
  Completed: 3 / 5 = 60%
  Progress Bar: [■■■░░] 60%

Overall Progress:
  Module 1: 4/5 (80%)
  Module 2: 3/5 (60%)
  Module 3: 2/3 (67%)
  
  Total: 9/13 = 69%
  Progress Bar: [■■■■■■░] 69%
```

---

## Form Inline Edit Flow

```
Initial State:
┌─────────────────────────┐
│ Module 1: Introduction  │ (Just text)
│ Description: Getting... │
│ [Edit] [Delete]         │
└─────────────────────────┘

User clicks [Edit]:

editingModule = 1 (stored in component state)

Transform to form:
┌─────────────────────────┐
│ Title: [Introduction  ] │ (Input field)
│ Desc:  [Getting...    ] │ (Textarea)
│ [Save] [Cancel]         │
└─────────────────────────┘

User enters "Advanced Intro" and clicks [Save]:

dispatch(courseActions.updateModule(1, {
  title: "Advanced Intro"
}))

Transform back to display:
┌─────────────────────────┐
│ Module 1: Advanced Intro│ (Back to text)
│ Description: Getting... │
│ [Edit] [Delete]         │
└─────────────────────────┘

editingModule = null (form closed)
```

---

## Delete Operation with Confirmation

```
User clicks [Delete Module]
│
▼
Show confirmation:
  "Are you sure you want to delete 'Module 1'?
   This will delete all 5 lessons in this module.
   This action cannot be undone."
  
  [Cancel] [Delete]
│
├─ User clicks [Cancel]
│  └─ Do nothing
│
└─ User clicks [Delete]
   │
   ▼
   dispatch(courseActions.deleteModule(moduleId))
   │
   ▼
   Reducer removes module from state.modules array
   │
   ▼
   All lessons in module are removed
   │
   ▼
   Progress bars update
   │
   ▼
   Module disappears from UI
   │
   Optional: API call to delete from backend
```

---

## Export to JSON Flow

```
User clicks [Export Course as JSON]
│
▼
Get current courseData
│
▼
courseUtils.exportCourseData(courseData)
│
▼
Convert to JSON string
│
▼
Create blob
│
▼
Create download link:
  <a href="blob:..." download="course.json">
│
▼
Simulate click to trigger download
│
▼
File saved as "course.json" to downloads folder
│
Result: User has JSON backup of course
```

---

## Keyboard Shortcuts Flow (if implemented)

```
User presses Ctrl+M
│
▼
Event captured by useKeyboardShortcuts hook
│
▼
Check if Ctrl+M
  ├─ Yes: dispatch(courseActions.addModule())
  └─ No: check other shortcuts
│
▼
Shortcut executed
│
Module added to course
│
Visual feedback: Modal or highlight
```

---

## Responsive Design Breakpoints

```
Mobile (< 640px):
┌─────────────────────┐
│ COURSE HEADER       │
├─────────────────────┤
│ [Progress: 50%]     │
├─────────────────────┤
│ [+ Add Module]      │
├─────────────────────┤
│ MODULE 1            │
│ [Description...]    │
│ [+] [Edit] [Delete] │
│ ├─ Lesson 1         │
│ ├─ Lesson 2         │
│ (Stacked, single col)
└─────────────────────┘

Tablet (640px - 1024px):
┌────────────────────────────┐
│      COURSE HEADER         │
├──────────────┬─────────────┤
│ [Progress]   │  [Add Mod]  │
└──────────────┴─────────────┘
│ MODULE 1 | MODULE 2        │
│ [...]    | [...]           │
(Multi-column, more space)

Desktop (> 1024px):
┌──────────────────────────────────────┐
│         COURSE HEADER                │
├──────────────┬──────────────┬────────┤
│ [Progress]   │  [Actions]   │  [*]   │
└──────────────┴──────────────┴────────┘
│ MOD 1 | MOD 2 | MOD 3      │ Sidebar│
│ [...] │ [...] │ [...]      │ Stats  │
(Full width, sidebar, optimized)
```

---

## Error Handling Flow

```
User action triggers validation
│
├─ Input validation error
│  ├─ Check: Title not empty
│  ├─ Check: Description provided
│  └─ If invalid: Show error message
│
├─ API call error
│  ├─ Network error
│  │  └─ Show: "Connection failed"
│  ├─ Validation error (400)
│  │  └─ Show: Field errors
│  ├─ Auth error (401)
│  │  └─ Redirect to login
│  └─ Server error (500)
│     └─ Show: Generic error message
│
└─ UI error
   ├─ Component not found
   ├─ State corruption
   └─ Show: Error boundary message
```

---

## Performance Optimization Visualization

```
Without Optimization:
┌──────────────┐
│ User Action  │
└───────┬──────┘
        │
    ┌───▼──────┐
    │ Save API │ (100 times in 10 seconds)
    └───┬──────┘
        │
    ┌───▼──────┐
    │ Server   │ (Overloaded!)
    └──────────┘

With Debounce (2 second wait):
┌──────────────┐
│ User Action  │ (100 times)
└───────┬──────┘
        │
   ┌────▼─────────────────────┐
   │ Debounce Buffer (2 sec)  │
   │ Wait for user to stop    │
   └────┬──────────────────────┘
        │
    ┌───▼──────┐
    │ Save API │ (1 time only!)
    └───┬──────┘
        │
    ┌───▼──────┐
    │ Server   │ (Efficient!)
    └──────────┘
```

---

## Documentation File Relationships

```
START HERE
    │
    ▼
COURSE_MANAGEMENT_SUMMARY.md
(Overview + quick start)
    │
    ├──────────────────────────┬──────────┐
    │                          │          │
    ▼                          ▼          ▼
QUICK_REF          DOCUMENTATION    IMPLEMENTATION
(Cheat sheet)      (Full features)   (Setup guide)
    │                  │                  │
    │                  ▼                  ▼
    │              API_REFERENCE      (Backend)
    │              (Functions)         ARCHITECTURE
    │                  │              (Deep dive)
    │                  │
    └──────────┬───────┴──────────────┘
               │
        ┌──────▼──────────┐
        │ ARCHITECTURE    │
        │ (Design)        │
        └─────────────────┘
```

---

**Version**: 1.0.0
**Status**: ✅ Complete
**Last Updated**: November 23, 2025
