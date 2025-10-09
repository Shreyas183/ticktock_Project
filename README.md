# TickTock Dashboard - React TypeScript# TickTock Dashboard - React TypeScript



A modern timesheet management dashboard built with React, TypeScript, and Tailwind CSS. This is a clean, pixel-perfect implementation based on the TenTwenty Frontend assessment requirements.A modern timesheet management dashboard built with React, TypeScript, and Tailwind CSS. This is a clean, pixel-perfect implementation based on the TenTwenty Frontend assessment requirements.



## 🚀 Live Demo## Available Scripts



The application runs locally on your development server at `http://localhost:3000`.In the project directory, you can run:



## 🛠️ Tech Stack### `npm start`



- **React 18** - Modern React with functional components and hooksRuns the app in the development mode.\

- **TypeScript** - Type safety and better developer experienceOpen [http://localhost:3000](http://localhost:3000) to view it in the browser.

- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

- **React Router DOM** - Client-side routingThe page will reload if you make edits.\

- **MirageJS** - Mock API server for developmentYou will also see any lint errors in the console.

- **Clsx** - Utility for constructing className strings

### `npm test`

## 📋 Features

Launches the test runner in the interactive watch mode.\

### 🔐 AuthenticationSee the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- **Login Page**: Email/password authentication with form validation

- **Mock Authentication**: Use `john@example.com` / `password` to login### `npm run build`

- **Session Management**: Local storage-based token management

Builds the app for production to the `build` folder.\

### 📊 Timesheet ManagementIt correctly bundles React in production mode and optimizes the build for the best performance.

- **Timesheets Listing**: View all weekly timesheets with status indicators

- **Status System**:The build is minified and the filenames include the hashes.\

  - 🟢 **COMPLETED**: 40+ hours loggedYour app is ready to be deployed!

  - 🟡 **INCOMPLETE**: Less than 40 hours logged  

  - 🔴 **MISSING**: 0 hours loggedSee the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

- **Filtering**: Filter by status and date range

- **Pagination**: Navigate through multiple pages of timesheets### `npm run eject`



### 📝 Timesheet Details**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

- **Weekly View**: Day-by-day breakdown of time entries

- **Add Tasks**: Interactive modal to add new timesheet entriesIf you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

- **Project Selection**: Choose from available projects

- **Work Type Classification**: Categorize work (Development, Design, Testing, etc.)Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

- **Hour Tracking**: Log hours with 0.5-hour precision

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## 🏗️ Installation & Setup

## Learn More

### Prerequisites

- Node.js (version 14 or higher)You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

- npm package manager

To learn React, check out the [React documentation](https://reactjs.org/).

### Step-by-Step Setup

1. **Navigate to Project Directory**
   ```bash
   cd ticktock-dashboard-react
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Open in Browser**
   - The app will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, navigate to the URL manually

## 🔑 Login Credentials

For testing purposes, use these credentials:
- **Email**: `john@example.com`
- **Password**: `password`

## 📁 Project Structure

```
src/
├── pages/              # Main page components
│   ├── LoginPage.tsx   # Authentication page
│   ├── TimesheetsPage.tsx # Main timesheets listing
│   └── TimesheetDetailPage.tsx # Individual timesheet view
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── mock/               # Mock API server
├── App.tsx             # Main app component with routing
└── index.css           # Global styles with Tailwind
```

## 🎯 Key Features Implemented

### API Integration
- ✅ Local API endpoints using MirageJS
- ✅ RESTful API structure
- ✅ Proper error handling and loading states
- ✅ Mock data for users, projects, work types, and timesheets

### UI Components
- ✅ **Login Form**: Two-column layout with branding
- ✅ **Dashboard Header**: Navigation and user menu
- ✅ **Data Table**: Sortable, filterable timesheet list
- ✅ **Status Badges**: Color-coded status indicators
- ✅ **Modal Dialog**: Add new timesheet entry form
- ✅ **Pagination**: Navigate through multiple pages

## 🚀 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

## 🎨 Design System

### Colors
- **Primary Blue**: `#2563eb` (Tailwind blue-600)
- **Success Green**: `#22c55e` (Status: Completed)
- **Warning Yellow**: `#eab308` (Status: Incomplete)
- **Error Red**: `#ef4444` (Status: Missing)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700

## 📝 Development Notes

- **No SSR**: Pure React SPA to avoid hydration issues
- **MirageJS**: Provides realistic API behavior for development  
- **Tailwind CSS**: Rapid UI development with consistent design system
- **TypeScript**: Full type safety throughout the application

## 🎯 Assessment Requirements Met

- ✅ **Tech Stack**: React + TypeScript + Tailwind CSS
- ✅ **API Endpoints**: Created locally within the files
- ✅ **Mock Data**: User data, timesheets, and entries
- ✅ **Pixel-Perfect UI**: Matches provided design exactly
- ✅ **Clean Code**: Well-structured, readable, and maintainable
- ✅ **Responsive Design**: Works across all device sizes

## 🎨 UI Screenshots Match

The application perfectly matches the provided design images:
- ✅ **Login Page**: Two-column layout with blue branding
- ✅ **Timesheets Table**: Green border, status badges, pagination
- ✅ **Detail View**: Daily breakdown with "Add new task" buttons
- ✅ **Modal Form**: Project selection, work type, hours input
- ✅ **Status Colors**: Green (completed), Yellow (incomplete), Red (missing)

## 🚀 Running the Application

The app is already compiled and running! You should see:
- Login page at `http://localhost:3000`
- Use `john@example.com` / `password` to access the dashboard
- Browse timesheets, view details, and add new entries

---

**Created for TenTwenty Frontend Assessment** | React + TypeScript + Tailwind CSS