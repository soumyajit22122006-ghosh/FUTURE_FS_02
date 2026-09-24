# LeadSphere

**Turn Leads Into Relationships.**

LeadSphere is a simple and professional CRM application designed to help businesses manage potential clients, track lead status, record communication notes, and manage follow-ups from one place.

## Features

- Add and manage potential leads
- Search leads by:
  - Name
  - Phone
  - Email
  - Company / Organization
- Track lead status:
  - New
  - Contacted
  - Follow-up
  - Converted
  - Lost
- Set follow-up dates
- Filter leads by status
- Filter leads by follow-up date:
  - Today
  - Upcoming
  - Overdue
- View complete lead details
- Edit lead information
- Add and edit one communication note per lead
- Delete leads
- Dashboard with lead statistics
- Flash messages for success and error feedback
- Responsive design for desktop, tablet, and mobile
- MongoDB Atlas database integration
- MVC architecture

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS
- Font Awesome
- Google Fonts

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Architecture

- MVC (Model-View-Controller)

---

## Project Structure

LeadSphere/
│
├── controllers/
│   ├── dashboardController.js
│   ├── enquiryController.js
│   ├── indexController.js
│   └── leadController.js
│
├── models/
│   └── Lead.js
│
├── routes/
│   ├── dashboard.js
│   ├── enquiry.js
│   └── index.js
│
├── views/
│   ├── enquiry/
│   │   └── form.ejs
│   │
│   ├── leadManagement/
│   │   ├── dashboard.ejs
│   │   ├── edit.ejs
│   │   ├── editNote.ejs
│   │   ├── leads.ejs
│   │   └── show.ejs
│   │
│   ├── boilerplate.ejs
│   └── home.ejs
│
├── public/
│   ├── css/
│   │   ├── style.css
│   │   └── responsive.css
│   │
│   └── js/
│       └── script.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md