import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ShoppingBag, 
  Package, 
  Wrench, 
  SignOut, 
  User, 
  House,
  CaretRight
} from 'phosphor-react';
import { AppleButton } from '@/components/ui/AppleButton';
import { useToast } from '@/hooks/use-toast';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully.',
      });
      navigate('/login');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to log out. Please try again.',
      });
    }
  };

  const navItems = [
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/services', label: 'Services', icon: Wrench },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-muted/30 border-r border-border h-screen sticky top-0 overflow-y-auto">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <ShoppingBag size={24} className="text-primary" weight="light" />
            <span className="text-xl font-light bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Admin Panel
            </span>
          </Link>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path) 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:bg-muted/50'}`}
              >
                <item.icon size={18} weight={isActive(item.path) ? 'fill' : 'light'} />
                <span>{item.label}</span>
                {isActive(item.path) && <CaretRight size={14} className="ml-auto" />}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          {currentUser && (
            <div className="mb-4 px-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User size={16} className="text-primary" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">
                    {currentUser.displayName || 'Admin User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <Link to="/">
              <AppleButton 
                variant="outline" 
                size="sm"
                className="w-full justify-start gap-2"
              >
                <House size={16} />
                View Website
              </AppleButton>
            </Link>
            
            <AppleButton 
              variant="secondary" 
              size="sm"
              className="w-full justify-start gap-2"
              onClick={handleLogout}
            >
              <SignOut size={16} />
              Sign Out
            </AppleButton>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}