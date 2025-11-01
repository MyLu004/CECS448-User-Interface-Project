# 🏫 CECS 448 – Student Portal Redesign (Enrollment & Academic Requirements)

- [Figma Design](https://www.figma.com/design/BalN3zCiaa0U5G0PXvdGzY/Academic-Requirements?node-id=0-1&p=f  )
- [Website](https://cecs-448-user-interface-project.vercel.app/)
- [Presentation Slide](https://drive.google.com/file/d/1jFtTiXJE2z-_C61KfDN6uuzTIzMhV7dl/view?usp=sharing)




## 📖 Project Description

This project is the second phase of our usability improvement study for the **Student Center interface**.  
In a team of up to five members, we redesigned and implemented a **functional prototype** to address usability issues identified in **Project 1**.  

![Screenshot of the homepage project](/homePage448.png)

Our goal was to **fix and enhance** the following sections of the student website:

- **Enrollment Page**: streamline the course search, scheduling, and shopping cart process.  
- **Academic Requirements Page**: simplify degree audit and requirement visibility.  

The redesign focuses on improving **navigation clarity**, **layout consistency**, and **system feedback** to overcome at least two previously documented usability issues:
1. Confusing and inconsistent navigation in the enrollment system.  
2. Poor visibility and layout organization in academic progress reports.  

Built using **Next.js (React + TypeScript)** and **Tailwind CSS**, the new interface provides a more modern, responsive, and accessible experience for students.

## SET UP AND INSTALLATION
### 1. Clone the repository:
``` bash
git clone https://github.com/MyLu004/CECS448-User-Interface-Project.git
cd myapp
cd front end
```
### 2. Make sure to install all the dependencies before run the application
- requirement: node.js
``` bash
npm install
```

### 3. Run the development server
``` bash
npm run dev
```

- Open your local host/browser to visit the website:
```
http://localhost:5173
```
### 4. Build for production
- before push the code to the deployment branch, recommed to run build to test out the deployment env
``` bash
npm run build
npm start
```

## Feature and Function

**Enrollment System**
- Dynamic Course Search
    - Searches course data dynamically from .ts files instead of hardcoded values.
    - Supports filtering by class, instructor, section, and schedule.
- Shopping Cart Management
    - Add/remove courses with live updates using React Context.
    - Persistent storage using localStorage.
- Class Schedule View
    - Organized list of enrolled and planned courses.
    - Clean, card-based layout with time and instructor details.
- Sidebar Navigation (Enrollment Only)
    - Contextual sidebar appears only within enrollment routes.
    - Full-width “Back to Home” button and consistent navigation.

**Academic Requirement Page**
- View Report Section
    - Gold header card with “Degree Audit” and “General Education Requirements” options.
    - Partial rounded borders for aesthetic consistency.
- Lower Division Requirements
    - Integrated with the main AcademicPage layout.
    - Displays academic progress, remaining courses, and completion status.
- Modular Layout
    - Combines LeftInfo (ViewReport, Summary, etc.) and LowerDivision dynamically.

**Share system feature**
- Responsive UI – optimized for desktop and tablet screens using Tailwind.
- React Context API – manages state for the enrollment cart and shared settings.
- TypeScript – enforces strong typing and safer component communication.
- Accessible Icons & Layouts – designed with semantic HTML and ARIA guidelines.
- Lazy Loading – uses dynamic imports to reduce bundle size and improve performance.

---
## HOME PAGE
The Home Page introduces users to the prototype.
It includes:
- Overview of the portal redesign.
- Navigation buttons to “Enrollment” and “Academic Requirements”.
- Access to a Resource Section containing:
- Help and tutorials.
- System documentation.
- Contact information or support links.

## RESOURCE SECTION
- The Resource Section serves as the knowledge hub of the app:
- Provides quick access to university guidelines and degree planning tools.
- Includes links to academic advising and FAQs.
- Designed with consistent visual hierarchy and accessible navigation.

## TEAM AND ROLE
- My Lu: Developed and coded Academic Requirements page functionality.
- Quynh Le: Designed and implemented Enrollment Page interface and features.
- Brandon Huett: Designed Academic Requirement layouts and visuals.
- Marissa Marcarelli: Created project presentation slides.
- Simon Vu: Created and refined presentation content.

### LICENSE
This project was developed for CECS 448 – User Interface Design (Fall 2025) at California State University, Long Beach.
It is intended solely for academic and educational purposes.