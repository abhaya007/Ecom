'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ isCollapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line', link: '/admin' },
    { id: 'products', label: 'Products', icon: 'ri-shopping-bag-line', link: '/admin/products' },
    { id: 'categories', label: 'Categories', icon: 'ri-folder-line', link: '/admin/categories' },
    { id: 'users', label: 'Users', icon: 'ri-user-line', link: '/admin/users' },
    { id: 'orders', label: 'Orders', icon: 'ri-shopping-cart-line', link: '/admin/orders' },
    { id: 'analytics', label: 'Analytics', icon: 'ri-bar-chart-line', link: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: 'ri-settings-line', link: '/admin/settings' },
  ];

  return (
    <div className={`bg-[#2a4458] text-white h-full transition-all duration-100 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-xl font-bold font-pacifico text-[#f8732c]">Admin</h2>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-[#3a5568] transition-colors"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className={`ri-${isCollapsed ? 'menu-unfold' : 'menu-fold'}-line text-lg`}></i>
            </div>
          </button>
        </div>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const isActive = pathname === item.link;

          return (
            <Link
              key={item.id}
              href={item.link}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors
                ${isActive ? 'bg-[#f8732c] text-white' : 'hover:bg-[#3a5568]'}
              `}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className={`${item.icon} text-xl`}></i>
              </div>
              {!isCollapsed && <span className="ml-3 font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className={`flex items-center p-3 bg-white/10 rounded-lg ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 flex items-center justify-center bg-[#f8732c] rounded-full">
            <i className="ri-user-line text-white"></i>
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-gray-300">admin@example.com</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
