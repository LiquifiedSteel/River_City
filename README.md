# West Fargo Public Schools Facility Rental Application

This application serves as the modernized rental platform for the West Fargo Public Schools (WFPS), replacing outdated systems with a user-friendly interface. It simplifies the rental request process for customers while providing robust administrative tools for managing requests. The application is mobile-friendly and supports administrators with data export and editing capabilities.

---

## Features

### Core Features
- **Multi-Page Rental Application Form**: Users can submit requests to rent school facilities with real-time validation.
- **Admin Dashboard**:
  - View and manage submitted requests.
  - Search, filter, and edit requests.
  - Export data to Excel.
- **Mobile-Friendly Design**: Ensures usability on both desktop and mobile devices.
- **Captcha Protection**: Blocks spam requests.
- **Cloudinary Integration**: Stores uploaded documents (e.g., liability insurance).
- **Excel Export**: Enables exporting requests for administrative use.

### Technologies Used
- **Frontend**: React, Redux, Bootstrap, Emotion
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Utilities**: ExcelJS, Cloudinary, Captcha
- **Hosting**: Fly.io

---

## Prerequisites

Ensure the following tools are installed on your system:
- **Node.js** (version 14 or above)
- **PostgreSQL** (version 12 or above)
- **Visual Studio Code (VSCode)** or any preferred IDE

---

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/wfps-rental-app.git
   cd wfps-rental-app
Install dependencies:

```bash
npm install
```

Configure .env file: Create a .env file in the root directory with the following values:

```
DATABASE_URL=your_postgres_connection_string
CLOUDINARY_URL=your_cloudinary_url
SESSION_SECRET=your_session_secret
CAPTCHA_SITE_KEY=your_recaptcha_site_key
CAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

### Set up the PostgreSQL database:

Create the database using your PostgreSQL client.

## Start the application:

### Run the front-end:

```
npm run client
```

### Run the server/backend:

```
npm run server
```
### Access the application:

Frontend: [http://localhost:5173](http://localhost:5173/)

Backend: http://localhost:5001

## Project Structure

### Frontend:

**Built with React and Redux, styled with Bootstrap and Emotion.**
Located in /src.

### Backend:

**Built with Express and connected to PostgreSQL.**
API endpoints handle form submission, data retrieval, and Excel export.

### Database:

**Stores user-submitted data, admin credentials, and location availability.**

### Hosting:

**Deployed on Fly.io**

## Usage

### Users

Navigate to the public-facing form (via WFPS website iframe or direct link).
Fill out the rental application with event details.
Submit the form and receive a confirmation.

### Admins

Log in via the admin portal.
Access the dashboard to view submitted forms.
Edit or view forms as needed.
Export filtered data to Excel or PDF.

## Scope Overview

### Objectives

**To streamline the facility rental process by:**

- Reducing manual entry for admin staff.
- Providing users with a straightforward submission process.
- Integrating seamlessly with existing WFPS workflows.

### Deliverables

- User-friendly, mobile-first design.
- Secure admin tools for managing submissions.

**For a detailed scope, refer to the Scope Document.**
