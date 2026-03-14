const features = [
  {
    title: 'Admin Dashboard',
    description:
      'Manage mentors, subjects, and bookings easily with role-based access and professional UI.',
  },
  {
    title: 'Mentor Discovery & Student Dashboard',
    description:
      'Find mentors, book sessions, track progress, and read reviews with a smooth workflow.',
  },
  {
    title: 'Secure Authentication',
    description:
      'Powered by Clerk for JWT-based login and role-based access control.',
  },
  {
    title: 'Tech Stack',
    description:
      'Frontend: React, TypeScript, ShadCN/ui | Backend: Spring Boot, PostgreSQL | Deployment: Vercel & Render',
  },
];

export default function AboutUsPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        padding: '60px 20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1
          style={{ fontSize: '3rem', marginBottom: '20px', color: '#111827' }}
        >
          About LMS – Online Mentoring Platform
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            color: '#6b7280',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          LMS is a <strong>full-stack mentorship platform</strong> connecting
          students with professional mentors. Students can discover mentors,
          book sessions, write reviews, and track learning progress. Admins
          manage mentors, subjects, and bookings through a secure dashboard.
        </p>
      </div>

      {/* Feature Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            style={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              const card = e.currentTarget as HTMLDivElement;
              card.style.transform = 'translateY(-5px)';
              card.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              const card = e.currentTarget as HTMLDivElement;
              card.style.transform = 'translateY(0)';
              card.style.boxShadow = '0 6px 15px rgba(0,0,0,0.1)';
            }}
          >
            <h3
              style={{
                fontSize: '1.4rem',
                marginBottom: '15px',
                color: '#111827',
              }}
            >
              {feature.title}
            </h3>
            <p style={{ fontSize: '1rem', color: '#6b7280' }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
