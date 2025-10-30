import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Droplets, Home, Users, FileText, Bell, Settings, LogOut } from 'lucide-react';
import { authUtils } from '@/utils/authUtils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = authUtils.getCurrentUser();

  const handleLogout = () => {
    authUtils.logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/alerts', icon: Bell, label: 'Alerts' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2 text-primary font-bold text-xl">
            <Droplets className="w-6 h-6" />
            <span className="hidden sm:inline">AquaPulse</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col items-end text-xs">
              <span className="font-medium text-foreground">{user?.name}</span>
              <span className="text-muted-foreground">{user?.role}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
