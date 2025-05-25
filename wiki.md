```markdown
# Project Summary
The AIMASTER project is an online course subscription platform that offers a rich educational experience akin to MasterClass. Users can browse, filter, and enroll in a wide range of courses through an intuitive interface built with React and Tailwind CSS. The platform enhances user engagement with detailed course descriptions, instructor profiles, and interactive features, ensuring a high-quality learning environment. AIMASTER is publicly accessible, providing users with a seamless experience.

# Project Module Description
The platform includes several functional modules:
- **Homepage**: Showcases featured courses and a hero section.
- **Courses Page**: Enables users to browse and filter courses.
- **Course Page**: Displays detailed information about individual courses.
- **Instructors Page**: Lists all instructors with detailed profiles.
- **Instructor Detail Page**: Provides in-depth information about specific instructors and their courses.
- **Subscription Page**: Outlines various membership options and features.
- **Context Management**: Utilizes React Context for managing course data.
- **Custom Hooks**: Assists in fetching and processing course data.
- **Image Management**: Manages high-quality images for courses and instructors.

# Directory Tree
```
.
├── code.ipynb                   # Jupyter notebook for data analysis
├── processed_courses.json       # JSON file containing processed course data
├── react_template/              # React application directory
│   ├── README.md                # Documentation for the React template
│   ├── eslint.config.js         # ESLint configuration file
│   ├── index.html               # Main HTML file for the application
│   ├── package.json             # Project dependencies and scripts
│   ├── postcss.config.js        # PostCSS configuration file
│   ├── public/                  # Public assets
│   │   └── data/
│   │       ├── example.json     # Example JSON data
│   │       └── processed_courses.json # Processed course data for the app
│   │   └── images/
│   │       ├── courses/         # Course cover images
│   │       └── instructors/     # Instructor profile images
│   ├── src/                     # Source code directory
│   │   ├── App.jsx              # Main application component
│   │   ├── components/          # Reusable components
│   │   │   ├── Footer.jsx       # Footer component
│   │   │   └── Header.jsx       # Header component
│   │   ├── context/             # Context API files
│   │   │   └── CourseContext.jsx# Course context for managing data
│   │   ├── hooks/               # Custom hooks
│   │   │   └── useCourses.jsx   # Hook for fetching course data
│   │   ├── pages/               # Page components
│   │   │   ├── CoursePage.jsx   # Individual course details page
│   │   │   ├── CoursesPage.jsx   # Page to list all courses
│   │   │   ├── InstructorsPage.jsx # Page to list all instructors
│   │   │   ├── InstructorDetailPage.jsx # Instructor detail page
│   │   │   └── SubscriptionPage.jsx # Subscription options page
│   │   ├── utils/               # Utility functions
│   │   │   └── api.js           # API utility functions
│   │   └── styles/              # Styling utilities
│   │       └── index.css        # Main CSS file for styles
└── uploads/
    └── curso.txt                 # Uploaded course-related text file
```

# File Description Inventory
- **code.ipynb**: Jupyter notebook for data analysis.
- **processed_courses.json**: Contains structured data for courses.
- **react_template/**: Directory for the React application containing source code, configurations, and assets.
- **public/images/**: Directory containing high-quality images for courses and instructors.

# Technology Stack
- **Frontend**: React, Tailwind CSS, JavaScript
- **Build Tool**: Vite
- **State Management**: React Context API
- **Package Manager**: pnpm

# Usage
1. **Install Dependencies**: Navigate to the `react_template` directory and run:
   ```
   pnpm install
   ```
2. **Build and Run**: Execute the following commands:
   ```
   pnpm run lint
   pnpm run build
   pnpm run dev
   ```
