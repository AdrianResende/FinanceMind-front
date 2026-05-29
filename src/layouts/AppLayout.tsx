import { Outlet, useLocation } from 'react-router-dom';
import { Navbar, LoginModal } from '@/components/shared';

export default function AppLayout() {
  const location = useLocation();
  const isPublicLanding = location.pathname === '/' || location.pathname === '/home';

  return (
    <>
      <LoginModal />
      {isPublicLanding ? (
        <div className="fm-page min-h-screen">
          <Outlet />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      )}
    </>
  );
}
