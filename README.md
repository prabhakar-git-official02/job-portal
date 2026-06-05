# Job Portal

## Overview

A full-stack Job Portal application that connects Job Seekers and Recruiters with role-based access control.
The platform allows users to manage profiles, post jobs, apply for jobs, track application status, and manage recruitment workflows through dedicated dashboards.

## Live Deployment

* Frontend: Deployed on Vercel
* Backend: Deployed on Render

## Backend Tech Stack

* Node.js
* Express.js
* MongoDB
* Cloudinary
* Google OAuth
* JWT Authentication
* SendGrid

## Backend Features

* MVC Architecture
* RESTful API Development
* JWT-based Authentication & Authorization
* Google OAuth Integration
* Role-Based Access Control (Job Seeker, Recruiter, Admin)
* Password Hashing using Bcrypt
* Temporary Token Generation using Crypto
* Cloudinary Image Upload Integration
* SendGrid Email Services
* Authentication Middleware for Protected Routes
* Separate Private Middleware for Different User Roles
* CRUD Operations for Users, Profiles, Jobs, and Applications

## Frontend Tech Stack

* React.js
* Redux Toolkit
* JavaScript
* Bootstrap
* Material UI (MUI)
* HTML
* CSS

## Frontend Features

* State Management using Redux Toolkit
* Redux Slices for Modular State Handling
* Async API Handling with Redux Thunk
* Axios Interceptors for Automatic JWT Refresh Token Management
* Responsive User Interface using Bootstrap and Material UI
* Dynamic Dashboard Management
* Protected Routes and Role-Based Navigation

## User Roles & Features

### Job Seeker

* Create and Update Profile
* Browse Available Jobs
* Apply for Jobs
* Save Jobs
* Track Application Status
* View Interview Call Status
* Personalized Dashboard

### Recruiter

* Create and Update Profile
* Post New Jobs
* View and Edit Posted Jobs
* Track Applicants
* Update Applicant Status
* Recruitment Dashboard

### Admin

* Create and Update Profile
* Manage Recruiters and Job Seekers
* Monitor All User Profiles
* Review and Update Job Posts
* Administrative Dashboard

## Common Features

* Account Management
* Profile Update
* Change Password
* Reset Password
* Secure Authentication
* Logout Functionality

## Security Features

* JWT Authentication
* Role-Based Authorization
* Password Encryption with Bcrypt
* Protected Routes
* Secure Token Generation
* OAuth Authentication

## Project Highlights

* Scalable MVC Architecture
* Secure Authentication & Authorization
* Role-Based Access Control
* Real-Time Recruitment Workflow Management
* Cloud-Based Media Storage with Cloudinary
* Email Notification System with SendGrid
* Fully Responsive User Interface
* Production Deployment using Render and Vercel
