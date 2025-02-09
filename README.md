# Contact Management Application

A full-stack contact management system built with Django REST Framework and Next.js. This application allows users to manage contacts and categories with full CRUD functionality.

## Table of Contents
- [Features](#features)
- [System Requirements](#system-requirements)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Deployment](#deployment)

## Features
- Contact management (Create, Read, Update, Delete)
- Category management
- Search and filter contacts
- Responsive design
- RESTful API
- Real-time form validation

## System Requirements
- Python 3.9 or higher
- Node.js 18.x or higher
- npm 9.x or higher
- Git
- Available ports:
  - Port 8000 (Django API server)
  - Port 3000 (Next.js primary port)
  - Port 3001 (Next.js fallback port)

## Port Requirements
Before starting the application, ensure the following ports are not in use:

# Check if ports are in use (macOS/Linux)
- lsof -i :8000  # For Django API
- lsof -i :3000  # For Next.js primary port
- lsof -i :3001  # For Next.js fallback port

# Check if ports are in use (Windows)
- netstat -ano | findstr :8000
- netstat -ano | findstr :3000
- netstat -ano | findstr :3001


## Tech Stack
### Backend
- Django 4.x
- Django REST Framework
- SQLite (default database)
- CORS headers

### Frontend
- Next.js 14
- React Query
- Tailwind CSS
- shadcn/ui components
- TypeScript

## Getting Started

# Prerequisites
Before starting the installation, ensure all [System Requirements](#system-requirements) are met and required ports are available.

### Backend Setup
1. Clone the repository:

- ```git clone <repository-url>```
- ```cd contact-management-system```

2. Create and activate a virtual environment:

# For Windows
- ```python -m venv venv```
- ```venv\Scripts\activate```

# For macOS/Linux
- ```python3 -m venv venv```
- ```source venv/bin/activate```
# Navigate to backend directory
```cd contacts_project```

# Install requirements
- ```pip install django```
- ```pip install djangorestframework```
- ```pip install django-cors-headers```
- ```pip install -r requirements.txt```

# Create initial migrations
```python manage.py makemigrations contacts_api```

# Apply migrations
```python manage.py migrate```

# Follow the prompts to create your admin account
```python manage.py createsuperuser```

# Start the Django development server

```python manage.py runserver```

### Frontend Setup

# Navigate to backend directory
```cd contacts_frontend```

# Install frontend dependencies:
```npm install```
# Start the development server:

- ```npm run dev```
The frontend application will be running at ```http://localhost:3000```

# Deployment Guide

## Backend Deployment (AWS)

### 1. Setup AWS ECS (Elastic Container Service)
- Create an **ECS cluster**
- Define a **task definition**
- Set up an **Application Load Balancer**
- Configure **security groups**

### 2. Database Setup
- Create an **RDS instance** for PostgreSQL
- Update Django settings to use the production database

### 3. Environment Variables
```python
DEBUG=False
ALLOWED_HOSTS=["your-domain.com"]
DATABASE_URL=postgresql://user:password@host:port/dbname
```

### 4. Static Files Configuration
- Configure an **S3 bucket** for static files
- Update Django settings to use S3 for static files

---

## Frontend Deployment (Vercel)

### 1. Connect to Vercel
```bash
npm i -g vercel
vercel login
```

### 2. Deploy the Frontend
```bash
vercel
```

### 3. Set Environment Variables on Vercel
- Set **NEXT_PUBLIC_API_URL** to your production API URL

### 4. Production Build
```bash
npm run build
```

---

## Notes
- Ensure all **environment variables** are correctly set in AWS and Vercel
- Use **IAM roles and policies** to manage AWS resources securely
- Regularly **monitor logs and errors** for debugging and optimization
- Use **CI/CD pipelines** for automated deployments



