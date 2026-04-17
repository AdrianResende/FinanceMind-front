import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <Outlet />
    </div>
  );
}