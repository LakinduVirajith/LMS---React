// pages/NotFoundPage.tsx
import { useNavigate } from 'react-router';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9fafb', // light background similar to site
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '50px 40px',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
          transition: 'transform 0.3s ease',
        }}
      >
        <h1
          style={{
            fontSize: '6rem',
            margin: '0',
            color: '#ff6b6b',
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: '1.8rem',
            margin: '20px 0',
            color: '#111827',
          }}
        >
          Page Not Found
        </h2>
        <p
          style={{
            fontSize: '1rem',
            marginBottom: '30px',
            color: '#6b7280',
          }}
        >
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '12px 30px',
            fontSize: '1rem',
            backgroundColor: '#4f46e5',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              '#3730a3';
            (e.currentTarget as HTMLButtonElement).style.transform =
              'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              '#4f46e5';
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          }}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
