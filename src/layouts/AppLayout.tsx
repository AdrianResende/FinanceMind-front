import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/shared';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
