/**
 * Advanced Styling & Customization Guide
 * 
 * This file demonstrates advanced styling and customization options
 * for the CourseContent component using Tailwind CSS and CSS variables
 */

/* ============================================
   1. TAILWIND CSS CUSTOM CONFIGURATION
   ============================================ */

/**
 * Add to tailwind.config.js for custom course styling
 */

const courseCustomConfig = {
  theme: {
    extend: {
      colors: {
        // Course brand colors
        'course-primary': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        },
        'course-success': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
        'course-warning': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      spacing: {
        'module-padding': '1.5rem',
        'lesson-padding': '1rem',
        'content-gap': '2rem',
      },
      borderRadius: {
        'module': '0.75rem',
        'lesson': '0.5rem',
      },
      fontSize: {
        'module-title': ['1.25rem', '1.5rem'],
        'lesson-title': ['1rem', '1.25rem'],
      },
      boxShadow: {
        'module': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'module-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'lesson': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'progress-bar': 'inset 0 1px 3px 0 rgb(0 0 0 / 0.1)',
      },
      animation: {
        'progress-pulse': 'progress-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        'progress-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'slide-down': {
          from: {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
};

/* ============================================
   2. CSS VARIABLES FOR DYNAMIC THEMING
   ============================================ */

/**
 * Add this to your global CSS file (src/index.css)
 * Allows dynamic theme switching without changing component code
 */

const courseThemingCSS = `
:root {
  /* Primary Colors */
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  --color-primary-200: #bae6fd;
  --color-primary-300: #7dd3fc;
  --color-primary-400: #38bdf8;
  --color-primary-500: #0ea5e9;
  --color-primary-600: #0284c7;
  --color-primary-700: #0369a1;
  --color-primary-800: #075985;
  --color-primary-900: #0c3d66;

  /* Success Colors */
  --color-success-50: #f0fdf4;
  --color-success-100: #dcfce7;
  --color-success-200: #bbf7d0;
  --color-success-300: #86efac;
  --color-success-400: #4ade80;
  --color-success-500: #22c55e;
  --color-success-600: #16a34a;

  /* Spacing */
  --spacing-module-padding: 1.5rem;
  --spacing-lesson-padding: 1rem;
  --spacing-content-gap: 2rem;

  /* Border Radius */
  --radius-module: 0.75rem;
  --radius-lesson: 0.5rem;

  /* Shadows */
  --shadow-module: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-module-hover: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* Z-index */
  --z-progress-header: 40;
  --z-lesson-modal: 50;
  --z-tooltip: 100;
}

/* Dark theme variant */
[data-theme="dark"] {
  --color-primary-50: #0c3d66;
  --color-primary-100: #075985;
  --color-primary-200: #0369a1;
  --color-primary-300: #0284c7;
  --color-primary-400: #0ea5e9;
  --color-primary-500: #38bdf8;
  --color-primary-600: #7dd3fc;
  --color-primary-700: #bae6fd;
  --color-primary-800: #e0f2fe;
  --color-primary-900: #f0f9ff;
}

/* High contrast theme */
[data-theme="high-contrast"] {
  --color-primary-600: #000000;
  --color-primary-500: #000000;
  --color-success-600: #000000;
}
`;

/* ============================================
   3. COMPONENT-SPECIFIC TAILWIND CLASSES
   ============================================ */

// Header Section Classes
const headerClasses = {
  container: "bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4",
  title: "text-4xl font-bold mb-4",
  description: "text-blue-100 text-lg mb-6 leading-relaxed",
  statItem: "flex items-center gap-2",
  statLabel: "font-semibold",
};

// Progress Bar Classes
const progressClasses = {
  container: "bg-white border-b border-gray-200 py-6 px-4 sticky top-0 z-40 shadow-sm",
  label: "text-gray-700 font-semibold",
  sublabel: "text-sm text-gray-500 mt-1",
  percentage: "text-2xl font-bold text-blue-600",
  barContainer: "w-full bg-gray-200 rounded-full h-3 overflow-hidden",
  barFill: "bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300",
};

// Module Classes
const moduleClasses = {
  container: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition",
  header: "w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition",
  title: "font-bold text-lg text-gray-800 text-left",
  progressBar: "w-20 h-2 bg-gray-200 rounded-full overflow-hidden",
  progressFill: "bg-blue-600 h-full rounded-full transition-all",
};

// Lesson Classes
const lessonClasses = {
  container: "px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition cursor-pointer group",
  iconContainer: "flex items-center gap-3 flex-shrink-0 mt-1",
  title: "font-semibold text-gray-800",
  completed: "text-gray-600 line-through",
  badge: "inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize",
  duration: "flex items-center gap-2 text-sm text-gray-500",
  playButton: "flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition transform hover:scale-110",
};

// Sidebar Classes
const sidebarClasses = {
  container: "lg:col-span-1",
  button: "w-full font-bold py-3 px-4 rounded-lg transition",
  primaryButton: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex items-center justify-center gap-2 shadow-lg transform hover:scale-105",
  secondaryButton: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2",
  infoCard: "bg-white rounded-lg shadow-md p-6",
};

// Modal Classes
const modalClasses = {
  overlay: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4",
  container: "bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",
  header: "sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex items-center justify-between",
  closeButton: "text-white hover:bg-blue-700 p-2 rounded-lg transition",
  content: "p-6",
  videoPlaceholder: "bg-gray-800 aspect-video rounded-lg mb-6 flex items-center justify-center",
};

/* ============================================
   4. RESPONSIVE DESIGN UTILITIES
   ============================================ */

const responsiveUtils = {
  // Desktop-first approach
  mobileHide: "hidden md:block",
  desktopHide: "md:hidden",
  
  // Grid layouts
  gridMobile: "grid-cols-1",
  gridTablet: "md:grid-cols-2",
  gridDesktop: "lg:grid-cols-3 xl:grid-cols-4",
  
  // Font sizes
  headingMobile: "text-2xl md:text-3xl lg:text-4xl",
  textMobile: "text-sm md:text-base lg:text-lg",
  
  // Padding
  paddingMobile: "px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8",
  
  // Spacing gaps
  gapMobile: "gap-4 md:gap-6 lg:gap-8",
};

/* ============================================
   5. ANIMATION UTILITIES
   ============================================ */

const animationUtils = {
  // Transitions
  smooth: "transition-all duration-300 ease-out",
  slow: "transition-all duration-500 ease-out",
  fast: "transition-all duration-150 ease-out",
  
  // Hover effects
  hoverScale: "hover:scale-105 transition-transform",
  hoverLift: "hover:shadow-lg hover:-translate-y-1 transition",
  hoverBright: "hover:brightness-110 transition-brightness",
  
  // Opacity effects
  fadeIn: "animate-fade-in",
  slideDown: "animate-slide-down",
  
  // Loading states
  pulse: "animate-pulse",
  spin: "animate-spin",
};

/* ============================================
   6. DARK MODE SUPPORT
   ============================================ */

const darkModeUtils = {
  darkBg: "bg-white dark:bg-gray-900",
  darkBgSecondary: "bg-gray-50 dark:bg-gray-800",
  darkText: "text-gray-900 dark:text-white",
  darkTextSecondary: "text-gray-600 dark:text-gray-400",
  darkBorder: "border-gray-200 dark:border-gray-700",
  darkHover: "hover:bg-gray-100 dark:hover:bg-gray-800",
};

/* ============================================
   7. ACCESSIBILITY UTILITIES
   ============================================ */

const a11yUtils = {
  // Focus states
  focusOutline: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
  focusDark: "dark:focus:ring-offset-gray-900",
  
  // High contrast
  highContrast: "contrast-150",
  
  // Reduced motion
  prefersReducedMotion: "motion-safe:animate-bounce motion-reduce:animate-none",
  
  // Skip to content
  skipLink: "absolute left-0 top-0 z-50 px-4 py-2 bg-black text-white translate-y-full focus:translate-y-0 transition-transform",
};

/* ============================================
   8. UTILITY COMPONENT CLASSES
   ============================================ */

const utilityComponents = {
  // Badges
  badge: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
  badgePrimary: "bg-blue-100 text-blue-800",
  badgeSuccess: "bg-green-100 text-green-800",
  badgeWarning: "bg-yellow-100 text-yellow-800",
  badgeError: "bg-red-100 text-red-800",
  
  // Cards
  card: "bg-white rounded-lg shadow-md hover:shadow-lg transition",
  cardInset: "bg-gray-50 rounded-lg p-4",
  
  // Buttons
  btn: "font-bold py-2 px-4 rounded-lg transition transform hover:scale-105",
  btnPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
  btnSecondary: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  btnSuccess: "bg-green-600 hover:bg-green-700 text-white",
  btnDanger: "bg-red-600 hover:bg-red-700 text-white",
  
  // Input styles
  input: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
  
  // Lists
  listItem: "flex items-start gap-2 text-sm text-gray-700",
  listIcon: "w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5",
};

/* ============================================
   9. BREAKPOINT REFERENCES
   ============================================ */

const breakpoints = {
  // Tailwind default breakpoints
  sm: '640px',   // Small devices (phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px',  // Large devices (laptops)
  xl: '1280px',  // Extra large (desktops)
  '2xl': '1536px', // 2x extra large (large monitors)
  
  // Usage: className="block md:hidden lg:block"
  usage: {
    mobileOnly: "block md:hidden",
    tabletUp: "hidden md:block",
    desktopUp: "hidden lg:block",
    tabletOnly: "hidden md:block lg:hidden",
  }
};

/* ============================================
   10. PERFORMANCE OPTIMIZATION CLASSES
   ============================================ */

const performanceClasses = {
  // GPU acceleration
  willChange: "will-change-transform",
  accelerate: "translate-z-0", // Forces GPU acceleration
  
  // Lazy loading
  lazyLoad: "lazy",
  
  // Content visibility
  contentVisibility: "content-visibility-auto",
  
  // Container queries (future)
  container: "@container",
};

/* ============================================
   11. CUSTOM GRADIENT BACKGROUNDS
   ============================================ */

const gradients = {
  headerGradient: "bg-gradient-to-r from-blue-600 to-blue-800",
  softGradient: "bg-gradient-to-br from-gray-50 to-gray-100",
  accentGradient: "bg-gradient-to-r from-blue-500 to-blue-600",
  progressGradient: "bg-gradient-to-r from-green-400 to-green-600",
  warningGradient: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  errorGradient: "bg-gradient-to-r from-red-400 to-red-600",
  
  // Radial gradients (CSS)
  radialBg: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 100%)",
};

/* ============================================
   12. SAMPLE THEME VARIANTS
   ============================================ */

const themeVariants = {
  light: {
    background: "bg-white",
    surface: "bg-gray-50",
    text: "text-gray-900",
    border: "border-gray-200",
    primary: "blue-600",
  },
  dark: {
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    border: "border-gray-700",
    primary: "blue-400",
  },
  highContrast: {
    background: "bg-white",
    surface: "bg-black",
    text: "text-black",
    border: "border-black",
    primary: "black",
  },
};

export {
  headerClasses,
  progressClasses,
  moduleClasses,
  lessonClasses,
  sidebarClasses,
  modalClasses,
  responsiveUtils,
  animationUtils,
  darkModeUtils,
  a11yUtils,
  utilityComponents,
  breakpoints,
  performanceClasses,
  gradients,
  themeVariants,
  courseCustomConfig,
  courseThemingCSS,
};
