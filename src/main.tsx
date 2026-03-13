import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App.tsx';
import { BrowserRouter } from 'react-router';
import { ClerkProvider } from '@clerk/react';
import { Toaster } from '@/components/ui/sonner';

const PUBLISHER_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHER_KEY) {
  throw new Error(
    'Clerk publishable key is not defined in environment variables',
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={PUBLISHER_KEY}
        afterSignOutUrl="/"
        signInForceRedirectUrl="/dashboard"
        signUpForceRedirectUrl="/dashboard"
      >
        <App />
        <Toaster />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
);
