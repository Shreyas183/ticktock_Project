TickTock Dashboard - React + TypeScript

A modern, responsive timesheet management dashboard built with React, TypeScript, and Tailwind CSS. This project implements a clean, pixel-perfect interface based on the TenTwenty Frontend assessment requirements.

🚀 Live Demo

The app runs locally at:

http://localhost:3000

🛠 Tech Stack

React 18 – Functional components and hooks

TypeScript – Strong typing for safer, more maintainable code

Tailwind CSS – Utility-first CSS for rapid UI development

React Router DOM – Client-side routing

MirageJS – Mock API server for development

Clsx – Utility for constructing className strings

📋 Features
🔐 Authentication

Login Page: Email/password form with validation

Mock Authentication: Use john@example.com / password

Session Management: Local storage-based token handling

📊 Timesheet Management

Timesheets Listing: Weekly timesheets with status indicators

Status System:

🟢 COMPLETED – 40+ hours logged

🟡 INCOMPLETE – Less than 40 hours

🔴 MISSING – 0 hours

Filtering: Filter by status and date range

Pagination: Navigate multiple pages

📝 Timesheet Details

Weekly View: Daily breakdown of time entries

Add Tasks: Interactive modal for new entries

Project Selection: Choose from available projects

Work Type Classification: Development, Design, Testing, etc.

Hour Tracking: Log time with 0.5-hour precision

🏗 Installation & Setup
Prerequisites

Node.js v14+

npm

Steps

Navigate to the project directory:

cd ticktock-dashboard-react


Install dependencies:

npm install


Start the development server:

npm start
Open in browser:

http://localhost:3000

🔑 Login Credentials

Email: john@example.com

Password: password

📁 Project Structure
src/
├── pages/                 # Main page components
│   ├── LoginPage.tsx
│   ├── TimesheetsPage.tsx
│   └── TimesheetDetailPage.tsx
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── mock/                  # Mock API server
├── App.tsx                # Main app component with routing
└── index.css              # Global styles with Tailwind

🎯 Key Features
API Integration

Local endpoints with MirageJS

RESTful structure with error handling

Mock data for users, projects, work types, and timesheets

UI Components

Login form with branding

Dashboard header with navigation and user menu

Sortable and filterable timesheet table

Color-coded status badges

Modal dialog for new entries

Pagination for multiple pages

🎨 Design System

Colors:

Primary Blue: #2563eb

Success Green: #22c55e

Warning Yellow: #eab308

Error Red: #ef4444

Typography:

Font Family: Inter

Weights: 300, 400, 500, 600, 700

📝 Development Notes

Pure React SPA (no SSR)

MirageJS for local API simulation

Tailwind CSS for rapid UI development

TypeScript for full type safety

🚀 Available Scripts

npm start – Runs the app locally

npm test – Runs tests in watch mode

npm run build – Builds the app for production

🎯 Assessment Requirements Met

Tech stack: React + TypeScript + Tailwind CSS

Pixel-perfect UI matching design

Responsive across devices

Mock API endpoints and data

Created for TenTwenty Frontend Assessment
