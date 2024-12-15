# Tactology Assessment Backend

# Tactology Assessment Frontend

## Overview

A Next.js 14 frontend application for department management, featuring authentication and interactive UI for managing departments.

## Technologies Used

- Next.js 14
- React
- TypeScript
- GraphQL (Apollo Client)
- Tailwind CSS
- React Hook Form
- Zod for validation

## Features

- User Authentication
  - Login and Registration
- Department Management
  - Create departments with sub-departments
  - Edit existing departments
  - Delete departments
- Route protection
- Form validation

## Prerequisites

- Node.js (v18+)
- npm

## Installation

1. Clone the repository

```bash
git clone https://github.com/Preshy-Jones/tactology_assessment_fe.git
cd tactology_assessment_fe
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add the following environment variables

```bash
NEXT_PUBLIC_BASE_API_URL=http://localhost:4000/graphql
```

for local development
or

```bash
NEXT_PUBLIC_BASE_API_URL=https://tactology-assessment.onrender.com/graphql/graphql
```

for production

4. Running the Application
   Development

```bash
npm run dev
```

Production

```bash
npm run build
npm run start
```

## PAGES

### Login Page

- Accessible at /login.
- Allows users to log in and obtain an access token.

### Departments Page

- Accessible at /departments (protected route).
- Displays a table of departments and their sub-departments.
- Allows creating, updating, and deleting departments.

## Authentication Flow

- Protected routes redirect unauthenticated users to login
- JWT token management
- Automatic redirection on token expiration

## Form Validation

- Form validation using React Hook Form and Zod
- Error messages displayed on form fields

## Deployment

- Hosted on Vercel
- Deployment URL: https://tactology-assessment-fe.vercel.app
