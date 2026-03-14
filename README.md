# LMS Platform

## Project Description

LMS is a full-stack mentorship platform that connects students with professional mentors. The platform allows students to discover mentors, book sessions, view mentor profiles, and write reviews. Admins have full control over mentors, subjects, and session bookings through a secure dashboard.

---

## Features

### 1. Admin Dashboard

- **Role-based Access Control:** Admin-only access using Clerk metadata.
- **Subjects Management:**
  - Create, edit, and delete subjects.
  - Assign mentors to subjects.
  - Form validation using React Hook Form + Zod.
  - Upload or input course image URLs.

- **Mentor Management:**
  - Create and manage mentors.
  - Fields: First Name, Last Name, Email, Phone, Title, Profession, Company, Experience Years, Bio, Profile Image URL, Certification, Start Year.
  - Validation for required fields and email format.

- **Booking Management:**
  - View all sessions in a sortable/filterable table.
  - Columns: Session ID, Student Name, Mentor Name, Subject Name, Date/Time, Duration, Payment Status, Session Status, Actions.
  - Action buttons: Confirm Payment, Mark Complete, Add Meeting Link.
  - Search and pagination support.

- **Notifications:** Success and error toast messages on all actions.
- **UI:** Built with ShadCN/ui components for professional design.

### 2. Enhanced Mentor Discovery

- **Mentor Profile Pages:**
  - Profile image, name, title, company, certification badge, “Since Year”, star rating, review count.
  - About section: bio, experience highlights, skills.
  - Subjects taught with enrollment counts.

- **Booking Workflow:**
  - Pre-filled mentor and subject.
  - Double-booking prevention for overlapping sessions.
  - Past date booking restrictions.
  - Clear error messages in modals or alerts.

- **Reviews & Ratings:**
  - Write and display student reviews.
  - 5-star rating system with average score.

- **UI/UX:** Professional, responsive, mobile-friendly.

---

## Tech Stack

- **Frontend:** React, TypeScript, React Hook Form, Zod, ShadCN/ui, Clerk Authentication, Sonner notifications, Lucide-react icons
- **Backend:** Spring Boot, Spring Security, PostgreSQL (Supabase)
- **Deployment:** Vercel (Frontend), Render (Backend)
- **Database:** Neon PostgreSQL
- **Authentication:** Clerk for JWT and role management

---

## Getting Started (Local Development)

### Prerequisites

- Node.js >= 20
- Java 17+
- PostgreSQL or Supabase account
- Clerk account

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

---

## Environment Variables

### Frontend (`.env`)

```bash
VITE_CLERK_PUBLISHABLE_KEY=<Clerk Publishable Key>
VITE_API_BASE_URL=<Backend URL>
```

### Backend (`.env`)

```bash
# -------------------------
# Server & Profile
# -------------------------
PORT=8080
PROFILE=prod

# -------------------------
# Database (Neon/Postgres)
# -------------------------
DB_URL=jdbc:postgresql://<HOST>:<PORT>/<DB_NAME>
DB_USERNAME=<DB_USERNAME>
DB_PASSWORD=<DB_PASSWORD>

# -------------------------
# Redis
# -------------------------
REDIS_HOST=<REDIS_HOST>
REDIS_PORT=<REDIS_PORT>
REDIS_PASSWORD=<REDIS_PASSWORD>

# -------------------------
# JWT / Auth
# -------------------------
JWT_SECRET=<YOUR_JWT_SECRET_KEY>
AUTH_VALIDATOR_TYPE=clerk   # if you use Clerk as auth provider

# -------------------------
# Clerk
# -------------------------
CLERK_JWKS_URL=<CLERK_JWKS_URL>
CLERK_API_KEY=<CLERK_API_KEY>

# -------------------------
# Endpoints & CORS
# -------------------------
PUBLIC_ENDPOINTS=/api/v1/auth/**,/api/v1/public/**
CORS_ALLOWED_ORIGINS=https://your-frontend.com,https://another-domain.com

```

---

## API Documentation (Key Endpoints)

- `GET /api/v1/mentors` – Fetch all mentors
- `POST /api/v1/mentors` – Create new mentor (admin-only)
- `DELETE /api/v1/mentors/{id}` – Delete mentors (admin-only)
- `GET /api/v1/subjects` – Fetch subjects
- `POST /api/v1/subjects` – Create new subject (admin-only)
- `DELETE /api/v1/subjects/{id}` – Delete subject (admin-only)
- `GET /api/v1/bookings` – Fetch all sessions
- `PATCH /api/v1/bookings/{id}/confirm-payment` – Confirm payment
- `PATCH /api/v1/bookings/{id}/mark-complete` – Mark session completed

---

## Deployment Links

- **Frontend (Vercel):** [https://skillmentor-frontend.vercel.app](https://lms-react-mblwzxu4f-lakindu-virajiths-projects.vercel.app/)
- **Backend (Render):** [https://skillmentor-backend.onrender.com](https://lms-spring-boot.onrender.com/)

---

## Project Structure

```
frontend/
├─ components/
│  ├─ ui/
│  ├─ forms/
├─ pages/
│  ├─ admin/
│  │  ├─ CreateSubjectPage.tsx
│  │  ├─ CreateMentorPage.tsx
│  │  ├─ ManageBookingsPage.tsx
│  ├─ mentors/
│  │  ├─ [mentorId].tsx
│  ├─ dashboard/
backend/
├─ src/
│  ├─ main/
│  │  ├─ java/com/skillmentor/
│  │  │  ├─ controller/
│  │  │  ├─ service/
│  │  │  ├─ repository/
│  │  │  ├─ dto/
│  │  │  ├─ security/
```

---

## Notes & Best Practices

- Seed at least 3 mentors and 5 subjects before testing.
- Protect all admin-only routes with Clerk metadata.
- Test double-booking prevention and session validations thoroughly.
- Use ShadCN UI components consistently for forms and buttons.
- Ensure all pages are **responsive and mobile-friendly**.
- Handle loading states, errors, and notifications gracefully.

---

## License

This project is licensed under the MIT License.
