import { Settings as SettingsIcon, Bell, User, Shield, Droplets } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { authUtils } from '@/utils/authUtils';

const Settings = () => {
  const user = authUtils.getCurrentUser();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>

        {/* User Profile */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Profile Information</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Name</label>
              <p className="text-lg font-medium text-foreground">{user?.name}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <p className="text-lg font-medium text-foreground">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Role</label>
              <p className="text-lg font-medium text-foreground">{user?.role}</p>
            </div>
            {user?.quota && (
              <div>
                <label className="text-sm text-muted-foreground">Daily Quota</label>
                <p className="text-lg font-medium text-foreground">{user.quota}L</p>
              </div>
            )}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-accent" />
            <h2 className="text-xl font-bold text-foreground">Notification Preferences</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Low Water Level Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when tank level is low</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Quota Exceeded Warnings</p>
                <p className="text-sm text-muted-foreground">Alerts when usage exceeds quota</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Daily Usage Reports</p>
                <p className="text-sm text-muted-foreground">Receive daily consumption summary</p>
              </div>
              <div className="w-12 h-6 bg-border rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-muted-foreground rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Future Features Placeholder */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <Droplets className="w-6 h-6 text-success" />
            <h2 className="text-xl font-bold text-foreground">Water Management</h2>
          </div>
          
          <div className="space-y-3">
            <div className="p-4 bg-secondary/30 rounded-lg border-l-4 border-primary">
              <p className="font-medium text-foreground mb-1">Quota Assignment</p>
              <p className="text-sm text-muted-foreground">Coming soon: Adjust farmer quotas</p>
            </div>
            
            <div className="p-4 bg-secondary/30 rounded-lg border-l-4 border-accent">
              <p className="font-medium text-foreground mb-1">Valve Control</p>
              <p className="text-sm text-muted-foreground">Coming soon: Remote valve management</p>
            </div>
            
            <div className="p-4 bg-secondary/30 rounded-lg border-l-4 border-info">
              <p className="font-medium text-foreground mb-1">Sensor Calibration</p>
              <p className="text-sm text-muted-foreground">Coming soon: Arduino sensor settings</p>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-warning" />
            <h2 className="text-xl font-bold text-foreground">Security & Privacy</h2>
          </div>
          
          <div className="space-y-3">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <p className="font-medium text-foreground mb-1">Password</p>
              <p className="text-sm text-muted-foreground">Last changed: Never</p>
            </div>
            
            <div className="p-4 bg-secondary/30 rounded-lg">
              <p className="font-medium text-foreground mb-1">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Status: Not enabled</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
