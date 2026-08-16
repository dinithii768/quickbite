import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="pt-24 fade-in">
        {children}
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '20px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '700',
            padding: '16px 20px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
            color: '#18181b',
          },
          success: {
            iconTheme: {
              primary: '#f97316',
              secondary: '#fff',
            },
            style: {
              background: 'linear-gradient(135deg, rgba(255, 247, 237, 0.98), rgba(254, 215, 170, 0.95))',
              border: '2px solid rgba(249, 115, 22, 0.3)',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              background: 'linear-gradient(135deg, rgba(254, 242, 242, 0.98), rgba(252, 165, 165, 0.95))',
              border: '2px solid rgba(239, 68, 68, 0.3)',
            },
          },
        }}
      />
    </div>
  );
};

export default Layout;